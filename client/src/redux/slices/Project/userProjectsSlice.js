import {createSlice} from '@reduxjs/toolkit';

const initialState = []

export const userProjects = createSlice({
    name: 'userProjects',
    initialState: initialState,
    reducers: {
        addProjects: (action) => {
            return action.payload;
        }
    }
})

export const {addProjects} = userProjects.actions;

export const allUserProjects = (state) => state.userProjects;

export default userProjects.reducer;