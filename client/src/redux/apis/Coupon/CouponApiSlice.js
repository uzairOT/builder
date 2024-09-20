import UpdateMasterLine from "../../../components/dialogues/UpdateMasterLine/UpdateMasterLine";
import { apiSlice } from "../apiSlice";

const COUPON_URL = "https://builderbuilder.net/coupon";
const PROJECTS_URL = "https://builderbuilder.net/project";

export const CouponApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getUserProjects: builder.query({
    //   query: (data) => ({
    //     url: `${USER_PROJECTS_URL}/all/${data.userId}`,
    //     method: "GET",
    //   }),
    // }),
    getUserCoupons: builder.mutation({
      query: (data) => ({
        url: `${COUPON_URL}/all?query=${data.q !== undefined ? data.q : ''}&page=${data.page !== undefined ? data.page : 1}`,
        method: "POST",
        body: data,
      }),
    }),
    getCreateUserCoupons: builder.mutation({
      query: (data) => ({
        url: `${COUPON_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    updateUserCoupons: builder.mutation({
      query: (data) => ({
        url: `${COUPON_URL}/update`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUserCoupons: builder.mutation({
      query: (data) => ({
        url: `${COUPON_URL}/delete`,
        method: "DELETE",
        body: data,
      }),
    }),
    verifyCoupon: builder.mutation({
      query: (data) => ({
        url: `${COUPON_URL}/verify`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  //   useGetUserProjectsQuery,
  useGetUserCouponsMutation,
  useGetCreateUserCouponsMutation,
  useUpdateUserCouponsMutation,
  useDeleteUserCouponsMutation,
  useVerifyCouponMutation
} = CouponApiSlice;
