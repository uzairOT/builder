import React, { useState } from 'react';
import { Box, Divider, Typography } from "@mui/material";
import ChatView from "../../Chat/ChatView";
import Header from "../Header/Header";
import Table from "../Tables/MasterLineTable";
import Pagination from "@mui/material/Pagination";
import AddModal from '../../dialogues/Settings/AddModal';
import UpdateModal from '../../dialogues/Settings/UpdateModal';

import { useOutletContext } from 'react-router-dom';
import UnitsTable from '../Tables/UnitsTable';
// import AddUnitModal from '../../dialogues/Settings/EditUnitModal';
import EditUnitModal from '../../dialogues/Settings/EditUnitModal';
import AddUnitModal from '../../dialogues/Settings/AddUnitModal';
import { useGetUnitsQuery } from '../../../redux/apis/Project/userProjectApiSlice';
import { useSelector } from 'react-redux';

function Units() {


  const [isAddModalOpen, setAddModalOpen] = useState(false); 
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); 
  const userInfo = useSelector((state) => state.auth.userInfo);
  const {data, isLoading, refetch} = useGetUnitsQuery({userId: userInfo.user.id});
  const [unit, setUnit] = useState('');

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
      <Header title="Units"   OpenAddModal={OpenAddModal}/>
      <UnitsTable setUpdateModalOpen={setUpdateModalOpen} setAddModalOpen={setAddModalOpen} setUnit={setUnit} data={data} isLoading={isLoading} refetch={refetch} />

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
      {/* <AddModal title={"Master Line Item"} open={isAddModalOpen} onClose={handleCloseAddModal}  userInfo={userInfo}  setUserInfo={setUserInfo} addAdminButton={handleAssignRoleButton} /> */}
    <AddUnitModal  open={isAddModalOpen} onClose={handleCloseAddModal} refetch={refetch}/>
     <EditUnitModal unit={unit} open={isUpdateModalOpen} onClose={handleCloseUpdateModal} refetch={refetch} userId={userInfo.user.id}/>
    </div>
  );
}

export default Units;

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