import UpdateMasterLine from "../../../components/dialogues/UpdateMasterLine/UpdateMasterLine";
import { apiSlice } from "../apiSlice";

const COUPON_URL = "http://192.168.0.113:8080/coupon";
const PROJECTS_URL = "http://192.168.0.113:8080/project";

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
        url: `${COUPON_URL}/all`,
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
        method: "POST",
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
  }),
});

export const {
  //   useGetUserProjectsQuery,
  useGetUserCouponsMutation,
  useGetCreateUserCouponsMutation,
  useUpdateUserCouponsMutation,
  useDeleteUserCouponsMutation,
} = CouponApiSlice;
