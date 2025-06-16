import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice'; // ✅ Import your actual reducer

export const store = configureStore({
  reducer: {
    user: userReducer, // ✅ Correct reducer usage
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Fixed typo
    }),
});
