import React, { useEffect, useState } from 'react';
import { Box, Divider, PaginationItem, Typography } from "@mui/material";
import Header from "../Header/Header";
import CustomTable from "../Tables/Table";
import Pagination from "@mui/material/Pagination";
import AddModal from '../../dialogues/Settings/AddModal';
import UpdateModal from '../../dialogues/Settings/UpdateModal';
import QueryDebouncer from '../../../utils/QueryDebouncer/QueryDebouncer';
import { useTranslation } from 'react-i18next';




function Employee() {
  
  const {t} = useTranslation();
  const [userId, setUserId] = useState();
  const [isAddModalOpen, setAddModalOpen] = useState(false); 
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [page, setPage]= useState(1);
  const [totalEntries, setTotalEntries] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [searchInput, setSearchInput] = useState(""); 
  const debouncedValue =  QueryDebouncer(searchInput,500);
  const [refreshData, setRefreshData] = useState(true);
  const ADMIN_VIEW = 'admin';
 
  useEffect(()=> {
    //console.log("Admin useEffect userId: ", userId)
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

  const handlePageChange = (event, newValue) => {
    setPage(newValue)
  }
 
  let startIndex = 1;
  let endIndex = 10;
  if(page===1){
    startIndex = 1;
    if(totalEntries < 10){
      endIndex = totalEntries;
    }
  }else{
    startIndex = 1 + (10*(page-1));
    endIndex = 10*page;
    if(endIndex > totalEntries){
      endIndex = endIndex -totalEntries;
      endIndex = (startIndex + endIndex) -1;
    }
  }
  useEffect(()=>{
    setPage(1)
  },[debouncedValue])

//console.log(userId)
  return (
    <div style={{padding:"20px"}}>
      <Header title={t("Settings.employee")}   OpenAddModal={OpenAddModal} searchInput={searchInput} setSearchInput={setSearchInput}/>
      <CustomTable refreshData={refreshData} setUpdateModalOpen={setUpdateModalOpen} userId={userId} setUserId={setUserId} searchInput={debouncedValue} setTotalEntries={setTotalEntries} setTotalPages={setTotalPages} page={page}/>

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
          Showing data {startIndex} to {endIndex} of {totalEntries} entries
        </Typography>
        <Pagination
        renderItem={(item) => (
          <PaginationItem
          sx={{margin:"1px 3px"}}
            {...item}
          />
        )}
        count={totalPages} variant="outlined" shape="rounded" page={page}  onChange={handlePageChange} sx={paginationStyle}/>
      </Box>
      <AddModal title={t("Settings.employee")} refreshData={refreshData} setRefreshDat={setRefreshData} open={isAddModalOpen} onClose={handleCloseAddModal} />
      <UpdateModal title={t("Settings.employee")} refreshData={refreshData} setRefreshData={setRefreshData} open={isUpdateModalOpen} onClose={handleCloseUpdateModal} userId={userId} setUserId={setUserId} />
    </div>
  );
}

export default Employee;

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