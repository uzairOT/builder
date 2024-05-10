import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  notificationsArr: [],
  error: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    addNotifications: (state, action) => {
      state.notifications.push(action.payload);
    },
    setNotificationsArr: (state, action) => {
      state.notificationsArr = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setNotifications, setNotificationsArr, setError, addNotifications } = notificationsSlice.actions;

export const selectNotifications = (state) => state.notifications.notifications;
export const selectNotificationsArr = (state) => state.notifications.notificationsArr;
export const selectError = (state) => state.notifications.error;

export default notificationsSlice.reducer;
