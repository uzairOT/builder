import { Box, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import BudgetPieChart from './BudgetPieChart'
import CircleIcon from '@mui/icons-material/Circle';
import SelectMenuBarChart from './SelectMenuBarChart';

const BudgetPieChartCard = () => {
  return (
    <>
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={1} pl={2} pr={2}>
       <Typography fontSize={'20px'} fontFamily={'Inter, sans serif'} fontWeight={'500'} color={'#4C8AB1'}>Phase Name</Typography>
       <Typography color={'#606060'} fontFamily={'Inter, sans serif'} fontWeight={'500'} fontSize={'13px'}>Total Amount</Typography>
    </Stack>
    <Divider variant='fullWidth'/>
    <Stack>
       <SelectMenuBarChart />
       <BudgetPieChart />
       <Typography pl={3} fontFamily={'Inter, sans serif'} fontWeight={'500'} fontSize={'24px'}>$ 31000.8</Typography>
       <Typography pl={3} fontFamily={"Inter, sans serif"} fontSize={'12px'} color={'#4F4F4F'}>Total</Typography>
       <Stack direction={'row'} justifyContent={'space-around'} spacing={1} pt={2} pb={4}>
            <Stack direction={'row'} spacing={1}>
            <CircleIcon sx={{color:'#F8961E', fontSize: '10px', paddingTop: '4px'}} />
            <Stack direction={'column'} >
            <Typography fontFamily={'Inter, sans serif'} fontSize={'12px'}>Used</Typography>
            <Typography textAlign={'right'} fontFamily={'Inter, sans serif'} fontWeight={'500'}>$ 25,834</Typography>
            </Stack>
            </Stack>
            <Stack direction={'row'} spacing={1}>
            <CircleIcon sx={{color:'#F94144', fontSize: '10px', paddingTop:'4px'}} />
            <Stack direction={'column'}>
            <Typography fontFamily={'Inter, sans serif'} fontSize={'12px'}>Remaining</Typography>
            <Typography textAlign={'center'} fontFamily={'Inter, sans serif'} fontWeight={'500'}>$ 5166.8</Typography>
            </Stack>
            </Stack>
           </Stack>
        <Divider variant='fullWidth' />
        <Stack p={1.5}>
        <Typography textAlign={'center'} fontSize={'15px'} fontFamily={'Inter, sans serif'} fontWeight={'500'} color={'#4C8AB1'}>Generate Invoice</Typography>
        </Stack>
    </Stack>
    </>
  )
}

export default BudgetPieChartCard
