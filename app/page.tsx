'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { setTokens } from '@/store/slices/pulseFeedSlice';
import { INITIAL_MOCK_DATA } from '@/lib/mockData';
import { PulseColumns } from '@/components/pulse/PulseColumns';
import { useTokenSocket } from '@/hooks/useTokenSocket';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';

/**
 * Inner component that uses Redux hooks
 */
const PulsePageContent: React.FC = () => {
  // Initialize the WebSocket simulation
  useTokenSocket({
    enabled: true,
    updateInterval: 200,
    tokensPerUpdate: 5,
  });

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-info bg-clip-text text-transparent">
                Pulse
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm text-gray-400">Live</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <select className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm border border-slate-700 focus:outline-none focus:border-accent">
                <option>SOL</option>
                <option>ETH</option>
                <option>BTC</option>
              </select>
              <button className="px-4 py-2 bg-accent hover:bg-accent/80 text-black font-medium rounded-lg text-sm transition-colors">
                Deposit
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <PulseColumns
          onTokenClick={(token) => {
            console.log('Token clicked:', token);
          }}
        />
      </main>

      {/* Footer Stats */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-4">
              <span>Total Tokens: {INITIAL_MOCK_DATA.newPairs.length + INITIAL_MOCK_DATA.finalStretch.length + INITIAL_MOCK_DATA.migrated.length}</span>
              <span>•</span>
              <span>24h Volume: $12.5M</span>
              <span>•</span>
              <span>Active Traders: 1,234</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Powered by Axiom Trade</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

/**
 * Main Pulse Page with Redux Provider
 */
export default function PulsePage() {
  useEffect(() => {
    // Load initial mock data
    store.dispatch(setTokens({ column: 'newPairs', tokens: INITIAL_MOCK_DATA.newPairs }));
    store.dispatch(setTokens({ column: 'finalStretch', tokens: INITIAL_MOCK_DATA.finalStretch }));
    store.dispatch(setTokens({ column: 'migrated', tokens: INITIAL_MOCK_DATA.migrated }));
  }, []);

  return (
    <ErrorBoundary>
      <ReactQueryProvider>
        <Provider store={store}>
          <TooltipProvider delayDuration={200}>
            <PulsePageContent />
          </TooltipProvider>
        </Provider>
      </ReactQueryProvider>
    </ErrorBoundary>
  );
}
