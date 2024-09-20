import { apiSlice } from '../apiSlice';

const PROJECTS_URL = 'https://builderbuilder.net/project'; // Corrected base URL for projects

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
