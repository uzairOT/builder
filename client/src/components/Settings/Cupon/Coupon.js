import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import ChatView from "../../Chat/ChatView";
import Header from "../Header/Header";
import Pagination from "@mui/material/Pagination";
import AddModal from "../../dialogues/Settings/AddModal";
import UpdateModal from "../../dialogues/Settings/UpdateModal";

import { useOutletContext } from "react-router-dom";
import CustomTable from "./table/Table";
import CouponModal from "../../dialogues/Settings/CouponModal";
import { useSelector } from "react-redux";
import { useDeleteUserCouponsMutation, useGetCreateUserCouponsMutation, useGetUserCouponsMutation, useUpdateUserCouponsMutation } from "../../../redux/apis/Coupon/CouponApiSlice";
import { useDeleteUnitMutation } from "../../../redux/apis/Project/userProjectApiSlice";
import { fetchUserCoupons } from "./apis/fetchUserCoupon";

function Coupon() {
  const user = useSelector(state => state.auth.userInfo);
  const userId = user.user.id
  const [getUserCoupons, { data, isLoading, isError }] =
  useGetUserCouponsMutation({ userId: userId});
  const [couponId, setCouponId] = useState();
  const [addCoupon, {isSuccess: addedCouponSucces}] = useGetCreateUserCouponsMutation();
  const [updateCoupon, {isSuccess: updatedCouponSuccess}] = useUpdateUserCouponsMutation();
  const [deleteCoupon, {isSuccess: deletedCoupon}] = useDeleteUserCouponsMutation()
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponValue, setCouponValue] = useState("");

  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const ADMIN_VIEW = "admin";


  useEffect(() => {
    fetchUserCoupons(getUserCoupons, userId);
  }, [addedCouponSucces, updatedCouponSuccess, deletedCoupon]);

  // Function to open the Add Modal
  const OpenAddModal = () => {
    setAddModalOpen(true);
    
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };
  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  //console.log(userId)
  return (
    <div style={{ padding: "20px" }}>
      <Header title="Coupon" OpenAddModal={OpenAddModal} />
      <CustomTable
        setUpdateModalOpen={setUpdateModalOpen}
        setCouponCode={setCouponCode}
        setCouponValue={setCouponValue}
        userId={userId}
        setCouponId={setCouponId}
        getUserCoupons={getUserCoupons}
        data={data}
        isLoading={isLoading}
        isError={isError}
        deleteCoupon={deleteCoupon}
        // setUserId={setUserId}
      />

      <Box mt={2} mb={2}>
        <Divider />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "space-between" },
        }}
      >
        <Typography variant="body1" sx={paginationTextStyle}>
          Showing data 1 to 4 of 25 entries
        </Typography>
        {/* <Pagination count={10} variant="outlined" shape="rounded"   sx={paginationStyle}/> */}
      </Box>
      <CouponModal
        title={"Coupon"}
        open={isAddModalOpen}
        updateOpen={isUpdateModalOpen}
        onClose={handleCloseAddModal}
        updateClose={handleCloseUpdateModal}
        userId={userId}
        couponId={couponId}
        // setUserId={setUserId}
        couponCode={couponCode}
        couponValue={couponValue}
        addCoupon={addCoupon}
        updateCoupon={updateCoupon}
      />
      {/* <UpdateModal
        title={"Coupon"}
        open={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        userId={userId}
        setUserId={setUserId}
        couponCode={couponCode}
        couponValue={couponValue}
      /> */}
    </div>
  );
}

export default Coupon;

// <div><ChatView /></div>
const paginationStyle = {
  "& .MuiPaginationItem-root": {
    border: "none",
    backgroundColor: "#EEEEEE",
    "&:hover": {
      backgroundColor: "#EEEEEE",
    },
  },
  "& .Mui-selected": {
    backgroundColor: "#FFAC00 !important", // Set background color for the selected page
    color: "#FFFFFF", // Text color for the selected page
  },
};
const paginationTextStyle = {
  display: {
    xs: "none",
    md: "block",
  },
  fontWeight: 400,
  fontSize: "14px",
  fontFamily: "Poppins",
  color: "#8C8C8C",
};
