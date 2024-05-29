import { apiSlice } from "../apiSlice";

const REPORTS_URL = "http://192.168.0.113:8080/report";

const reportsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReportsStats: builder.mutation({
      query: (data) => ({
        url: `${REPORTS_URL}/getProjectTotalStats`,
        method: "POST",
        body: data,
      }),
    }),
    getWorkDayStats: builder.mutation({
      query: (data) => ({
        url: `${REPORTS_URL}/getTotalWorkDayStats`,
        method: "POST",
        body: data,
      }),
    }),
    getProjectDeadlineStats: builder.mutation({
      query: (data) => ({
        url: `${REPORTS_URL}/getProjectsUpcomingDeadLines`,
        method: "POST",
        body: data,
      }),
    }),
    getProjectCostStats: builder.mutation({
      query: (data) => ({
        url: `${REPORTS_URL}/getTotalProjectCost`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetReportsStatsMutation,
  useGetWorkDayStatsMutation,
  useGetProjectDeadlineStatsMutation,
  useGetProjectCostStatsMutation,
} = reportsApiSlice;
