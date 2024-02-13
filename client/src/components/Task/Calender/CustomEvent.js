import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import PartlySunny from './assets/partly-cloudy.png'
import moment from 'moment';
import ScheduleIcon from '@mui/icons-material/Schedule';

const CustomEventDayTasks = ({event}) => {
  return (
    <Stack sx={themeStyle.eventBox} direction={'row'} justifyContent={'space-between'} alignItems={'center'} height={'inherit'} spacing={0.2} borderRadius={'6px'} borderRight={'6px solid #563c91'}>
        <Stack sx={themeStyle.weather}  max-height={'90%'} max-width={'50%'} alignItems={'center'} justifyContent={'center'} flex={1} spacing={-0.5}>
            <img src={PartlySunny} alt={PartlySunny} style={themeStyle.eventIcon} fontSize={'10px'}></img>
            <Typography sx={themeStyle.eventText} fontSize={'10px'}>{event?.data?.weather?.temp}</Typography>
            <Typography sx={themeStyle.eventText} fontSize={'10px'}>{event?.data?.weather?.description}</Typography>
        </Stack>
        <Stack height={'inherit'} pl={0.5} flex={2} justifyContent={'center'}>
            <Typography sx={themeStyle.eventTask} fontSize={'10px'} fontStyle={'italic'} color={'#454545'} fontWeight={'300'}>Work Order:</Typography>
            <Typography sx={themeStyle.eventTask} fontSize={'10px'} overflow={'hidden'} fontWeight={'500'}>{event?.data?.task}</Typography>
        </Stack >
    </Stack>
  )
}
const CustomEventDayNotes = ({event}) => {
  return (
    <Stack sx={themeStyle.eventBox} direction={'row'} justifyContent={'space-between'} alignItems={'center'} height={'inherit'} spacing={0.2} borderRadius={'6px'} borderRight={'6px solid #563c91'}>
        <Stack sx={themeStyle.weather}  max-height={'90%'} max-width={'50%'} alignItems={'center'} justifyContent={'center'} flex={1} spacing={-0.5}>
            <img src={PartlySunny} alt={PartlySunny} style={themeStyle.eventIcon} fontSize={'10px'}></img>
            <Typography sx={themeStyle.eventText} fontSize={'10px'}>{event?.data?.weather?.temp}</Typography>
            <Typography sx={themeStyle.eventText} fontSize={'10px'}>{event?.data?.weather?.description}</Typography>
        </Stack>
        <Stack flex={2} pl={0.5} justifyContent={'center'}>
            <Typography sx={themeStyle.eventTask} fontSize={'10px'} fontStyle={'italic'} color={'#454545'} fontWeight={'300'}>Note:</Typography>
            <Typography sx={{...themeStyle.eventNote}}fontSize={'10px'} height={'inherit'} overflow={'hidden'} fontWeight={'500'}>{`${event?.data?.note}`}</Typography>
        </Stack>
    </Stack>
  )
}
const CustomEventWeek = ({event}) => {
    return (
        <Stack sx={themeStyle.eventBox} height={'100%'} borderRight={'6px solid #563c91'} borderRadius={'6px'} >
            <Stack  direction={'row'} justifyContent={'space-between'} alignItems={'center'} pl={0.5}>
                <Box  >
                <Typography height={'30px'} width={'40px'} sx={themeStyle.eventTask} textOverflow={'ellipsis'} overflow={'hidden'} fontSize={'7px'} >{event?.data?.task}</Typography>
                </Box>
                <Box width={'fit-content'}>
                <img src={PartlySunny} alt={PartlySunny} width={'fit-content'} style={themeStyle.eventIcon} fontSize={'10px'}></img>
                </Box>
            </Stack>
            <Box pl={0.5}>
                <Typography  fontSize={'7px'} height={'40px'} width={'100%'}>{event?.data?.note}</Typography>
            </Box>

        </Stack>

    )
}

