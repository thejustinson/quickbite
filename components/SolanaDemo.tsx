'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useState } from 'react';
import { ConnectWalletButton } from './ConnectWalletButton';

export function SolanaDemo() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  const handleCheckBalance = async () => {
    if (!publicKey) return;

    const balance = await connection.getBalance(publicKey);
    setBalance(balance / LAMPORTS_PER_SOL);
  };

  const handleAirdrop = async () => {
    if (!publicKey) return;

    try {
      const airdropSignature = await connection.requestAirdrop(
        publicKey,
        LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(airdropSignature);
      await handleCheckBalance();
    } catch (error) {
      console.error('Error requesting airdrop:', error);
    }
  };

  return (
    <div>
      <ConnectWalletButton />
      {publicKey && (
        <div>
          <p>Public Key: {publicKey.toBase58()}</p>
          <button onClick={handleCheckBalance}>Check Balance</button>
          {balance !== null && <p>Balance: {balance} SOL</p>}
          <button onClick={handleAirdrop}>Request Airdrop (1 SOL)</button>
        </div>
      )}
    </div>
  );
}