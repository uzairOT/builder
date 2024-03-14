import { apiSlice } from "../apiSlice";

const ASSIGN_ROLE_URL = 'http://192.168.18.147:8080/v1/userRole';

 export const assignRoleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addAssignRole: builder.mutation({
            query: (data) => ({
                url: `${ASSIGN_ROLE_URL}/${data.userRole}`,
                method: 'POST',
                body: data,
            }),
            providesTags:["Admin"],
        }),
        updateAssignRole: builder.mutation({
            query: (data) => ({
                url:`${ASSIGN_ROLE_URL}/${data.userRole}`,
                method: 'PUT',
                body: data,
            }),
            providesTags:["Admin"],
        }),
        deleteAssignRole: builder.mutation({
            query: (data) => ({
                url:`${ASSIGN_ROLE_URL}/${data.userRole}`,
                method: 'DELETE',
                body: data,
            })
        })
    })
})

export const {useAddAssignRoleMutation, useUpdateAssignRoleMutation, useDeleteAssignRoleMutation} = assignRoleApiSlice;