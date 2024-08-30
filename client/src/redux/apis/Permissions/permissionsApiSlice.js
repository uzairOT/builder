import { apiSlice } from "../apiSlice";

const PERMISSIONS_URL = "http://3.135.107.71/permission";

const permissionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    permissions: builder.mutation({
      query: (data) => ({
        url: `${PERMISSIONS_URL}/projectPermissions`,
        method: "POST",
        body: data,
      }),
    }),
    getProjectPermissionsList: builder.mutation({
      query: (data) => ({
        url: `${PERMISSIONS_URL}/projectPermissionsList`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePermissionsMutation, useGetProjectPermissionsListMutation } =
  permissionsApiSlice;
