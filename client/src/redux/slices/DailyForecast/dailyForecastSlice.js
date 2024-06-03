import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    isLoading: true,
    error: null,
    dailyForecast: [],
    temperatureUnit: 'metric',
    query: {
        lat: '',
        lon: '',
        temperatureUnit: 'metric'
    }
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
        },
        setTemperatureUnit: (state, action) => {
            state.query.temperatureUnit = action.payload;
        },
        setLatLon:(state, action) => {
            state.query = {
                ...state.query,
                lat: action.payload.lat,
                lon: action.payload.lon,
            }
        }
    }
})

export const {setForecastLoading, setForecastError, setDailyForecast, setTemperatureUnit,setLatLon } = eventsSlice.actions;

export const getForecast = state => state.dailyForecast;

export default eventsSlice.reducer;