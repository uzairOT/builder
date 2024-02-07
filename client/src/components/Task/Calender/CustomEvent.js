import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import PartlySunny from './assets/partly-cloudy.png'
import moment from 'moment';
import ScheduleIcon from '@mui/icons-material/Schedule';

const CustomEventDay = ({event}) => {
  return (
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} height={'inherit'} spacing={0.2} borderRadius={'6px'} borderRight={'6px solid #563c91'}>
        <Stack height={'inherit'} flex={2} justifyContent={'center'}>
            <Typography sx={themeStyle.eventTask} fontSize={'10px'}>Task:</Typography>
            <Typography sx={themeStyle.eventTask} fontSize={'10px'} overflow={'hidden'}>{event?.data?.task}</Typography>
        </Stack >
        <Stack sx={themeStyle.weather}  max-height={'90%'} max-width={'50%'} alignItems={'center'} justifyContent={'center'} flex={1} spacing={-0.5}>
            <img src={PartlySunny} alt={PartlySunny} style={themeStyle.eventIcon} fontSize={'10px'}></img>
            <Typography sx={themeStyle.eventText} fontSize={'10px'}>{event?.data?.weather?.temp}</Typography>
            <Typography sx={themeStyle.eventText} fontSize={'10px'}>{event?.data?.weather?.description}</Typography>
        </Stack>
        <Stack flex={2} justifyContent={'center'} alignItems={'center'} max-height={'100%'} pl={1} width={'100%'}>
            <Typography sx={{...themeStyle.eventNote}} fontSize={'10px'}>{`Note: ${event?.data?.note}`}</Typography>
        </Stack>
    </Stack>
  )
}
const CustomEventWeek = ({event}) => {
    return (
        <>
            <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} borderRight={'6px solid #563c91'} borderRadius={'6px'} height={'100%'} pl={1}>
                <Box>
                <Typography sx={themeStyle.eventTask} textOverflow={'ellipsis'} height={'100%'} fontSize={'10px'} overflow={'hidden'}>{event?.data?.task}</Typography>
                </Box>
                <Box margin={'auto'}>
                <img src={PartlySunny} alt={PartlySunny} style={themeStyle.eventIcon} fontSize={'10px'}></img>
                </Box>
            </Stack>
            
        </>
        
    )
}

const CustomEventWeekOnModal = ({event}) => {
    const start = moment(event.start).format('HH:mm');
    const end = moment(event.end).format('HH:mm');
    return (
        <Stack  borderRight={'6px solid #563c91'} borderRadius={'6px'} height={'100%'}>
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
                    <Typography sx={themeStyle.eventNote} height={'40px'} width={'115px'} pt={1} textOverflow={'ellipsis'} fontSize={'6px'}>{`Note: ${event?.data?.note}`}</Typography>
                </Box>
                <Box flex={1} textAlign={'right'}>
                    <Typography overflow={'hidden'} textOverflow={'ellipsis'} fontSize={'10px'}>{`${event?.data?.weather?.description}`}</Typography>
                    <Typography  fontSize={'12px'}> {`${event?.data?.weather?.temp}°`}</Typography>
                </Box>
            </Stack>
            
        </Stack>
        
    )
}

const CustomEventMonthTasks = ({events}) => {
    return(
        <>
        <Typography>Tasks</Typography>
        </>
    )
}
const CustomEventMonthWeatherNotes = ({events}) => {
    return(
        <>
        <Typography>Weather/Notes</Typography>
        </>
    )
}

export {CustomEventDay, CustomEventWeek, CustomEventWeekOnModal, CustomEventMonthTasks, CustomEventMonthWeatherNotes}

const themeStyle = {
    eventTask: {
        fontSize: '10px',
        textOverflow: 'ellipsis',
        color: '#454545'
    },
    eventNote: {
        fontSize: '10px',
        textOverflow: 'ellipsis',
        fontStyle: 'italic',
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
    }
}