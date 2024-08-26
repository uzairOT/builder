import React from 'react';
import { Stack, Paper, Typography, Divider, Box } from '@mui/material';
import Clouds from './assets/images/clouds.png'
import Rain from './assets/images/rain.png'
import Thunderstorm from './assets/images/thunderstorm.png'
import Drizzle from './assets/images/drizzle.png'
import Clear from './assets/images/sunny.png'
import { useSelector } from 'react-redux';


const WeatherAppDailyForecast = ({ forecast }) => {
  const query = useSelector(state => state.dailyForecast.query);
  let weatherIcon;
    switch (forecast.weatherDetails){
      case 'Clouds':
      weatherIcon = Clouds;
      break;
      case 'Rain':
      weatherIcon = Rain;
      break;
      case 'Thunderstorm':
      weatherIcon = Thunderstorm;
      break;
      case 'Drizzle':
      weatherIcon = Drizzle;
      break;
      case 'Clear':
      weatherIcon = Clear;
      break;
      default:
      //console.log('Can not fetch weather icon');
      break
    }


    return (
        <Stack key={forecast.id} justifyContent='center' alignItems='center' pr={{xl:2, lg:1, md:2, xs:2}}>
            <Paper sx={themeStyle.dailyForecastBubble}>
                <Typography sx={themeStyle.dailyForecastBubbleText}>{forecast.day}</Typography>
                <Divider variant="fullWidth" />
                <Box
                    component="img"
                    src={weatherIcon}
                    alt="/"
                    sx={themeStyle.dailyForecastBubbleImg}
                ></Box>
                <Typography sx={{...themeStyle.dailyForecastBubbleText, fontSize: '14px'} }>{Math.round(forecast.temp)}°{query.temperatureUnit === 'metric' ? 'C' :'F'}</Typography>
            </Paper>
        </Stack>
    );
};

const themeStyle = {
    dailyForecastBubbleText: {
      textAlign: "center",
      fontFamily: 'var(--main-font-family)',
      fontWeight: "600",
      fontSize: {xl:"12px", lg:"10px", md:"10px", xs:"10px"},
      textTransform: 'uppercase',
    },
    dailyForecastBubbleImg: {
      width: "40px",
      height: "40px",
    },
    dailyForecastBubble: {
      borderRadius: '13px',
      width: {xl:'70px', lg:'55px', xs:'65px'},
      textAlign: 'center',
      backgroundColor: '#F7F9FC',
    }
  };

export default WeatherAppDailyForecast;
