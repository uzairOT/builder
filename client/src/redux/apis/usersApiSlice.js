import { apiSlice } from './apiSlice';
const USERS_URL = 'http://3.135.107.71/user';
const AUTH_URL = 'http://3.135.107.71/auth';
const PROJECTS_URL = "http://3.135.107.71/project";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
      providesTags: ["User"],
    }),
    googleLogin: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/loginWithGoogle`,
        method: "POST",
        body: data,
      }),
      providesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
      providesTags: ["User"],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
      }),
      providesTags: ["User"],
    }),
    assignProject: builder.mutation({
      query: (data) => ({
        url: `http://3.135.107.71/user/assignproject`,
        method: "POST",
        body: data,
      }),
      
    }),
    existingProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/existingProject/${data.userId}`,
        method: "POST",
        body: data,
      }),
    }),
    updateProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updateProject/${data.projectId}`,
        method: "PUT",
        body: data,
      }),
    }),
    getUserEvents: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/events/${data.userId}`,
        method: "POST",
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/forgotPassword`,
        method: "POST",
        body: data,
      }),
    }),
    verifyOTP: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/verifyOtp`,
        method: "POST",
        body: data,
      }),
    }),
    resendOTP: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/resendOtp`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/resetPassword`,
        method: "POST",
        body: data,
      }),
    }),
    resetProfilePassword: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/resetProfilePassword`,
        method: "POST",
        body: data,
      }),
    }),
    checkUserOnInvitation: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/checkUserExistBeforeInvitations`,
        method: "POST",
        body: data,
      })
    }),
    updateUserNotifications: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updateNotifications`,
        method: 'PUT',
        body:data
      })
    })
  }),
});

export const {
  useGoogleLoginMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useAssignProjectMutation,
  useExistingProjectMutation,
  useUpdateProjectMutation,
  useGetUserEventsMutation,
  useUpdateProfileMutation,
  useForgetPasswordMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useResetPasswordMutation,
  useCheckUserOnInvitationMutation,
  useResetProfilePasswordMutation,
  useUpdateUserNotificationsMutation
} = userApiSlice;
