// projectFormSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectName: '',
  buildType: '',
  workDone: '',
  estimatedPrice: '',
  location: '',
  clientName: '',
  users: [{ email: '', role: '' }],
};

const projectFormSlice = createSlice({
  name: 'projectForm',
  initialState,
  reducers: {
    setProjectName: (state, action) => {
      state.projectName = action.payload;
    },
    setBuildType: (state, action) => {
      state.buildType = action.payload;
    },
    setWorkDone: (state, action) => {
      state.workDone = action.payload;
    },
    setEstimatedPrice: (state, action) => {
      state.estimatedPrice = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setClientName: (state, action) => {
      state.clientName = action.payload;
    },

    addUser: (state) => {
      state.users.push({ email: '', role: '' });
    },
    removeUser: (state, action) => {
      state.users.splice(action.payload, 1);
    },
    updateUserEmail: (state, action) => {
      const { index, email } = action.payload;
      state.users[index].email = email;
    },
    updateUserRole: (state, action) => {
      const { index, role } = action.payload;
      state.users[index].role = role;
    },

  },
});

export const {
  setProjectName,
  setBuildType,
  setWorkDone,
  setEstimatedPrice,
  setLocation,
  setClientName,
  setAdminEmails,
  setUserEmails,
  addUser,
  removeUser,
  updateUserEmail,
  updateUserRole,
} = projectFormSlice.actions;

export const selectProjectForm = state => state.projectForm;
export const selectUsers = (state) => state.projectForm.users;
export default projectFormSlice.reducer;
