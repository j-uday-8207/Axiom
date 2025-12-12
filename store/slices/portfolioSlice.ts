import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Position {
  tokenId: string;
  tokenName: string;
  tokenTicker: string;
  quantity: number;
  averageBuyPrice: number; // Price in SOL
  totalInvested: number; // Total SOL spent
  currentPrice: number; // Current price in SOL
  imageUrl?: string;
}

interface PortfolioState {
  positions: Record<string, Position>; // tokenId -> Position
  totalInvested: number;
  realizedPnL: number; // Profit/Loss from closed positions
}

const initialState: PortfolioState = {
  positions: {},
  totalInvested: 0,
  realizedPnL: 0,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    buyToken: (
      state,
      action: PayloadAction<{
        tokenId: string;
        tokenName: string;
        tokenTicker: string;
        quantity: number;
        pricePerToken: number;
        imageUrl?: string;
      }>
    ) => {
      const { tokenId, tokenName, tokenTicker, quantity, pricePerToken, imageUrl } = action.payload;
      const totalCost = quantity * pricePerToken;

      if (state.positions[tokenId]) {
        // Update existing position
        const position = state.positions[tokenId];
        const newTotalInvested = position.totalInvested + totalCost;
        const newQuantity = position.quantity + quantity;
        position.averageBuyPrice = newTotalInvested / newQuantity;
        position.quantity = newQuantity;
        position.totalInvested = newTotalInvested;
        position.currentPrice = pricePerToken;
      } else {
        // Create new position
        state.positions[tokenId] = {
          tokenId,
          tokenName,
          tokenTicker,
          quantity,
          averageBuyPrice: pricePerToken,
          totalInvested: totalCost,
          currentPrice: pricePerToken,
          imageUrl,
        };
      }

      state.totalInvested += totalCost;
    },

    sellToken: (
      state,
      action: PayloadAction<{
        tokenId: string;
        quantity: number;
        pricePerToken: number;
      }>
    ) => {
      const { tokenId, quantity, pricePerToken } = action.payload;
      const position = state.positions[tokenId];

      if (!position) return;

      const saleValue = quantity * pricePerToken;
      const costBasis = (position.totalInvested / position.quantity) * quantity;
      const pnl = saleValue - costBasis;

      state.realizedPnL += pnl;

      if (quantity >= position.quantity) {
        // Selling entire position
        delete state.positions[tokenId];
      } else {
        // Partial sale
        position.quantity -= quantity;
        position.totalInvested -= costBasis;
      }
    },

    updateTokenPrice: (
      state,
      action: PayloadAction<{
        tokenId: string;
        currentPrice: number;
      }>
    ) => {
      const { tokenId, currentPrice } = action.payload;
      if (state.positions[tokenId]) {
        state.positions[tokenId].currentPrice = currentPrice;
      }
    },

    clearAllPositions: (state) => {
      state.positions = {};
      state.totalInvested = 0;
      state.realizedPnL = 0;
    },
  },
});

export const { buyToken, sellToken, updateTokenPrice, clearAllPositions } = portfolioSlice.actions;
export default portfolioSlice.reducer;
