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
import AreYouSureModal from "../../dialogues/AreYouSureModal/AreYouSureModal";

const tableCellStyle = {
  maxWidth: { xl: "20px", lg: "30px", md: "70px", xs: "100%" },
  minWidth: { xl: "10px", lg: "20px", md: "40px", xs: "20px" },
  textOverflow:'ellipsis',
  overflow:'hidden',
  fontWeight: 500,
  fontSize: "14px",
  fontFamily: "inherit",
  padding: "4px",
};

const tableCellValueStyle = {
  maxWidth: { xl: "20px", lg: "30px", md: "70px", xs: "100%" },
  minWidth: { xl: "10px", lg: "20px", md: "40px", xs: "20px" },
  textOverflow:'ellipsis',
  overflow:'hidden',
  fontWeight: 400,
  borderBottom: "none",
  fontFamily: "Montserrat",
  color: "#000000",
  padding: "4px",
};

function UnitsTable({
  setUpdateModalOpen,
  setUnit,
  setAddModalOpen,
  data,
  isLoading,
  refetch,
  debouncedValue,
  page,
  error,
}) {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [open, setOpen] = useState(false);
  const [deleteUnitId, setDeleteUnitId] = useState(null);
  const [deleteUnit, {isLoading: isDeleteUnitLoading}] = useDeleteUnitMutation();

  const handleUpdateOpen = (row) => {
    setUnit(row);
    setUpdateModalOpen(true);
  };
  const handleAddOpen = () => {
    setAddModalOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteFlow = (user) => {
    setDeleteUnitId(user);
    setOpen(true);
  };
  const handleConfirmDelete = async (confirm) => {
    if (confirm) {
      await handleDelete(deleteUnitId);
      handleClose();
      setDeleteUnitId(null);
    } else {
      setDeleteUnitId(null);
      handleClose();
    }
  };

  const handleDelete = async (row) => {
    console.log(row);
    if (row.id) {
      try {
        const res = await deleteUnit({ id: row.id });
        toast.success('Unit deleted successfully.');
        await refetch({
          userId: userInfo.user.id,
          q: debouncedValue,
          page: page,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.info("Default Unit can't be deleted");
    }
  };
  console.log(error);
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
              <TableCell sx={tableCellStyle}>Unit</TableCell>
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
                    <TableCell sx={tableCellValueStyle}>
                      <IconButton aria-label="edit" size="small">
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
              ) : (
                data?.allUnits.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={tableCellValueStyle}>{row.label}</TableCell>
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
                          onClick={() => handleDeleteFlow(row)}
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
      <AreYouSureModal
          open={open}
          handleClose={handleClose}
          handleConfirmDelete={handleConfirmDelete}
          isLoading={isDeleteUnitLoading}
          text={"unit"}
        />
    </Grid>
  );
}

export default UnitsTable;
