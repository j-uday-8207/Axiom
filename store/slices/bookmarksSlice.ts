import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookmarksState {
  bookmarkedTokenIds: string[];
}

const initialState: BookmarksState = {
  bookmarkedTokenIds: [],
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    toggleBookmark: (state, action: PayloadAction<string>) => {
      const tokenId = action.payload;
      const index = state.bookmarkedTokenIds.indexOf(tokenId);
      
      if (index > -1) {
        state.bookmarkedTokenIds.splice(index, 1);
      } else {
        state.bookmarkedTokenIds.push(tokenId);
      }
    },
    clearBookmarks: (state) => {
      state.bookmarkedTokenIds = [];
    },
  },
});

export const { toggleBookmark, clearBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