const CustomEventWeekOnModal = ({event}) => {
    const start = moment(event.start).format('HH:mm');
    const end = moment(event.end).format('HH:mm');
    return (
        <Stack sx={themeStyle.eventBox} borderRight={'6px solid #563c91'} borderRadius={'6px'} height={'100%'}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} pl={1} pr={1} flex={1}>
                <Box flex={1}>
                <Typography sx={themeStyle.eventTask} textOverflow={'ellipsis'} fontSize={'8px'} overflow={'hidden'}>{event?.data?.task}</Typography>
                </Box>
                <Stack flex={1} direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={0}>
                <ScheduleIcon fontSize='6px' color='#1C1C1C' fontWeight={'200'}></ScheduleIcon> 
                <Typography color={"#1C1C1C"} textOverflow={'ellipsis'} height={'100%'} fontSize={'9px'} overflow={'hidden'} textAlign={'center'} fontWeight={'300'}>
                  {`${start}-${end}`}
                </Typography>
                </Stack>
                <Box>
                <img src={PartlySunny} alt={PartlySunny} style={themeStyle.eventIcon} fontSize={'8px'}></img>
                </Box>
            </Stack>
            <Stack direction={'row'} pl={1} pr={1} flex={1}>
                <Box flex={1} alignSelf={'flex-end'} height={'100%'} >
                    <Typography sx={themeStyle.eventNote} height={'40px'} width={'100%'} pt={1} textOverflow={'ellipsis'} fontSize={'6px'}>{`Note: ${event?.data?.note}`}</Typography>
                </Box>
                <Box flex={1} textAlign={'right'}>
                    <Typography overflow={'hidden'} textOverflow={'ellipsis'} fontSize={'10px'}>{`${event?.data?.weather?.description}`}</Typography>
                    <Typography  fontSize={'12px'}> {`${event?.data?.weather?.temp}°`}</Typography>
                </Box>
            </Stack>
            
        </Stack>
        
    )
}

const CustomEventMonthTasks = ({event}) => {
    return(
        <Box sx={{background: '#C7EBE8'}} height={'100%'}>
        <Typography fontSize={'10px'} color={'#454545'}>{event?.data?.task}</Typography>
        </Box>
    )
}
const CustomEventMonthWeatherNotes = ({event, isDrawerOpen}) => {
        console.log("isDrawer open in CustomEventMonthWeatherNotes: ",isDrawerOpen);
    return(
        <Stack width={'fit-content'} backgroundColor={'transparent'}  alignItems={'flex-end'} pl={1} pt={4}>
            <Typography fontSize={'10px'} sx={themeStyle.eventNote} overflow={'hidden'}height={'47px'} width={isDrawerOpen ? '100%' : '42px'}>Note: {event?.data?.note}</Typography>
        </Stack>
    )
}

export {CustomEventDayTasks,CustomEventDayNotes, CustomEventWeek, CustomEventWeekOnModal, CustomEventMonthTasks, CustomEventMonthWeatherNotes}

const themeStyle = {
    eventTask: {
        fontSize: '10px',
        textOverflow: 'ellipsis',
        color: '#454545',
        fontFamily: 'Inter, sans-serif',
    },
    eventNote: {
        fontSize: '10px',
        textOverflow: 'ellipsis',
        fontStyle: 'italic',
        fontFamily: 'Inter, sans-serif',
    },
    weather:{
        backgroundColor: '#5F97BA',
        color: '#FFF',
        borderRadius: '10px',
        paddingTop: 0.1,
        paddingBottom: 0.1,
        paddingLeft: 0.5,
        paddingRight: 0.5,
        textAlign: 'center',
    },
    eventIcon: {
        width: '30px',
        height: '30px',
    },
    eventBox:{
        boxShadow: 'rgba(0, 0, 0, 0.03) 0px 0.46875rem 2.1875rem, rgba(0, 0, 0, 0.03) 0px 0.9375rem 1.40625rem, rgba(0, 0, 0, 0.05) 0px 0.25rem 0.53125rem, rgba(0, 0, 0, 0.03) 0px 0.125rem 0.1875rem',
        backgroundColor: "#F3F3F3",
    }
}