import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
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
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFaliure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // New reducer to update avatar
    updateUserAvatar: (state, action) => {
      if(state.currentUser) {
        state.currentUser.avatar = action.payload;  // payload = new avatar URL
      }
    },
  },
});

export const { signInStart, signInFaliure, signInSuccess, updateUserAvatar } = userSlice.actions;

export default userSlice.reducer;
