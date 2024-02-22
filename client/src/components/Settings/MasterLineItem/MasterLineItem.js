import React, { useState } from 'react';
import { Box, Divider, Typography } from "@mui/material";
import ChatView from "../../Chat/ChatView";
import Header from "../Header/Header";
import Table from "../Tables/MasterLineTable";
import Pagination from "@mui/material/Pagination";
import AddModal from '../../dialogues/Settings/AddModal';
import UpdateModal from '../../dialogues/Settings/UpdateModal';

function MasterLine() {


  const [isAddModalOpen, setAddModalOpen] = useState(false); 
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); 

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


  return (
    <div style={{padding:"20px"}}>
      <Header title="Master Line Item"   OpenAddModal={OpenAddModal}/>
      <Table setUpdateModalOpen={setUpdateModalOpen} />

      <Box mt={2} mb={2}>
        <Divider />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body1" sx={tableCellStyle}>
          Showing data 1 to 4 of 25 entries
        </Typography>
        <Pagination count={10} variant="outlined" shape="rounded"   sx={paginationStyle}/>
      </Box>
      <AddModal title={"Master Line Item"} open={isAddModalOpen} onClose={handleCloseAddModal} />
      <UpdateModal title={"Master Line Item"} open={isUpdateModalOpen} onClose={handleCloseUpdateModal} />
    </div>
  );
}

export default MasterLine;
const tableCellStyle = {
  fontWeight: 400,
  fontSize: "14px",
  fontFamily: "Poppins",
  color: "#8C8C8C",
};
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