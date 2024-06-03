import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Stack,
} from "@mui/material";
// import EditIcon from "../../../../assets/settings/edit.png";
// import DeleteIcon from "../../../assets/settings/delete.png";
// import EmailIcon from "../../../assets/settings/email.png";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";

import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteAssignRoleMutation,
  useGetAssignedRolesQuery,
} from "../../../../redux/apis/Admin/assignRoleApiSlice";
import { useGetUserCouponsMutation } from "../../../../redux/apis/Coupon/CouponApiSlice";

const dummyData = [
  {
    id: 1,
    avatar: "avatar1.jpg",
    name: "Jackson ",
    jobProject: "Project X",
    phoneNumber: "123-456-7890",
    email: "john@example.com",
    country: "USA",
    projectStatus: "done",
  },
  {
    id: 2,
    avatar: "avatar2.jpg",
    name: "Jackson ",
    jobProject: "Project Y",
    phoneNumber: "987-654-3210",
    email: "jane@example.com",
    country: "Canada",
    projectStatus: "undone",
  },
  {
    id: 3,
    avatar: "avatar2.jpg",
    name: "Jane Smith",
    jobProject: "Project Y",
    phoneNumber: "987-654-3210",
    email: "jane@example.com",
    country: "Canada",
    projectStatus: "undone",
  },
  // Add more dummy data objects as needed
];

function CustomTable({
  title,
  setTemplateView,
  setUpdateModalOpen,
  setUserId,
  setCouponCode,
  setCouponValue,
  setCouponId,
  data,
  isLoading,
  isError,
  deleteCoupon
}) {
  const showEmailAndRecords = title === "subcontractor";
  const [assignRoleDelete] = useDeleteAssignRoleMutation();
  const local = localStorage.getItem("userInfo");
  const currentUser = JSON.parse(local);
  const currentUserId = currentUser.user.id;
  //console.log(currentUserId);
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const userRole = pathSegments[pathSegments.length - 1];

  const handleEmailIconClick = () => {
    setTemplateView(true); // Call the function to update the template view
  };

 
  const OpenUpdateModal = () => {
    setUpdateModalOpen(true);
  };
  const handleUserId = (id, couponCode, couponValue) => {
    setCouponCode(couponCode);
    setCouponValue(couponValue);
    setCouponId(id);
    OpenUpdateModal();
  };
  const handleDelete = async (id) => {
    const couponId = {
      id: id
    }
    try {
      const res = await deleteCoupon(couponId);
    } catch (e) {
      alert("error");
    }
  };
  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell sx={tableCellStyle}>Coupon Code</TableCell>
            <TableCell sx={tableCellStyle}>Off Percentage</TableCell>
            {showEmailAndRecords && (
              <TableCell sx={tableCellStyle}>
                Email <br /> Records
              </TableCell>
            )}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        {isError ? (
          <Stack p={2}>{isError.data.error}</Stack>
        ) : (
          <TableBody>
            {isLoading ? (
              <Stack p={2}>Loading...</Stack>
            ) : data?.message === "no records" ? (
              <>No Records</>
            ) : (
              data?.coupons?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={tableCellValueStyle}>
                    <Avatar alt="Avatar" src={row.image} />
                  </TableCell>
                  <TableCell sx={tableCellValueStyle}>
                    {row.couponCode}
                  </TableCell>
                  <TableCell sx={tableCellValueStyle}>
                    {row.couponValue}
                  </TableCell>
                  <TableCell sx={tableCellValueStyle}>{row.email}</TableCell>

                  {/* <TableCell sx={tableCellValueStyle}>{row.country}</TableCell> */}
                  {/* <TableCell sx={tableCellValueStyle}>
                  {" "}
                  <Button
                    buttonText={row.status}
                    color={row.status === "done" ? "#008767" : "#DF0404"}
                    backgroundColor={
                      row.status === "done" ? "#16C09821" : "#FFDADA"
                    }
                    width="101px"
                    height="27px"
                    borderRadius="45px"
                  />
                </TableCell> */}
                  {/* <TableCell sx={tableCellValueStyle}>
                    <IconButton
                      aria-label="email"
                      size="small"
                      onClick={handleEmailIconClick}
                    >
                      <img src={EmailIcon} alt="" />
                      <EditIcon />
                    </IconButton>
                  </TableCell> */}

                  <TableCell sx={tableCellValueStyle}>
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={() =>
                        handleUserId(row.id, row.couponCode, row.couponValue)
                      }
                    >
                      <img src={EditIcon} alt="" />
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => handleDelete(row.id)}
                    >
                      <img src={DeleteIcon} alt="" />
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

export default CustomTable;

const tableCellStyle = {
  fontWeight: 500,
  fontSize: "14px",
  fontFamily: "Poppins",
  color: "#8C8C8C",
};

const tableCellValueStyle = {
  fontWeight: 400,
  borderBottom: "none",
  fontFamily: "Montserrat",
  color: "#000000",
};
