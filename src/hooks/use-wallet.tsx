
import { useState, useEffect } from 'react';
import { MetaMaskSDK } from '@metamask/sdk';
import { ethers } from 'ethers';
import { toast } from "@/hooks/use-toast";

interface WalletState {
  isConnected: boolean;
  account: string | null;
  chainId: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
}

const METAMASK_SDK = new MetaMaskSDK({
  dappMetadata: {
    name: "Halo DEX",
    url: window.location.href,
  }
});

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    account: null,
    chainId: null,
    provider: null,
    signer: null,
  });

  const connectWallet = async () => {
    try {
      const ethereum = METAMASK_SDK.getProvider();
      
      if (!ethereum) {
        toast({
          title: "MetaMask not found",
          description: "Please install MetaMask extension",
          variant: "destructive",
        });
        return;
      }

      // Fix type issues with eth_requestAccounts response
      const accountsResult = await ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = accountsResult as string[];
      
      if (!accounts || accounts.length === 0) return;
      
      const chainIdResult = await ethereum.request({ method: 'eth_chainId' });
      const chainId = chainIdResult as string;
      
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      setWallet({
        isConnected: true,
        account: accounts[0],
        chainId: chainId,
        provider,
        signer,
      });

      toast({
        title: "Wallet connected",
        description: `Connected to ${formatAddress(accounts[0])}`,
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection failed",
        description: "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      account: null,
      chainId: null,
      provider: null,
      signer: null,
    });
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  const formatAddress = (address: string): string => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const ethereum = METAMASK_SDK.getProvider();
        if (ethereum) {
          // Fix type issues with eth_accounts response
          const accountsResult = await ethereum.request({ method: 'eth_accounts' });
          const accounts = accountsResult as string[];
          
          if (accounts && accounts.length > 0) {
            connectWallet();
          }
        }
      } catch (error) {
        console.error("Error checking connection:", error);
      }
    };
    
    checkConnection();
  }, []);

  return {
    ...wallet,
    connectWallet,
    disconnectWallet,
    formatAddress,
  };
}
