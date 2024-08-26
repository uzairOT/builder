import { apiSlice } from '../apiSlice';

const PROJECTS_URL = "http://3.135.107.71/project";



export const projectApi = apiSlice.injectEndpoints({
  reducerPath: 'NotificationApprovalPhases',
  endpoints: (builder) => ({
    approvePhase: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/approvePhase`,
        method: 'POST',
        body: data,
      }),
    }),
    declinePhase: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/declinePhase`,
        method: 'POST',
        body: data,
      }),
    }),
    approveInitialPhases: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/approveInitialPhases`,
        method: 'POST',
        body: data,
      }),
    }),
    declineInitialPhases: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/declineInitialPhases`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useApprovePhaseMutation,
  useDeclinePhaseMutation,
  useApproveInitialPhasesMutation,
  useDeclineInitialPhasesMutation,
} = projectApi;
