import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import Header from "../Header/Header";
import Pagination from "@mui/material/Pagination";
import CustomTable from "./table/Table";
import CouponModal from "../../dialogues/Settings/CouponModal";
import { useSelector } from "react-redux";
import { useDeleteUserCouponsMutation, useGetCreateUserCouponsMutation, useGetUserCouponsMutation, useUpdateUserCouponsMutation } from "../../../redux/apis/Coupon/CouponApiSlice";
import { fetchUserCoupons } from "./apis/fetchUserCoupon";
import QueryDebouncer from "../../../utils/QueryDebouncer/QueryDebouncer";
import { useTranslation } from "react-i18next";

function Coupon() {
  const {t} = useTranslation()
  const [searchInput, setSearchInput] = useState("");
  const debouncedValue =  QueryDebouncer(searchInput,500);
  const user = useSelector(state => state.auth.userInfo);
  const [page, setPage]= useState(1);
  const userId = user.user.id
  const [getUserCoupons, { data, isLoading, isError }] =
  useGetUserCouponsMutation({ userId: userId, q:debouncedValue, page:page });
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
    // setPage(1)
    fetchUserCoupons(getUserCoupons, { userId: userId, q:debouncedValue, page:page});
  }, [addedCouponSucces, updatedCouponSuccess, deletedCoupon, debouncedValue]);

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
  
  const handlePageChange = (event, newValue) => {
    setPage(newValue)
  }
 
  let startIndex = 1;
  let endIndex = data?.limit;
  if(page===1){
    startIndex = 1;
    if(data?.totalCount < data?.limit){
      endIndex = data?.totalCount;
    }
  }else{
    startIndex = 1 + (data?.limit*(page-1));
    endIndex = data?.limit*page;
    if(endIndex > data?.totalCount){
      endIndex = endIndex -data?.totalCount;
      endIndex = (startIndex + endIndex) -1;
    }
  }


  //console.log(userId)
  return (
    <div style={{ padding: "20px" }}>
      <Header title={t("Settings.coupon")} OpenAddModal={OpenAddModal} searchInput={searchInput} setSearchInput={setSearchInput} />
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
          Showing data {startIndex} to {endIndex} of {data?.totalCount} entries
        </Typography>
        <Pagination count={data?.totalPages} variant="outlined" shape="rounded"  page={page} onChange={handlePageChange} sx={paginationStyle}/>
      </Box>
      <CouponModal
        title={t("Settings.coupon")}
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
  fontFamily: 'var(--main-font-family)',
  color: "#8C8C8C",
};
