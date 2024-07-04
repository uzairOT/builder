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
import QueryDebouncer from '../../../utils/QueryDebouncer/QueryDebouncer';
import { useEffect } from 'react';

function Units() {

  const [searchInput, setSearchInput] = useState("");
  const debouncedValue =  QueryDebouncer(searchInput,500);
  const [isAddModalOpen, setAddModalOpen] = useState(false); 
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); 
  const [page, setPage]= useState(1);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const {data, isLoading, refetch, error} = useGetUnitsQuery({userId: userInfo.user.id, q:debouncedValue, page:page});
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
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  let startIndex = 1;
  let endIndex = data?.limit;
  if (page === 1) {
    startIndex = 1;
    if (data?.totalCount < data?.limit) {
      endIndex = data?.totalCount;    }
  } else {
    startIndex = 1 +( data?.limit * (page - 1));
    endIndex = data?.limit * page;
    if (endIndex > data?.totalCount) {
      endIndex = data?.totalCount;
      
    }
  }

  useEffect(()=>{
    setPage(1);
    refetch({userId: userInfo.user.id, q:debouncedValue, page:1})
  },[debouncedValue])
  return (
    <div style={{padding:"20px"}}>
      <Header title="Units"   OpenAddModal={OpenAddModal} searchInput={searchInput} setSearchInput={setSearchInput}/>
      <UnitsTable error={error} setUpdateModalOpen={setUpdateModalOpen} setAddModalOpen={setAddModalOpen} setUnit={setUnit} data={data} isLoading={isLoading} debouncedValue={debouncedValue} refetch={refetch} page={page}  />

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
          Showing data {startIndex} to {endIndex} of {data?.totalCount} entries
        </Typography>
        <Pagination count={data?.totalPages} variant="outlined" shape="rounded" page={page} onChange={handlePageChange}  sx={paginationStyle}/>
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