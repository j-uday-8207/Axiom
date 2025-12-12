'use client';

import React, { memo, useState, useEffect } from 'react';
import { TokenData } from '@/types';
import { 
  Lock, 
  Globe, 
  MessageCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Copy,
  Search,
  Users,
  BarChart3,
  Shield,
  Target,
  Leaf,
  Network,
  Bookmark
} from 'lucide-react';
import { formatNumber, formatPercentage, getPercentageColor, cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAppSelector, useAppDispatch } from '@/store';
import { toggleBookmark } from '@/store/slices/bookmarksSlice';
import { toast } from '@/hooks/use-toast';

interface TokenCardProps {
  token: TokenData;
  onCardClick?: (token: TokenData) => void;
}

/**
 * High-density Token Card Component matching Axiom Trade design
 * Displays comprehensive token information in a compact card format
 */
export const TokenCard = memo<TokenCardProps>(({ token, onCardClick }) => {
  const [priceFlash, setPriceFlash] = useState<'up' | 'down' | null>(null);
  const [prevMarketCap, setPrevMarketCap] = useState(token.marketCap);
  
  // Get display settings and bookmarks from Redux
  const dispatch = useAppDispatch();
  const displaySettings = useAppSelector((state) => state.display.settings);
  const isBookmarked = useAppSelector((state) => 
    state.bookmarks.bookmarkedTokenIds.includes(token.id)
  );

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

  const copyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(token.id);
    toast({
      title: "Address Copied",
      description: `${token.id.slice(0, 8)}...${token.id.slice(-8)} copied to clipboard`,
      variant: "success",
    });
  };

  const openWebsite = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://example.com/token/${token.id}`, '_blank');
    toast({
      title: "Opening Website",
      description: `Opening ${token.ticker} website`,
    });
  };

  const openSocial = (platform: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: `Opening ${platform}`,
      description: `View ${token.ticker} on ${platform}`,
    });
  };

  const searchToken = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Searching",
      description: `Searching for ${token.ticker}...`,
    });
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleBookmark(token.id));
    toast({
      title: isBookmarked ? "Removed from Bookmarks" : "Added to Bookmarks",
      description: `${token.ticker} ${isBookmarked ? 'removed from' : 'added to'} bookmarks`,
      variant: "success",
    });
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'relative bg-[#0f1419] border border-slate-800 rounded-lg p-3 transition-all duration-200',
        'hover:border-slate-600 cursor-pointer group'
      )}
    >
      {/* Bookmark Button */}
      <button
        onClick={handleBookmark}
        className="absolute top-2 right-2 z-10 p-1 rounded hover:bg-slate-800 transition-colors"
      >
        <Bookmark className={cn(
          "w-4 h-4 transition-colors",
          isBookmarked ? "fill-yellow-500 text-yellow-500" : "text-gray-600 hover:text-white"
        )} />
      </button>
      {/* Main Grid Layout */}
      <div className="flex gap-3">
        {/* Left: Token Image */}
        <div className="relative flex-shrink-0">
          <div className={cn(
            'w-[72px] h-[72px] overflow-hidden',
            displaySettings.squareImages ? 'rounded-lg' : 'rounded-full',
            token.isOnline && 'ring-2 ring-success/50'
          )}>
            <img
              src={token.imageUrl}
              alt={token.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {token.isPaid && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
              <Lock className="w-3 h-3 text-black" />
            </div>
          )}
          {/* Address below image */}
          <div className="mt-1 text-[9px] text-gray-600 font-mono truncate w-[72px]">
            {token.id.slice(0, 12)}...
          </div>
        </div>

        {/* Right: Token Info */}
        <div className="flex-1 min-w-0">
          {/* Header: Name and MC/Volume */}
          <div className="flex items-start justify-between mb-1.5">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-white font-bold text-base truncate">
                  {token.ticker}
                </h3>
                <span className="text-gray-500 text-xs truncate">{token.name}</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={copyAddress}
                      className="flex-shrink-0"
                    >
                      <Copy className="w-3 h-3 text-gray-600 hover:text-white transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Copy address</TooltipContent>
                </Tooltip>
              </div>
              
              {/* Age and Icons Row */}
              <div className="flex items-center gap-2 mb-2">
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-success text-xs font-semibold">
                      {token.age}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Token age</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <Leaf className="w-3.5 h-3.5 text-success" />
                  </TooltipTrigger>
                  <TooltipContent>Fresh token</TooltipContent>
                </Tooltip>

                {token.hasWebsite && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button onClick={openWebsite} className="flex-shrink-0">
                        <Globe className="w-3.5 h-3.5 text-gray-500 hover:text-white transition-colors" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Website</TooltipContent>
                  </Tooltip>
                )}

                {token.hasTwitter && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button onClick={openSocial('Twitter')} className="flex-shrink-0">
                        <MessageCircle className="w-3.5 h-3.5 text-gray-500 hover:text-white transition-colors" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Twitter</TooltipContent>
                  </Tooltip>
                )}

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={searchToken} className="flex-shrink-0">
                      <Search className="w-3.5 h-3.5 text-gray-500 hover:text-white transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Search</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Users className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">{token.userCount}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Active users</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-1 text-gray-400">
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">{token.chartCount}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Chart views</TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Right Side: MC and Volume */}
            <div className="text-right ml-2">
              <div className="flex items-center justify-end gap-1 mb-0.5">
                <span className="text-[10px] text-gray-500">MC</span>
                <span
                  className={cn(
                    'text-accent font-bold transition-colors duration-300',
                    displaySettings.mcSize === 'small' ? 'text-xs' : 'text-sm',
                    priceFlash === 'up' && 'animate-flash-green',
                    priceFlash === 'down' && 'animate-flash-red'
                  )}
                >
                  {displaySettings.noDecimals 
                    ? formatNumber(Math.floor(token.marketCap))
                    : formatNumber(token.marketCap)
                  }
                </span>
              </div>
              <div className="flex items-center justify-end gap-1">
                <span className="text-[10px] text-gray-500">V</span>
                <span className={cn(
                  'text-white font-medium',
                  displaySettings.mcSize === 'small' ? 'text-[10px]' : 'text-xs'
                )}>
                  {displaySettings.noDecimals 
                    ? formatNumber(Math.floor(token.volume))
                    : formatNumber(token.volume)
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Floor Price, TX and Progress Bar */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3 text-xs">
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">F</span>
                    {displaySettings.progressBar && (
                      <div className="flex flex-col w-8">
                        <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-accent" style={{ width: '60%' }} />
                        </div>
                      </div>
                    )}
                    <span className="text-white font-medium">
                      {displaySettings.noDecimals 
                        ? Math.floor(token.floorPrice)
                        : token.floorPrice.toFixed(3)
                      }
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Floor price</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">TX</span>
                    <span className="text-white font-medium">{token.txCount}</span>
                    {displaySettings.progressBar && (
                      <div className="w-8 h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-success" style={{ width: `${Math.min((token.txCount / 20) * 100, 100)}%` }} />
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>Transactions</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Bottom Row: Security Metrics */}
          <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-1">
                  <Users className={cn(
                    'w-3.5 h-3.5',
                    token.topHoldersPct > 20 ? 'text-danger' : 'text-success'
                  )} />
                  <span className={cn(
                    'text-xs font-semibold',
                    token.topHoldersPct > 20 ? 'text-danger' : 'text-success'
                  )}>
                    {token.topHoldersPct.toFixed(0)}%
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>Top holders</TooltipContent>
            </Tooltip>

            {token.isDistinguished && (
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-info" />
                    <span className="text-xs font-semibold text-info">DS</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Distinguished Status</TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-success" />
                  <span className="text-xs font-semibold text-success">
                    {token.snipersPct.toFixed(0)}%
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>Snipers</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-success" />
                  <span className="text-xs font-semibold text-success">
                    {token.devHoldersPct.toFixed(0)}%
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>Dev holdings</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-1">
                  <Network className={cn(
                    'w-3.5 h-3.5',
                    token.insidersPct > 10 ? 'text-danger' : 'text-success'
                  )} />
                  <span className={cn(
                    'text-xs font-semibold',
                    token.insidersPct > 10 ? 'text-danger' : 'text-success'
                  )}>
                    {token.insidersPct.toFixed(0)}%
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>Insiders</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
});

TokenCard.displayName = 'TokenCard';
