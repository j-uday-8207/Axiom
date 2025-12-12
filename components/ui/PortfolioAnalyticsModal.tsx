'use client';

import React, { useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAppSelector } from '@/store';
import { X, TrendingUp, TrendingDown, DollarSign, Target, Award, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PortfolioAnalyticsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PortfolioAnalyticsModal: React.FC<PortfolioAnalyticsModalProps> = ({ open, onOpenChange }) => {
  const positions = useAppSelector((state) => state.portfolio.positions);
  const transactions = useAppSelector((state) => state.transactions.transactions);
  const realizedPnL = useAppSelector((state) => state.portfolio.realizedPnL);

  const analytics = useMemo(() => {
    const positionArray = Object.values(positions);
    
    if (positionArray.length === 0) {
      return {
        totalValue: 0,
        totalInvested: 0,
        unrealizedPnL: 0,
        unrealizedPnLPercent: 0,
        bestPerformer: null as null | { tokenTicker: string; tokenName: string; imageUrl?: string; pnl: number; pnlPercent: number },
        worstPerformer: null as null | { tokenTicker: string; tokenName: string; imageUrl?: string; pnl: number; pnlPercent: number },
        winRate: 0,
        totalTrades: 0,
        avgHoldTime: 0,
      };
    }

    // Calculate total portfolio value and P&L
    let totalValue = 0;
    let totalInvested = 0;
    let bestPnL = -Infinity;
    let worstPnL = Infinity;
    let bestToken: { tokenTicker: string; tokenName: string; imageUrl?: string; pnl: number; pnlPercent: number } | null = null;
    let worstToken: { tokenTicker: string; tokenName: string; imageUrl?: string; pnl: number; pnlPercent: number } | null = null;

    positionArray.forEach((position) => {
      const currentValue = position.quantity * position.currentPrice;
      const pnl = currentValue - position.totalInvested;
      const pnlPercent = (pnl / position.totalInvested) * 100;

      totalValue += currentValue;
      totalInvested += position.totalInvested;

      if (pnlPercent > bestPnL) {
        bestPnL = pnlPercent;
        bestToken = { 
          tokenTicker: position.tokenTicker,
          tokenName: position.tokenName,
          imageUrl: position.imageUrl,
          pnl, 
          pnlPercent 
        };
      }

      if (pnlPercent < worstPnL) {
        worstPnL = pnlPercent;
        worstToken = { 
          tokenTicker: position.tokenTicker,
          tokenName: position.tokenName,
          imageUrl: position.imageUrl,
          pnl, 
          pnlPercent 
        };
      }
    });

    const unrealizedPnL = totalValue - totalInvested;
    const unrealizedPnLPercent = totalInvested > 0 ? (unrealizedPnL / totalInvested) * 100 : 0;

    // Calculate trade statistics
    const buyTrades = transactions.filter(t => t.type === 'buy').length;
    const sellTrades = transactions.filter(t => t.type === 'sell').length;
    const profitableSells = transactions.filter(t => {
      if (t.type !== 'sell') return false;
      // Find corresponding buy trades for this token
      const buys = transactions.filter(b => 
        b.type === 'buy' && 
        b.tokenId === t.tokenId && 
        b.timestamp < t.timestamp
      );
      if (buys.length === 0) return false;
      const avgBuyPrice = buys.reduce((sum, b) => sum + b.pricePerToken, 0) / buys.length;
      return t.pricePerToken > avgBuyPrice;
    }).length;

    const winRate = sellTrades > 0 ? (profitableSells / sellTrades) * 100 : 0;

    return {
      totalValue,
      totalInvested,
      unrealizedPnL,
      unrealizedPnLPercent,
      bestPerformer: bestToken,
      worstPerformer: worstToken,
      winRate,
      totalTrades: buyTrades + sellTrades,
      avgHoldTime: 0, // Would need timestamp tracking for actual calculation
    };
  }, [positions, transactions]);

  const totalPnL = analytics.unrealizedPnL + realizedPnL;
  const totalPnLPercent = analytics.totalInvested > 0 
    ? ((analytics.totalValue - analytics.totalInvested + realizedPnL) / analytics.totalInvested) * 100 
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden bg-slate-900 text-white border-slate-700 p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Target className="w-6 h-6 text-purple-500" />
                Portfolio Analytics
              </DialogTitle>
              <p className="text-sm text-gray-400 mt-1">Performance insights and statistics</p>
            </div>
            <button onClick={() => onOpenChange(false)} className="p-1 hover:bg-slate-800 rounded transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Portfolio Summary */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-700/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-blue-400" />
                <div className="text-sm text-gray-400">Total Portfolio Value</div>
              </div>
              <div className="text-3xl font-bold text-white">
                {analytics.totalValue.toFixed(4)} SOL
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Invested: {analytics.totalInvested.toFixed(4)} SOL
              </div>
            </div>

            <div className={cn(
              "p-4 border rounded-lg",
              totalPnL >= 0 
                ? "bg-gradient-to-br from-green-900/30 to-green-800/20 border-green-700/50" 
                : "bg-gradient-to-br from-red-900/30 to-red-800/20 border-red-700/50"
            )}>
              <div className="flex items-center gap-2 mb-2">
                {totalPnL >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-green-400" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-400" />
                )}
                <div className="text-sm text-gray-400">Total P&L</div>
              </div>
              <div className={cn(
                "text-3xl font-bold",
                totalPnL >= 0 ? "text-green-400" : "text-red-400"
              )}>
                {totalPnL >= 0 ? '+' : ''}{totalPnL.toFixed(4)} SOL
              </div>
              <div className={cn(
                "text-xs mt-1 font-semibold",
                totalPnLPercent >= 0 ? "text-green-400" : "text-red-400"
              )}>
                {totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%
              </div>
            </div>
          </div>

          {/* P&L Breakdown */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Unrealized P&L</div>
              <div className={cn(
                "text-xl font-bold",
                analytics.unrealizedPnL >= 0 ? "text-green-400" : "text-red-400"
              )}>
                {analytics.unrealizedPnL >= 0 ? '+' : ''}{analytics.unrealizedPnL.toFixed(4)} SOL
              </div>
              <div className={cn(
                "text-xs font-semibold",
                analytics.unrealizedPnLPercent >= 0 ? "text-green-400" : "text-red-400"
              )}>
                {analytics.unrealizedPnLPercent >= 0 ? '+' : ''}{analytics.unrealizedPnLPercent.toFixed(2)}%
              </div>
            </div>

            <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Realized P&L</div>
              <div className={cn(
                "text-xl font-bold",
                realizedPnL >= 0 ? "text-green-400" : "text-red-400"
              )}>
                {realizedPnL >= 0 ? '+' : ''}{realizedPnL.toFixed(4)} SOL
              </div>
              <div className="text-xs text-gray-400">From closed positions</div>
            </div>
          </div>

          {/* Trading Statistics */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Trading Statistics
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg text-center">
                <div className="text-2xl font-bold text-white">{analytics.totalTrades}</div>
                <div className="text-xs text-gray-400 mt-1">Total Trades</div>
              </div>
              <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg text-center">
                <div className={cn(
                  "text-2xl font-bold",
                  analytics.winRate >= 50 ? "text-green-400" : "text-red-400"
                )}>
                  {analytics.winRate.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-400 mt-1">Win Rate</div>
              </div>
              <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg text-center">
                <div className="text-2xl font-bold text-white">{Object.keys(positions).length}</div>
                <div className="text-xs text-gray-400 mt-1">Active Positions</div>
              </div>
            </div>
          </div>

          {/* Best & Worst Performers */}
          {analytics.bestPerformer && analytics.worstPerformer && (
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-900/20 border border-green-700/50 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <h3 className="font-bold text-green-400">Best Performer</h3>
                </div>
                <div className="flex items-center gap-3">
                  {analytics.bestPerformer.imageUrl && (
                    <img 
                      src={analytics.bestPerformer.imageUrl} 
                      alt={analytics.bestPerformer.tokenTicker}
                      className="w-10 h-10 rounded-full"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  )}
                  <div className="flex-1">
                    <div className="font-bold text-white">{analytics.bestPerformer.tokenTicker}</div>
                    <div className="text-sm text-gray-400">{analytics.bestPerformer.tokenName}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">
                      +{analytics.bestPerformer.pnlPercent.toFixed(2)}%
                    </div>
                    <div className="text-xs text-gray-400">
                      +{analytics.bestPerformer.pnl.toFixed(4)} SOL
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-900/20 border border-red-700/50 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  <h3 className="font-bold text-red-400">Worst Performer</h3>
                </div>
                <div className="flex items-center gap-3">
                  {analytics.worstPerformer.imageUrl && (
                    <img 
                      src={analytics.worstPerformer.imageUrl} 
                      alt={analytics.worstPerformer.tokenTicker}
                      className="w-10 h-10 rounded-full"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  )}
                  <div className="flex-1">
                    <div className="font-bold text-white">{analytics.worstPerformer.tokenTicker}</div>
                    <div className="text-sm text-gray-400">{analytics.worstPerformer.tokenName}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-400">
                      {analytics.worstPerformer.pnlPercent.toFixed(2)}%
                    </div>
                    <div className="text-xs text-gray-400">
                      {analytics.worstPerformer.pnl.toFixed(4)} SOL
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {Object.keys(positions).length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <AlertTriangle className="w-12 h-12 mb-4" />
              <p className="text-lg font-medium">No Active Positions</p>
              <p className="text-sm mt-2">Start trading to see your analytics</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
