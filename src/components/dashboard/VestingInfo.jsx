// src/components/dashboard/VestingInfo.jsx
import React, { useContext, useState, useEffect } from 'react';
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

// Helper to format timestamp to date
const formatDate = (timestamp) => {
  if (!timestamp || timestamp === '0') return 'N/A';
  
  try {
    // S'assurer que le timestamp est bien un nombre
    const timestampNum = typeof timestamp === 'string' 
      ? parseInt(timestamp.trim(), 10) 
      : timestamp;
    
    if (isNaN(timestampNum) || timestampNum <= 0) {
      return 'N/A';
    }
    
    const date = new Date(timestampNum * 1000);
    if (isNaN(date.getTime())) {
      return 'N/A';
    }
    
    return date.toLocaleString();
  } catch (e) {
    console.error("Error formatting date:", e);
    return 'N/A';
  }
};

const VestingInfo = () => {
  const { web3, account } = useContext(Web3Context);
  const { userInfo, contract, refreshData } = useContext(ContractContext);
  
  const [vestingProgress, setVestingProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));
  const [vestingDetails, setVestingDetails] = useState({
    totalAmount: '0',
    initialUnlock: '0',
    amountClaimed: '0',
    vestingStart: '0',
    vestingDuration: '0',
    claimable: '0'
  });
  
  // Update current time every second for progress calculations
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Fetch detailed vesting info from contract
  useEffect(() => {
    const fetchVestingDetails = async () => {
      if (!contract || !account || !web3) {
        return;
      }
      
      try {
        console.log("Fetching vesting details for account:", account);
        const vestingInfo = await contract.methods.getVestingInfo(account).call();
        console.log("Vesting info from contract:", vestingInfo);
        
        setVestingDetails({
          totalAmount: vestingInfo.totalAmount || '0',
          initialUnlock: vestingInfo.initialUnlock || '0',
          amountClaimed: vestingInfo.amountClaimed || '0',
          vestingStart: vestingInfo.vestingStart || '0',
          vestingDuration: vestingInfo.vestingDuration || '0',
          claimable: vestingInfo.claimable || '0'
        });
      } catch (error) {
        console.error("Error fetching vesting details:", error);
      }
    };
    
    fetchVestingDetails();
  }, [contract, account, web3, refreshData]);
  
  // Calculate vesting progress based on real data
  useEffect(() => {
    if (!vestingDetails.vestingStart || !vestingDetails.vestingDuration || 
        vestingDetails.vestingStart === '0' || vestingDetails.vestingDuration === '0') {
      setVestingProgress(0);
      return;
    }
    
    try {
      const startTime = parseInt(vestingDetails.vestingStart);
      const duration = parseInt(vestingDetails.vestingDuration);
      
      // Vérifier que les valeurs sont valides
      if (isNaN(startTime) || isNaN(duration) || startTime <= 0 || duration <= 0) {
        console.error("Invalid vesting parameters:", vestingDetails);
        setVestingProgress(0);
        return;
      }
      
      // Si le vesting n'a pas encore commencé
      if (currentTime < startTime) {
        setVestingProgress(0);
        return;
      }
      
      // Si le vesting est terminé
      if (currentTime >= startTime + duration) {
        setVestingProgress(100);
        return;
      }
      
      // Calculer la progression
      const elapsed = currentTime - startTime;
      const progress = (elapsed / duration) * 100;
      
      // S'assurer que la progression est entre 0 et 100
      const clampedProgress = Math.min(100, Math.max(0, progress));
      setVestingProgress(clampedProgress);
      
      console.log("Vesting progress calculated:", {
        currentTime,
        startTime,
        duration,
        elapsed,
        progress: clampedProgress
      });
    } catch (error) {
      console.error("Error calculating vesting progress:", error);
      setVestingProgress(0);
    }
  }, [vestingDetails, currentTime]);
  
  // Pour aider au débogage - peut être retiré en production
  const calculateAndLogProgressDetails = () => {
    if (!vestingDetails.vestingStart || !vestingDetails.vestingDuration) {
      console.log("Vesting not started or no duration set");
      return;
    }
    
    const startTime = parseInt(vestingDetails.vestingStart);
    const duration = parseInt(vestingDetails.vestingDuration);
    const now = Math.floor(Date.now() / 1000);
    
    const startDate = new Date(startTime * 1000).toLocaleString();
    const endDate = new Date((startTime + duration) * 1000).toLocaleString();
    const nowDate = new Date(now * 1000).toLocaleString();
    
    console.log("Vesting Details:");
    console.log("- Start Time:", startTime, "(", startDate, ")");
    console.log("- Duration:", duration, "seconds (", Math.floor(duration/86400), "days )");
    console.log("- End Time:", startTime + duration, "(", endDate, ")");
    console.log("- Current Time:", now, "(", nowDate, ")");
    console.log("- Progress:", ((now - startTime) / duration) * 100, "%");
  };
  
  return (
    <div className="vesting-info-container">
      <div className="vesting-info-card">
        <div className="vesting-header">
          <h2>Your Vesting Schedule</h2>
          <button className="refresh-button" onClick={() => {
            refreshData();
            calculateAndLogProgressDetails(); // Pour le débogage
          }}>
            Refresh
          </button>
        </div>
        
        {!account ? (
          <div className="connect-wallet-message">
            <p>Please connect your wallet to view vesting information</p>
          </div>
        ) : (
          <>
            <div className="vesting-progress">
              <div className="progress-header">
                <span>Vesting Progress</span>
                <span>{vestingProgress.toFixed(2)}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${vestingProgress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="vesting-details">
              <div className="detail-row">
                <span>Total Vested Amount:</span>
                <span>{web3 ? formatFromWei(web3, vestingDetails.totalAmount) : '0'} JPAY</span>
              </div>
              <div className="detail-row">
                <span>Amount Claimed:</span>
                <span>{web3 ? formatFromWei(web3, vestingDetails.amountClaimed) : '0'} JPAY</span>
              </div>
              <div className="detail-row highlight">
                <span>Claimable Amount:</span>
                <span>{web3 ? formatFromWei(web3, userInfo.claimableAmount) : '0'} JPAY</span>
              </div>
              <div className="detail-row">
                <span>Vesting Start:</span>
                <span>{formatDate(vestingDetails.vestingStart)}</span>
              </div>
              <div className="detail-row">
                <span>Vesting End:</span>
                <span>{
                  vestingDetails.vestingStart && vestingDetails.vestingDuration ?
                  formatDate(String(parseInt(vestingDetails.vestingStart) + parseInt(vestingDetails.vestingDuration))) :
                  'N/A'
                }</span>
              </div>
              <div className="detail-row">
                <span>Next Claim Available:</span>
                <span>
                  {vestingProgress >= 100 || (userInfo.claimableAmount === '0' && userInfo.vestedAmount !== '0') ? (
                    'Vesting terminé'
                  ) : userInfo.vestedAmount === '0' ? (
                    'Aucun vesting'
                  ) : userInfo.nextClaimTime && userInfo.nextClaimTime !== '0' ? (
                    formatDate(userInfo.nextClaimTime)
                  ) : (
                    'Disponible maintenant'
                  )}
                </span>
              </div>
            </div>

            
            
            {/* Section de débogage - peut être retiré en production */}
            <div className="debug-section" style={{ marginTop: '20px', borderTop: '1px solid #ddd', paddingTop: '10px', fontSize: '0.8em', color: '#666' }}>
              <button 
                onClick={calculateAndLogProgressDetails}
                style={{ 
                  padding: '5px', 
                  background: '#f0f0f0', 
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9em'
                }}
              >
                Debug Vesting
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VestingInfo;