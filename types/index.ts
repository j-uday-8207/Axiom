/**
 * Core Type Definitions for Axiom Trade Pulse
 */

export type ColumnType = 'newPairs' | 'finalStretch' | 'migrated';

export interface TokenData {
  id: string;
  name: string;
  ticker: string;
  imageUrl: string;
  age: string; // e.g., "2s", "3d", "8h"
  
  // Core metrics
  marketCap: number;
  volume: number;
  txCount: number;
  floorPrice?: number;
  
  // Percentage changes
  pctChange1m: number;
  pctChange5m: number;
  pctChange1h: number;
  
  // Status flags
  isPaid: boolean;
  isDistinguished: boolean;
  isOnline: boolean;
  
  // Social links
  hasWebsite: boolean;
  hasTwitter: boolean;
  hasDiscord: boolean;
  
  // Additional metrics
  holders: number;
  liquidity: number;
  fdv: number; // Fully Diluted Valuation
  
  // Performance indicators
  performance1h: number;
  performance24h: number;
  
  // Timestamps
  createdAt: number;
  lastUpdated: number;
}

export interface PulseFeedState {
  newPairs: TokenData[];
  finalStretch: TokenData[];
  migrated: TokenData[];
  isLoading: boolean;
  error: string | null;
  lastUpdateTimestamp: number;
}

export interface TokenUpdatePayload {
  id: string;
  column: ColumnType;
  updates: Partial<TokenData>;
}

export interface FilterOptions {
  sortBy: 'marketCap' | 'volume' | 'age' | 'txCount';
  sortOrder: 'asc' | 'desc';
  minMarketCap?: number;
  maxMarketCap?: number;
  showPaidOnly?: boolean;
}

export interface ColumnHeaderProps {
  title: string;
  count: number;
  filterOptions?: FilterOptions;
  onFilterChange?: (options: FilterOptions) => void;
}

export type PriceChangeDirection = 'up' | 'down' | 'neutral';
