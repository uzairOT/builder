import React from "react";
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
} from "@mui/material";
import EditIcon from "../../../assets/settings/edit.png";
import DeleteIcon from "../../../assets/settings/delete.png";
import EmailIcon from "../../../assets/settings/email.png";
import Button from "../../UI/CustomButton";
import { useDeleteAssignRoleMutation } from "../../../redux/apis/Admin/assignRoleApiSlice";
import { useLocation } from "react-router-dom";


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

function CustomTable({title , setTemplateView ,setUpdateModalOpen, setUserId}) {
  const showEmailAndRecords = title === "subcontractor";
  const [assignRoleDelete] = useDeleteAssignRoleMutation();
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const userRole = pathSegments[pathSegments.length - 1];

  const handleEmailIconClick = () => {
    setTemplateView(true); // Call the function to update the template view
  };
  
  const OpenUpdateModal = () => {
    setUpdateModalOpen(true);
  };
  const handleUserId = (id) =>{
    setUserId(id)
    OpenUpdateModal();
  }
  const handleDelete = (userId) =>{
    const deleteUser = {
      userId: userId,
      userRole: userRole,
    }
    assignRoleDelete(deleteUser);
  }
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell sx={tableCellStyle}>Name</TableCell>
            <TableCell sx={tableCellStyle}>Job/Project</TableCell>
            <TableCell sx={tableCellStyle}>Phone Number</TableCell>
            <TableCell sx={tableCellStyle}>Email</TableCell>
            <TableCell sx={tableCellStyle}>Country</TableCell>
            <TableCell sx={tableCellStyle}>Project Status</TableCell>
            {showEmailAndRecords && (
              <TableCell sx={tableCellStyle}>
                Email <br /> Records
              </TableCell>
            )}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyData.map((row) => (
            <TableRow key={row.id} >
              <TableCell sx={tableCellValueStyle}>
                <Avatar alt="Avatar" src={row.avatar} />
              </TableCell>
              <TableCell sx={tableCellValueStyle}>{row.name}</TableCell>
              <TableCell sx={tableCellValueStyle}>{row.jobProject}</TableCell>
              <TableCell sx={tableCellValueStyle}>{row.phoneNumber}</TableCell>
              <TableCell sx={tableCellValueStyle}>{row.email}</TableCell>
              <TableCell sx={tableCellValueStyle}>{row.country}</TableCell>
              <TableCell sx={tableCellValueStyle}>
                {" "}
                <Button
                  buttonText={row.projectStatus}
                  color={row.projectStatus === "done" ? "#008767" : "#DF0404"}
                  backgroundColor={
                    row.projectStatus === "done" ? "#16C09821" : "#FFDADA"
                  }
                  width="101px"
                  height="27px"
                  borderRadius="45px"
                />
              </TableCell>
              {showEmailAndRecords && (
                <TableCell sx={tableCellValueStyle}>
                  <IconButton aria-label="email" size="small" onClick={handleEmailIconClick}>
                    <img src={EmailIcon} alt="" />
                  </IconButton>
                </TableCell>
              )}
              <TableCell sx={tableCellValueStyle}>
                <IconButton aria-label="edit" size="small" onClick={()=> handleUserId(row.id)}>
                  <img src={EditIcon} alt="" />
                </IconButton>
                <IconButton aria-label="delete" size="small" onClick={()=> handleDelete(row.id)}>
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

export default CustomTable;

const tableCellStyle = {
  fontWeight: 500,
  fontSize: "14px",
  fontFamily: "Poppins",
  color: "#8C8C8C",
};

const tableCellValueStyle = {
    fontWeight: 400,
    borderBottom: 'none',
    fontFamily: "Montserrat",
    color: "#000000",
  };