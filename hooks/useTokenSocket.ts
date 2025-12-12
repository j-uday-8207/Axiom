'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateMultipleTokens } from '@/store/slices/pulseFeedSlice';
import { updateTokenPrice } from '@/store/slices/portfolioSlice';
import { ColumnType, TokenUpdatePayload } from '@/types';
import { generateRandomUpdate } from '@/lib/mockData';

interface UseTokenSocketOptions {
  enabled?: boolean;
  updateInterval?: number;
  tokensPerUpdate?: number;
}

/**
 * Custom hook to simulate real-time WebSocket updates for token data
 * Randomly updates token prices and metrics at specified intervals
 */
export const useTokenSocket = (options: UseTokenSocketOptions = {}) => {
  const {
    enabled = true,
    updateInterval = 200,
    tokensPerUpdate = 5,
  } = options;

  const dispatch = useAppDispatch();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const newPairs = useAppSelector((state) => state.pulseFeed.newPairs);
  const finalStretch = useAppSelector((state) => state.pulseFeed.finalStretch);
  const migrated = useAppSelector((state) => state.pulseFeed.migrated);
  const portfolioPositions = useAppSelector((state) => state.portfolio.positions);

  /**
   * Select random tokens from all columns and update them
   */
  const performUpdate = useCallback(() => {
    const allTokens: Array<{ token: any; column: ColumnType }> = [
      ...newPairs.map((token) => ({ token, column: 'newPairs' as ColumnType })),
      ...finalStretch.map((token) => ({ token, column: 'finalStretch' as ColumnType })),
      ...migrated.map((token) => ({ token, column: 'migrated' as ColumnType })),
    ];

    if (allTokens.length === 0) return;

    // Randomly select tokens to update
    const tokensToUpdate = [];
    const selectedIndices = new Set<number>();

    const updateCount = Math.min(tokensPerUpdate, allTokens.length);
    
    while (selectedIndices.size < updateCount) {
      const randomIndex = Math.floor(Math.random() * allTokens.length);
      selectedIndices.add(randomIndex);
    }

    for (const index of selectedIndices) {
      const { token, column } = allTokens[index];
      const updates = generateRandomUpdate(token);
      
      tokensToUpdate.push({
        id: token.id,
        column,
        updates,
      } as TokenUpdatePayload);
    }

    if (tokensToUpdate.length > 0) {
      dispatch(updateMultipleTokens(tokensToUpdate));
      
      // Update portfolio prices for tokens we own
      tokensToUpdate.forEach(({ id, updates }) => {
        if (portfolioPositions[id] && updates.marketCap !== undefined) {
          const priceInSOL = updates.marketCap / 1000;
          dispatch(updateTokenPrice({
            tokenId: id,
            currentPrice: priceInSOL,
          }));
        }
      });
    }
  }, [newPairs, finalStretch, migrated, portfolioPositions, tokensPerUpdate, dispatch]);

  /**
   * Start the update interval
   */
  const startUpdates = useCallback(() => {
    if (intervalRef.current) return; // Already running

    intervalRef.current = setInterval(() => {
      performUpdate();
    }, updateInterval);
  }, [performUpdate, updateInterval]);

  /**
   * Stop the update interval
   */
  const stopUpdates = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /**
   * Effect to manage the update interval lifecycle
   */
  useEffect(() => {
    if (enabled) {
      startUpdates();
    } else {
      stopUpdates();
    }

    return () => {
      stopUpdates();
    };
  }, [enabled, startUpdates, stopUpdates]);

  return {
    isRunning: intervalRef.current !== null,
    startUpdates,
    stopUpdates,
  };
};
