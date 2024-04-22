import { apiSlice } from "../apiSlice";

const ASSIGN_ROLE_URL = 'http://3.135.107.71:8080/v1/userRole';

 export const assignRoleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssignedRoles: builder.query({
            query: (data)=> ({
                url: `${ASSIGN_ROLE_URL}/${data.userRole}/${data.userId}`,
                method: 'GET',
            })
        }),
        addAssignRole: builder.mutation({
            query: (data) => ({
                url: `${ASSIGN_ROLE_URL}/${data.userRole}/${data.userId}`,
                method: 'POST',
                body: data,
            }),
            providesTags:["Admin"],
        }),
        updateAssignRole: builder.mutation({
            query: (data) => ({
                url:`${ASSIGN_ROLE_URL}/${data.userRole}/${data.superAdminId}`,
                method: 'PUT',
                body: data,
            }),
            providesTags:["Admin"],
        }),
        deleteAssignRole: builder.mutation({
            query: (data) => ({
                url:`${ASSIGN_ROLE_URL}/${data.userRole}/${data.superAdminId}`,
                method: 'DELETE',
                body: data,
            })
        }),
    })
})

export const {useAddAssignRoleMutation, useUpdateAssignRoleMutation, useDeleteAssignRoleMutation, useGetAssignedRolesQuery} = assignRoleApiSlice;