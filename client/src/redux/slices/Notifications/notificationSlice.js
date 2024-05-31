import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  notificationsArr: [],
  teamNotifications: [],
  error: null,
  workOrderDeclineRecall : true,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    addNotifications: (state, action) => {
      state.notifications = [...state.notifications, action.payload]
    },
    addTeamNotifications: (state, action) => {
      state.teamNotifications = [...state.teamNotifications, action.payload]
    },
    setNotificationsArr: (state, action) => {
      state.notificationsArr = action.payload;
    },
    setTeamNotifications: (state, action) => {
      state.teamNotifications = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    toggleWorkOrderDeclineRecall: (state) =>{
      state.workOrderDeclineRecall = !state.workOrderDeclineRecall
    }
  },
});

export const { setNotifications, addTeamNotifications, setNotificationsArr, setError, addNotifications, toggleWorkOrderDeclineRecall, setTeamNotifications } = notificationsSlice.actions;

export const selectNotifications = (state) => state.notifications.notifications;
export const selectTeamNotifications = (state) => state.notifications.teamNotifications;
export const selectNotificationsArr = (state) => state.notifications.notificationsArr;
export const selectError = (state) => state.notifications.error;
export const selectWorkOrderDeclineRecall = (state) => state.notifications.workOrderDeclineRecall;

export default notificationsSlice.reducer;
