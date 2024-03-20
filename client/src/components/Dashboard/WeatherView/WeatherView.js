import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import WeatherAppDailyForecast from './WeatherAppDailyForecast'
import WeatherAppCurrentForecast from './WeatherAppCurrentForecast'
import CircularProgress from '@mui/material/CircularProgress'

const WeatherView = ({dailyForecast, loading, error, userGreetings='Good Morning, Admin'}) => {
  console.log(dailyForecast)

  return (
    <Stack direction={{xs:'column-reverse',xm:'column-reverse',md:'column-reverse', lg: 'column-reverse', xl:'row'}} spacing={2} padding={2}>
    <Box flex={2}>
      <Typography style={themeStyle.title}>{userGreetings}</Typography>
      <Stack direction="row" justifyContent={{xl:'flex-start', lg:'center', md:'center'}} alignItems={'center'}  height={'50%'} spacing={1} pl={3} pr={2.5} flexWrap={'wrap'}>
     {!loading ?  dailyForecast?.map( (forecast, index) => (
      <>
      <WeatherAppDailyForecast key={forecast.day} forecast={forecast} />
      {error}
      </>
          )):<Stack width={'100%'} justifyContent={'center'} alignItems={'center'}><CircularProgress></CircularProgress></Stack> 
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