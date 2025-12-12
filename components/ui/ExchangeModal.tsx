'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppSelector, useAppDispatch } from '@/store';
import { addFunds } from '@/store/slices/walletSlice';
import { cn } from '@/lib/utils';
import { Copy, Check, ExternalLink, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';

interface ExchangeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type TabType = 'convert' | 'deposit' | 'buy';

export const ExchangeModal: React.FC<ExchangeModalProps> = ({ open, onOpenChange }) => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<TabType>('deposit');
  const [copied, setCopied] = useState(false);
  const [buyAmount, setBuyAmount] = useState('');
  
  const { solBalance, depositAddress } = useAppSelector((state) => state.wallet);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(depositAddress);
      setCopied(true);
      toast({
        title: "Address Copied",
        description: "Deposit address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to Copy",
        description: "Could not copy address to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleBuyTokens = () => {
    const amount = parseFloat(buyAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    dispatch(addFunds(amount));
    toast({
      title: "Tokens Added",
      description: `Added ${amount} SOL to your balance`,
    });
    setBuyAmount('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[#1a1a1a] text-white border-slate-700 p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Exchange</DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 hover:bg-slate-800 rounded transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4">
          <button
            onClick={() => setActiveTab('convert')}
            className={cn(
              'px-6 py-2 rounded-lg text-sm font-medium transition-all',
              activeTab === 'convert'
                ? 'bg-slate-700 text-white'
                : 'text-gray-400 hover:text-white'
            )}
          >
            Convert
          </button>
          <button
            onClick={() => setActiveTab('deposit')}
            className={cn(
              'px-6 py-2 rounded-lg text-sm font-medium transition-all',
              activeTab === 'deposit'
                ? 'bg-slate-700 text-white'
                : 'text-gray-400 hover:text-white'
            )}
          >
            Deposit
          </button>
          <button
            onClick={() => setActiveTab('buy')}
            className={cn(
              'px-6 py-2 rounded-lg text-sm font-medium transition-all',
              activeTab === 'buy'
                ? 'bg-slate-700 text-white'
                : 'text-gray-400 hover:text-white'
            )}
          >
            Buy
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Deposit Tab */}
          {activeTab === 'deposit' && (
            <div className="space-y-6">
              {/* Network Selection */}
              <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <span className="text-white font-medium">Solana</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Balance:</div>
                  <div className="text-white font-medium">{solBalance.toFixed(2)} SOL</div>
                </div>
              </div>

              {/* Warning Message */}
              <div className="text-sm text-gray-400 leading-relaxed">
                Only deposit Solana through the Solana network for this address.
              </div>

              {/* QR Code & Address */}
              <div className="flex gap-4 items-start">
                {/* QR Code Placeholder */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-white rounded-lg p-2 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Simple QR code pattern */}
                      <rect width="100" height="100" fill="white"/>
                      <rect x="10" y="10" width="20" height="20" fill="black"/>
                      <rect x="70" y="10" width="20" height="20" fill="black"/>
                      <rect x="10" y="70" width="20" height="20" fill="black"/>
                      <rect x="40" y="40" width="20" height="20" fill="black"/>
                      <rect x="15" y="15" width="10" height="10" fill="white"/>
                      <rect x="75" y="15" width="10" height="10" fill="white"/>
                      <rect x="15" y="75" width="10" height="10" fill="white"/>
                      
                      {/* Add icon in center */}
                      <circle cx="50" cy="50" r="8" fill="#6366f1"/>
                    </svg>
                  </div>
                </div>

                {/* Address Section */}
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-2">Deposit Address</div>
                  <div className="p-3 bg-slate-900 rounded-lg">
                    <p className="text-white text-sm break-all font-mono leading-relaxed">
                      {depositAddress}
                    </p>
                  </div>
                  <button
                    onClick={handleCopyAddress}
                    className="mt-2 p-2 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-sm">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Onramper Link */}
              <div className="text-sm text-gray-400">
                Don't have any Solana?{' '}
                <a
                  href="https://onramper.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                >
                  Buy through Onramper
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Copy Address Button */}
              <button
                onClick={handleCopyAddress}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white transition-colors"
              >
                Copy Address
              </button>
            </div>
          )}

          {/* Buy Tab */}
          {activeTab === 'buy' && (
            <div className="space-y-6">
              <div className="text-sm text-gray-400">
                Quick buy tokens to start trading. This is for demo purposes.
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Amount (SOL)</label>
                  <input
                    type="number"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-slate-900 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                    min="0"
                  />
                </div>

                {/* Quick amount buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {[1, 5, 10, 50].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setBuyAmount(amount.toString())}
                      className="py-2 px-3 bg-slate-800 hover:bg-slate-700 rounded text-sm text-white transition-colors"
                    >
                      {amount} SOL
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-slate-900 rounded-lg">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Current Balance:</span>
                    <span className="text-white font-medium">{solBalance.toFixed(2)} SOL</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">New Balance:</span>
                    <span className="text-green-400 font-medium">
                      {(solBalance + (parseFloat(buyAmount) || 0)).toFixed(2)} SOL
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleBuyTokens}
                  disabled={!buyAmount || parseFloat(buyAmount) <= 0}
                  className={cn(
                    "w-full py-3 rounded-lg font-medium transition-colors",
                    buyAmount && parseFloat(buyAmount) > 0
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-slate-800 text-gray-500 cursor-not-allowed"
                  )}
                >
                  Add Tokens
                </button>
              </div>
            </div>
          )}

          {/* Convert Tab */}
          {activeTab === 'convert' && (
            <div className="space-y-6">
              <div className="text-center text-gray-400 py-8">
                <p className="text-sm">Token conversion coming soon</p>
                <p className="text-xs mt-2">Convert between different tokens</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
