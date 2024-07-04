import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    projects: [],
    error:'',
    isLoading:'',
    totalCount: 0,
    totalPages: 0,
    limit: 0
}

export const userProjects = createSlice({
    name: 'userProjects',
    initialState: initialState,
    reducers: {
        addProjects: (state,action) => {
            state.projects[0] = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setTotalCount: (state, action) => {
            state.totalCount = action.payload;
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload;
        },
        setLimit: (state, action) => {
            state.limit = action.payload;
        }
    }
})

export const {addProjects, setIsLoading, setError, setTotalCount, setTotalPages, setLimit} = userProjects.actions;

export const allUserProjects = (state) => state.userProjects.projects;
export const projectsPackage = (state) => state.userProjects;

export default userProjects.reducer;