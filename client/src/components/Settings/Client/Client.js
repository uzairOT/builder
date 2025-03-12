import React, { useEffect, useState } from 'react';
import { Box, Divider, Typography } from "@mui/material";
import Header from "../Header/Header";
import CustomTable from "../Tables/Table";
import Pagination from "@mui/material/Pagination";
import AddModal from '../../dialogues/Settings/AddModal';
import UpdateModal from '../../dialogues/Settings/UpdateModal';
import { useOutletContext } from 'react-router-dom';
import QueryDebouncer from '../../../utils/QueryDebouncer/QueryDebouncer';
import { useTranslation } from 'react-i18next';
function Client() {

  const {t} = useTranslation()
  const [isAddModalOpen, setAddModalOpen] = useState(false); 
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); 
  const [page, setPage]= useState(1);
  const [totalEntries, setTotalEntries] = useState(0)
  const [totalPages, setTotalPages] = useState(0);
  const [userInfo, setUserInfo, handleAssignRoleButton, userId, setUserId, handleUpdateAssignRole] = useOutletContext();
  const [searchInput, setSearchInput] = useState("");
  const debouncedValue =  QueryDebouncer(searchInput,500);
  const [refreshData, setRefreshData] = useState(true);
  // console.log(debouncedValue)
  useEffect(()=>{
    //console.log(userInfo);
  },[userInfo])
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
      <Header title={t("Settings.client")}   OpenAddModal={OpenAddModal} searchInput={searchInput} setSearchInput={setSearchInput}/>
      <CustomTable setUpdateModalOpen={setUpdateModalOpen} refreshData={refreshData} setUserId={setUserId} searchInput={debouncedValue}  setTotalEntries={setTotalEntries} setTotalPages={setTotalPages} page={page}/>

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
      <AddModal title={t("Settings.client")} open={isAddModalOpen} refreshData={refreshData}  setRefreshData={setRefreshData} onClose={handleCloseAddModal} userInfo={userInfo}  setUserInfo={setUserInfo} addAdminButton={handleAssignRoleButton}/>
      <UpdateModal title={t("Settings.client")} open={isUpdateModalOpen} refreshData={refreshData} setRefreshData={setRefreshData} onClose={handleCloseUpdateModal} userId={userId} setUserId={setUserId} handleUpdateAssignRole={handleUpdateAssignRole}  userInfo={userInfo}  setUserInfo={setUserInfo}/>
    </div>
  );
}

export default Client;
const tableCellStyle = {
  fontWeight: 400,
  fontSize: "14px",
  fontFamily: 'var(--main-font-family)',
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
const paginationTextStyle = {
 
  display: {
    xs: 'none', 
    md: 'block', 
  },
  fontWeight: 400,
  fontSize: "14px",
  fontFamily: 'var(--main-font-family)',
  color: "#8C8C8C",

};


