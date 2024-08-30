"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { truncatePublicKey } from "../utils/truncatePublicKey";
import { RiUserLine } from "@remixicon/react";
import { AnimatePresence, motion } from "framer-motion";

export function ConnectWalletButton() {
  const { select, wallets, publicKey, disconnect } = useWallet();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const phantomWallet = wallets.find(
    (wallet) => wallet.adapter.name === "Phantom"
  );

  const handleConnect = () => {
    if (!publicKey && phantomWallet) {
      select(phantomWallet.adapter.name);
    } 
    
    if(!phantomWallet) {
      alert("Phantom wallet not found. Please install it.");
    }
  };

  return (
    <button
      onClick={handleConnect}
      className="bg-yellow-500 text-neutral-900 px-5 py-2 rounded relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {publicKey ? (
        <DisplayID id={truncatePublicKey(publicKey.toString())} isHovered={isHovered} disconnect={disconnect}/>
      ) : (
        "Connect Wallet"
      )}
    </button>
  );
}

interface DisplayIDProps {
  id: string;
  isHovered: boolean;
  disconnect: () => void
}

const DisplayID: React.FC<DisplayIDProps> = ({ id, isHovered, disconnect }) => {
  return (
    <div className="flex gap-1 items-center">
      <div className="bg-neutral-900 p-2 rounded-full text-white">
        <RiUserLine size={12} />
      </div>
      <span>{id}</span>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute p-2 text-yellow-500 bg-neutral-900 w-full left-0 rounded"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 5 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            style={{ top: "calc(100%)" }}
            onClick={()=>{disconnect()}}
          >
            Disconnect
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
