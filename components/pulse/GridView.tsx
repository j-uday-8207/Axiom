'use client';

import React from 'react';
import { TokenData } from '@/types';
import { TokenCard } from './TokenCard';
import { cn } from '@/lib/utils';

interface GridViewProps {
  tokens: TokenData[];
  onTokenClick: (token: TokenData) => void;
}

/**
 * Grid View Layout - displays all tokens in a single grid
 */
export const GridView: React.FC<GridViewProps> = ({ tokens, onTokenClick }) => {
  if (tokens.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-400 text-lg">No tokens to display</p>
          <p className="text-gray-500 text-sm mt-2">Adjust your filters or check back later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-4 py-4">
      <div className={cn(
        "grid gap-4",
        "grid-cols-1",
        "sm:grid-cols-2",
        "lg:grid-cols-3",
        "xl:grid-cols-4",
        "2xl:grid-cols-5"
      )}>
        {tokens.map((token) => (
          <div key={token.id} className="bg-slate-900/50 rounded-lg overflow-hidden">
            <TokenCard
              token={token}
              onCardClick={() => onTokenClick(token)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
