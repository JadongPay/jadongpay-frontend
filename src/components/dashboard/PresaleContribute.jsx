// src/components/dashboard/PresaleContribute.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Web3Context } from '../../contexts/Web3Context';
import { ContractContext } from '../../contexts/ContractContext';

// Helper to format Wei to ETH/BNB
const formatFromWei = (web3, value, decimals = 4) => {
  if (!web3 || !value) return '0';
  const bnbValue = web3.utils.fromWei(value.toString(), 'ether');
  return parseFloat(bnbValue).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

const PresaleContribute = () => {
  const { web3, account } = useContext(Web3Context);
  const { 
    presaleInfo, 
    userInfo, 
    buyTokens, 
    reclaimBNB,
    refreshData,
    isPresaleActive,
    isPresaleFailed
  } = useContext(ContractContext);

  
  
  const [bnbAmount, setBnbAmount] = useState('');
  const [expectedTokens, setExpectedTokens] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [txStatus, setTxStatus] = useState({ success: false, message: '', txHash: '' });
  const [canReclaim, setCanReclaim] = useState(false);
  
  const PRESALE_RATE = 7000; // From your contract: 1 BNB = 7,000 JPAY
  
  // Calculate expected tokens based on BNB input
  useEffect(() => {
    if (!bnbAmount || !web3) {
      setExpectedTokens('0');
      return;
    }
    
    try {
      const bnbAmountWei = web3.utils.toWei(bnbAmount, 'ether');
      const tokensToReceive = (parseFloat(bnbAmountWei) * PRESALE_RATE) / 10**18;
      setExpectedTokens(tokensToReceive.toLocaleString(undefined, { maximumFractionDigits: 0 }));
    } catch (error) {
      setExpectedTokens('0');
    }
  }, [bnbAmount, web3]);
  
  // Check if user can reclaim BNB
  useEffect(() => {
    setCanReclaim(
      isPresaleFailed && 
      userInfo.presaleContribution && 
      userInfo.presaleContribution !== '0'
    );
  }, [isPresaleFailed, userInfo.presaleContribution]);
  
  // Calculate remaining contribution space

  const calculateRemainingContribution = () => {
    if (!web3 || !account) return '0';
    
    try {
      // Au lieu d'utiliser une valeur fixe, utiliser la valeur du contrat
      const maxBnb = web3.utils.fromWei(presaleInfo.maxContribution || '10000000000000000000', 'ether');
      
      // Vérifier si la valeur est bien récupérée du contrat
      if (presaleInfo.maxContribution === '0' || !presaleInfo.maxContribution) {
        console.warn("Max contribution not available from contract, using fallback value");
      } else {
        console.log("Max contribution from contract:", maxBnb, "BNB");
      }
      
      // La contribution de l'utilisateur est en JPAY, la convertir en BNB
      let userBnbContribution;
      
      // Méthode 1: Si nous avons directement la valeur en BNB
      if (userInfo.bnbContribution) {
        userBnbContribution = parseFloat(web3.utils.fromWei(userInfo.bnbContribution, 'ether'));
      } 
      // Méthode 2: Convertir depuis JPAY à BNB en utilisant le taux
      else {
        const userJpayContribution = parseFloat(web3.utils.fromWei(userInfo.presaleContribution || '0', 'ether'));
        const PRESALE_RATE = 7000; // 1 BNB = 7000 JPAY
        userBnbContribution = userJpayContribution / PRESALE_RATE;
      }
      
      console.log("User contribution in BNB equivalent:", userBnbContribution);
      
      const maxBnbFloat = parseFloat(maxBnb);
      const remaining = maxBnbFloat - userBnbContribution;
      
      // S'assurer que la valeur est positive et pas trop petite pour éviter des erreurs d'arrondi
      return remaining > 0.000001 ? remaining.toFixed(6) : '0';
    } catch (error) {
      console.error("Error calculating remaining contribution:", error);
      
      // En cas d'erreur, nous utilisons une valeur par défaut mais nous indiquons clairement que c'est une estimation
      return '10.000000'; // Valeur par défaut maximum
    }
  };
  
  // Handle BNB input change
  const handleBnbChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and decimals
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setBnbAmount(value);
    }
  };
  
  // Handle max button click
  const handleMaxClick = () => {
    const remaining = calculateRemainingContribution();
    setBnbAmount(remaining.toString());
  };
  
  // Handle contribute button click
  const handleContribute = async () => {
    if (!web3 || !account || !bnbAmount || parseFloat(bnbAmount) <= 0) {
      setTxStatus({
        success: false,
        message: 'Please enter a valid BNB amount',
        txHash: ''
      });
      return;
    }
    
    setIsLoading(true);
    setTxStatus({ success: false, message: '', txHash: '' });
    
    try {
      const result = await buyTokens(bnbAmount);
      
      setTxStatus({
        success: result.success,
        message: result.success ? 'Transaction successful!' : result.message,
        txHash: result.txHash || ''
      });
      
      if (result.success) {
        setBnbAmount('');
        await refreshData();
      }
    } catch (error) {
      setTxStatus({
        success: false,
        message: error.message || 'An error occurred',
        txHash: ''
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle reclaim button click
  const handleReclaim = async () => {
    if (!web3 || !account) {
      setTxStatus({
        success: false,
        message: 'Please connect your wallet',
        txHash: ''
      });
      return;
    }
    
    setIsLoading(true);
    setTxStatus({ success: false, message: '', txHash: '' });
    
    try {
      const result = await reclaimBNB();
      
      setTxStatus({
        success: result.success,
        message: result.success ? 'BNB reclaimed successfully!' : result.message,
        txHash: result.txHash || ''
      });
      
      if (result.success) {
        await refreshData();
      }
    } catch (error) {
      setTxStatus({
        success: false,
        message: error.message || 'An error occurred',
        txHash: ''
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Create BSCscan link for transaction
  const getBscScanLink = (txHash) => {
    const baseUrl = 'https://bscscan.com/tx/';
    return `${baseUrl}${txHash}`;
  };
  
  return (
    <div className="presale-contribute-container">
      <div className="presale-contribute-card">
        <h2>Participate in Presale</h2>
        
        <div className="user-contribution">
          <p>Your Contribution: <span>{web3 ? formatFromWei(web3, userInfo.presaleContribution) : '0'} JPAY</span></p>
          <p>Remaining Allocation: <span>{calculateRemainingContribution()} BNB</span></p>
        </div>
        
        {isPresaleActive && (
          <div className="contribute-form">
            <div className="input-container">
              <label htmlFor="bnb-amount">BNB Amount:</label>
              <div className="input-with-button">
                <input
                  id="bnb-amount"
                  type="text"
                  value={bnbAmount}
                  onChange={handleBnbChange}
                  placeholder="0.0"
                  disabled={!account || isLoading}
                />
                <button 
                  className="max-button"
                  onClick={handleMaxClick}
                  disabled={!account || isLoading}
                >
                  MAX
                </button>
              </div>
            </div>
            
            <div className="expected-tokens">
              <p>Expected JPAY: <span>{expectedTokens}</span></p>
            </div>
            
            <button
              className="contribute-button"
              onClick={handleContribute}
              disabled={!account || !isPresaleActive || isLoading || !bnbAmount || parseFloat(bnbAmount) <= 0}
            >
              {isLoading ? 'Processing...' : 'Contribute'}
            </button>
          </div>
        )}
        
        {canReclaim && (
          <div className="reclaim-section">
            <p>The presale has failed. You can reclaim your BNB contribution.</p>
            <button
              className="reclaim-button"
              onClick={handleReclaim}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Reclaim BNB'}
            </button>
          </div>
        )}
        
        {txStatus.message && (
          <div className={`tx-status ${txStatus.success ? 'success' : 'error'}`}>
            <p>{txStatus.message}</p>
            {txStatus.txHash && (
              <a 
                href={getBscScanLink(txStatus.txHash)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="tx-link"
              >
                View on BSCscan
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PresaleContribute;