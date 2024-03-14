import { apiSlice } from "../apiSlice";

const PROJECTS_URL = "http://192.168.0.104:8080/project";
const projectId = 1;

const projectApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjectChangeOrder: builder.query({
            query: (data) => ({
                url: `${PROJECTS_URL}/changeOrder/${projectId}`,
                method: 'GET',
            })
        }),
        getProjectWorkOrder: builder.query({
            
        }),
        createProject: builder.mutation({
            query: (data) => ({
              url: `${PROJECTS_URL}/assignproject`,
              method: 'POST',
              body: data,
            }),
            providesTags:["User"],
          }),
    })
})

export const { useGetProjectChangeOrderQuery,useCreateProjectMutation } = projectApiSlice;