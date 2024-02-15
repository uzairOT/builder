import React, { useEffect, useState } from "react";
import { Box, Typography, MenuItem, Select, Stack } from "@mui/material";
import SunnyWindy from "./assets/images/sunny-windy.png";
import HumidityImg from './assets/images/humidity.png'
import WindImg from './assets/images/wind.png'
import {getFormattedWeatherData} from "../../../services/WeatherService";
// import { WiHumidity, WiStrongWind } from 'react-icons/wi';

const WeatherAppCurrentForecast = () => {

  const [temperatureUnit, setTemperatureUnit] = useState("metric");
  const [currentWeather, setCurrentWeather] = useState({})

  const handleUnitChange = (event) => {
    setTemperatureUnit(event.target.value);
  };

useEffect(()=>{  
    const fetchWeather = async () => {
    try {
      const data = await getFormattedWeatherData({lat: "33.6844", lon: "73.0479", units: temperatureUnit});
      console.log(data);
      setCurrentWeather(data);} catch(error) { console.log(error); 
      }
  }
  fetchWeather();}, [temperatureUnit])

  return (
    <Box display={"flex"} flexDirection={"row-reverse"} sx={{justifyContent:{xl: 'space-between', lg:'space-between', md: 'center'}}} width={'100%'}>
  
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width={'100%'}
      >
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width={'100%'}>

          <Box  display={'flex'} flexDirection={'row'} justifyContent={'start'} alignItems={'flex-start'}>
          <Box
            component="img"
            src={SunnyWindy}
            alt="SunnyWindy"
            sx={themeStyle.image}
          />
          <Box display={'flex'} flexDirection={'column'}>
            <Typography sx={{...themeStyle.text, }} variant="h4">
              {currentWeather?.temp}
            </Typography>
            <Typography sx={{...themeStyle.text, fontSize: '13px'}}>Feels like: {' '}
            <span sx={{fontSize: '18px', display: 'inline'}}>
            {currentWeather?.feels_like}°C
            </span>
            </Typography>
          </Box>
          </Box>
          <Box sx={themeStyle.degreeDropdown} justifyContent={'flex-end'} pl={1}> 
        <Select
          size="small"
          sx={themeStyle.degreeDropdownMenu}
          value={temperatureUnit}
          onChange={handleUnitChange}
        >
          <MenuItem value="metric">Celsius</MenuItem>
          <MenuItem value="imperial">Fahrenheit</MenuItem>
        </Select>
      </Box>
        </Box>
        <Box display={'flex'} flexDirection={'row'} sx={{justifyContent:{xl:'left', lg:'left', md:'center', sm:'center', xs:'center'}}} width={'100%'}>
        {/* Humidity */}
        <Stack display="flex" flexDirection={'column'} alignItems="center" pl={4} spacing={1}>
          <Box component={'img'} src={HumidityImg} alt="Humdity" />
          <Typography sx={{...themeStyle.text}} variant="body2">{currentWeather?.humidity}%</Typography>
          <Typography sx={{...themeStyle.text}} variant="body2">Humidity</Typography>
        </Stack>

        {/* Wind Speed */}
        <Stack display="flex" flexDirection={'column'} alignItems="center" pl={6} spacing={1}>
          <Box component={'img'} src={WindImg} alt="Wind Speed" />
          <Typography sx={{...themeStyle.text}} variant="body2">{currentWeather?.speed}km/h</Typography>
          <Typography sx={{...themeStyle.text}} variant="body2">Wind speed</Typography>
        </Stack>
      </Box>
        </Box>
    </Box>
  );
};

const themeStyle = {
  degreeDropdown: {
    display: "flex",
    alignSelf: 'flex-start',
    justifySelf: 'flex-end',
  },
  degreeDropdownMenu: {
    borderRadius: "50px",
    fontFamily: "inherit",
    color: "#616161",
    fontSize: "13px",
    height: "28px",
  },
  degreeDropdownMenuItem: {
    paddingLeft: "20px",
  },
  image: {
    width: "100px",
    height: "100px",
  },
  text: {
    color: '#4C8AB1',
  }
};

export default WeatherAppCurrentForecast;
