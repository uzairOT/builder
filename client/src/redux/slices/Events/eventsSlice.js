import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    error: null,
    events: [],
} 

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        addEvents: (state, action) =>{
            state.events = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state,action) => {
            state.error = action.payload;
        },
    }
})

export const { addEvents, setIsLoading, setError } = eventsSlice.actions;

export const allEvents = state => state.events;

export default eventsSlice.reducer;