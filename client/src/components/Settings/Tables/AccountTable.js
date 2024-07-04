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

function AmountTable({setUpdateModalOpen, setAccount,setAddModalOpen, data, isLoading, refetch, debouncedValue, page, deleteUserAccount, error}) {
    const userInfo = useSelector((state) => state.auth.userInfo);
   
 

    const handleUpdateOpen = (row) => {
        setAccount(row)
        setUpdateModalOpen(true);
       };
    const handleAddOpen = () => {

        setAddModalOpen(true);
       };
       const handleDelete = async (row)=>{
        console.log(row)
        if(row.id){
          try{

            const res = await deleteUserAccount({id: row.id});
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
            
            
            <TableCell sx={tableCellStyle}>Account Name</TableCell>
            <TableCell sx={tableCellStyle}>Account Details</TableCell>
            {/* <TableCell sx={tableCellStyle}>Account Number</TableCell> */}
            <TableCell sx={tableCellStyle}>Account Link</TableCell>
            <TableCell sx={tableCellStyle}>Action</TableCell>
           
           
          </TableRow>
        </TableHead>
        {error ?  <Stack p={2}>{'Something went wrong!'}</Stack>  : <TableBody>
          {isLoading ? <>Loading..</> : data?.accounts.map((row, index) => (
            <TableRow key={index}>
              
              <TableCell sx={tableCellValueStyle}>{row.accountName}</TableCell>
              <TableCell sx={tableCellValueStyle}>{row.accountType}</TableCell>
              {/* <TableCell sx={tableCellValueStyle}>{row.accountNumber}</TableCell> */}
              <TableCell sx={tableCellValueStyle}>{row.accountLink}</TableCell>
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
        </TableBody>}
      </Table>
    </TableContainer>
  );
}

export default AmountTable;