import { apiSlice } from "../apiSlice";

const ASSIGN_ROLE_URL = 'http://192.168.0.101:8080/v1/userRole';

 export const assignRoleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssignRoleTable: builder.query({
            query: (data) => ({
                url: `${ASSIGN_ROLE_URL}/${data.userRole}/${data.projectId}`,
                method: 'GET',
            }),
            providesTags:["Admin"],
        }),
        addAssignRole: builder.mutation({
            query: (data) => ({
                url: `${ASSIGN_ROLE_URL}/${data.userRole}/${data.projectId}`,
                method: 'POST',
                body: data,
            }),
            providesTags:["Admin"],
        }),
        updateAssignRole: builder.mutation({
            query: (data) => ({
                url:`${ASSIGN_ROLE_URL}/${data.userRole}/${data.projectId}`,
                method: 'PUT',
                body: data,
            }),
            providesTags:["Admin"],
        }),
        deleteAssignRole: builder.mutation({
            query: (data) => ({
                url:`${ASSIGN_ROLE_URL}/${data.userRole}/${data.projectId}`,
                method: 'DELETE',
                body: data,
            })
        })
    })
})

export const {useAddAssignRoleMutation, useUpdateAssignRoleMutation, useDeleteAssignRoleMutation, useGetAssignRoleTableQuery} = assignRoleApiSlice;