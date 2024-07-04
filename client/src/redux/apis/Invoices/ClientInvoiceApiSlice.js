import { apiSlice } from "../apiSlice";

const REPORTS_URL = "http://3.135.107.71/invoice";

const clientInvoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    clientInvoice: builder.mutation({
      query: (data) => ({
        url: `${REPORTS_URL}/createInvoice`,
        method: "POST",
        body: data,
      }),
    }),
    paidInvoice: builder.mutation({
      query: (data) => ({
        url: `${REPORTS_URL}/updateInvoiceStatus`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useClientInvoiceMutation, usePaidInvoiceMutation } = clientInvoiceApiSlice;
