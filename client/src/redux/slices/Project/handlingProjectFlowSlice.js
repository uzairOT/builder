import {createSlice} from '@reduxjs/toolkit';

const initialState = {
isSaveAs:false,
backButtonProjectId:null
}

export const handleProjectFlows = createSlice({
    name: 'handleProjectFlows',
    initialState: initialState,
    reducers: {
        setIsSaveAs: (state, action) => {
            state.isSaveAs = action.payload;
        },
        setBackButtonProjectId: (state, action) => {
            state.backButtonProjectId = action.payload;
        },

    }
})

export const {setIsSaveAs, setBackButtonProjectId} = handleProjectFlows.actions;

export const getIsSaveAs = (state) => state.handleProjectFlows.isSaveAs;
export const getBackButtonProjectId = (state) => state.handleProjectFlows.backButtonProjectId;

export default handleProjectFlows.reducer;