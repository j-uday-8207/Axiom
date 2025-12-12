import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  id: string;
  timestamp: number;
  type: 'buy' | 'sell';
  tokenId: string;
  tokenName: string;
  tokenTicker: string;
  quantity: number;
  pricePerToken: number;
  totalValue: number;
  fees?: number;
}

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Omit<Transaction, 'id' | 'timestamp'>>) => {
      const transaction: Transaction = {
        ...action.payload,
        id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
      };
      state.transactions.unshift(transaction); // Add to beginning
    },
    clearTransactions: (state) => {
      state.transactions = [];
    },
    loadTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
  },
});

export const { addTransaction, clearTransactions, loadTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
