import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  solBalance: number;
  depositAddress: string;
  isConnected: boolean;
}

const initialState: WalletState = {
  solBalance: 0,
  depositAddress: 'GPivcgNo4eWg6BVsy5hBUfaLyCG3qJ4g9JoiQ6SnFjmtA',
  isConnected: false,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    updateBalance: (state, action: PayloadAction<number>) => {
      state.solBalance = action.payload;
    },
    connectWallet: (state, action: PayloadAction<string>) => {
      state.depositAddress = action.payload;
      state.isConnected = true;
    },
    disconnectWallet: (state) => {
      state.isConnected = false;
      state.solBalance = 0;
    },
    addFunds: (state, action: PayloadAction<number>) => {
      state.solBalance += action.payload;
    },
  },
});

export const { updateBalance, connectWallet, disconnectWallet, addFunds } = walletSlice.actions;
export default walletSlice.reducer;
