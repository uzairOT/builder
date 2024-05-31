import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getTokenFromLocalStorage } from "../../apis/apiSlice";

export const fetchEvents = createAsyncThunk(
  "fetch/events",
  async (body, thunkApi) => {
    try {
      const res = await axios.post(
        `http://192.168.0.113:8080/user/events/${body.userId}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        }
      );
      return res.data.formattedWorkOrders;
    } catch (error) {
      return error;
    }
  }
);

const initialState = {
  isLoading: true,
  error: null,
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvents: (state, action) => {
      state.events = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { addEvents, setIsLoading, setError } = eventsSlice.actions;

export const allEvents = (state) => state.events;

export default eventsSlice.reducer;
