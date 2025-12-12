import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotesState {
  tokenNotes: Record<string, string>; // tokenId -> note
}

const initialState: NotesState = {
  tokenNotes: {},
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setTokenNote: (state, action: PayloadAction<{ tokenId: string; note: string }>) => {
      const { tokenId, note } = action.payload;
      if (note.trim()) {
        state.tokenNotes[tokenId] = note;
      } else {
        delete state.tokenNotes[tokenId];
      }
    },
    deleteTokenNote: (state, action: PayloadAction<string>) => {
      delete state.tokenNotes[action.payload];
    },
    loadNotes: (state, action: PayloadAction<Record<string, string>>) => {
      state.tokenNotes = action.payload;
    },
  },
});

export const { setTokenNote, deleteTokenNote, loadNotes } = notesSlice.actions;
export default notesSlice.reducer;
