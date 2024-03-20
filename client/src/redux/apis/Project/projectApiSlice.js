import { apiSlice } from "../apiSlice";

const PROJECTS_URL = "http://192.168.0.104:8080/project";
const projectId = 1;

const projectApiSlice = apiSlice.injectEndpoints({
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
    url: `${PROJECTS_URL}/changeOrder/${projectId}`,
    method: "GET",
  }),
}),
getProjectInfoAndTeam: builder.query({
  query: (data) => ({
    url: `${PROJECTS_URL}/projectTeam/${projectId}`,
    method: "GET",
  }),
}),
getProjectFinances: builder.query({
  query: (data) => ({
    url: `${PROJECTS_URL}/finances/${projectId}`,
    method: "GET",
  }),
}),
getProjectInitialProposal: builder.query({
  query: (data) => ({
    url: `${PROJECTS_URL}/initialProposal/${projectId}}`,
    method: "GET",
  }),
}),
getProjectImage: builder.query({
  query: (data) => ({
    url: `${PROJECTS_URL}/image/${projectId}}`,
    method: "GET",
  }),
}),
getProjectPermit: builder.query({
  query: (data) => ({
    url: `${PROJECTS_URL}/permit/${projectId}}`,
    method: "GET",
  }),
}),
getProjectDrawingFiles: builder.query({
  query: (data) => ({
    url: `${PROJECTS_URL}/drawingFiles/${projectId}}`,
    method: "GET",
  }),
}),
getProjectWorkOrder: builder.query({
  query: (data) => ({
    url: `${PROJECTS_URL}/workOrder/${projectId}}`,
    method: "GET",
  }),
}),
getProjectChat: builder.query({
  query: (data) => ({
    url: `${PROJECTS_URL}/chat/${projectId}}`,
    method: "GET",
  }),
}),
getProjectNotes: builder.query({
  query: (data) => ({
    url: `${PROJECTS_URL}/notes/${projectId}}`,
    method: "GET",
  }),
}),
getProjectReports: builder.query({
  query: (data) => ({
    url: `${PROJECTS_URL}/notes/${projectId}}`,
    method: "GET",
  }),
}),
}),
});

export const {
useGetProjectChangeOrderQuery,
useGetProjectInfoAndTeamQuery,
useGetProjectFinancesQuery,
useGetProjectInitialProposalQuery,
useGetProjectImageQuery,
useGetProjectPermitQuery,
useGetProjectDrawingFilesQuery,
useGetProjectWorkOrderQuery,
useGetProjectChatQuery,
} = projectApiSlice;
