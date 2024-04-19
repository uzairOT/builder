import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    error: null,
    dailyForecast: [],
} 

const eventsSlice = createSlice({
    name: 'dailyForecast',
    initialState,
    reducers: {
        setForecastLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setForecastError: (state,action) => {
            state.error = action.payload;
        },
        setDailyForecast: (state,action) => {
            state.dailyForecast = action.payload;
        }
    }
})

export const {setForecastLoading, setForecastError, setDailyForecast } = eventsSlice.actions;

export const getForecast = state => state.dailyForecast;

export default eventsSlice.reducer;