import { Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useGetTotalProjectProfitMarginMutation } from '../../../redux/apis/Reports/reportsApiSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { formatMoney } from '../../../utils/Formatters/moneyFormat';

const MonitoringFinances = ({projectId, userId}) => {

    const [getProjectDeadlineStats, { data, error, isLoading }] =
    useGetTotalProjectProfitMarginMutation();
  const [projects, setProjects] = useState();
  const fetchProfitStats = async () => {
    try {
      const result = await getProjectDeadlineStats({
        userId,
        projectId,
      }).unwrap();
      setProjects(result);
      console.log(
        "Success useGetTotalProjectProfitMarginMutation Results Results Results:",
        result
      );
    } catch (err) {
      console.error("Failed to fetch reports stats:", err);
    }
  };

  useEffect(() => {
    fetchProfitStats();
  }, []);
  const phase = data?.projects[0]?.Phases
  console.log(phase)
    const cost = 754245;
        // Format the cost to appear as $7,542.45
        const formattedCost = (cost).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    
  return (
    <Stack p={1} pl={3} pr={3} spacing={2} height={'205px'}>
        {/* <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}><Typography sx={themeStyle.label}>Approved Price</Typography><Typography sx={themeStyle.price}>{formattedCost}</Typography></Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}><Typography sx={themeStyle.label}>Collected</Typography><Typography sx={themeStyle.price}>{formattedCost}</Typography></Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}><Typography sx={themeStyle.label}>Remaining Balance</Typography><Typography sx={themeStyle.price}>{formattedCost}</Typography></Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}><Typography sx={themeStyle.label}>Cost to Complete</Typography><Typography sx={themeStyle.price}>{formattedCost}</Typography></Stack> */}
        {phase?.map((item, index)=>{
          if(index >3){
            return<></>
          }
            return(
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={0.5}><Typography sx={themeStyle.label}>{item?.phase_name}</Typography><Typography sx={themeStyle.price}>${formatMoney(item?.totalCost)}</Typography></Stack>
            )
        })}
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={0.5} ><Typography width={'100px'} overflow={'hidden'} sx={themeStyle.label}>Total Cost</Typography><Typography sx={themeStyle.price}>${formatMoney(data?.totalCost)}</Typography></Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={0.5}><Typography sx={themeStyle.label}>Projected Margin</Typography><Typography sx={themeStyle.price}>${formatMoney(data?.totalMargin)}</Typography></Stack>
    </Stack>
  )
}

export default MonitoringFinances

const themeStyle = {
    label: {
        fontSize: {xl:'13px', lg:10.5, md:"13px", xs:"13px"},
        color: '#2F2F2F',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '500',
        whiteSpace: 'nowrap',

        
    },
    price: {
      
        fontSize: '14px',
        color: '#4C8AB1',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '600',
        width:'30ch',
        overflow:'hidden',
        textOverflow: 'ellipsis',
        textAlign:'right'
    }
}