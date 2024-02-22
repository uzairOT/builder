import { Divider, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import OverBudgetPie from './OverBudgetPie'
import CircleIcon from '@mui/icons-material/Circle';

const OverBudgetPieChart = () => {
  return (
    <Paper
     sx={{height:'100%', borderRadius:'14px'}}>
         <Stack p={2}>
            <Typography fontFamily={'Inter, sans serif'} fontWeight={'500'} fontSize={'18px'}>
               Over Budget
            </Typography>
            <Typography fontFamily={'Inter, sans serif'} fontWeight={'500'} fontSize={'28px'}>
               $ +5,834
            </Typography>
            <Typography fontFamily={'Inter, sans serif'} fontWeight={'400'} fontSize={'12px'} color={'#4F4F4F'}>
               US Dollars
            </Typography>
        </Stack>
        <Divider variant='fullWidth' />
        <OverBudgetPie />
        <Stack direction={'row'} justifyContent={'space-around'} spacing={1} pt={2} pb={4}>
            <Stack direction={'row'} spacing={1}>
            <CircleIcon sx={{color:'#2D9CDB', fontSize: '10px', paddingTop: '4px'}} />
            <Stack direction={'column'} >
            <Typography fontFamily={'Inter, sans serif'} fontSize={'12px'}>Total</Typography>
            <Typography textAlign={'right'} fontFamily={'Inter, sans serif'} fontWeight={'500'}>$ 25,834</Typography>
            </Stack>
            </Stack>
            <Stack direction={'row'} spacing={1}>
            <CircleIcon sx={{color:'#F65E5E', fontSize: '10px', paddingTop:'4px'}} />
            <Stack direction={'column'}>
            <Typography fontFamily={'Inter, sans serif'} fontSize={'12px'}>OverBudget</Typography>
            <Typography textAlign={'center'} fontFamily={'Inter, sans serif'} fontWeight={'500'}>$ 5834.8</Typography>
            </Stack>
            </Stack>
           </Stack>
    </Paper>
  )
}

export default OverBudgetPieChart