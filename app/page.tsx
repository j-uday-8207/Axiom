'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { setTokens } from '@/store/slices/pulseFeedSlice';
import { INITIAL_MOCK_DATA } from '@/lib/mockData';
import { PulseColumns } from '@/components/pulse/PulseColumns';
import { PulseNavigation } from '@/components/navigation/PulseNavigation';
import { ColumnHeaderNav } from '@/components/navigation/ColumnHeaderNav';
import { useTokenSocket } from '@/hooks/useTokenSocket';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';

/**
 * Inner component that uses Redux hooks
 */
const PulsePageContent: React.FC = () => {
  const displaySettings = store.getState().display.settings;
  
  // Initialize the WebSocket simulation
  useTokenSocket({
    enabled: true,
    updateInterval: 200,
    tokensPerUpdate: 5,
  });

  return (
    <div className="h-screen bg-background text-white flex flex-col overflow-hidden">
      {/* Navigation */}
      <PulseNavigation />

      {/* Search Bar (conditionally hidden) */}
      {!displaySettings.hideSearchBar && (
        <ColumnHeaderNav 
          searchPlaceholder="Search by ticker or name"
          onSearch={(query) => console.log('Search:', query)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
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
            <Toaster />
          </TooltipProvider>
        </Provider>
      </ReactQueryProvider>
    </ErrorBoundary>
  );
}
