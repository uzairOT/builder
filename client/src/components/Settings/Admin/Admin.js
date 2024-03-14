import React, { useEffect, useState } from 'react';
import { Box, Divider, Typography } from "@mui/material";
import ChatView from "../../Chat/ChatView";
import Header from "../Header/Header";
import CustomTable from "../Tables/Table";
import Pagination from "@mui/material/Pagination";
import AddModal from '../../dialogues/Settings/AddModal';
import UpdateModal from '../../dialogues/Settings/UpdateModal';

import { useOutletContext } from 'react-router-dom';




function Admin() {
  

  const [userId, setUserId] = useOutletContext();
  const [isAddModalOpen, setAddModalOpen] = useState(false); 
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); 
  const ADMIN_VIEW = 'admin';
 
  useEffect(()=> {
    console.log("Admin useEffect userId: ", userId)
  }, [userId])


  // Function to open the Add Modal
  const OpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };
  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };

console.log(userId)
  return (
    <div style={{padding:"20px"}}>
      <Header title="Admin"   OpenAddModal={OpenAddModal}/>
      <CustomTable setUpdateModalOpen={setUpdateModalOpen} userId={userId} setUserId={setUserId}/>

      <Box mt={2} mb={2}>
        <Divider />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: {xs:"center",md:"space-between"} ,
        }}
      >
        <Typography variant="body1" sx={paginationTextStyle}>
          Showing data 1 to 4 of 25 entries
        </Typography>
        <Pagination count={10} variant="outlined" shape="rounded"   sx={paginationStyle}/>
      </Box>
      <AddModal title={"Admin"} open={isAddModalOpen} onClose={handleCloseAddModal}/>
      <UpdateModal title={"Admin"} open={isUpdateModalOpen} onClose={handleCloseUpdateModal} userId={userId} setUserId={setUserId} />
    </div>
  );
}

export default Admin;

// <div><ChatView /></div>
const paginationStyle = {
  '& .MuiPaginationItem-root': {
    border: 'none',
    backgroundColor: '#EEEEEE',
    '&:hover': {
      backgroundColor: '#EEEEEE',
    },
  },
  '& .Mui-selected': {
    backgroundColor: '#FFAC00 !important', // Set background color for the selected page
    color: '#FFFFFF', // Text color for the selected page
  },
};
const paginationTextStyle = {
 
  display: {
    xs: 'none', 
    md: 'block', 
  },
  fontWeight: 400,
  fontSize: "14px",
  fontFamily: "Poppins",
  color: "#8C8C8C",

};