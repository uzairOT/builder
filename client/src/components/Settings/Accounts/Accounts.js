import React from "react";
import Header from "../Header/Header";
import AmountTable from "../Tables/AccountTable";
import { useEffect } from "react";
import { useState } from "react";
import QueryDebouncer from "../../../utils/QueryDebouncer/QueryDebouncer";
import { useSelector } from "react-redux";
import { useGetUnitsQuery } from "../../../redux/apis/Project/userProjectApiSlice";
import { Box, Divider, Pagination, Typography } from "@mui/material";
import {
  useCreateUserAccountMutation,
  useDeleteUserAccountMutation,
  useGetUserAccountsMutation,
  useUpdateUserAccountMutation,
} from "../../../redux/apis/Account/AccountApiSlice";
import { fetchUserCoupons } from "../Cupon/apis/fetchUserCoupon";
import AccountModal from "../../dialogues/Settings/AccountModal";

const Accounts = () => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedValue = QueryDebouncer(searchInput, 500);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo.user.id;
  const [getUserAccounts, { data, isLoading, isError, error }] =
    useGetUserAccountsMutation({ userId: userId });
  const [addUserAccount, { isSuccess: addAccountSucces }] =
    useCreateUserAccountMutation();
  const [updateUserAccount, { isSuccess: updateAccountSuccess }] =
    useUpdateUserAccountMutation();
  const [deleteUserAccount, { isSuccess: deleteAccountSuccess }] =
    useDeleteUserAccountMutation();
  // const [] = useDele
  const [account, setAccount] = useState("");

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
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchUserCoupons(getUserAccounts, { userId: userId, q: debouncedValue, page:page });
  }, [addAccountSucces, updateAccountSuccess, deleteAccountSuccess, debouncedValue]);

  let startIndex = 1;
  let endIndex = data?.limit;
  if (page === 1) {
    startIndex = 1;
    if (data?.totalCount < data?.limit) {
      endIndex = data?.totalCount;
    }
  } else {
    startIndex = 1 + data?.limit * (page - 1);
    endIndex = data?.limit * page;
    if (endIndex > data?.totalCount) {
      endIndex = endIndex - data?.totalCount;
      endIndex = startIndex + endIndex - 1;
    }
  }

  // useEffect(()=>{
  //   setPage(1);
  //   refetch({userId: userInfo.user.id, q:debouncedValue, page:1})
  // },[debouncedValue])
  return (
    <div style={{ padding: "20px" }}>
      <Header
        title="Accounts"
        OpenAddModal={OpenAddModal}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <AmountTable
        setUpdateModalOpen={setUpdateModalOpen}
        setAddModalOpen={setAddModalOpen}
        setAccount={setAccount}
        data={data}
        isLoading={isLoading}
        debouncedValue={debouncedValue}
        page={page}
        deleteUserAccount={deleteUserAccount}
        error={error}
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
        <Pagination
          count={data?.totalPages}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={handlePageChange}
          sx={paginationStyle}
        />
      </Box>
      <AccountModal
        title={"Account"}
        open={isAddModalOpen}
        updateOpen={isUpdateModalOpen}
        onClose={handleCloseAddModal}
        updateClose={handleCloseUpdateModal}
        userId={userId}
        account={account}
        // couponId={couponId}
        // // setUserId={setUserId}
        // couponCode={couponCode}
        // couponValue={couponValue}
        addUserAccount={addUserAccount}
        updateUserAccount={updateUserAccount}
      />
    </div>
  );
};

export default Accounts;

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
