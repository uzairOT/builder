import { apiSlice } from "../apiSlice";

const CHAT_URL = "http://3.135.107.71/report";

const reportsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReportsStats: builder.query({
      query: (data) => ({
        url: `${CHAT_URL}/getProjectTotalStats`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetReportsStatsQuery } = reportsApiSlice;
