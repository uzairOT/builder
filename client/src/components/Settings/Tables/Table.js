import React, { useState } from "react";
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
  Grid,
  Typography,
} from "@mui/material";
import EditIcon from "../../../assets/settings/edit.png";
import DeleteIcon from "../../../assets/settings/delete.png";
import EmailIcon from "../../../assets/settings/email.png";
import Button from "../../UI/CustomButton";
import {
  useDeleteAssignRoleMutation,
  useGetAssignedRolesQuery,
} from "../../../redux/apis/Admin/assignRoleApiSlice";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import AreYouSureModal from "../../dialogues/AreYouSureModal/AreYouSureModal";

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
  searchInput,
  page,
  setTotalEntries,
  setTotalPages,
  refreshData,
}) {
  const showEmailAndRecords = title === "subcontractor";
  const [assignRoleDelete, { isLoading: deleteUserLoading }] =
    useDeleteAssignRoleMutation();
  const local = localStorage.getItem("userInfo");
  const currentUser = JSON.parse(local);
  const currentUserId = currentUser.user.id;
  const [open, setOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  // const [confirmDelete, setConfirmDelete] = useState(false);
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const userRole = pathSegments[pathSegments.length - 1];
  const { data, isLoading, refetch, error } = useGetAssignedRolesQuery({
    userRole: userRole,
    userId: currentUserId,
    q: searchInput ? searchInput : "",
    page: page ? page : 1,
  });
  const handleEmailIconClick = () => {
    setTemplateView(true); // Call the function to update the template view
  };

  const OpenUpdateModal = () => {
    setUpdateModalOpen(true);
  };
  const handleUserId = (id) => {
    setUserId(id);
    OpenUpdateModal();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteFlow = (user) => {
    setDeleteUserId(user);
    setOpen(true);
  };

  const handleConfirmDelete = async (confirm) => {
    if (confirm) {
      await handleDelete(deleteUserId);
      handleClose();
      setDeleteUserId("");
    } else {
      setDeleteUserId("");
      handleClose();
    }
  };

  const handleDelete = async (user) => {
    try {
      const deleteUser = {
        userId: user.userId,
        superAdminId: currentUserId,
        projectId: user.projectId,
        userRole: userRole,
      };
      const res = await assignRoleDelete(deleteUser);
      if (res?.error?.data?.success === false) {
        toast.error(res?.error?.data?.error || "something went wrong");
      }
      if (res?.data?.success) {
        refetch();
      }
    } catch (e) {
      console.log(e);
      toast.error(e?.error?.data?.error || "something went wrong");
    }
  };
  const handleRefetch = async () => {
    await refetch();
  };

  useEffect(() => {
    if (data) {
      setTotalEntries(data?.totalCount);
      setTotalPages(data?.totalPages);
    }
    // console.log(data);
  }, [data]);

  useEffect(() => {
    handleRefetch();
  }, [refreshData]);
  console.log(error);
  return (
    <>
      <Grid
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        width={{ xl: "100%", lg: "100%", md: "100%", xs: "100%" }}
      >
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={tableCellStyle}>Profile Pic</TableCell>
                <TableCell sx={tableCellStyle}>Name</TableCell>
                <TableCell sx={tableCellStyle}>Job/Project</TableCell>
                <TableCell sx={tableCellStyle}>Phone Number</TableCell>
                <TableCell sx={tableCellStyle}>Email</TableCell>
                {/* <TableCell sx={tableCellStyle}>Country</TableCell> */}
                {/* <TableCell sx={tableCellStyle}>Project Status</TableCell> */}
                {/* {showEmailAndRecords && (
                <TableCell sx={tableCellStyle}>
                  Email <br /> Records
                </TableCell>
              )} */}
                <TableCell sx={tableCellStyle}>Action</TableCell>
              </TableRow>
            </TableHead>
            {error ? (
              <Stack p={2}>{"Something went wrong!"}</Stack>
            ) : (
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell sx={tableCellValueStyle}>
                      {/* <Avatar alt="Avatar" src={row.image} /> */}
                    </TableCell>
                    <TableCell sx={tableCellValueStyle}></TableCell>
                    <TableCell sx={tableCellValueStyle}></TableCell>
                    <TableCell sx={tableCellValueStyle}></TableCell>
                    <TableCell sx={tableCellValueStyle}></TableCell>
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
                    {/* {showEmailAndRecords && (
                  <TableCell sx={tableCellValueStyle}>
                    <IconButton
                      aria-label="email"
                      size="small"
                      onClick={handleEmailIconClick}
                    >
                      <img src={EmailIcon} alt="" />
                    </IconButton>
                  </TableCell>
                )} */}
                    <TableCell sx={tableCellValueStyle}>
                      <IconButton
                        aria-label="edit"
                        size="small"
                        // onClick={() => handleUserId(row)}
                      >
                        <img src={EditIcon} alt="" style={{ width: "35px" }} />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        // onClick={() => handleDelete(row.id)}
                        // onClick={() =>
                        //   handleDeleteFlow({
                        //     userId: row.id,
                        //     projectId: row.projectId,
                        //   })
                        // }
                      >
                        <img
                          src={DeleteIcon}
                          alt=""
                          style={{ width: "35px" }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : data?.message === "no records" ? (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      sx={{
                        textAlign: "center",
                        borderBottom: "none",
                        fontFamily: "var(--main-font-family)",
                      }}
                    >
                      <Typography paddingTop={30} paddingBottom={30}>
                        No Records
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.users?.map((row, index) => {
                    if (row === null) return <></>;

                    return (
                      <TableRow key={index}>
                        <TableCell sx={tableCellValueStyle}>
                          <Avatar alt="Avatar" src={row?.image} />
                        </TableCell>
                        <TableCell sx={tableCellValueStyle}>
                          {row?.firstName}
                        </TableCell>
                        <TableCell sx={tableCellValueStyle}>
                          {row?.projectName}
                        </TableCell>
                        <TableCell sx={tableCellValueStyle}>
                          {row?.phoneNumber}
                        </TableCell>
                        <TableCell sx={tableCellValueStyle}>
                          {row?.email}
                        </TableCell>
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
                        {/* {showEmailAndRecords && (
                      <TableCell sx={tableCellValueStyle}>
                        <IconButton
                          aria-label="email"
                          size="small"
                          onClick={handleEmailIconClick}
                        >
                          <img src={EmailIcon} alt="" />
                        </IconButton>
                      </TableCell>
                    )} */}
                        <TableCell sx={tableCellValueStyle}>
                          <IconButton
                            aria-label="edit"
                            size="small"
                            onClick={() => handleUserId(row)}
                          >
                            <img
                              src={EditIcon}
                              alt=""
                              style={{ width: "35px" }}
                            />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            size="small"
                            // onClick={() => handleDelete(row.id)}
                            onClick={() =>
                              handleDeleteFlow({
                                userId: row.id,
                                projectId: row.projectId,
                              })
                            }
                          >
                            <img
                              src={DeleteIcon}
                              alt=""
                              style={{ width: "35px" }}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <AreYouSureModal
          open={open}
          handleClose={handleClose}
          handleConfirmDelete={handleConfirmDelete}
          isLoading={deleteUserLoading}
          text={"user"}
        />
      </Grid>
    </>
  );
}

export default CustomTable;

const tableCellStyle = {
  maxWidth: { xl: "20px", lg: "30px", md: "70px", xs: "100%" },
  minWidth: { xl: "10px", lg: "20px", md: "40px", xs: "20px" },
  textOverflow: "ellipsis",
  overflow: "hidden",
  fontWeight: 500,
  fontSize: "14px",
  fontFamily: "var(--main-font-family)",
};

const tableCellValueStyle = {
  maxWidth: { xl: "20px", lg: "30px", md: "70px", xs: "100%" },
  minwidth: { xl: "10px", lg: "20px", md: "40px", xs: "20px" },
  textOverflow: "ellipsis",
  overflow: "hidden",
  fontWeight: 400,
  borderBottom: "none",
  fontFamily: "var(--main-font-family)",
  color: "#000000",
  whiteSpace: "wrap",
};
