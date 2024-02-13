// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectFormReducer from './slices/projectFormSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projectForm: projectFormReducer,
  },
});
