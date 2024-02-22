import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
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
import Button from "../../../UI/CustomButton";


const dummyData = [
    {
      id: 1,
      description: "Project description",
      unit: "kg",
      quantity: 10,
      unitPrice: 25.5,
      total: 255,
      start: "2024-02-01",
      end: "2024-02-28",
      notes: "Project notes",
      checkbox: false, // New field for the checkbox
      lineItem: "Item 1", // New field for the line item
      margin: "10%", // New field for the margin
      projectProfile: "Profile 1", // New field for the project profile
    },
    {
        id: 2,
        description: "Project description",
        unit: "kg",
        quantity: 10,
        unitPrice: 25.5,
        total: 255,
        start: "2024-02-01",
        end: "2024-02-28",
        notes: "Project notes",
        checkbox: false, // New field for the checkbox
        lineItem: "Item 1", // New field for the line item
        margin: "10%", // New field for the margin
        projectProfile: "Profile 1", // New field for the project profile
      },
      {
        id: 3,
        description: "Project description",
        unit: "kg",
        quantity: 10,
        unitPrice: 25.5,
        total: 255,
        start: "2024-02-01",
        end: "2024-02-28",
        notes: "Project notes",
        checkbox: false, // New field for the checkbox
        lineItem: "Item 1", // New field for the line item
        margin: "10%", // New field for the margin
        projectProfile: "Profile 1", // New field for the project profile
      },
  ];

function MasterLineTable({ setUpdateModalOpen }) {
  const handleUnitChange = (event, id) => {
    const selectedUnit = event.target.value;
    // Assuming you have a function to update the unit value in your data structure
    // Update the unit value for the corresponding row with the given ID
    // For example, if you're using state:
  };

  const OpenUpdateModal = () => {
    console.log("UpdateModal");
    setUpdateModalOpen(true);
  };

  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
    <Table>
  <TableHead>
    <TableRow>
      <TableCell>
        <Checkbox /* Add Checkbox component here */ />
      </TableCell>
      <TableCell sx={tableCellStyle}>Line Item</TableCell>
      <TableCell sx={tableCellStyle}>Description</TableCell>
      <TableCell sx={tableCellStyle}>Unit</TableCell>
      <TableCell sx={tableCellStyle}>Margin</TableCell>
      <TableCell sx={tableCellStyle}>Project Profile</TableCell>
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
    {dummyData.map((row) => (
      <TableRow key={row.id}>
        <TableCell>
          <Checkbox /* Add Checkbox component here */ />
        </TableCell>
        <TableCell sx={tableCellValueStyle}>{row.lineItem}</TableCell>
        <TableCell sx={tableCellValueStyle}>{row.description}</TableCell>
        <TableCell sx={tableCellValueStyle}>{row.unit}</TableCell>
        <TableCell sx={tableCellValueStyle}>{row.margin}</TableCell>
        <TableCell sx={tableCellValueStyle}>{row.projectProfile}</TableCell>
        <TableCell sx={tableCellValueStyle}>{row.quantity}</TableCell>
        <TableCell sx={tableCellValueStyle}>{row.unitPrice}</TableCell>
        <TableCell sx={tableCellValueStyle}>{row.total}</TableCell>
        <TableCell sx={tableCellValueStyle}>{row.start}</TableCell>
        <TableCell sx={tableCellValueStyle}>{row.end}</TableCell>
        <TableCell sx={tableCellValueStyle}>{row.notes}</TableCell>
        <TableCell sx={tableCellValueStyle}>
        <Button
                  buttonText={"pending"}
                  color={"#DF0404"} 
                  backgroundColor={"#FFDADA"}
                  width="101px"
                  height="27px"
                  borderRadius="45px"
                />
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
