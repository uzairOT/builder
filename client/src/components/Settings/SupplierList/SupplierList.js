import React, { useState } from 'react';
import { Box, Divider, Typography } from "@mui/material";
import ChatView from "../../Chat/ChatView";
import Header from "../Header/Header";
import CustomTable from "../Tables/Table";
import Pagination from "@mui/material/Pagination";
import AddModal from '../../dialogues/Settings/AddModal';
import UpdateModal from '../../dialogues/Settings/UpdateModal';
import { useOutletContext } from 'react-router-dom';
import QueryDebouncer from '../../../utils/QueryDebouncer/QueryDebouncer';
import { useEffect } from 'react';
function SupplierList() {

  const [isAddModalOpen, setAddModalOpen] = useState(false); 
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); 
  const [userInfo, setUserInfo, handleAssignRoleButton, userId, setUserId, handleUpdateAssignRole] = useOutletContext();
  const [page, setPage]= useState(1);
  const [totalEntries, setTotalEntries] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [searchInput, setSearchInput] = useState("");
  const debouncedValue =  QueryDebouncer(searchInput,500);
  const [refreshData, setRefreshData] = useState(true);
  const SUPPLIER_LIST_VIEW = 'supplierList';

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


  const handlePageChange = (event, newValue) => {
    setPage(newValue)
  }
  console.log(totalEntries)
 
  let startIndex = 1;
  let endIndex = 6;

  if(page===1){
    startIndex = 1;
    if(totalEntries < 6){
      endIndex = totalEntries;
    }
  }else{
    startIndex = 1 + (6*(page-1));
    endIndex = 6*page;
    if(endIndex > totalEntries){
      endIndex = totalEntries;
    }
  }
  if(totalEntries === undefined){
    startIndex = 0;
    endIndex = 0;
  }

  useEffect(()=>{
    setPage(1)
  },[debouncedValue])
  return (
    <div style={{padding:"20px"}}>
      <Header title="Supplier"   OpenAddModal={OpenAddModal} searchInput={searchInput} setSearchInput={setSearchInput}/>
      <CustomTable refreshData={refreshData} setUpdateModalOpen={setUpdateModalOpen}  setUserId={setUserId} searchInput={debouncedValue} setTotalEntries={setTotalEntries} setTotalPages={setTotalPages} page={page}/>

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
          Showing data {startIndex} to {endIndex} of {totalEntries === undefined ? 0 : totalEntries} entries
        </Typography>
        <Pagination count={totalPages} variant="outlined" shape="rounded" page={page}  onChange={handlePageChange}  sx={paginationStyle}/>
      </Box>
      <AddModal title={"Supplier"} refreshData={refreshData} setRefreshData={setRefreshData} open={isAddModalOpen} onClose={handleCloseAddModal}  userInfo={userInfo}  setUserInfo={setUserInfo} addAdminButton={handleAssignRoleButton} />
      <UpdateModal title={"Supplier"} refreshData={refreshData} setRefreshData={setRefreshData} open={isUpdateModalOpen} onClose={handleCloseUpdateModal} userId={userId} setUserId={setUserId} handleUpdateAssignRole={handleUpdateAssignRole}  userInfo={userInfo}  setUserInfo={setUserInfo} />
    </div>
  );
}

export default SupplierList;
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