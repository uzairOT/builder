import React, { useState } from 'react';
import { Box, Divider, Typography } from "@mui/material";
import ChatView from "../../Chat/ChatView";
import Header from "../Header/Header";
import CustomTable from "../Tables/Table";
import Pagination from "@mui/material/Pagination";
import AddModal from '../../dialogues/Settings/AddModal';
import UpdateModal from '../../dialogues/Settings/UpdateModal';
import { useOutletContext } from 'react-router-dom';
function ProjectManager() {


  const [isAddModalOpen, setAddModalOpen] = useState(false); 
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); 
  const [userInfo, setUserInfo, handleAssignRoleButton, userId, setUserId, handleUpdateAssignRole] = useOutletContext();
  const PROJECT_MANAGER_VIEW = 'projectManager';

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
      <Header title="Project manager"   OpenAddModal={OpenAddModal}/>
      <CustomTable setUpdateModalOpen={setUpdateModalOpen} setUserId={setUserId} />

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
        {/* <Pagination count={10} variant="outlined" shape="rounded"   sx={paginationStyle}/> */}
      </Box>
      <AddModal title={"Project manager"} open={isAddModalOpen} onClose={handleCloseAddModal}  userInfo={userInfo}  setUserInfo={setUserInfo} addAdminButton={handleAssignRoleButton} />
      <UpdateModal title={"Project manager"} open={isUpdateModalOpen} onClose={handleCloseUpdateModal} userId={userId} setUserId={setUserId} handleUpdateAssignRole={handleUpdateAssignRole}  userInfo={userInfo}  setUserInfo={setUserInfo} />
    </div>
  );
}

export default ProjectManager;

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