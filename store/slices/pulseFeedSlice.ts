import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PulseFeedState, TokenData, TokenUpdatePayload, ColumnType } from '@/types';

const initialState: PulseFeedState = {
  newPairs: [],
  finalStretch: [],
  migrated: [],
  isLoading: false,
  error: null,
  lastUpdateTimestamp: Date.now(),
};

const pulseFeedSlice = createSlice({
  name: 'pulseFeed',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ column: ColumnType; tokens: TokenData[] }>
    ) => {
      const { column, tokens } = action.payload;
      state[column] = tokens;
      state.lastUpdateTimestamp = Date.now();
    },
    
    updateToken: (state, action: PayloadAction<TokenUpdatePayload>) => {
      const { id, column, updates } = action.payload;
      const columnTokens = state[column];
      const tokenIndex = columnTokens.findIndex((token) => token.id === id);
      
      if (tokenIndex !== -1) {
        columnTokens[tokenIndex] = {
          ...columnTokens[tokenIndex],
          ...updates,
          lastUpdated: Date.now(),
        };
      }
      state.lastUpdateTimestamp = Date.now();
    },
    
    updateMultipleTokens: (
      state,
      action: PayloadAction<TokenUpdatePayload[]>
    ) => {
      action.payload.forEach(({ id, column, updates }) => {
        const columnTokens = state[column];
        const tokenIndex = columnTokens.findIndex((token) => token.id === id);
        
        if (tokenIndex !== -1) {
          columnTokens[tokenIndex] = {
            ...columnTokens[tokenIndex],
            ...updates,
            lastUpdated: Date.now(),
          };
        }
      });
      state.lastUpdateTimestamp = Date.now();
    },
    
    addToken: (
      state,
      action: PayloadAction<{ column: ColumnType; token: TokenData }>
    ) => {
      const { column, token } = action.payload;
      state[column].unshift(token);
      state.lastUpdateTimestamp = Date.now();
    },
    
    removeToken: (
      state,
      action: PayloadAction<{ column: ColumnType; id: string }>
    ) => {
      const { column, id } = action.payload;
      state[column] = state[column].filter((token) => token.id !== id);
      state.lastUpdateTimestamp = Date.now();
    },
    
    moveToken: (
      state,
      action: PayloadAction<{
        id: string;
        fromColumn: ColumnType;
        toColumn: ColumnType;
      }>
    ) => {
      const { id, fromColumn, toColumn } = action.payload;
      const tokenIndex = state[fromColumn].findIndex((token) => token.id === id);
      
      if (tokenIndex !== -1) {
        const [token] = state[fromColumn].splice(tokenIndex, 1);
        state[toColumn].unshift(token);
      }
      state.lastUpdateTimestamp = Date.now();
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    clearColumn: (state, action: PayloadAction<ColumnType>) => {
      state[action.payload] = [];
      state.lastUpdateTimestamp = Date.now();
    },
  },
});

export const {
  setTokens,
  updateToken,
  updateMultipleTokens,
  addToken,
  removeToken,
  moveToken,
  setLoading,
  setError,
  clearColumn,
} = pulseFeedSlice.actions;

export default pulseFeedSlice.reducer;
