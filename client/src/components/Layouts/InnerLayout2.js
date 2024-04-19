import { Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import MonitoringFinances from '../Projects/ProjectsDefault/MonitoringFinances'
import ProjectInfoAndTeam from '../Projects/ProjectsDefault/ProjectInfoAndTeam'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab,  { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import ChangeOrder from '../Projects/ProjectsDefault/ChangeOrder'
import BuilderProButton from '../UI/Button/BuilderProButton'
import ChangeOrderRequest from '../dialogues/ChangeOrderRequest/ChangeOrderRequest'
import { useNavigate, useParams } from "react-router-dom";

const InnerLayout2 = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
      navigate(`/projects/${id}/change-order`);
      // setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  return (
   <>
   <Stack direction={{xl:'row', lg:'row', md:'column'}} pt={1} spacing={1}>
        {/* Monitoring And Accounting */}
        <Stack flex={{xl:2}}display={{xl:"flex",lg:'none'}}><Paper style={themeStyle.border}><MonitoringFinances /></Paper></Stack>
        <Stack flex={{xl:8,lg:7}}><Paper style={themeStyle.border}><ProjectInfoAndTeam /></Paper></Stack>
        </Stack>
        <Stack direction={{xl:'row',}} pt={1} spacing={1} sx={{height:'80%'}}>
        <Outlet />
        {/* Change Order Tab navigation */}
        <Stack flex={1} >
          <Paper style={{...themeStyle.border, height:'71vh', width: '99%'}}>
          {/* First Item of Stack */}
          <Stack>
          <Typography p={3} pb={1} color={'#4C8AB1'}>Change Order</Typography>
          <Tabs defaultValue={0} sx={{backgroundColor: 'transparent'}}>
            <TabList sx={{
              [`& .${tabClasses.root}[aria-selected="true"]`]: {
                boxShadow: '0',
                bgcolor: 'white',
                "--Tab-indicatorColor": "#4C8AB1",
                "--Tab-indicatorRadius": "28px",
                "--Tab-indicatorThickness": "3.5px",
                "--Tab-indicatorSize": "70%",
                fontWeight: "500",
              },
              boxShadow: 'none',
            }}>
            <Tab sx={{fontFamily: 'Poppins, sans serif', fontSize:'15px'}}>Pending</Tab>
            <Tab sx={{fontFamily: 'Poppins, sans serif', fontSize:'15px'}}>Approved</Tab>
            <Tab sx={{fontFamily: 'Poppins, sans serif', fontSize:'15px'}}>Declined</Tab>
            </TabList>
            <TabPanel sx={{padding: 0, width:{xl:'26vw'}}} value={0}>
          <ChangeOrder />
            </TabPanel>
            <TabPanel sx={{padding: 0, width:'495px'}} value={1}>
          <ChangeOrder />
            </TabPanel>
            <TabPanel sx={{padding: 0, width:'495px'}} value={2}>
          <ChangeOrder />
            </TabPanel>
          </Tabs>
          </Stack>
            {/* Second Item of Stack */}
            <Stack alignItems={'flex-end'} pr={4} pt={2}>
            <BuilderProButton variant={'contained'} fontFamily={'GT-Walsheim-Regular-Trial, sans-serif'} fontSize={'14px'} backgroundColor={'#4C8AB1'} handleOnClick={handleOpen}>Change Order Request</BuilderProButton>
            {
                open && <ChangeOrderRequest handleClose={handleClose} handleOpen={handleOpen} heading={'Change Order'} admin={true}/>
            }
            </Stack>
          </Paper>
          </Stack>
        </Stack>
   </>
    
  )
}

export default InnerLayout2

const themeStyle = {
    border: {
      borderRadius: '14px'
    },
    
   }