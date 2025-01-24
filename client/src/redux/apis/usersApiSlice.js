import { apiSlice } from './apiSlice';
const USERS_URL = 'https://builderbuilder.net/user';
const AUTH_URL = 'https://builderbuilder.net/auth';
const PROJECTS_URL = "https://builderbuilder.net/project";
const API_URL="https://builderbuilder.net/api/";

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
        url: `https://builderbuilder.net/user/assignproject`,
        method: "POST",
        body: data,
      }),
      
    }),
    editAssignProject: builder.mutation({
      query: (data) => ({
        url: `https://builderbuilder.net/user/editAssignproject`,
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
        headers: {
          // Override headers here to exclude JWT
          Authorization: '',
        },
      })
    }),
    updateUserNotifications: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updateNotifications`,
        method: 'PUT',
        body:data
      })
    }),
    sendContactForm: builder.mutation({
      query: (contactData) => ({
        url: `${API_URL}/contact-us`,
        method: 'POST',
        body: contactData,
      }),
    }),
    deleteUserProfile: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/profile`,
        method: 'DELETE',
        body: { userId },
      }),
    
    }),
    pinProject: builder.mutation({
      query: (data) => ({
        url:`${USERS_URL}/pinProject`,
        method: 'POST',
        body: data
      })
    })
  }),
});

export const {
  useSendContactFormMutation,
  useDeleteUserProfileMutation,
  useGoogleLoginMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useAssignProjectMutation,
  useEditAssignProjectMutation,
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
  useUpdateUserNotificationsMutation,
  usePinProjectMutation
} = userApiSlice;
