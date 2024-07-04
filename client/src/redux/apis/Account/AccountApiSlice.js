import { apiSlice } from "../apiSlice";

const ACCOUNT_URL = "http://3.135.107.71/account";

export const AccountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUserAccount: builder.mutation({
      query: (data) => ({
        url: `${ACCOUNT_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    getUserAccounts: builder.mutation({
      query: (data) => ({
        url: `${ACCOUNT_URL}/all?query=${data.q !== undefined ? data.q : ''}&page=${data.page !== undefined ?  data.page : ''}`,
        method: "POST",
        body: data,
      }),
    }),
    updateUserAccount: builder.mutation({
      query: (data) => ({
        url: `${ACCOUNT_URL}/update`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUserAccount: builder.mutation({
      query: (data) => ({
        url: `${ACCOUNT_URL}/delete/${data.id}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateUserAccountMutation,
  useGetUserAccountsMutation,
  useUpdateUserAccountMutation,
  useDeleteUserAccountMutation,
} = AccountApiSlice;
