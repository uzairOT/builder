import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    isLoading: true,
    error: null,
    dailyForecast: [],
    temperatureUnit: 'imperial',
    query: {
        lat: '37.269175000000004',
        lon: '-119.30661',
        temperatureUnit: 'imperial'
    },
    defaultLocation: true
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
        },
        setDefaultLocation: (state, action) => {
            state.defaultLocation = action.payload
        }
    }
})

export const {setForecastLoading, setForecastError, setDailyForecast, setTemperatureUnit,setLatLon, setDefaultLocation } = eventsSlice.actions;

export const getForecast = state => state.dailyForecast;
export const getTempUnit = state => state.dailyForecast.query.temperatureUnit;

export default eventsSlice.reducer;