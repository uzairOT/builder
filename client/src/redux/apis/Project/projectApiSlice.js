import { apiSlice } from '../apiSlice';

const PROJECTS_URL = 'http://192.168.0.101:8080/project';
const URL = 'http://192.168.0.101:8080/project';

const projectId = localStorage.getItem("projectId");

export const projectApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        assignProject: builder.mutation({
            query: (data) => ({
                url: `${PROJECTS_URL}/assignproject`,
                method: 'POST',
                body: data,
            }),
            providesTags: ["Project"],
        }),

        // Phase ApiSlices ................. //
        addProjectPhase: builder.mutation({
            query: (data) => ({
                url: `${PROJECTS_URL}/addPhase/${projectId}`,
                method: 'POST',
                body: data,
            }),
            providesTags: ["Project"],
        }),
        updateProjectPhase: builder.mutation({
            query: (data) => ({
                url: `${PROJECTS_URL}/addPhase/${data.id}`,
                method: 'PATCH',
                body: data,
            }),
            providesTags: ["Project"],
        }),
        deleteProjectPhase: builder.mutation({
            query: (data) => ({
                url: `${PROJECTS_URL}/addPhase/${projectId}`,
                method: 'DELETE',
                body: data,
            }),
            providesTags: ["Project"],
        }),

        // PhaseLine ApiSlices ................. //
        getPhases: builder.query({
            query: (data) => ({
                url: `${URL}/getPhases/${projectId}`,
                method: 'GET',
           
            }),
            providesTags: ["Project"],
        }),
        addPhaseLine: builder.mutation({
            query: (newLineItem) => ({
                url: `${PROJECTS_URL}/addPhaseLine/${projectId}`,
                method: 'POST',
                body: newLineItem,
            }),
            providesTags: ["Project"],
        }),
        updatePhaseLine: builder.mutation({
            query: (data,lineItemId) => ({
                url: `${PROJECTS_URL}/updatePhaseLine/${lineItemId}`,
                method: 'PATCH',
                body: data,
            }),
            providesTags: ["Project"],
        }),
        deletePhaseLine: builder.mutation({
            query: (data) => ({
                url: `${PROJECTS_URL}/addPhaseLine/${data.id}`,
                method: 'DELETE',
                body: data,
            }),
            providesTags: ["Project"],
        }),

        getProjectChangeOrder: builder.query({
            query: (data) => ({
                url: `${PROJECTS_URL}/changeOrder/`,
                method: 'GET',
            })
        }),
        getProjectWorkOrder: builder.query({
            
        })

    }),
});

export const {
    useAddProjectPhaseMutation,
    useUpdateProjectPhaseMutation,
    useDeleteProjectPhaseMutation,
    useAddPhaseLineMutation,
    useUpdatePhaseLineMutation,
    useDeletePhaseLineMutation,
    useGetProjectChangeOrderQuery,
    useGetPhasesQuery,
} = projectApiSlice;