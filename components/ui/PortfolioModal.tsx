'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppSelector, useAppDispatch } from '@/store';
import { sellToken, clearAllPositions } from '@/store/slices/portfolioSlice';
import { addFunds } from '@/store/slices/walletSlice';
import { cn } from '@/lib/utils';
import { X, TrendingUp, TrendingDown, DollarSign, Package, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PortfolioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ open, onOpenChange }) => {
  const dispatch = useAppDispatch();
  const positions = useAppSelector((state) => state.portfolio.positions);
  const totalInvested = useAppSelector((state) => state.portfolio.totalInvested);
  const realizedPnL = useAppSelector((state) => state.portfolio.realizedPnL);
  const solBalance = useAppSelector((state) => state.wallet.solBalance);

  const positionsArray = Object.values(positions);

  const totalCurrentValue = positionsArray.reduce(
    (sum, pos) => sum + pos.quantity * pos.currentPrice,
    0
  );

  const unrealizedPnL = totalCurrentValue - totalInvested;
  const totalPnL = unrealizedPnL + realizedPnL;
  const totalPnLPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

  const handleSellPosition = (tokenId: string, quantity: number, currentPrice: number, ticker: string) => {
    const saleValue = quantity * currentPrice;
    
    dispatch(addFunds(saleValue));
    dispatch(sellToken({ tokenId, quantity, pricePerToken: currentPrice }));

    toast({
      title: "Position Closed",
      description: `Sold ${quantity} ${ticker} for ${saleValue.toFixed(4)} SOL`,
      variant: "success",
    });
  };

  const handleClearAll = () => {
    if (positionsArray.length === 0) return;

    if (!confirm(`Are you sure you want to close all ${positionsArray.length} positions?`)) {
      return;
    }

    // Sell all positions at current price
    let totalSaleValue = 0;
    positionsArray.forEach((pos) => {
      const saleValue = pos.quantity * pos.currentPrice;
      totalSaleValue += saleValue;
      dispatch(sellToken({
        tokenId: pos.tokenId,
        quantity: pos.quantity,
        pricePerToken: pos.currentPrice,
      }));
    });

    dispatch(addFunds(totalSaleValue));

    toast({
      title: "All Positions Closed",
      description: `Sold all positions for ${totalSaleValue.toFixed(4)} SOL`,
      variant: "success",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden bg-slate-900 text-white border-slate-700 p-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Package className="w-6 h-6 text-purple-500" />
                Portfolio
              </DialogTitle>
              <p className="text-sm text-gray-400 mt-1">
                {positionsArray.length} active position{positionsArray.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 hover:bg-slate-800 rounded transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </DialogHeader>

        {/* Portfolio Summary */}
        <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-gray-400 mb-1">Wallet Balance</div>
              <div className="text-lg font-bold text-white">{solBalance.toFixed(4)} SOL</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Total Invested</div>
              <div className="text-lg font-bold text-white">{totalInvested.toFixed(4)} SOL</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Current Value</div>
              <div className="text-lg font-bold text-white">{totalCurrentValue.toFixed(4)} SOL</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Total P&L</div>
              <div className={cn(
                "text-lg font-bold flex items-center gap-1",
                totalPnL >= 0 ? "text-green-400" : "text-red-400"
              )}>
                {totalPnL >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {totalPnL >= 0 ? '+' : ''}{totalPnL.toFixed(4)} SOL
                <span className="text-sm">
                  ({totalPnL >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Positions List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {positionsArray.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <AlertCircle className="w-12 h-12 mb-4" />
              <p className="text-lg font-medium">No positions yet</p>
              <p className="text-sm mt-2">Buy some tokens to start trading</p>
            </div>
          ) : (
            <div className="space-y-3">
              {positionsArray.map((position) => {
                const currentValue = position.quantity * position.currentPrice;
                const pnl = currentValue - position.totalInvested;
                const pnlPercent = (pnl / position.totalInvested) * 100;

                return (
                  <div
                    key={position.tokenId}
                    className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Token Image */}
                      <div className="flex-shrink-0">
                        {position.imageUrl ? (
                          <img
                            src={position.imageUrl}
                            alt={position.tokenName}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            {position.tokenTicker.charAt(0)}
                          </div>
                        )}
                      </div>

                      {/* Token Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-white">{position.tokenTicker}</h3>
                            <p className="text-sm text-gray-400">{position.tokenName}</p>
                          </div>
                          <button
                            onClick={() => handleSellPosition(
                              position.tokenId,
                              position.quantity,
                              position.currentPrice,
                              position.tokenTicker
                            )}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium text-white transition-colors"
                          >
                            Sell All
                          </button>
                        </div>

                        {/* Position Details */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <div className="text-gray-400 mb-1">Quantity</div>
                            <div className="text-white font-semibold">{position.quantity}</div>
                          </div>
                          <div>
                            <div className="text-gray-400 mb-1">Avg Buy Price</div>
                            <div className="text-white font-semibold">
                              {position.averageBuyPrice.toFixed(6)} SOL
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-400 mb-1">Current Price</div>
                            <div className="text-white font-semibold">
                              {position.currentPrice.toFixed(6)} SOL
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-400 mb-1">Total Value</div>
                            <div className="text-white font-semibold">
                              {currentValue.toFixed(4)} SOL
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-400 mb-1">P&L</div>
                            <div className={cn(
                              "font-semibold flex items-center gap-1",
                              pnl >= 0 ? "text-green-400" : "text-red-400"
                            )}>
                              {pnl >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {pnl >= 0 ? '+' : ''}{pnl.toFixed(4)}
                              <span className="text-xs">
                                ({pnl >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {positionsArray.length > 0 && (
          <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-800">
            <button
              onClick={handleClearAll}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium text-white transition-colors"
            >
              Close All Positions
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
