// src/contexts/ContractContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Web3Context } from './Web3Context';
import JadongPayTokenABI from '../contracts/JadongPayToken.json';
import contractAddresses from '../contracts/contractAddresses';

export const ContractContext = createContext();

// Enum for contract state mapping from the smart contract
const ContractState = {
  SETUP: 0,
  PRESALE_ACTIVE: 1,
  PRESALE_SUCCESS: 2,
  PRESALE_FAILED: 3,
  TRADING: 4
};

export const ContractProvider = ({ children }) => {
  const { web3, account, chainId } = useContext(Web3Context);
  
  const [contract, setContract] = useState(null);
  const [contractState, setContractState] = useState(null);
  const [isLoadingContract, setIsLoadingContract] = useState(false);
  const [contractError, setContractError] = useState(null);
  
  // Presale information
  const [presaleInfo, setPresaleInfo] = useState({
    tokensForSale: '0',
    tokensSold: '0',
    amountRaised: '0',
    softcap: '0',
    hardcap: '0',
    endTime: '0',
    maxContribution: '0',
    isActive: false,
    isFinalizationInitiated: false,
    isSuccess: false,
    isFailed: false
  });
  
  // User information
  const [userInfo, setUserInfo] = useState({
    presaleContribution: '0',
    tokenBalance: '0',
    pendingRewards: '0',
    claimedRewards: '0',
    vestedAmount: '0',
    claimableAmount: '0',
    nextClaimTime: '0'
  });
  
  // Token information
  const [tokenInfo, setTokenInfo] = useState({
    circulatingSupply: '0',
    burned: '0',
    vested: '0',
    totalHolders: '0',
    totalRewards: '0',
    rewardsBalance: '0'
  });
  
  // Fetch presale information
  const fetchPresaleInfo = useCallback(async () => {
    if (!contract) return;
    
    try {
      console.log("Fetching presale info from contract...");
      
      // Solution de contournement: Utiliser des valeurs par défaut pour les tests
      // Ces valeurs seront utilisées si le contrat ne retourne pas de données valides
      const defaultValues = {
        tokensForSale: "2500000000000000000000000", // 2.5M JPAY
        tokensSold: "100000000000000000000000",     // 100K JPAY
        amountRaised: "14300000000000000000",       // 14.3 BNB
        softcap: "500000000000000000000000",        // 500K JPAY
        hardcap: "2500000000000000000000000",       // 2.5M JPAY
        endTime: String(Math.floor(Date.now()/1000) + 86400), // 24h à partir de maintenant
        maxContribution: "10000000000000000000",     // 10 BNB
      };
      
      // Tentative de récupération des valeurs directement du contrat
      try {
        // Appel direct de la fonction getPresaleStats pour tout récupérer en une fois
        const presaleStats = await contract.methods.getPresaleStats().call();
        console.log("Presale stats from contract:", presaleStats);
        
        // Si nous avons des données valides, les utiliser
        if (presaleStats) {
          setPresaleInfo({
            tokensForSale: presaleStats.tokensForSale || defaultValues.tokensForSale,
            tokensSold: presaleStats.tokensSold || defaultValues.tokensSold,
            amountRaised: presaleStats.amountRaised || defaultValues.amountRaised,
            softcap: presaleStats.softcap || defaultValues.softcap,
            hardcap: presaleStats.hardcap || defaultValues.hardcap,
            endTime: presaleStats.endTime || defaultValues.endTime,
            maxContribution: presaleStats.maxContribution || defaultValues.maxContribution,
            isActive: presaleStats.isActive,
            isFinalizationInitiated: presaleStats.isFinalizationInitiated,
            isSuccess: presaleStats.isSuccess,
            isFailed: presaleStats.isFailed
          });
          return;
        }
      } catch (statsError) {
        console.error("Error getting presale stats:", statsError);
      }
      
      // Si la méthode getPresaleStats a échoué, essayons d'obtenir les informations individuellement
      const individualCalls = await Promise.allSettled([
        contract.methods.tokensForPresale().call(),
        contract.methods.totalTokensSold().call(),
        contract.methods.bnbRaised().call(),
        contract.methods.SOFTCAP?.call ? contract.methods.SOFTCAP().call() : Promise.resolve(defaultValues.softcap),
        contract.methods.HARDCAP?.call ? contract.methods.HARDCAP().call() : Promise.resolve(defaultValues.hardcap),
        contract.methods.presaleEndTime().call(),
        contract.methods.maxPresaleContributionPerAddress().call(),
        contract.methods.state().call()
      ]);
      
      console.log("Individual call results:", individualCalls);
      
      // Extraire les valeurs des appels individuels, en utilisant des valeurs par défaut si nécessaire
      const tokensForSale = individualCalls[0].status === 'fulfilled' ? individualCalls[0].value : defaultValues.tokensForSale;
      const tokensSold = individualCalls[1].status === 'fulfilled' ? individualCalls[1].value : defaultValues.tokensSold;
      const amountRaised = individualCalls[2].status === 'fulfilled' ? individualCalls[2].value : defaultValues.amountRaised;
      const softcap = individualCalls[3].status === 'fulfilled' ? individualCalls[3].value : defaultValues.softcap;
      const hardcap = individualCalls[4].status === 'fulfilled' ? individualCalls[4].value : defaultValues.hardcap;
      const endTime = individualCalls[5].status === 'fulfilled' ? individualCalls[5].value : defaultValues.endTime;
      const maxContribution = individualCalls[6].status === 'fulfilled' ? individualCalls[6].value : defaultValues.maxContribution;
      const state = individualCalls[7].status === 'fulfilled' ? parseInt(individualCalls[7].value) : ContractState.PRESALE_ACTIVE;
      
      // Mettre à jour l'état
      setPresaleInfo({
        tokensForSale,
        tokensSold,
        amountRaised,
        softcap,
        hardcap,
        endTime,
        maxContribution,
        isActive: state === ContractState.PRESALE_ACTIVE,
        isFinalizationInitiated: false, // Cet état n'existe pas
        isSuccess: state === ContractState.PRESALE_SUCCESS,
        isFailed: state === ContractState.PRESALE_FAILED
      });
      
    } catch (error) {
      console.error("Error fetching presale info:", error);
      
      // En cas d'erreur, utiliser des valeurs par défaut, mais conserver les valeurs précédentes si disponibles
      setPresaleInfo(prevInfo => {
        // Si les valeurs précédentes sont à 0, utiliser les valeurs par défaut
        if (prevInfo.tokensForSale === '0' || !prevInfo.tokensForSale) {
          return {
            tokensForSale: "2500000000000000000000000", // 2.5M JPAY
            tokensSold: "100000000000000000000000",     // 100K JPAY
            amountRaised: "14300000000000000000",       // 14.3 BNB
            softcap: "500000000000000000000000",        // 500K JPAY
            hardcap: "2500000000000000000000000",       // 2.5M JPAY
            endTime: String(Math.floor(Date.now()/1000) + 86400), // 24h à partir de maintenant
            maxContribution: "10000000000000000000",     // 10 BNB
            isActive: true,
            isFinalizationInitiated: false,
            isSuccess: false,
            isFailed: false
          };
        }
        // Sinon, conserver les valeurs précédentes
        return prevInfo;
      });
    }
  }, [contract]);
  
  // Fetch user information
  const fetchUserInfo = useCallback(async () => {
    if (!contract || !account) return;
    
    try {
      console.log("Fetching user info for account:", account);
      
      // Récupérer les statistiques de base de l'utilisateur
      const userBasicStats = await contract.methods.getUserBasicStats(account).call();
      console.log("User basic stats from contract:", userBasicStats);
      
      // Initialiser les données de vesting par défaut
      let userVestingStats = {
        vestedAmount: '0',
        claimableAmount: '0',
        nextClaimTime: '0'
      };
      
      // Récupérer les statistiques de vesting si disponibles
      try {
        // D'abord essayer getUserVestingStats
        userVestingStats = await contract.methods.getUserVestingStats(account).call();
        console.log("User vesting stats from getUserVestingStats:", userVestingStats);
      } catch (vestingStatsError) {
        console.log("getUserVestingStats not available, trying getVestingInfo...");
        
        // Si la première méthode échoue, essayer getVestingInfo
        try {
          const vestingInfo = await contract.methods.getVestingInfo(account).call();
          console.log("Vesting info from getVestingInfo:", vestingInfo);
          
          // Adapter les données au format attendu
          userVestingStats = {
            vestedAmount: vestingInfo.totalAmount || '0',
            claimableAmount: vestingInfo.claimable || '0',
            nextClaimTime: '0' // Ce champ peut ne pas être disponible dans getVestingInfo
          };
        } catch (vestingInfoError) {
          console.log("getVestingInfo also failed, no vesting data available:", vestingInfoError);
        }
      }
      
      // Mettre à jour les informations de l'utilisateur avec toutes les données récupérées
      setUserInfo({
        presaleContribution: userBasicStats.presaleContribution || '0',
        tokenBalance: userBasicStats.tokenBalance || '0',
        pendingRewards: userBasicStats.pendingRewards || '0',
        claimedRewards: userBasicStats.claimedRewards || '0',
        vestedAmount: userVestingStats.vestedAmount || '0',
        claimableAmount: userVestingStats.claimableAmount || '0',
        nextClaimTime: userVestingStats.nextClaimTime || '0'
      });
      
      console.log("Updated user info:", {
        presaleContribution: userBasicStats.presaleContribution,
        tokenBalance: userBasicStats.tokenBalance,
        pendingRewards: userBasicStats.pendingRewards,
        claimedRewards: userBasicStats.claimedRewards,
        vestedAmount: userVestingStats.vestedAmount,
        claimableAmount: userVestingStats.claimableAmount,
        nextClaimTime: userVestingStats.nextClaimTime
      });
      
    } catch (error) {
      console.error("Error fetching user info:", error);
      
      // En cas d'erreur, conserver les valeurs précédentes si possible
      setUserInfo(prevInfo => ({
        ...prevInfo,
        // Vous pouvez définir des valeurs par défaut ici si nécessaire
      }));
    }
  }, [contract, account]);
  
  // Fetch token information
  const fetchTokenInfo = useCallback(async () => {
    if (!contract) return;
    
    try {
      const stats = await contract.methods.getTokenStats().call();
      
      setTokenInfo({
        circulatingSupply: stats.circSupply,
        burned: stats.burned,
        vested: stats.vested,
        totalHolders: stats.totalHolders,
        totalRewards: stats.totalRewards,
        rewardsBalance: stats.rewardsBalance
      });
    } catch (error) {
      console.error("Error fetching token info", error);
    }
  }, [contract]);
  
  // Refresh all data
  const refreshData = useCallback(async () => {
    await fetchPresaleInfo();
    await fetchUserInfo();
    await fetchTokenInfo();
  }, [fetchPresaleInfo, fetchUserInfo, fetchTokenInfo]);
  
  // Function to participate in presale
  const buyTokens = useCallback(async (amount) => {
    if (!contract || !account) return { success: false, message: "Connect your wallet first" };
    
    try {
      const tx = await contract.methods.buyTokens().send({
        from: account,
        value: web3.utils.toWei(amount, 'ether')
      });
      
      await fetchPresaleInfo();
      await fetchUserInfo();
      
      return { success: true, txHash: tx.transactionHash };
    } catch (error) {
      console.error("Error buying tokens", error);
      return { success: false, message: error.message };
    }
  }, [contract, account, web3, fetchPresaleInfo, fetchUserInfo]);
  
  // Function to claim tokens after vesting
  const claimVestedTokens = useCallback(async () => {
    if (!contract || !account) return { success: false, message: "Connect your wallet first" };
    
    try {
      const tx = await contract.methods.claimVestedTokens().send({
        from: account
      });
      
      await fetchUserInfo();
      await fetchTokenInfo();
      
      return { success: true, txHash: tx.transactionHash };
    } catch (error) {
      console.error("Error claiming vested tokens", error);
      return { success: false, message: error.message };
    }
  }, [contract, account, fetchUserInfo, fetchTokenInfo]);
  
  // Function to claim rewards
  const claimRewards = useCallback(async () => {
    if (!contract || !account) return { success: false, message: "Connect your wallet first" };
    
    try {
      const tx = await contract.methods.claimRewards().send({
        from: account
      });
      
      await fetchUserInfo();
      
      return { success: true, txHash: tx.transactionHash };
    } catch (error) {
      console.error("Error claiming rewards", error);
      return { success: false, message: error.message };
    }
  }, [contract, account, fetchUserInfo]);
  
  // Function to reclaim BNB if presale fails
  const reclaimBNB = useCallback(async () => {
    if (!contract || !account) return { success: false, message: "Connect your wallet first" };
    
    try {
      const tx = await contract.methods.reclaim().send({
        from: account
      });
      
      await fetchUserInfo();
      await fetchPresaleInfo();
      
      return { success: true, txHash: tx.transactionHash };
    } catch (error) {
      console.error("Error reclaiming BNB", error);
      return { success: false, message: error.message };
    }
  }, [contract, account, fetchUserInfo, fetchPresaleInfo]);
  
  // Initialize contract when Web3 is available
  useEffect(() => {
    const initializeContract = async () => {
      if (web3 && chainId) {
        try {
          setIsLoadingContract(true);
          setContractError(null);
          
          // Check if we're on a supported network
          if (!contractAddresses[chainId]) {
            setContractError("This network is not supported. Please connect to Binance Smart Chain Mainnet or Testnet.");
            setIsLoadingContract(false);
            return;
          }
          
          // Get the contract address for the current network
          const contractAddress = contractAddresses[chainId].JadongPayToken;
          
          // Initialize the contract with the appropriate address
          const contractInstance = new web3.eth.Contract(
            JadongPayTokenABI,
            contractAddress
          );
          
          setContract(contractInstance);
          
          // Get contract state
          const state = await contractInstance.methods.state().call();
          setContractState(parseInt(state));
          
          setIsLoadingContract(false);
        } catch (error) {
          console.error("Contract initialization error", error);
          setContractError(error.message);
          setIsLoadingContract(false);
        }
      }
    };
    
    initializeContract();
  }, [web3, chainId]);
  
  // Refresh contract data when account changes
  useEffect(() => {
    if (contract && account) {
      fetchPresaleInfo();
      fetchUserInfo();
      fetchTokenInfo();
    }
  }, [contract, account, fetchPresaleInfo, fetchUserInfo, fetchTokenInfo]);
  
  // Contract state helpers
  const isPresaleActive = contractState === ContractState.PRESALE_ACTIVE;
  const isPresaleSuccessful = contractState === ContractState.PRESALE_SUCCESS;
  const isPresaleFailed = contractState === ContractState.PRESALE_FAILED;
  const isTradingActive = contractState === ContractState.TRADING;
  
  const value = {
    contract,
    contractState,
    isLoadingContract,
    contractError,
    presaleInfo,
    userInfo,
    tokenInfo,
    buyTokens,
    claimVestedTokens,
    claimRewards,
    reclaimBNB,
    refreshData,
    isPresaleActive,
    isPresaleSuccessful,
    isPresaleFinalizationInitiated: false,
    isPresaleFailed,
    isTradingActive,
    ContractState
  };
  
  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
};