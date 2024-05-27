import { apiSlice } from "../apiSlice";

const REPORTS_URL = "http://3.135.107.71/report";

const reportsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReportsStats: builder.query({
      query: (data) => ({
        url: `${REPORTS_URL}/getProjectTotalStats`,
        method: "POST",
        body: data
      }),
    }),
  }),
});

export const { useGetReportsStatsQuery } = reportsApiSlice;
