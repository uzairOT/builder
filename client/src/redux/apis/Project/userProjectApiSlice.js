import UpdateMasterLine from "../../../components/dialogues/UpdateMasterLine/UpdateMasterLine";
import { apiSlice } from "../apiSlice";

const USER_PROJECTS_URL = "https://builderbuilder.net/user";
const PROJECTS_URL = "https://builderbuilder.net/project";

export const userProjectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProjects: builder.query({
      query: (data) => ({
        url: `${USER_PROJECTS_URL}/projects/${data.userId}?page=${data.page !== undefined ? data.page : ''}&filter=${data.filter !== undefined ? data.filter : ''}&query=${data.q !== undefined ? data.q : ''}`,
        method: "GET",
      }),
    }),
    getFilteredUserProjects: builder.query({
      query: (data) => ({
        url: `${USER_PROJECTS_URL}/projects/${data.userId}?q=GETUSERPROJECT`,
        method: "GET",
      }),
    }),
    getMasterLineItems: builder.query({
      query: (data) => ({
        url: `${USER_PROJECTS_URL}/masterLine/${data.userId}?query=${data.q}&page=${data.page}`,
        method: "GET",
      }),
    }),
    updateMasterLineItem: builder.mutation({
      query: (data) => ({
        url: `${USER_PROJECTS_URL}/updateMasterLine/${data.id}`,
        method: "POST",
        body: data,
      }),
    }),
    getUnits : builder.query({
      query: (data) => ({
        url: `https://builderbuilder.net/units/${data.userId}?query=${data.q !== undefined ? data.q : ''}&page=${data.page !== undefined ? data.page : ''}`,
        method: 'GET'
      })
    }),
    addUnit : builder.mutation({
      query: (data) => ({
        url: `https://builderbuilder.net/units`,
        method: 'POST',
        body: data
      })
    }),
    editUnit:  builder.mutation({
      query: (data) => ({
        url: `https://builderbuilder.net/units/${data.id}`,
        method: 'PUT',
        body: data
      })
    }),
    deleteUnit:  builder.mutation({
      query: (data) => ({
        url: `https://builderbuilder.net/units/${data.id}`,
        method: 'DELETE',
        body: data
      })
    }),
    getProjectUserRole: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/getUserProjectRole`,
        method: 'POST',
        body: data
      })
    }),
    getUserNotification : builder.query({
      query: (data) => ({
        url: `${USER_PROJECTS_URL}/getNotificationsSetting/${data.userId}`,
        method: 'GET'
      })
    }),
    setProjectToIncomplete: builder.mutation({
      query: (data) => ({
        url: `${USER_PROJECTS_URL}/setProjectToIncomplete`,
        method: 'POST',
        body: data
      })
    }),
    deleteUserProject: builder.mutation({
      query: (data) => ({
        url: `${USER_PROJECTS_URL}/projects/${data.id}`,
        method: 'DELETE'
      })
    })
  }),
});

export const {
  useGetUserProjectsQuery,
  useGetMasterLineItemsQuery,
  useGetFilteredUserProjectsQuery,
  useUpdateMasterLineItemMutation,
  useGetUnitsQuery,
  useAddUnitMutation,
  useEditUnitMutation,
  useDeleteUnitMutation,
  useGetProjectUserRoleMutation,
  useGetUserNotificationQuery,
  useSetProjectToIncompleteMutation,
  useDeleteUserProjectMutation
} = userProjectsApiSlice;
