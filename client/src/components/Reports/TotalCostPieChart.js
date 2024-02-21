import { Divider, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import TotalCostPie from './TotalCostPie'
import CircleIcon from '@mui/icons-material/Circle';

const TotalCostPieChart = () => {
  return (
    <Paper sx={{height:'100%', borderRadius:'14px'}}>
        <Stack p={2}>
            <Typography fontFamily={'Inter, sans serif'} fontWeight={'500'} fontSize={'18px'}>
               Total Cost
            </Typography>
            <Typography fontFamily={'Inter, sans serif'} fontWeight={'500'} fontSize={'28px'}>
               $ 25,834
            </Typography>
            <Typography fontFamily={'Inter, sans serif'} fontWeight={'400'} fontSize={'12px'} color={'#4F4F4F'}>
               US Dollars
            </Typography>
        </Stack>
        <Divider variant='fullWidth'/>
        <Stack justifyContent={'center'} alignItems={'center'} height={'100%'}>
        <TotalCostPie />
        <Stack direction={'column'} spacing={1} width={'70%'} pb={2} >
            <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <CircleIcon sx={{color:'#F9C74F', fontSize: '10px'}} />
            <Typography fontFamily={'Inter, sans serif'} fontSize={'12px'}>Spent Amount</Typography>
            </Stack>
            <Typography textAlign={'right'}>$ 5166.8</Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <CircleIcon sx={{color:'#45A5F6', fontSize: '10px'}} />
            <Typography fontFamily={'Inter, sans serif'} fontSize={'12px'}>Remaining Amount</Typography>
            </Stack>
            <Typography textAlign={'center'}>$ 20667.2</Typography>
            </Stack>
           </Stack>
        </Stack>
    </Paper>
  )
}

export default TotalCostPieChart
