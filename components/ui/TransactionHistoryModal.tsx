'use client';

import React, { useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAppSelector } from '@/store';
import { X, TrendingUp, TrendingDown, Clock, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TransactionHistoryModal: React.FC<TransactionHistoryModalProps> = ({ open, onOpenChange }) => {
  const transactions = useAppSelector((state) => state.transactions.transactions);

  const stats = useMemo(() => {
    const totalBuys = transactions.filter(t => t.type === 'buy').length;
    const totalSells = transactions.filter(t => t.type === 'sell').length;
    const totalVolume = transactions.reduce((sum, t) => sum + t.totalValue, 0);
    
    return { totalBuys, totalSells, totalVolume };
  }, [transactions]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden bg-slate-900 text-white border-slate-700 p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-500" />
                Transaction History
              </DialogTitle>
              <p className="text-sm text-gray-400 mt-1">{transactions.length} total transactions</p>
            </div>
            <button onClick={() => onOpenChange(false)} className="p-1 hover:bg-slate-800 rounded transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </DialogHeader>

        {/* Stats */}
        <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-800">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-gray-400 mb-1">Total Buys</div>
              <div className="text-xl font-bold text-green-400">{stats.totalBuys}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Total Sells</div>
              <div className="text-xl font-bold text-red-400">{stats.totalSells}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Total Volume</div>
              <div className="text-xl font-bold text-white">{stats.totalVolume.toFixed(4)} SOL</div>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Package className="w-12 h-12 mb-4" />
              <p className="text-lg font-medium">No transactions yet</p>
              <p className="text-sm mt-2">Your trading history will appear here</p>
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={cn(
                      "p-2 rounded-lg",
                      tx.type === 'buy' ? "bg-green-900/20" : "bg-red-900/20"
                    )}>
                      {tx.type === 'buy' ? (
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-sm font-bold uppercase",
                          tx.type === 'buy' ? "text-green-400" : "text-red-400"
                        )}>
                          {tx.type}
                        </span>
                        <span className="text-white font-semibold">{tx.tokenTicker}</span>
                        <span className="text-gray-400 text-sm">{tx.tokenName}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{formatDate(tx.timestamp)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{tx.quantity} tokens</div>
                    <div className="text-sm text-gray-400">@ {tx.pricePerToken.toFixed(6)} SOL</div>
                    <div className="text-lg font-bold text-accent mt-1">{tx.totalValue.toFixed(4)} SOL</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
