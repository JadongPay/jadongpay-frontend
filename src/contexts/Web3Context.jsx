// src/contexts/Web3Context.jsx
import React, { createContext, useEffect, useState, useCallback } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

export const Web3Context = createContext();

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        56: 'https://bsc-dataseed.binance.org/',
        97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
      },
      network: 'binance',
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "JadongPay",
      rpc: {
        56: 'https://bsc-dataseed.binance.org/',
        97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
      },
      chainId: 56,
    },
  },
};

const web3Modal = new Web3Modal({
  network: "binance",
  cacheProvider: true,
  providerOptions,
  theme: {
    background: "#ffffff",
    main: "#FFD700",
    secondary: "#F5F5F5",
    border: "#EAEAEA",
    hover: "#F2F2F2",
  },
});

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const resetWeb3State = () => {
    setWeb3(null);
    setAccount(null);
    setChainId(null);
    setNetworkId(null);
    setProvider(null);
    setError(null);
  };

  const connectWallet = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError(null);
      
      const provider = await web3Modal.connect();
      setProvider(provider);
      
      const web3Instance = new Web3(provider);
      setWeb3(web3Instance);
      
      const accounts = await web3Instance.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
      
      const chainId = await web3Instance.eth.getChainId();
      setChainId(chainId);
      
      const networkId = await web3Instance.eth.net.getId();
      setNetworkId(networkId);
      
      // Subscribe to provider events
      provider.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
      });
      
      provider.on("chainChanged", (chainId) => {
        setChainId(parseInt(chainId, 16));
        window.location.reload();
      });
      
      provider.on("disconnect", (error) => {
        disconnectWallet();
      });
      
      return true;
    } catch (error) {
      console.error("Connect wallet error", error);
      setError(error.message);
      return false;
    } finally {
      setIsConnecting(false);
    }
  }, []);
  
  const disconnectWallet = useCallback(async () => {
    try {
      if (provider?.disconnect) {
        await provider.disconnect();
      }
      
      await web3Modal.clearCachedProvider();
      resetWeb3State();
    } catch (error) {
      console.error("Disconnect error", error);
      setError(error.message);
    }
  }, [provider]);
  
  // Auto connect if provider is cached
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [connectWallet]);
  
  const checkNetwork = useCallback(() => {
    return chainId === 56 || chainId === 97; // BSC Mainnet or Testnet
  }, [chainId]);
  
  const switchToBSC = useCallback(async () => {
    if (!provider) return;
    
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }], // BSC Mainnet
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x38',
                chainName: 'Binance Smart Chain',
                nativeCurrency: {
                  name: 'BNB',
                  symbol: 'BNB',
                  decimals: 18,
                },
                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                blockExplorerUrls: ['https://bscscan.com/'],
              },
            ],
          });
        } catch (addError) {
          console.error("Add network error", addError);
          setError(addError.message);
        }
      }
    }
  }, [provider]);
  
  const value = {
    web3,
    account,
    chainId,
    networkId,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    checkNetwork,
    switchToBSC,
  };
  
  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};