import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import pulseFeedReducer from './slices/pulseFeedSlice';
import displayReducer from './slices/displaySlice';
import bookmarksReducer from './slices/bookmarksSlice';
import walletReducer from './slices/walletSlice';

export const store = configureStore({
  reducer: {
    pulseFeed: pulseFeedReducer,
    display: displayReducer,
    bookmarks: bookmarksReducer,
    wallet: walletReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['pulseFeed/updateToken', 'pulseFeed/updateMultipleTokens'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
