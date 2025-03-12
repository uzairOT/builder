import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    pinnedProject: {},
    projects: [],
    error:'',
    isLoading:'',
    totalCount: 0,
    totalPages: 0,
    limit: 0,
    fetchPinnedProjectToggle: false
}

export const userProjects = createSlice({
    name: 'userProjects',
    initialState: initialState,
    reducers: {
        addPinnedProject: (state,action) => {
            state.pinnedProject = action.payload;
        },
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
        },
        setFetchPinnedProjectToggle: (state) => {
            state.fetchPinnedProjectToggle = !state.fetchPinnedProjectToggle
        },
        setGanttChart: (state, action) => {
           const newProjectsList = state.projects[0].map(project => Number(project.id) === Number(action.payload.projectId) ? {...project, ganttChart: action.payload.ganttChart} : project )
           state.projects[0] = newProjectsList;
        }
    }
})

export const {addProjects, addPinnedProject, setIsLoading, setError, setTotalCount, setTotalPages, setLimit, setFetchPinnedProjectToggle,  setGanttChart} = userProjects.actions;

export const allUserProjects = (state) => state.userProjects.projects;
export const getPinnedProject = (state) => state.userProjects.pinnedProject;
export const projectsPackage = (state) => state.userProjects;

export default userProjects.reducer;