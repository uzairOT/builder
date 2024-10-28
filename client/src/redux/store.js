import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react'; // Import the setupListeners function
import authReducer from './slices/authSlice';
import projectFormReducer from './slices/projectFormSlice';
import addPhaseReducer from './slices/addPhaseSlice';
import { apiSlice } from './apis/apiSlice'; // Import the apiSlice or whatever file defines your API endpoints
import userProjectsReducer from './slices/Project/userProjectsSlice';
import projectInitialProposalReducer from './slices/Project/projectInitialProposal';
import projectWeatherReducer from './slices/Project/projectWeather';
import eventsReducer from './slices/Events/eventsSlice';
import dailyForecastSlice from './slices/DailyForecast/dailyForecastSlice';
import notificationSlice from './slices/Notifications/notificationSlice';
import userRoleSlice from './slices/auth/userRoleSlice';
import weatherSlice from './slices/Weather/weatherSlice';
import permissionsReducer from './slices/Permissions/permissionsSlice';
import ProjectPermissionsReducer from './slices/LoginPermissions/PermissionsSlice';
import handleProjectFlowsReducer from './slices/Project/handlingProjectFlowSlice';


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
    userRole: userRoleSlice,
    weather: weatherSlice,
    permissions: permissionsReducer,
    ProjectPermssionList:ProjectPermissionsReducer,
    handleProjectFlows:handleProjectFlowsReducer,
    projectWeather: projectWeatherReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // Include the API slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add the middleware for handling API requests
});

setupListeners(store.dispatch);
