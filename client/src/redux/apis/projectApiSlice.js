import { apiSlice } from '../apiSlice';

const PROJECTS_URL = 'http://3.135.107.71:8080/project'; // Corrected base URL for projects

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    assignProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/assignproject`,
        method: 'POST',
        body: data,
      }),
      providesTags:["Project"],
    }),
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
