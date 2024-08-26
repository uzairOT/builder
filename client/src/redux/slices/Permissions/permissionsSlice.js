import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  permissions: {},
  access: false, 
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setPermissionsState: (state, action) => {
      state.permissions = action.payload;
    },
    updatePermission: (state, action) => {
      const { permission, role, value } = action.payload;
      if (!state.permissions[permission]) {
        state.permissions[permission] = { roles: {} };
      }
      state.permissions[permission].roles[role] = value;
      state.access = value;
    },
  },
});

export const { setPermissionsState, updatePermission } = permissionsSlice.actions;
export default permissionsSlice.reducer;
