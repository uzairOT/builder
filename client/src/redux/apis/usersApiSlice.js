import { apiSlice } from './apiSlice';
const USERS_URL = 'http://192.168.0.101:8080/user';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
      providesTags:["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
      providesTags:["User"],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
      providesTags:["User"],
    }),
    assignProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/assignproject`,
        method: 'POST',
        body: data,
      }),
      providesTags:["User"],
    }),
    update: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
      providesTags:["User"],
    }),
    delete: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'DELETE',
        body: data,
      }),
      providesTags:["User"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/changePassword`,
        method: 'PUT',
        body: data,
      }),
      providesTags:["User"],
    }),
  
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useAssignProjectMutation,
  useUpdateMutation,
  useDeleteMutation,
  useChangePasswordMutation,
} = userApiSlice;
