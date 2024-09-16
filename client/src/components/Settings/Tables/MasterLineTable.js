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
  Select,
  MenuItem,
  Input,
} from "@mui/material";
import EditIcon from "../../../assets/settings/edit.png";
import DeleteIcon from "../../../assets/settings/delete.png";
import EmailIcon from "../../../assets/settings/email.png";
import Button from "../../UI/CustomButton";
import { useGetMasterLineItemsQuery } from "../../../redux/apis/Project/userProjectApiSlice";
import { useSelector } from "react-redux";

const dummyData = [
  {
    id: 1,
    avatar: "avatar1.jpg",
    name: "Jackson",
    jobProject: "Project X",
    phoneNumber: "123-456-7890",
    email: "john@example.com",
    country: "USA",
    projectStatus: "done",
    description: "Project description",
    unit: "kg",
    quantity: 10,
    unitPrice: 25.5,
    total: 255,
    start: "2024-02-01",
    end: "2024-02-28",
    notes: "Project notes",
  },
  {
    id: 2,
    avatar: "avatar1.jpg",
    name: "Jackson",
    jobProject: "Project X",
    phoneNumber: "123-456-7890",
    email: "john@example.com",
    country: "USA",
    projectStatus: "done",
    description: "Project description",
    unit: "kg",
    quantity: 10,
    unitPrice: 25.5,
    total: 255,
    start: "2024-02-01",
    end: "2024-02-28",
    notes: "Project notes",
  },
  {
    id: 3,
    avatar: "avatar1.jpg",
    name: "Jackson",
    jobProject: "Project X",
    phoneNumber: "123-456-7890",
    email: "john@example.com",
    country: "USA",
    projectStatus: "done",
    description: "Project description",
    unit: "kg",
    quantity: 10,
    unitPrice: 25.5,
    total: 255,
    start: "2024-02-01",
    end: "2024-02-28",
    notes: "Project notes",
  },
  // Add more dummy data objects as needed
];

function MasterLineTable({ setUpdateModalOpen }) {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { data, isLoading } = useGetMasterLineItemsQuery(userInfo.user.id);

  const handleUnitChange = (event, id) => {
    const selectedUnit = event.target.value;
    // Assuming you have a function to update the unit value in your data structure
    // Update the unit value for the corresponding row with the given ID
    // For example, if you're using state:
  };

  const OpenUpdateModal = () => {
    //console.log("UpdateModal");
    setUpdateModalOpen(true);
  };

  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none", height: '73.5vh' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={tableCellStyle}>Name</TableCell>
            <TableCell sx={tableCellStyle}>Description</TableCell>
            <TableCell sx={tableCellStyle}>
              Unit
              <IconButton>
                <Select
                  value={""}
                  onChange={(e) => handleUnitChange(e)} // Assuming you have a function to handle unit changes
                  input={<Input sx={{ underline: "none" }} />} // Apply underline: 'none' style here
                >
                  <MenuItem value="kg">kg</MenuItem>
                  <MenuItem value="lbs">lbs</MenuItem>
                  {/* Add more menu items as needed */}
                </Select>
              </IconButton>
            </TableCell>

            <TableCell sx={tableCellStyle}>Quantity</TableCell>
            <TableCell sx={tableCellStyle}>Unit Price</TableCell>
            <TableCell sx={tableCellStyle}>Total</TableCell>
            <TableCell sx={tableCellStyle}>Start</TableCell>
            <TableCell sx={tableCellStyle}>End</TableCell>
            <TableCell sx={tableCellStyle}>Notes</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? <>Loading...</> : data.MasterLines.map((row) => (
            <TableRow key={row.id}>
              <TableCell sx={tableCellValueStyle}>{row.title}</TableCell>
              <TableCell sx={tableCellValueStyle}>{row.description}</TableCell>
              <TableCell sx={tableCellValueStyle}>{row.unit}</TableCell>
              <TableCell sx={tableCellValueStyle}>{row.quantity}</TableCell>
              <TableCell sx={tableCellValueStyle}>{row.unit_price}</TableCell>
              <TableCell sx={tableCellValueStyle}>{row.total}</TableCell>
              <TableCell sx={tableCellValueStyle}>{row.start_day}</TableCell>
              <TableCell sx={tableCellValueStyle}>{row.end_day}</TableCell>
              <TableCell sx={tableCellValueStyle}>{row.notes}</TableCell>
              <TableCell sx={tableCellValueStyle}>
                <IconButton
                  aria-label="edit"
                  size="small"
                  onClick={() => OpenUpdateModal(row)} // Pass row data to the function
                >
                  <img src={EditIcon} alt="" />
                </IconButton>
                <IconButton aria-label="delete" size="small">
                  <img src={DeleteIcon} alt="" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MasterLineTable;

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
