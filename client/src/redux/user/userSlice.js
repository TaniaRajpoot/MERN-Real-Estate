import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,  // ✅ should be 'currentUser' not 'current'
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload; // ✅ update correct key
      state.loading = false;
      state.error = null;
    },
    signInFaliure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// ✅ Export actions
export const { signInStart, signInFaliure, signInSuccess } = userSlice.actions;

// ✅ Export reducer
export default userSlice.reducer;
