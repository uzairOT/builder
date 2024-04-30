import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react'; // Import the setupListeners function
import authReducer from './slices/authSlice';
import projectFormReducer from './slices/projectFormSlice';
import addPhaseReducer from './slices/addPhaseSlice';
import { apiSlice } from './apis/apiSlice'; // Import the apiSlice or whatever file defines your API endpoints
import userProjectsReducer from './slices/Project/userProjectsSlice';
import projectInitialProposalReducer from './slices/Project/projectInitialProposal';
import eventsReducer from './slices/Events/eventsSlice';
import dailyForecastSlice from './slices/DailyForecast/dailyForecastSlice';
import notificationSlice from './slices/Notifications/notificationSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    projectForm: projectFormReducer,
    addPhase: addPhaseReducer,
    userProjects: userProjectsReducer,
    projectInitialProposal: projectInitialProposalReducer,
    events: eventsReducer,
    dailyForecast: dailyForecastSlice,
    notifications: notificationSlice,
    [apiSlice.reducerPath]: apiSlice.reducer, // Include the API slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add the middleware for handling API requests
});

setupListeners(store.dispatch);
