// addPhaseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  color: "#ffff",
  colorMode: 'rgba',
  phaseName: '',
  rowCheckbox: [],

};

export const addPhaseSlice = createSlice({
  name: 'addPhase',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setColorMode: (state, action) => {
      state.colorMode = action.payload;
    },
    setPhaseName: (state, action) => {
      state.phaseName = action.payload;
    },
    resetState: (state) => {
      state.open = initialState.open;
      state.color = initialState.color;
      state.colorMode = initialState.colorMode;
      state.phaseName = initialState.phaseName;
    },
    setRowCheckbox: (state, action)=>{
      return action.payload;
    }
  },
});

export const { setOpen, setColor, setColorMode, setPhaseName, resetState, setRowCheckbox } = addPhaseSlice.actions;

export const selectAddPhase = (state) => state.addPhase;

export default addPhaseSlice.reducer; 
