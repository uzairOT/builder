import { apiSlice } from '../apiSlice';

const PROJECTS_URL = 'http://192.168.18.147:8080/project';


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
                url: `${PROJECTS_URL}/addPhase`,
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
                url: `${PROJECTS_URL}/addPhase/${data.id}`,
                method: 'DELETE',
                body: data,
            }),
            providesTags: ["Project"],
        }),

        // PhaseLine ApiSlices ................. //
        addPhaseLine: builder.mutation({
            query: (data) => ({
                url: `${PROJECTS_URL}/addPhaseLine`,
                method: 'POST',
                body: data,
            }),
            providesTags: ["Project"],
        }),
        updatePhaseLine: builder.mutation({
            query: (data) => ({
                url: `${PROJECTS_URL}/addPhaseLine/${data.id}`,
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


    }),
});

export const {
    useAddProjectPhaseMutation,
    useUpdateProjectPhaseMutation,
    useDeleteProjectPhaseMutation,
    useAddPhaseLineMutation,
    useUpdatePhaseLineMutation,
    useDeletePhaseLineMutation,

} = projectApiSlice;