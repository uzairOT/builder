// apiSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    userData: null,
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      });
  },
});
export const fetchUserData = createAsyncThunk('api/fetchUserData', async (userId) => {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  const data = await response.json();
  return data;
});

export default apiSlice.reducer;
