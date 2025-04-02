// src/components/dashboard/ClaimTokens.jsx
import React, { useContext, useState } from 'react';
import { Web3Context } from '../../contexts/Web3Context';
import { ContractContext } from '../../contexts/ContractContext';

// Helper to format Wei to Token amount
const formatFromWei = (web3, value, decimals = 2) => {
  if (!web3 || !value) return '0';
  const tokenValue = web3.utils.fromWei(value.toString(), 'ether');
  return parseFloat(tokenValue).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

const ClaimTokens = () => {
  const { web3, account } = useContext(Web3Context);
  const { 
    userInfo, 
    claimVestedTokens, 
    claimRewards, 
    refreshData,
    isTradingActive
  } = useContext(ContractContext);
  
  const [isClaimingVested, setIsClaimingVested] = useState(false);
  const [isClaimingRewards, setIsClaimingRewards] = useState(false);
  const [txStatus, setTxStatus] = useState({ success: false, message: '', txHash: '' });
  
  // Handle vested tokens claim
  const handleClaimVested = async () => {
    if (!web3 || !account) {
      setTxStatus({
        success: false,
        message: 'Please connect your wallet',
        txHash: ''
      });
      return;
    }
    
    setIsClaimingVested(true);
    setTxStatus({ success: false, message: '', txHash: '' });
    
    try {
      const result = await claimVestedTokens();
      
      setTxStatus({
        success: result.success,
        message: result.success ? 'Tokens claimed successfully!' : result.message,
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
      setIsClaimingVested(false);
    }
  };
  
  // Handle rewards claim
  const handleClaimRewards = async () => {
    if (!web3 || !account) {
      setTxStatus({
        success: false,
        message: 'Please connect your wallet',
        txHash: ''
      });
      return;
    }
    
    setIsClaimingRewards(true);
    setTxStatus({ success: false, message: '', txHash: '' });
    
    try {
      const result = await claimRewards();
      
      setTxStatus({
        success: result.success,
        message: result.success ? 'Rewards claimed successfully!' : result.message,
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
      setIsClaimingRewards(false);
    }
  };
  
  // Create BSCscan link for transaction
  const getBscScanLink = (txHash) => {
    const baseUrl = 'https://bscscan.com/tx/';
    return `${baseUrl}${txHash}`;
  };
  
  const hasClaimableVestedTokens = userInfo.claimableAmount && userInfo.claimableAmount !== '0';
  const hasClaimableRewards = userInfo.pendingRewards && userInfo.pendingRewards !== '0';
  
  return (
    <div className="claim-tokens-container">
      <div className="claim-tokens-card">
        <h2>Claim Your Tokens & Rewards</h2>
        
        {!account ? (
          <div className="connect-wallet-message">
            <p>Please connect your wallet to claim tokens and rewards</p>
          </div>
        ) : (
          <>
            <div className="claim-sections">
              <div className="claim-section">
                <h3>Vested Tokens</h3>
                <p className="claimable-amount">
                  {web3 ? formatFromWei(web3, userInfo.claimableAmount) : '0'} JPAY Available
                </p>
                <button
                  className="claim-button"
                  onClick={handleClaimVested}
                  disabled={!hasClaimableVestedTokens || isClaimingVested}
                >
                  {isClaimingVested ? 'Processing...' : 'Claim Tokens'}
                </button>
              </div>
              
              {isTradingActive && (
                <div className="claim-section">
                  <h3>USDT Rewards</h3>
                  <p className="claimable-amount">
                    {web3 ? formatFromWei(web3, userInfo.pendingRewards, 6) : '0'} USDT Available
                  </p>
                  <button
                    className="claim-button rewards"
                    onClick={handleClaimRewards}
                    disabled={!hasClaimableRewards || isClaimingRewards}
                  >
                    {isClaimingRewards ? 'Processing...' : 'Claim Rewards'}
                  </button>
                </div>
              )}
            </div>
            
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
          </>
        )}
      </div>
    </div>
  );
};

export default ClaimTokens;