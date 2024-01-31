import { Box, Stack, Typography } from '@mui/material'
import dailyForecast from './assets/data/dailyForecast.json'
import React from 'react'
import WeatherAppDailyForecast from './WeatherAppDailyForecast'
import WeatherAppCurrentForecast from './WeatherAppCurrentForecast'

const WeatherView = () => {
  return (
    <Stack direction={{md:'column', lg: 'row'}} spacing={2} padding={2}>
    <Box flex={2}>
      <Typography style={themeStyle.title}>Good morning, Admin</Typography>
      <Stack direction="row" justifyContent={'space-evenly'} spacing={1} pl={2.5} pr={2.5}>
     {dailyForecast.map( (forecast) => (
      <WeatherAppDailyForecast key={forecast.id} forecast={forecast} />
          ))}
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
      padding: '16px'
    },
  };