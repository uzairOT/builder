import { apiSlice } from "../apiSlice";

const REPORTS_URL = "http://3.135.107.71/report";

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
    getTotalProjectTransaction: builder.mutation({
      query: (data) => ({
        url: `${REPORTS_URL}/getTotalProjectTransaction`,
        method: "POST",
        body: data,
      }),
    }),
    getTotalProjectProfitMargin: builder.mutation({
      query: (data) => ({
        url: `${REPORTS_URL}/getTotalProjectProfitMargin`,
        method: "POST",
        body: data,
      }),
    }),
    getAllProjectsLineItems: builder.mutation({
      query: (data) => ({
        url: `${REPORTS_URL}/overAllUserProjectsLineItems`,
        method: "POST",
        body: data,
      }),
    }),
    getOutstandingInvoices: builder.mutation({
      query: (data) => ({
        url: `${REPORTS_URL}/getOutstandingInvoices`,
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
  useGetTotalProjectTransactionMutation,
  useGetTotalProjectProfitMarginMutation,
  useGetAllProjectsLineItemsMutation,
  useGetOutstandingInvoicesMutation,
} = reportsApiSlice;
