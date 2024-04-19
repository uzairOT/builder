import { apiSlice } from "../apiSlice";

const USER_PROJECTS_URL = "http://192.168.0.104:8080/user";

export const userProjectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProjects: builder.query({
      query: (data) => ({
        url: `${USER_PROJECTS_URL}/projects/${data.userId}`,
        method: "GET",
      }),
    }),
    getMasterLineItems: builder.query({
      query: (data) => ({ 
        url: `${USER_PROJECTS_URL}/masterLine/${data}`,
        method: 'GET'
    }),
    }),
  }),
});

export const { useGetUserProjectsQuery, useGetMasterLineItemsQuery } = userProjectsApiSlice;
