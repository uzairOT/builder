// projectFormSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectName: '',
  buildType: 'remodel',
  workDone: '',
  estimatedPrice: '',
  location: '',
  clientName: '',
  projectColor:'',
  start_time: null,
  end_time: null,
  users: [{ email: '', role: 'admin' }],
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
      state.users.push({ email: '', role: 'admin' });
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
      state.users =  [{ email: '', role: 'admin' }];
      state.projectColor = '';
      state.location = '';
      state.projectName ='';
      state.start_time = null;
      state.end_time = null;
    },
    setSkipInvite : (state) =>{
      state.users =  [{ email: '', role: 'admin' }];
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
  setSkipInvite
} = projectFormSlice.actions;

export const selectProjectForm = state => state.projectForm;
export const selectUsers = (state) => state.projectForm.users;
export default projectFormSlice.reducer;
