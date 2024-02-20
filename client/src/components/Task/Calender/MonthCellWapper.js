import React from 'react'
import PartlySunny from './assets/partly-cloudy.png'
import { Box, Stack, Typography } from '@mui/material'
import moment from 'moment';

const currentDate = moment(new Date());
const currentFormattedDate = currentDate.format('M/D/YYYY');
const currentMonth = currentDate.format("MMM")

const MonthCellWapper = ({props, isDrawerOpen, monthView, isProjectPage}) => {

  const month = moment(props.value).format('MMM');

  const date = moment(props.value.toString()).format('M/D/YYYY');
  const isCurrentDay = currentFormattedDate === date;

  const isCurrentMonth = currentMonth === month;
  console.log("isProjectPage: ", isProjectPage)
  let backgroundColor;
  if(isCurrentDay){
    backgroundColor = '#4C8AB1';
  } else if(isCurrentMonth){
    backgroundColor = 'transparent';
  }
  else{
    backgroundColor= '#E8E8E8'
  }

  if(monthView !== 'tasks'){return (
    <Stack border={'1px solid'} borderRadius={'4px 4px 4px 4px'} borderColor={'#31313159'} m={0.2} pt={isDrawerOpen ? 1 : 3} flexWrap={'wrap'} sx={{backgroundColor: backgroundColor}}>
        <Stack direction={'row'} justifyContent={isDrawerOpen ? 'space-between':'space-evenly'}>
        <img src={PartlySunny} alt='logo' width={isDrawerOpen ?  '30%' : '60%'} height={'100%'} style={{marginTop: '4px'}}></img>
        <Stack alignSelf={'flex-end'} ml='-15px' spacing={isDrawerOpen ? 1 : 0} pr={isDrawerOpen ? 1 : 0}>
        <Typography fontSize={isDrawerOpen ? '12px' : '10px'} fontWeight={'700'} color={isCurrentDay ? 'white': '#FFCB45'}>Sunny</Typography>
        <Typography fontSize={isDrawerOpen ? '14px' : '12px'} fontWeight={'700'} color={isCurrentDay ? 'white': '#FFCB45'} textAlign={'right'}>23°</Typography>
        </Stack>
        </Stack>
    </Stack>
  )} else {
    return(
      <Stack border={'1px solid'} width={'100%'} borderRadius={'4px 4px 4px 4px'} borderColor={'#31313159'} m={0.2} pt={isDrawerOpen ? 1 : 3} flexWrap={'wrap'} sx={{backgroundColor: backgroundColor}}>
     
      </Stack>
    )
  }
}

export default MonthCellWapper