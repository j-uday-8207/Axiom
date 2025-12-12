'use client';

import React, { useState } from 'react';
import { TokenData, ColumnType } from '@/types';
import { TokenCard } from './TokenCard';
import { Zap, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ColumnProps {
  title: string;
  tokens: TokenData[];
  columnType: ColumnType;
  count: number;
  onTokenClick?: (token: TokenData) => void;
}

type SortOption = 'marketCap' | 'volume' | 'age' | 'txCount';

/**
 * Single Column Component for the Pulse Feed
 * Displays a vertical list of token cards with a header
 */
export const Column: React.FC<ColumnProps> = ({
  title,
  tokens,
  columnType,
  count,
  onTokenClick,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('marketCap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedTokens = [...tokens].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'marketCap':
        comparison = a.marketCap - b.marketCap;
        break;
      case 'volume':
        comparison = a.volume - b.volume;
        break;
      case 'txCount':
        comparison = a.txCount - b.txCount;
        break;
      case 'age':
        comparison = a.createdAt - b.createdAt;
        break;
    }
    
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(option);
      setSortOrder('desc');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <h2 className="text-white font-bold text-base">{title}</h2>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-400 text-sm">{count}</span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="p-1.5 hover:bg-slate-800 rounded transition-colors"
              aria-label="Sort and filter options"
            >
              <SlidersHorizontal className="w-4 h-4 text-gray-400 hover:text-white" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSort('marketCap')}>
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Market Cap {sortBy === 'marketCap' && `(${sortOrder === 'desc' ? '↓' : '↑'})`}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort('volume')}>
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Volume {sortBy === 'volume' && `(${sortOrder === 'desc' ? '↓' : '↑'})`}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort('txCount')}>
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Transactions {sortBy === 'txCount' && `(${sortOrder === 'desc' ? '↓' : '↑'})`}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort('age')}>
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Age {sortBy === 'age' && `(${sortOrder === 'desc' ? '↓' : '↑'})`}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tokens List */}
      <div className="flex-1 overflow-y-auto space-y-2 px-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {sortedTokens.map((token) => (
          <TokenCard
            key={token.id}
            token={token}
            onCardClick={onTokenClick}
          />
        ))}
        
        {tokens.length === 0 && (
          <div className="flex items-center justify-center h-32 text-gray-500 text-sm">
            No tokens in this column
          </div>
        )}
      </div>
    </div>
  );
};
