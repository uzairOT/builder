import { Box, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import ProfitMarginStackedBarChart from './ProfitMarginStackedBarChart'
import CircleIcon from '@mui/icons-material/Circle';
import SelectMenuBarChart from './SelectMenuBarChart';

const ProfitMarginBarChartCard = () => {
      const listItems = [
        {"listItem": "List Item #1"},
        {"listItem": "List Item #1"},
        {"listItem": "List Item #1"},
      ]
  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={1} pl={2} pr={2}>
       <Typography fontSize={'20px'} fontFamily={'Inter, sans serif'} fontWeight={'500'} color={'#4C8AB1'}>Phase Name</Typography>
       <Typography color={'#606060'} fontFamily={'Inter, sans serif'} fontWeight={'500'} fontSize={'13px'}>Profit Margin</Typography>
    </Stack>
    <Divider variant='fullWidth'/>
    <SelectMenuBarChart listItems={listItems} />
    <ProfitMarginStackedBarChart />
    <Stack direction={'row'} justifyContent={'space-around'} spacing={1}>
            <Stack direction={'row'} spacing={1}>
            <CircleIcon sx={{color:'#2D9CDB', fontSize: '10px', paddingTop: '4px'}} />
            <Stack direction={'column'} >
            <Typography fontFamily={'Inter, sans serif'} fontSize={'12px'}>Total</Typography>
            <Typography textAlign={'right'} fontFamily={'Inter, sans serif'} fontWeight={'500'}>$ 25,834</Typography>
            </Stack>
            </Stack>
            <Stack direction={'row'} spacing={1}>
            <CircleIcon sx={{color:'#90BE6D', fontSize: '10px', paddingTop:'4px'}} />
            <Stack direction={'column'}>
            <Typography fontFamily={'Inter, sans serif'} fontSize={'12px'}>Profit Margin</Typography>
            <Typography textAlign={'center'} fontFamily={'Inter, sans serif'} fontWeight={'500'}>$ +5,166.8</Typography>
           <Typography textAlign={'center'} color={'#90BE6D'} fontSize={'22px'} fontWeight={'600'} fontFamily={'Inter, sans serif'}>20%</Typography>
            </Stack>
            </Stack>
           </Stack>
    </>
  )
}

export default ProfitMarginBarChartCard
