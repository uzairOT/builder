// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import addLineReducer from './slices/addLineSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    addLine: addLineReducer,
  },
});
