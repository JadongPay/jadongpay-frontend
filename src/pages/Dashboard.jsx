// src/pages/Dashboard.jsx
import React, { useContext } from 'react';
import { Web3Context } from '../contexts/Web3Context';
import { ContractContext } from '../contexts/ContractContext';

// Import Dashboard Components
import WalletConnect from '../components/dashboard/WalletConnect';
import PresaleInfo from '../components/dashboard/PresaleInfo';
import PresaleContribute from '../components/dashboard/PresaleContribute';
import VestingInfo from '../components/dashboard/VestingInfo';
import ClaimTokens from '../components/dashboard/ClaimTokens';
import UserStats from '../components/dashboard/UserStats';
import TokenStats from '../components/dashboard/TokenStats';

const Dashboard = () => {
  const { account } = useContext(Web3Context);
  const { 
    isPresaleActive, 
    isPresaleSuccessful,
    isPresaleFinalizationInitiated,
    isPresaleFailed,
    isTradingActive
  } = useContext(ContractContext);
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>JadongPay Dashboard</h1>
        <p>Manage your JadongPay tokens, presale contribution, and rewards</p>
      </div>
      
      <div className="dashboard-section">
        <WalletConnect />
      </div>
      
      {/* Show appropriate components based on contract state */}
      {(isPresaleActive || isPresaleFinalizationInitiated) && (
        <div className="dashboard-section presale-section">
          <div className="section-grid">
            <PresaleInfo />
            <PresaleContribute />
          </div>
        </div>
      )}
      
      {(isPresaleSuccessful || isTradingActive) && account && (
        <div className="dashboard-section vesting-section">
          <div className="section-grid">
            <VestingInfo />
            <ClaimTokens />
          </div>
        </div>
      )}
      
      {isPresaleFailed && account && (
        <div className="dashboard-section reclaim-section">
          <PresaleContribute />
        </div>
      )}
      
      {account && (
        <div className="dashboard-section stats-section">
          <UserStats />
        </div>
      )}
      
      <div className="dashboard-section token-stats-section">
        <TokenStats />
      </div>
    </div>
  );
};

export default Dashboard;