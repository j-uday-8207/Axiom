import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  isActive: boolean;
}

const initialState: SearchState = {
  query: '',
  isActive: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.isActive = action.payload.length > 0;
    },
    clearSearch: (state) => {
      state.query = '';
      state.isActive = false;
    },
  },
});

export const { setSearchQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
