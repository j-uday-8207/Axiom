'use client';

import React, { useState } from 'react';
import { useAppSelector } from '@/store';
import { Column } from './Column';
import { GridView } from './GridView';
import { TokenData, ColumnType } from '@/types';
import { cn } from '@/lib/utils';
import { TokenDetailModal } from '@/components/pulse/TokenDetailModal';
import { TokenCardSkeleton } from '@/components/ui/skeleton';

interface PulseColumnsProps {
  onTokenClick?: (token: TokenData) => void;
}

/**
 * Three-Column Layout for Desktop
 * Tab-based Layout for Mobile
 */
export const PulseColumns: React.FC<PulseColumnsProps> = ({ onTokenClick }) => {
  const [activeTab, setActiveTab] = useState<ColumnType>('newPairs');
  const [selectedToken, setSelectedToken] = useState<TokenData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const newPairs = useAppSelector((state) => state.pulseFeed.newPairs);
  const finalStretch = useAppSelector((state) => state.pulseFeed.finalStretch);
  const migrated = useAppSelector((state) => state.pulseFeed.migrated);
  const isLoading = useAppSelector((state) => state.pulseFeed.isLoading);
  const displaySettings = useAppSelector((state) => state.display);
  const bookmarkedTokenIds = useAppSelector((state) => state.bookmarks.bookmarkedTokenIds);
  const viewMode = useAppSelector((state) => state.display.settings.viewMode);
  const showBookmarkedOnly = useAppSelector((state) => state.display.settings.showBookmarkedOnly);

  // Filter tokens based on display settings
  const filterTokens = (tokens: TokenData[]): TokenData[] => {
    return tokens.filter(token => {
      // Bookmark filter
      if (showBookmarkedOnly && !bookmarkedTokenIds.includes(token.id)) {
        return false;
      }

      // Market Cap filter
      if (displaySettings.settings.marketCapFilter.enabled) {
        const { min, max } = displaySettings.settings.marketCapFilter;
        if (token.marketCap < min || token.marketCap > max) {
          return false;
        }
      }

      // Volume filter
      if (displaySettings.settings.volumeFilter.enabled) {
        const { min, max } = displaySettings.settings.volumeFilter;
        if (token.volume < min || token.volume > max) {
          return false;
        }
      }

      // Holders filter
      if (displaySettings.settings.holdersFilter.enabled) {
        const { min, max } = displaySettings.settings.holdersFilter;
        if (token.holders < min || token.holders > max) {
          return false;
        }
      }

      return true;
    });
  };

  const handleTokenClick = (token: TokenData) => {
    setSelectedToken(token);
    setIsModalOpen(true);
    if (onTokenClick) {
      onTokenClick(token);
    }
  };

  const allColumns: Array<{
    id: ColumnType;
    title: string;
    tokens: TokenData[];
  }> = [
    { id: 'newPairs', title: 'New Pairs', tokens: filterTokens(newPairs) },
    { id: 'finalStretch', title: 'Final Stretch', tokens: filterTokens(finalStretch) },
    { id: 'migrated', title: 'Migrated', tokens: filterTokens(migrated) },
  ];

  // Filter columns based on visibility settings
  const columns = allColumns.filter(column => 
    displaySettings.settings.visibleColumns.includes(column.id)
  );

  // Combine all tokens for grid view
  const allTokens = [
    ...filterTokens(newPairs),
    ...filterTokens(finalStretch),
    ...filterTokens(migrated)
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((col) => (
          <div key={col} className="space-y-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <TokenCardSkeleton key={item} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  // Grid View Mode
  if (viewMode === 'grid') {
    return (
      <>
        <GridView tokens={allTokens} onTokenClick={handleTokenClick} />
        
        {/* Token Detail Modal */}
        <TokenDetailModal
          token={selectedToken}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedToken(null);
          }}
        />
      </>
    );
  }

  // Column View Mode (default)

  return (
    <>
      {/* Mobile Tabs - Visible only on mobile */}
      <div className="md:hidden mb-4">
        <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg">
          {columns.map((column) => (
            <button
              key={column.id}
              onClick={() => setActiveTab(column.id)}
              className={cn(
                'flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all',
                activeTab === column.id
                  ? 'bg-slate-700 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-slate-800'
              )}
            >
              {column.title}
              <span className="ml-2 text-xs text-gray-500">
                {column.tokens.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Three Columns Side-by-Side */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 h-full px-4 py-4">
        {columns.map((column) => (
          <div key={column.id} className="bg-slate-900/50 rounded-lg overflow-hidden flex flex-col">
            <Column
              title={column.title}
              tokens={column.tokens}
              columnType={column.id}
              count={column.tokens.length}
              onTokenClick={handleTokenClick}
            />
          </div>
        ))}
      </div>

      {/* Mobile: Single Column Based on Active Tab */}
      <div className="md:hidden h-[calc(100vh-250px)]">
        {columns.map((column) => (
          <div
            key={column.id}
            className={cn(
              'bg-slate-900/50 rounded-lg p-4 h-full',
              activeTab !== column.id && 'hidden'
            )}
          >
            <Column
              title={column.title}
              tokens={column.tokens}
              columnType={column.id}
              count={column.tokens.length}
              onTokenClick={handleTokenClick}
            />
          </div>
        ))}
      </div>

      {/* Token Detail Modal */}
      <TokenDetailModal
        token={selectedToken}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedToken(null);
        }}
      />
    </>
  );
};
