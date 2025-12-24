// MetaMask Integration Component
import React, { useState, useEffect } from 'react';

interface WindowWithEthereum extends Window {
  ethereum?: {
    isMetaMask?: boolean;
    request: (args: { method: string }) => Promise<string[]>;
  };
}

declare const window: WindowWithEthereum;

const MetaMaskButton: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState<boolean>(false);

  useEffect(() => {
    const checkMetaMask = (): void => {
      try {
        if (
          typeof window !== 'undefined' &&
          typeof window.ethereum !== 'undefined' &&
          window.ethereum.isMetaMask
        ) {
          setIsMetaMaskAvailable(true);
          checkConnection();
        }
      } catch (error) {
        setIsMetaMaskAvailable(false);
      }
    };

    checkMetaMask();

    if (typeof window !== 'undefined') {
      window.addEventListener('ethereum#initialized', checkMetaMask, { once: true });
      return () => {
        window.removeEventListener('ethereum#initialized', checkMetaMask);
      };
    }
  }, []);

  const checkConnection = async (): Promise<void> => {
    try {
      if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts && accounts.length > 0) {
          setIsConnected(true);
          setAccount(accounts[0]);
        }
      }
    } catch (error) {
      setIsConnected(false);
      setAccount(null);
    }
  };

  const connectWallet = async (): Promise<void> => {
    try {
      if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        if (accounts && accounts.length > 0) {
          setIsConnected(true);
          setAccount(accounts[0]);
        }
      } else {
        const url = 'https://metamask.io/download/';
        if (window.confirm('MetaMask is not installed. Would you like to install it?')) {
          window.open(url, '_blank');
        }
      }
    } catch (error) {
      const err = error as { code?: number };
      if (err.code !== 4001) {
        console.error('Error connecting to MetaMask:', error);
      }
    }
  };

  const formatAddress = (addr: string | null): string => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const isDisabled =
    !isMetaMaskAvailable &&
    typeof window !== 'undefined' &&
    typeof window.ethereum === 'undefined';

  return (
    <button
      onClick={connectWallet}
      disabled={isDisabled}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${isConnected
          ? 'bg-green-100 text-green-800 border border-green-300'
          : isMetaMaskAvailable ||
            (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
            ? 'bg-pulse-primary text-white hover:bg-pulse-secondary'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      title={isDisabled ? 'MetaMask not installed' : ''}
    >
      {isConnected ? <span>🦊 {formatAddress(account)}</span> : <span>Connect MetaMask</span>}
    </button>
  );
};

export default MetaMaskButton;
