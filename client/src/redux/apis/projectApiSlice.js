import { apiSlice } from '../apiSlice';

const PROJECTS_URL = 'http://3.135.107.71/project'; // Corrected base URL for projects

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProjectPhase: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/addPhase`,
        method: 'POST',
        body: data,
      }),
      providesTags:["Project"],
    }),
 
  }),
});

export const {
  useAddProjectPhaseMutation,
  
} = projectApiSlice;
