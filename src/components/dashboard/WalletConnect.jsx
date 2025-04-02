// src/components/dashboard/WalletConnect.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Web3Context } from '../../contexts/Web3Context';
import { ContractContext } from '../../contexts/ContractContext';

const WalletConnect = () => {
  const { 
    web3, 
    account, 
    chainId, 
    isConnecting, 
    error: web3Error, 
    connectWallet, 
    disconnectWallet,
    checkNetwork,
    switchToBSC 
  } = useContext(Web3Context);
  
  const { 
    contractError 
  } = useContext(ContractContext);
  
  const [hasWrongNetwork, setHasWrongNetwork] = useState(false);
  
  // Check if we're on the right network
  useEffect(() => {
    if (web3 && chainId) {
      setHasWrongNetwork(!checkNetwork());
    }
  }, [web3, chainId, checkNetwork]);
  
  // Format account address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Handle wallet connection
  const handleConnectWallet = async () => {
    if (!web3) {
      await connectWallet();
    }
  };
  
  // Handle network switch
  const handleSwitchNetwork = async () => {
    await switchToBSC();
  };
  
  return (
    <div className="wallet-connect-container">
      <div className="wallet-connect-card">
        <h2>Wallet Connection</h2>
        
        {web3Error && (
          <div className="error-message">
            <p>{web3Error}</p>
          </div>
        )}
        
        {contractError && (
          <div className="error-message">
            <p>{contractError}</p>
          </div>
        )}
        
        {!web3 && (
          <div className="connect-section">
            <p>Connect your wallet to interact with JadongPay ecosystem</p>
            <button 
              className="connect-button"
              onClick={handleConnectWallet}
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          </div>
        )}
        
        {web3 && hasWrongNetwork && (
          <div className="network-error">
            <p>Please switch to Binance Smart Chain to use this application</p>
            <button 
              className="network-switch-button"
              onClick={handleSwitchNetwork}
            >
              Switch to BSC
            </button>
          </div>
        )}
        
        {web3 && !hasWrongNetwork && account && (
          <div className="wallet-info">
            <div className="address-container">
              <p>Connected: <span className="address">{formatAddress(account)}</span></p>
              <p className="network-name">
                Network: {chainId === 56 ? 'BSC Mainnet' : chainId === 97 ? 'BSC Testnet' : 'Unknown'}
              </p>
            </div>
            <button 
              className="disconnect-button"
              onClick={disconnectWallet}
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletConnect;