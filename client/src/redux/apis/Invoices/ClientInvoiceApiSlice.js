import { apiSlice } from "../apiSlice";

const REPORTS_URL = "https://builderbuilder.net/invoice";

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
