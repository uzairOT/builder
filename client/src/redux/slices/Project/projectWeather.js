import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment-timezone';

const initialState = {
    projectWeather: [], // Initial empty array for weather data
    error: '', // To store any errors related to fetching or updating the weather data
    isLoading: false, // Boolean to track the loading state
    month: moment().format('MMMM YYYY')
};

export const projectWeatherSlice = createSlice({
    name: 'projectWeather',
    initialState: initialState,
    reducers: {
        setProjectWeather: (state, action) => {
            state.projectWeather = action.payload; // Set the weather data
        },
        updateProjectWeather: (state, action) => {
            // Update specific weather data based on some identifier (e.g., date)
            const index = state.projectWeather.findIndex(
                weather => weather.date === action.payload.date
            );
            if (index !== -1) {
                state.projectWeather[index] = action.payload;
            } else {
                // If not found, add the new weather data
                state.projectWeather.push(action.payload);
            }
        },
        clearProjectWeather: (state) => {
            state.projectWeather = []; // Clear the weather data
        },
        setIsLoadingProjectWeather: (state, action) => {
            state.isLoading = action.payload; // Set the loading state
        },
        setError: (state, action) => {
            state.error = action.payload; // Set any error messages
        },
        setMonth: (state,action) => {
            state.month = action.payload
        }
    }
});

// Exporting the actions for use in components
export const {
    setProjectWeather,
    updateProjectWeather,
    clearProjectWeather,
    setIsLoadingProjectWeather,
    setError,
    setMonth
} = projectWeatherSlice.actions;

// Selectors for accessing the state in components
export const selectProjectWeather = (state) => state.projectWeather.projectWeather;
export const selectWeatherLoading = (state) => state.projectWeather.isLoading;
export const selectWeatherError = (state) => state.projectWeather.error;
export const selectMonth = (state) => state.projectWeather.month;

// Exporting the reducer to be used in the store
export default projectWeatherSlice.reducer;
