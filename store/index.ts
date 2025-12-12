import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import pulseFeedReducer from './slices/pulseFeedSlice';
import displayReducer from './slices/displaySlice';
import bookmarksReducer from './slices/bookmarksSlice';
import walletReducer from './slices/walletSlice';
import portfolioReducer from './slices/portfolioSlice';
import themeReducer from './slices/themeSlice';
import transactionReducer from './slices/transactionSlice';
import notesReducer from './slices/notesSlice';
import alertsReducer from './slices/alertsSlice';
import searchReducer from './slices/searchSlice';
import storage from '@/lib/localStorage';

export const store = configureStore({
  reducer: {
    pulseFeed: pulseFeedReducer,
    display: displayReducer,
    bookmarks: bookmarksReducer,
    wallet: walletReducer,
    portfolio: portfolioReducer,
    theme: themeReducer,
    transactions: transactionReducer,
    notes: notesReducer,
    alerts: alertsReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['pulseFeed/updateToken', 'pulseFeed/updateMultipleTokens'],
      },
    }),
});

// Subscribe to store changes and persist to localStorage
store.subscribe(() => {
  const state = store.getState();
  
  // Persist bookmarks
  storage.setBookmarks(state.bookmarks.bookmarkedTokenIds);
  
  // Persist portfolio
  storage.setPortfolio({
    positions: state.portfolio.positions,
    totalInvested: state.portfolio.totalInvested,
    realizedPnL: state.portfolio.realizedPnL,
  });
  
  // Persist wallet
  storage.setWallet({
    solBalance: state.wallet.solBalance,
    depositAddress: state.wallet.depositAddress,
    isConnected: state.wallet.isConnected,
  });
  
  // Persist display settings
  storage.setDisplaySettings(state.display.settings);
  
  // Persist theme
  storage.setTheme(state.theme.mode);
  
  // Persist notes
  storage.setNotes(state.notes.tokenNotes);
  
  // Persist alerts
  storage.setAlerts(state.alerts.alerts);
  
  // Persist transactions
  storage.setTransactionHistory(state.transactions.transactions);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
