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
import UpdateLineDialogue from "../../dialogues/UpdateLineDialogue/UpdateLineDialogue";
import moment from 'moment';
import UpdateMasterLine from "../../dialogues/UpdateMasterLine/UpdateMasterLine";

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
  const { data, isLoading, refetch } = useGetMasterLineItemsQuery(userInfo.user.id);
  const [showUpdateLine, setShowUpdateLine] = useState(false);
  const [masterLine, setMasterLine] = useState();
console.log(data);

const Units = [
  { value: "sqft", label: "Square Feet", formula: (q, p) => q * p },
  {
    value: "sqm",
    label: "Square Meters",
    formula: (q, p) => q * p * 0.092903,
  },
  { value: "acres", label: "Acres", formula: (q, p) => q * p * 4048.54 },
  { value: "hectares", label: "Hectares", formula: (q, p) => q * p * 10000 },
  {
    value: "sqyds",
    label: "Square Yards",
    formula: (q, p) => q * p * 0.836127,
  },
  {
    value: "sqmi",
    label: "Square Miles",
    formula: (q, p) => q * p * 2.58999e6,
  },
];
  const handleUpdateOpen = (row) => {
    setMasterLine(row);
     setShowUpdateLine(true);
   };
 
   const handleUpdateClose = () => {
     setShowUpdateLine(false);
   };


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
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
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
                   {Units.map((option, index) => (
                      <MenuItem key={index} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
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
              <TableCell sx={tableCellValueStyle}>{moment(row.start_day).format('YYYY-MM-DD')}</TableCell>
              <TableCell sx={tableCellValueStyle}>{moment(row.end_day).format('YYYY-MM-DD')}</TableCell>
              <TableCell sx={tableCellValueStyle}>{row.notes}</TableCell>
              <TableCell sx={tableCellValueStyle}>
                <IconButton
                  aria-label="edit"
                  size="small"
                  onClick={() => handleUpdateOpen(row)} // Pass row data to the function
                >
                  <img src={EditIcon} alt="" style={{width:'35px'}}/>
                </IconButton>
                {/* <IconButton aria-label="delete" size="small">
                  <img src={DeleteIcon} alt="" style={{width:'35px'}} />
                </IconButton> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showUpdateLine && (
          <UpdateMasterLine
            handleUpdateOpen={handleUpdateOpen}
            handleUpdateClose={handleUpdateClose}
            MasterLineItem={masterLine}  
            refetch={refetch}
            userId={userInfo.user.id}       
          />
        )}
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
