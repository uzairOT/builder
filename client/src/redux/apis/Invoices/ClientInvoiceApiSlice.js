import { apiSlice } from "../apiSlice";

const REPORTS_URL = "http://192.168.0.112:8080/invoice";

const clientInvoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    clientInvoice: builder.mutation({
      query: (data) => ({
        url: `${REPORTS_URL}/createInvoice`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useClientInvoiceMutation } = clientInvoiceApiSlice;
