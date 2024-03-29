import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import moment from 'moment';
import { Stack, styled } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers';


const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})(({ theme, isInDateRange, isSelected, isHovered, isStartRange, isEndRange, isStartRange1, isEndRange1, day, isInDateRange1 }) => ({
    color:'#666666',
    ...(isSelected && {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover, &:focus': {
            backgroundColor: 'red',
            borderRadius: '18px 18px 18px 18px',
        },
    }),
    ...(isHovered && {
        backgroundColor: theme.palette.primary[theme.palette.mode],
        '&:hover, &:focus': {
            backgroundColor: 'red',
            borderRadius: '18px 18px 18px 18px',
        },
    }),
    ...(isInDateRange && {
        backgroundColor: '#2D9CDB80',
        borderRadius: 0,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary[theme.palette.mode],
        },
        color: 'white'
    }), // Fix: Closing parenthesis was missing here
    ...(isInDateRange1 && {
        backgroundColor: '#90BE6D80',
        borderRadius: 0,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.secondary[theme.palette.mode],
        },
        color:'white'
    }), // Fix: Corrected the condition to isInDateRange1
    ...(day.day() === 0 && {
        borderRadius: '18px 0 0 18px',
    }),
    ...(day.day() === 6 && {
        borderRadius: '0px 18px 18px 0px',
    }),
    ...(isStartRange && {
        borderRadius: '18px 0 0 18px',
    }),
    ...(isEndRange && {
        borderRadius: '0px 18px 18px 0',
    }),
    ...(isStartRange1 && {
        borderRadius: '18px 0 0 18px',
    }),
    ...(isEndRange1 && {
        borderRadius: '0px 18px 18px 0',
    }),

}));

const isInDateRange = (day, startRange, endRange) => {

    return moment(day).isBetween(startRange, endRange,null,[]);
}



const Day = (props) =>{
    const  {day, startRange, endRange,startRange1, endRange1, hoveredDay, selectedDay, ...other} = props;
    return (
        <CustomPickersDay
        {...other}
        day={day}
        disableMargin
        selected={false}
        isInDateRange={isInDateRange(day, startRange, endRange)}
        isInDateRange1={isInDateRange(day, startRange1, endRange1)}
        isStartRange={day.isSame(startRange, 'day')}
        isEndRange={day.isSame(endRange, 'day')}
        isStartRange1={day.isSame(startRange1, 'day')}
        isEndRange1={day.isSame(endRange1, 'day')}
        style={{border:0}}
         />
    )
}

const DaysAllottedCalendar = () => {
    const [value,setValue] = useState(moment())
    const [hoveredDay, setHoveredDay] = useState(null);
    const startRange = moment('2024-02-11');
    const endRange = moment('2024-02-20');
    const startRange1 = moment('2024-02-21');
    const endRange1 = moment('2024-02-23');
  return (
    <Stack alignItems={'center'} justifyContent={'center'} width={'100%'} height={'100%'}>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateCalendar
      sx={{width:'250px', height:'250px', backgroundColor:'#F5F5F5', padding:1, borderRadius: 1}}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      views={['day']}
      slots={{day: Day}}
      slotProps={{
        day: (ownerState) => ({
            selectedDay: value,
            startRange,
            endRange,
            hoveredDay,
            startRange1,
            endRange1,
            onPointerEnter: () => setHoveredDay(ownerState.day),
            onPointerLeave: () => setHoveredDay(null),
        })
      }}
      readOnly
      />
    </LocalizationProvider>
    </Stack>
  )
}

export default DaysAllottedCalendar
