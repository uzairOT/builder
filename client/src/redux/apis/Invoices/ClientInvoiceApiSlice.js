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
  }),
});

export const { useClientInvoiceMutation } = clientInvoiceApiSlice;
