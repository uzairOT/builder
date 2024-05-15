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
} from "@mui/material";
import { useSelector } from "react-redux";
import EditIcon from "../../../assets/settings/edit.png";
import { useDeleteUnitMutation, useGetUnitsQuery } from "../../../redux/apis/Project/userProjectApiSlice";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import DeleteIcon from "../../../assets/settings/delete.png";
import { toast } from "react-toastify";

const tableCellStyle = {
  fontWeight: 500,
  fontSize: "14px",
  fontFamily: "Poppins",
  color: "#8C8C8C",
  padding:'4px'
};

const tableCellValueStyle = {
  fontWeight: 400,
  borderBottom: "none",
  fontFamily: "Montserrat",
  color: "#000000",
  padding:'4px'
};

function UnitsTable({setUpdateModalOpen, setUnit,setAddModalOpen, data, isLoading, refetch}) {
    const userInfo = useSelector((state) => state.auth.userInfo);
   
    const [deleteUnit] = useDeleteUnitMutation();

    const handleUpdateOpen = (row) => {
        setUnit(row)
        setUpdateModalOpen(true);
       };
    const handleAddOpen = () => {

        setAddModalOpen(true);
       };
       const handleDelete = async (row)=>{
        console.log(row)
        if(row.id){
          try{

            const res = await deleteUnit({id: row.id});
            await refetch({userId: userInfo.user.id})
          } catch(error) {
            console.log(error)
          }
        } else{
          toast.info("Default Unit can't be deleted");
        }
       }
  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
      <Table>
        <TableHead>
          <TableRow>
            
            
            <TableCell sx={tableCellStyle}>Unit</TableCell>
            <TableCell sx={tableCellStyle}></TableCell>
           
           
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? <>Loading..</> : data?.map((row, index) => (
            <TableRow key={index}>
              
              <TableCell sx={tableCellValueStyle}>{row.label}</TableCell>
              <TableCell sx={tableCellValueStyle}>
                <IconButton
                  aria-label="edit"
                  size="small"
                  onClick={() => handleUpdateOpen(row)} // Pass row data to the function
                >
                  <img src={EditIcon} alt="" style={{width:'35px'}}/>
                </IconButton>
                <IconButton aria-label="delete" size="small">
                  <img src={DeleteIcon} alt="" style={{width:'35px'}} onClick={() => handleDelete(row)}/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UnitsTable;