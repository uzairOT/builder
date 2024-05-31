import { apiSlice } from '../apiSlice';

const PROJECTS_URL = 'http://192.168.0.113:8080/project'; // Corrected base URL for projects

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
