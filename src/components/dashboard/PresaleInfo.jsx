// src/components/dashboard/PresaleInfo.jsx
import React, { useContext, useState, useEffect } from 'react';
import { ContractContext } from '../../contexts/ContractContext';
import { Web3Context } from '../../contexts/Web3Context';

// Helper function to format large numbers
const formatNumber = (num, decimals = 2) => {
  if (!num) return '0';
  
  // Convert to number if it's a string
  const number = typeof num === 'string' ? parseFloat(num) : num;
  
  // Format with commas and specified decimals
  return number.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

// Helper to format Wei to ETH/BNB
const formatFromWei = (web3, value, decimals = 4) => {
  if (!web3 || !value) return '0';
  const bnbValue = web3.utils.fromWei(value.toString(), 'ether');
  return formatNumber(bnbValue, decimals);
};

// Helper to format timestamp to date
const formatDate = (timestamp) => {
  if (!timestamp || timestamp === '0') {
    return 'N/A';
  }
  
  try {
    // S'assurer que le timestamp est bien un nombre
    const timestampNum = typeof timestamp === 'string' 
      ? parseInt(timestamp.trim(), 10) 
      : timestamp;
    
    // Vérifier que le parsing a bien fonctionné
    if (isNaN(timestampNum)) {
      console.error("Invalid timestamp after parsing:", timestamp);
      return 'N/A';
    }
    
    // Vérifier que le timestamp est bien dans une plage raisonnable
    // (entre 2023 et 2030)
    const minTimestamp = new Date('2023-01-01').getTime() / 1000;
    const maxTimestamp = new Date('2030-01-01').getTime() / 1000;
    
    if (timestampNum < minTimestamp || timestampNum > maxTimestamp) {
      console.error("Timestamp out of reasonable range:", timestampNum);
      return 'N/A';
    }
    
    // Convertir en date
    const date = new Date(timestampNum * 1000);
    
    // Vérifier que la date est valide
    if (isNaN(date.getTime())) {
      console.error("Invalid date after conversion:", date);
      return 'N/A';
    }
    
    // Format date lisible
    return date.toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    console.error("Error in formatDate:", e);
    return 'N/A';
  }
};

// Helper to calculate percentage
const calculatePercentage = (part, total) => {
  if (!part || !total || total === '0') return 0;
  return (parseInt(part) / parseInt(total)) * 100;
};

const PresaleInfo = () => {
  const { web3 } = useContext(Web3Context);
  const { 
    presaleInfo, 
    refreshData, 
    isPresaleActive, 
    isPresaleSuccessful, 
    isPresaleFinalizationInitiated,
    isPresaleFailed,
    isTradingActive
  } = useContext(ContractContext);
  
  const [timeLeft, setTimeLeft] = useState('');
  const [progress, setProgress] = useState(0);
  
  // Calculate time left in presale
  useEffect(() => {
    if (!presaleInfo.endTime || presaleInfo.endTime === '0') {
      setTimeLeft('N/A');
      return;
    }
    
    // S'assurer que endTime est bien un nombre
    let endTimeNum;
    try {
      endTimeNum = typeof presaleInfo.endTime === 'string' 
        ? parseInt(presaleInfo.endTime.trim(), 10) 
        : presaleInfo.endTime;
        
      if (isNaN(endTimeNum)) {
        console.error("Invalid endTime after parsing:", presaleInfo.endTime);
        setTimeLeft('N/A');
        return;
      }
    } catch (e) {
      console.error("Error parsing endTime:", e);
      setTimeLeft('N/A');
      return;
    }
    
    const calculateTimeLeft = () => {
      try {
        const now = Math.floor(Date.now() / 1000);
        
        if (now >= endTimeNum) {
          setTimeLeft('Terminé');
          return;
        }
        
        const timeRemaining = endTimeNum - now;
        const days = Math.floor(timeRemaining / 86400);
        const hours = Math.floor((timeRemaining % 86400) / 3600);
        const minutes = Math.floor((timeRemaining % 3600) / 60);
        const seconds = timeRemaining % 60;
        
        const formattedTime = `${days}j ${hours}h ${minutes}m ${seconds}s`;
        setTimeLeft(formattedTime);
      } catch (error) {
        console.error("Error calculating time left:", error);
        setTimeLeft('Erreur');
      }
    };
    
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(interval);
  }, [presaleInfo.endTime]);
  
  // Calculate progress percentage
  useEffect(() => {
    const percentage = calculatePercentage(presaleInfo.tokensSold, presaleInfo.hardcap);
    setProgress(percentage > 100 ? 100 : percentage);
  }, [presaleInfo.tokensSold, presaleInfo.hardcap]);
  
  // Get presale status text
  const getStatusText = () => {
    if (isPresaleActive) return 'Active';
    if (isPresaleSuccessful) return 'Successful';
    if (isPresaleFailed) return 'Failed';
    if (isTradingActive) return 'Trading Active';
    return 'Setup';
  };
  
  return (
    <div className="presale-info-container">
      <div className="presale-info-card">
        <div className="presale-header">
          <h2>JadongPay Presale Information</h2>
          <button className="refresh-button" onClick={refreshData}>
            Refresh
          </button>
        </div>
        
        <div className="presale-status">
          <div className="status-badge" data-status={getStatusText().toLowerCase()}>
            {getStatusText()}
          </div>
          
          {isPresaleActive && (
            <div className="time-left">
              <p>Time Left: {timeLeft}</p>
            </div>
          )}
        </div>
        
        <div className="presale-progress">
          <div className="progress-header">
            <span>Progress</span>
            <span>{progress.toFixed(2)}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-stats">
            <span>{web3 ? formatFromWei(web3, presaleInfo.tokensSold) : '0'} JPAY</span>
            <span>{web3 ? formatFromWei(web3, presaleInfo.hardcap) : '0'} JPAY</span>
          </div>
        </div>
        
        <div className="presale-details">
          <div className="detail-row">
            <span>Tokens For Sale:</span>
            <span>{web3 ? formatFromWei(web3, presaleInfo.tokensForSale) : '0'} JPAY</span>
          </div>
          <div className="detail-row">
            <span>Tokens Sold:</span>
            <span>{web3 ? formatFromWei(web3, presaleInfo.tokensSold) : '0'} JPAY</span>
          </div>
          <div className="detail-row">
            <span>BNB Raised:</span>
            <span>{web3 ? formatFromWei(web3, presaleInfo.amountRaised) : '0'} BNB</span>
          </div>
          <div className="detail-row">
            <span>Softcap:</span>
            <span>{web3 ? formatFromWei(web3, presaleInfo.softcap) : '0'} JPAY</span>
          </div>
          <div className="detail-row">
            <span>Hardcap:</span>
            <span>{web3 ? formatFromWei(web3, presaleInfo.hardcap) : '0'} JPAY</span>
          </div>
          <div className="detail-row">
            <span>Max Contribution:</span>
            <span>{web3 ? formatFromWei(web3, presaleInfo.maxContribution) : '0'} BNB</span>
          </div>
          <div className="detail-row">
            <span>End Time:</span>
            <span>{formatDate(presaleInfo.endTime)}</span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default PresaleInfo;