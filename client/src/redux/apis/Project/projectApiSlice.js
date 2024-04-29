import { apiSlice } from "../apiSlice";

const PROJECTS_URL = "http://3.135.107.71/project";
const EVENT_URL = "http://3.135.107.71/user/events";
const projectId = 47;

const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // assignProject: builder.mutation({
    //   query: (data) => ({
    //     url: `${PROJECTS_URL}/assignproject`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   providesTags: ["Project"],
    // }),

    // Phase ApiSlices ................. //
    addProjectPhase: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/addPhase/${data.projectId}`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Project"],
    }),
    updateProjectPhase: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/updatePhase/${data.id}`,
        method: "PUT",
        body: data.updatedData,
      }),
      providesTags: ["Project"],
    }),
    deleteProjectPhase: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/deletePhase/${data.id}`,
        method: "DELETE",
        body: data,
      }),
      providesTags: ["Project"],
    }),

    // PhaseLine ApiSlices ................. //
    getPhases: builder.query({
      query: (data) => ({
        url: `${PROJECTS_URL}/getPhases/${data.projectId}`,
        method: "GET",
      }),
      providesTags: ["Project"],
    }),
    addPhaseLine: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/addPhaseLine/${data.projectId}`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Project"],
    }),
    updatePhaseLine: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/updatePhaseLine/${data.id}`,
        method: "PUT",
        body: data,
      }),
      providesTags: ["Project"],
    }),
    deletePhaseLine: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/deletePhaseLine/${data.lineItemId}`,
        method: "DELETE",
        body: data,
      }),
      providesTags: ["Project"],
    }),

    getProjectChangeOrder: builder.query({
      query: (data) => ({
        url: `${PROJECTS_URL}/getWorkOrder/${data.projectId}/${data.userId}`,
        method: "GET",
      }),
    }),
    getProjectTeam: builder.query({
      query: (data) => ({
        url: `${PROJECTS_URL}/getProjectTeam/${data}`,
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
        url: `${PROJECTS_URL}/workOrder/${projectId}`,
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
        url: `${PROJECTS_URL}/notes/${data.projectId}`,
        method: "GET",
      }),
      fetchPolicy: "network-only",
    }),
    addProjectNotes: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/notes/${data.projectId}`,
        method: "POST",
        body: data
      }),
    }),
    editProjectNotes: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/notes/${data.noteId}`,
        method: "PUT",
        body: data
      }),
    }),
    deleteProjectNotes: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/notes/${data}`,
        method: "DELETE",
      }),
    }),
    getProjectReports: builder.query({
      query: (data) => ({
        url: `${PROJECTS_URL}/notes/${projectId}}`,
        method: "GET",
      }),
    }),
    getTeamMembers: builder.query({
      query: (data) => ({
        url: `${PROJECTS_URL}/getProjectTeam/${data}`,
        method: 'GET',
      })
    }),
    getProjectData: builder.query({
      query: (data) => ({
        url: `${PROJECTS_URL}/getProjectData/${data.projectId}`
      })
    }),
    projectUpdate: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/projectUpdate/${data.projectId}`,
        method: 'PUT',
        body: data.body
      })
    }),
    getWorkOrderDetails: builder.mutation({
      query: (data) => ({
        url: `${EVENT_URL}/workOrderDetails/${data.workOrderId}`,
        method: 'POST',
        body: data
      })
    })
  }),
});

export const {
  useProjectUpdateMutation,
  useAssignProjectMutation,
  useAddProjectPhaseMutation,
  useUpdateProjectPhaseMutation,
  useDeleteProjectPhaseMutation,
  useGetPhasesQuery,
  useAddPhaseLineMutation,
  useUpdatePhaseLineMutation,
  useDeletePhaseLineMutation,
  useGetProjectChangeOrderQuery,
  useGetProjectTeamQuery,
  useGetProjectFinancesQuery,
  useGetProjectInitialProposalQuery,
  useGetProjectImageQuery,
  useGetProjectPermitQuery,
  useGetProjectDrawingFilesQuery,
  useGetProjectWorkOrderQuery,
  useGetProjectChatQuery,
  useGetTeamMembersQuery,
  useGetProjectDataQuery,
  useGetProjectNotesQuery,
  useAddProjectNotesMutation,
  useEditProjectNotesMutation,
  useDeleteProjectNotesMutation,
  useGetWorkOrderDetailsMutation
} = projectApiSlice;