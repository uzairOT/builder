import { apiSlice } from './apiSlice';
const USERS_URL = 'http://192.168.18.147:8080/user';

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
  
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useAssignProjectMutation,

} = userApiSlice;
