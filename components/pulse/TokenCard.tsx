'use client';

import React, { memo, useState, useEffect } from 'react';
import { TokenData } from '@/types';
import { 
  Lock, 
  Globe, 
  MessageCircle,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { formatNumber, formatPercentage, getPercentageColor, cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface TokenCardProps {
  token: TokenData;
  onCardClick?: (token: TokenData) => void;
}

/**
 * High-density Token Card Component
 * Displays comprehensive token information in a compact card format
 */
export const TokenCard = memo<TokenCardProps>(({ token, onCardClick }) => {
  const [priceFlash, setPriceFlash] = useState<'up' | 'down' | null>(null);
  const [prevMarketCap, setPrevMarketCap] = useState(token.marketCap);

  // Flash animation on market cap change
  useEffect(() => {
    if (token.marketCap !== prevMarketCap) {
      setPriceFlash(token.marketCap > prevMarketCap ? 'up' : 'down');
      setPrevMarketCap(token.marketCap);
      
      const timer = setTimeout(() => setPriceFlash(null), 500);
      return () => clearTimeout(timer);
    }
  }, [token.marketCap, prevMarketCap]);

  const handleClick = () => {
    if (onCardClick) {
      onCardClick(token);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'relative bg-card rounded-lg p-3 transition-all duration-200',
        'hover:border hover:border-slate-600 cursor-pointer',
        'group'
      )}
    >
      {/* Online Status Indicator */}
      {token.isOnline && (
        <div className="absolute top-2 right-2 w-2 h-2 bg-success rounded-full animate-pulse" />
      )}

      {/* Header Section */}
      <div className="flex items-start gap-2 mb-2">
        {/* Token Image */}
        <div className="relative flex-shrink-0">
          <img
            src={token.imageUrl}
            alt={token.name}
            className="w-12 h-12 rounded-lg object-cover"
            loading="lazy"
          />
          {token.isPaid && (
            <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-0.5">
              <Lock className="w-2.5 h-2.5 text-white" />
            </div>
          )}
        </div>

        {/* Token Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <h3 className="text-white font-bold text-sm truncate">
              {token.ticker}
            </h3>
            <span className="text-gray-500 text-[10px]">{token.name}</span>
          </div>
          
          {/* Age and Social Icons */}
          <div className="flex items-center gap-1.5">
            <Tooltip>
              <TooltipTrigger>
                <span className="text-success text-[10px] font-medium">
                  {token.age}
                </span>
              </TooltipTrigger>
              <TooltipContent>Token age</TooltipContent>
            </Tooltip>
            
            {/* Social Icons */}
            <div className="flex items-center gap-1">
              {token.hasWebsite && (
                <Tooltip>
                  <TooltipTrigger>
                    <Globe className="w-3 h-3 text-gray-500 hover:text-white transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent>Website</TooltipContent>
                </Tooltip>
              )}
              {token.hasTwitter && (
                <Tooltip>
                  <TooltipTrigger>
                    <svg
                      className="w-3 h-3 text-gray-500 hover:text-white transition-colors"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </TooltipTrigger>
                  <TooltipContent>Twitter/X</TooltipContent>
                </Tooltip>
              )}
              {token.hasDiscord && (
                <Tooltip>
                  <TooltipTrigger>
                    <MessageCircle className="w-3 h-3 text-gray-500 hover:text-white transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent>Discord</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="space-y-1.5">
        {/* Market Cap - Primary Metric */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-[10px]">MC</span>
          <div className="flex items-center gap-1">
            <span
              className={cn(
                'text-accent font-bold text-xs transition-colors duration-300',
                priceFlash === 'up' && 'animate-flash-green',
                priceFlash === 'down' && 'animate-flash-red'
              )}
            >
              {formatNumber(token.marketCap)}
            </span>
            {token.pctChange1m !== 0 && (
              <>
                {token.pctChange1m > 0 ? (
                  <TrendingUp className="w-3 h-3 text-success" />
                ) : token.pctChange1m < 0 ? (
                  <TrendingDown className="w-3 h-3 text-danger" />
                ) : (
                  <Minus className="w-3 h-3 text-gray-400" />
                )}
              </>
            )}
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-[10px]">V</span>
          <span className="text-white text-[10px]">
            {formatNumber(token.volume)}
          </span>
        </div>

        {/* Transactions */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-[10px]">TX</span>
          <span className="text-white text-[10px]">{token.txCount}</span>
        </div>

        {/* Percentage Changes Row */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-500">1m</span>
              <span className={cn('text-[10px] font-medium', getPercentageColor(token.pctChange1m))}>
                {formatPercentage(token.pctChange1m)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-500">5m</span>
              <span className={cn('text-[10px] font-medium', getPercentageColor(token.pctChange5m))}>
                {formatPercentage(token.pctChange5m)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-500">1h</span>
              <span className={cn('text-[10px] font-medium', getPercentageColor(token.pctChange1h))}>
                {formatPercentage(token.pctChange1h)}
              </span>
            </div>
          </div>

          {/* Paid Badge */}
          {token.isPaid && (
            <div className="px-1.5 py-0.5 bg-success/10 rounded text-[9px] text-success font-medium">
              Paid
            </div>
          )}
        </div>

        {/* Additional Stats */}
        <div className="flex items-center justify-between text-[9px] text-gray-500">
          <span>Holders: {token.holders.toLocaleString()}</span>
          <span>Liq: {formatNumber(token.liquidity)}</span>
        </div>
      </div>

      {/* Distinguished Badge */}
      {token.isDistinguished && (
        <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-info/20 rounded text-[8px] text-info font-bold">
          ⭐
        </div>
      )}
    </div>
  );
});

TokenCard.displayName = 'TokenCard';
