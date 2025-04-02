// src/components/dashboard/UserStats.jsx
import React, { useContext } from 'react';
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

const UserStats = () => {
  const { web3, account } = useContext(Web3Context);
  const { userInfo, refreshData } = useContext(ContractContext);
  
  // Create BSCscan link for address
  const getBscScanAddressLink = (address) => {
    const baseUrl = 'https://bscscan.com/address/';
    return `${baseUrl}${address}`;
  };
  
  return (
    <div className="user-stats-container">
      <div className="user-stats-card">
        <div className="stats-header">
          <h2>Your JadongPay Statistics</h2>
          <button className="refresh-button" onClick={refreshData}>
            Refresh
          </button>
        </div>
        
        {!account ? (
          <div className="connect-wallet-message">
            <p>Please connect your wallet to view your statistics</p>
          </div>
        ) : (
          <div className="stats-content">
            <div className="wallet-address">
              <p>Wallet: <a href={getBscScanAddressLink(account)} target="_blank" rel="noopener noreferrer">{account}</a></p>
            </div>
            
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon token-balance-icon"></div>
                <div className="stat-data">
                  <h3>Token Balance</h3>
                  <p>{web3 ? formatFromWei(web3, userInfo.tokenBalance) : '0'} JPAY</p>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon presale-contribution-icon"></div>
                <div className="stat-data">
                  <h3>Presale Contribution</h3>
                  <p>{web3 ? formatFromWei(web3, userInfo.presaleContribution) : '0'} JPAY</p>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon vested-amount-icon"></div>
                <div className="stat-data">
                  <h3>Vested Amount</h3>
                  <p>{web3 ? formatFromWei(web3, userInfo.vestedAmount) : '0'} JPAY</p>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon pending-rewards-icon"></div>
                <div className="stat-data">
                  <h3>Pending Rewards</h3>
                  <p>{web3 ? formatFromWei(web3, userInfo.pendingRewards, 6) : '0'} USDT</p>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon claimed-rewards-icon"></div>
                <div className="stat-data">
                  <h3>Total Claimed Rewards</h3>
                  <p>{web3 ? formatFromWei(web3, userInfo.claimedRewards, 6) : '0'} USDT</p>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon claimable-tokens-icon"></div>
                <div className="stat-data">
                  <h3>Claimable Tokens</h3>
                  <p>{web3 ? formatFromWei(web3, userInfo.claimableAmount) : '0'} JPAY</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStats;