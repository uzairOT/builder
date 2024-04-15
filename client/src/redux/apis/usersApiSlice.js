import { apiSlice } from './apiSlice';
const USERS_URL = 'http://192.168.0.107:8080/user';

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
    existingProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/existingProject/${data.userId}`,
        method: 'POST',
        body: data,
      })
    }),
    updateProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updateProject/${data.projectId}`,
        method: 'PUT',
        body: data
      })
    }),
    getUserEvents: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/events/${data.userId}`,
        method: 'POST',
        body: data
      })
    }),
    updateProfile: builder.mutation({
      query: (data) =>({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      })
    })
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useAssignProjectMutation,
  useExistingProjectMutation,
  useUpdateProjectMutation,
  useGetUserEventsMutation,
  useUpdateProfileMutation
} = userApiSlice;
