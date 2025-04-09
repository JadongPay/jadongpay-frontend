// src/components/dashboard/TokenStats.jsx
import React, { useContext } from 'react';
import { Web3Context } from '../../contexts/Web3Context';
import { ContractContext } from '../../contexts/ContractContext';
import circulatingSupplyIcon from '../../assets/images/circulating-supply-icon.png';
import burnedIcon from '../../assets/images/burned-icon.png';
import vestedIcon from '../../assets/images/vested-icon.png';
import holdersIcon from '../../assets/images/holders-icon.png';
import rewardsDistributedIcon from '../../assets/images/rewards-distributed-icon.png';
import rewardsPoolIcon from '../../assets/images/rewards-pool-icon.png';


// Helper to format Wei to Token amount
const formatFromWei = (web3, value, decimals = 2) => {
  if (!web3 || !value) return '0';
  const tokenValue = web3.utils.fromWei(value.toString(), 'ether');
  return parseFloat(tokenValue).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

const TokenStats = () => {
  const { web3 } = useContext(Web3Context);
  const { tokenInfo, contractState, refreshData, ContractState } = useContext(ContractContext);
  
  // Get contract state text
  const getContractStateText = () => {
    switch (contractState) {
      case ContractState.SETUP:
        return 'Setup';
      case ContractState.PRESALE_ACTIVE:
        return 'Presale Active';
      case ContractState.PRESALE_SUCCESS:
        return 'Presale Successful';
      case ContractState.PRESALE_FINALIZATION_INITIATED:
        return 'Presale Finalization Initiated';
      case ContractState.PRESALE_FAILED:
        return 'Presale Failed';
      case ContractState.TRADING:
        return 'Trading Active';
      default:
        return 'Unknown';
    }
  };
  
  return (
    <div className="token-stats-container">
      <div className="token-stats-card">
        <div className="stats-header">
          <h2>JadongPay Token Statistics</h2>
          <button className="refresh-button" onClick={refreshData}>
            Refresh
          </button>
        </div>
        
        <div className="contract-state">
          <span className="state-label">Contract State:</span>
          <span className="state-value">{getContractStateText()}</span>
        </div>
        
        <div className="token-address">
          <span className="address-label">Contract Address:</span>
          <a 
            href="https://bscscan.com/address/0x033C974b195A59696408261382C4aBF273Fdb733" 
            target="_blank"
            rel="noopener noreferrer"
            className="address-value"
          >
            0x033C974b195A59696408261382C4aBF273Fdb733
          </a>
        </div>
        
        <div className="stats-grid">
        <div className="stat-item">
          <img src={circulatingSupplyIcon} alt="Circulating Supply" className="stat-icon" />
          <div className="stat-data">
            <h3>Circulating Supply</h3>
            <p>{web3 ? formatFromWei(web3, tokenInfo.circulatingSupply) : '0'} JPAY</p>
          </div>
        </div>
          
        <div className="stat-item">
            <img src={burnedIcon} alt="Total Burned" className="stat-icon" />
            <div className="stat-data">
              <h3>Total Burned</h3>
              <p>{web3 ? formatFromWei(web3, tokenInfo.burned) : '0'} JPAY</p>
            </div>
          </div>
                    
          <div className="stat-item">
            <img src={vestedIcon} alt="Total Vested" className="stat-icon" />
            <div className="stat-data">
              <h3>Total Vested</h3>
              <p>{web3 ? formatFromWei(web3, tokenInfo.vested) : '0'} JPAY</p>
            </div>
          </div>
          
          <div className="stat-item">
            <img src={holdersIcon} alt="Total Holders" className="stat-icon" />
            <div className="stat-data">
              <h3>Total Holders</h3>
              <p>{tokenInfo.totalHolders}</p>
            </div>
          </div>
          
          <div className="stat-item">
            <img src={rewardsDistributedIcon} alt="Total Rewards Distributed" className="stat-icon" />
            <div className="stat-data">
              <h3>Total Rewards Distributed</h3>
              <p>{web3 ? formatFromWei(web3, tokenInfo.totalRewards, 6) : '0'} USDT</p>
            </div>
          </div>
          
          <div className="stat-item">
            <img src={rewardsPoolIcon} alt="Rewards Pool" className="stat-icon" />
            <div className="stat-data">
              <h3>Rewards Pool</h3>
              <p>{web3 ? formatFromWei(web3, tokenInfo.rewardsBalance) : '0'} JPAY</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenStats;