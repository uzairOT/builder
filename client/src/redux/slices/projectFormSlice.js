// projectFormSlice.js
import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  projectName: '',
  buildType: 'remodel',
  workDone: '',
  estimatedPrice: '',
  location: '',
  clientName: '',
  projectColor:'#FFF',
  start_time: '',
  end_time: '',
  users: [{ email: '', role: 'none' }],
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
    setProjectColor: (state, action)=>{
      state.projectColor = action.payload;
    },
    setStartTime: (state, action)=>{
      state.start_time = action.payload;
    },
    setEndTime: (state, action)=>{
      state.end_time = action.payload;
    },
    addUser: (state) => {
      state.users.push({ email: '', role: 'none' });
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
    resetUserAndRoleEmail : (state) =>{
      state.users =  [{ email: '', role: 'none' }];
      state.projectColor = '#FFF';
      state.location = '';
      state.projectName ='';
      state.start_time = '';
      state.end_time = '';
    },
    setSkipInvite : (state) =>{
      state.users =  [{ email: '', role: 'none' }];
    }
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
  setProjectColor,
  addUser,
  removeUser,
  updateUserEmail,
  updateUserRole,
  resetUserAndRoleEmail,
  setEndTime,
  setStartTime,
  setSkipInvite,
} = projectFormSlice.actions;

export const selectProjectForm = state => state.projectForm;
export const selectUsers = (state) => state.projectForm.users;
export default projectFormSlice.reducer;
