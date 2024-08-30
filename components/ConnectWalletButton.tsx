"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { truncatePublicKey } from "../utils/truncatePublicKey";
import { RiUserLine } from "@remixicon/react";

export function ConnectWalletButton() {
  const { select, wallets, publicKey, disconnect } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const phantomWallet = wallets.find(
    (wallet) => wallet.adapter.name === "Phantom"
  );

  const handleConnect = () => {
    if (publicKey) {
      disconnect();
    } else if (phantomWallet) {
      select(phantomWallet.adapter.name);
    } else {
      alert("Phantom wallet not found. Please install it.");
    }
  };

  return (
    <button onClick={handleConnect} className="bg-yellow-500 text-neutral-900 px-5 py-2 rounded">
      {publicKey ? (
        <DisplayID id={truncatePublicKey(publicKey.toString())} />
      ) : (
        "Connect Wallet"
      )}
    </button>
  );
}

interface DisplayIDProps {
  id: string;
}

const DisplayID: React.FC<DisplayIDProps> = ({ id }) => {
  return (
    <div className="flex gap-1 items-center">
      <div className="bg-neutral-900 p-2 rounded-full text-white">
        <RiUserLine size={15}/>
      </div>

      <span>{id}</span>
    </div>
  );
};
