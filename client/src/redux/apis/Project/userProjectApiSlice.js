import { apiSlice } from "../apiSlice";

const USER_PROJECTS_URL = "http://192.168.0.106:8080/user";

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
        method: 'GET'
    }),
    }),
  }),
});

export const { useGetUserProjectsQuery, useGetMasterLineItemsQuery, useGetFilteredUserProjectsQuery } = userProjectsApiSlice;
