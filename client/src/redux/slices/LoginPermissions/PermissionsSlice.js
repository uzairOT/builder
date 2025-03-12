import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  permissions: [],
  access: false, 
};

const permissionsSlice = createSlice({
  name: 'ProjectPermissionsList',
  initialState,
  reducers: {
    setPermissionsListState: (state, action) => {
      state.permissions = action.payload; 
    },
    updatePermissionList: (state, action) => {
      const { permission, role, value } = action.payload;
      if (!state.permissions[permission]) {
        state.permissions[permission] = { roles: {} };
      }
      state.permissions[permission].roles[role] = value;
      state.access = value;
    },
  },
});

export const { setPermissionsListState, updatePermissionList } = permissionsSlice.actions;
export default permissionsSlice.reducer;
