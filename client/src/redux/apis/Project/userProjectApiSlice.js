import UpdateMasterLine from "../../../components/dialogues/UpdateMasterLine/UpdateMasterLine";
import { apiSlice } from "../apiSlice";

const USER_PROJECTS_URL = "http://3.135.107.71/user";

export const userProjectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProjects: builder.query({
      query: (data) => ({
        url: `${USER_PROJECTS_URL}/projects/${data.userId}`,
        method: "GET",
      }),
    }),
    getFilteredUserProjects: builder.query({
      query: (data) => ({
        url: `${USER_PROJECTS_URL}/projects/${data.userId}?filter=${data.filter}`,
        method: "GET",
      }),
    }),
    getMasterLineItems: builder.query({
      query: (data) => ({
        url: `${USER_PROJECTS_URL}/masterLine/${data}`,
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
        url: `http://3.135.107.71/units/${data.userId}`,
        method: 'GET'
      })
    }),
    addUnit : builder.mutation({
      query: (data) => ({
        url: `http://3.135.107.71/units`,
        method: 'POST',
        body: data
      })
    }),
    editUnit:  builder.mutation({
      query: (data) => ({
        url: `http://3.135.107.71/units/${data.id}`,
        method: 'PUT',
        body: data
      })
    }),
    deleteUnit:  builder.mutation({
      query: (data) => ({
        url: `http://3.135.107.71/units/${data.id}`,
        method: 'DELETE',
        body: data
      })
    }),
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
  useDeleteUnitMutation
} = userProjectsApiSlice;
