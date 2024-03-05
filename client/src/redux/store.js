import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react'; // Import the setupListeners function
import authReducer from './slices/authSlice';
import { apiSlice } from './apis/apiSlice'; // Import the apiSlice or whatever file defines your API endpoints

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // Include the API slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add the middleware for handling API requests
});

setupListeners(store.dispatch);