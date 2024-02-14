import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import WeatherAppDailyForecast from './WeatherAppDailyForecast'
import WeatherAppCurrentForecast from './WeatherAppCurrentForecast'
import CircularProgress from '@mui/material/CircularProgress'

const WeatherView = ({dailyForecast, loading, error}) => {
  console.log(dailyForecast)
 
  return (
    <Stack direction={{xs:'column-reverse',xm:'column-reverse',md:'column-reverse', lg: 'row'}} spacing={2} padding={2}>
    <Box flex={2}>
      <Typography style={themeStyle.title}>Good morning, Admin</Typography>
      <Stack direction="row" justifyContent={'space-evenly'} alignItems={'center'}  height={'50%'} spacing={1} pl={1} pr={2.5}>
     {!loading ?  dailyForecast?.map( (forecast, index) => (
      <>
      <WeatherAppDailyForecast key={index} forecast={forecast} />
      {error}
      </>
          )): <CircularProgress></CircularProgress>
          }
          
      </Stack>
    </Box>
    <Box flex={1} display={"flex"} width={'100%'}>
      <WeatherAppCurrentForecast />
    </Box>
  </Stack>
  )
}

export default WeatherView

const themeStyle = {
    title: {
      color: "var(--Link-Text, #4C8AB1)",
      fontFamily: "inherit",
      fontSize: "22px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "20px" /* 90.909% */,
      padding: '16px',
      paddingLeft: '24px'
    },
  };