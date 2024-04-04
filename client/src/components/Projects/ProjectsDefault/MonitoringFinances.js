import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useGetProjectFinancesQuery } from '../../../redux/apis/Project/projectApiSlice';

const MonitoringFinances = () => {
    const {data} = useGetProjectFinancesQuery({projectId:1})
    const cost = 754245;
        // Format the cost to appear as $7,542.45
        const formattedCost = (cost).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    
  return (
    <Stack p={1} pl={3} pr={3} spacing={2}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}><Typography sx={themeStyle.label}>Approved Price</Typography><Typography sx={themeStyle.price}>{formattedCost}</Typography></Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}><Typography sx={themeStyle.label}>Collected</Typography><Typography sx={themeStyle.price}>{formattedCost}</Typography></Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}><Typography sx={themeStyle.label}>Remaining Balance</Typography><Typography sx={themeStyle.price}>{formattedCost}</Typography></Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}><Typography sx={themeStyle.label}>Cost to Complete</Typography><Typography sx={themeStyle.price}>{formattedCost}</Typography></Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}><Typography sx={themeStyle.label}>Projected Profit</Typography><Typography sx={themeStyle.price}>{formattedCost}</Typography></Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}><Typography sx={themeStyle.label}>Projected Margin</Typography><Typography sx={themeStyle.price}>{formattedCost}</Typography></Stack>
    </Stack>
  )
}

export default MonitoringFinances

const themeStyle = {
    label: {
        fontSize: '13px',
        color: '#2F2F2F',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '500',
    },
    price: {
        fontSize: '14px',
        color: '#4C8AB1',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '600',
    }
}