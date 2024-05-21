import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userRole: '',
    isLoading: false,
    error: ''
}

export const userRoleSlice =createSlice({
    name: 'userRoleSlice',
    initialState,
    reducers: {
        authUserRole: (state, action) => {
            state.userRole = action.payload;
        },
        setUserRoleIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUserRoleError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const {authUserRole, setUserRoleIsLoading, setUserRoleError} = userRoleSlice.actions;

export const getUserRoleFromRedux = (state) => state.userRole;

export default userRoleSlice.reducer;