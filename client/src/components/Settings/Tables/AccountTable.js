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
  Stack,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import EditIcon from "../../../assets/settings/edit.png";
import {
  useDeleteUnitMutation,
  useGetUnitsQuery,
} from "../../../redux/apis/Project/userProjectApiSlice";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import DeleteIcon from "../../../assets/settings/delete.png";
import { toast } from "react-toastify";

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
  minWidth: { xl: "10px", lg: "20px", md: "40px", xs: "20px" },
  textOverflow: "ellipsis",
  overflow: "hidden",
  fontWeight: 400,
  borderBottom: "none",
  fontFamily: "var(--main-font-family)",
  color: "#000000",
};

function AmountTable({
  setUpdateModalOpen,
  setAccount,
  setAddModalOpen,
  data,
  isLoading,
  refetch,
  debouncedValue,
  page,
  deleteUserAccount,
  error,
}) {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const handleUpdateOpen = (row) => {
    setAccount(row);
    setUpdateModalOpen(true);
  };
  const handleAddOpen = () => {
    setAddModalOpen(true);
  };
  const handleDelete = async (row) => {
    console.log(row);
    if (row.id) {
      try {
        const res = await deleteUserAccount({ id: row.id });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.info("Default Unit can't be deleted");
    }
  };
  return (
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
              <TableCell sx={tableCellStyle}>Account Image</TableCell>
              <TableCell sx={tableCellStyle}>Account Name</TableCell>
              <TableCell sx={tableCellStyle}>Account Details</TableCell>
              {/* <TableCell sx={tableCellStyle}>Account Number</TableCell> */}
              <TableCell sx={tableCellStyle}>Account Link</TableCell>
              <TableCell sx={tableCellStyle}>Action</TableCell>
            </TableRow>
          </TableHead>
          {error ? (
            <Stack p={2}>{"Something went wrong!"}</Stack>
          ) : (
            <TableBody>
              {isLoading ? (
                <>
                  <TableRow>
                    <TableCell sx={tableCellValueStyle}></TableCell>
                    <TableCell sx={tableCellValueStyle}></TableCell>
                    {/* <TableCell sx={tableCellValueStyle}>{row.accountNumber}</TableCell> */}
                    <TableCell sx={tableCellValueStyle}></TableCell>
                    <TableCell sx={tableCellValueStyle}>
                      <IconButton
                        aria-label="edit"
                        size="small"
                        // Pass row data to the function
                      >
                        <img src={EditIcon} alt="" style={{ width: "35px" }} />
                      </IconButton>
                      <IconButton aria-label="delete" size="small">
                        <img
                          src={DeleteIcon}
                          alt=""
                          style={{ width: "35px" }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </>
              ) : data?.accounts < 1 ? (
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
                data?.accounts.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={tableCellValueStyle}>
                      {row?.accountImage ? (
                        <img
                          src={row.accountImage}
                          alt="Account"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                      ) : (
                        <></>
                      )}
                    </TableCell>

                    <TableCell sx={tableCellValueStyle}>
                      {row.accountName}
                    </TableCell>
                    <TableCell sx={tableCellValueStyle}>
                      {row.accountType}
                    </TableCell>
                    {/* <TableCell sx={tableCellValueStyle}>{row.accountNumber}</TableCell> */}
                    <TableCell sx={tableCellValueStyle}>
                      {row.accountLink}
                    </TableCell>
                    <TableCell sx={tableCellValueStyle}>
                      <IconButton
                        aria-label="edit"
                        size="small"
                        onClick={() => handleUpdateOpen(row)} // Pass row data to the function
                      >
                        <img src={EditIcon} alt="" style={{ width: "35px" }} />
                      </IconButton>
                      <IconButton aria-label="delete" size="small">
                        <img
                          src={DeleteIcon}
                          alt=""
                          style={{ width: "35px" }}
                          onClick={() => handleDelete(row)}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default AmountTable;
