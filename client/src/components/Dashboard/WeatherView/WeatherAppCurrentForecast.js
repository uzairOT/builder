import React, { useState } from "react";
import { Box, Typography, MenuItem, Select, Stack } from "@mui/material";
import SunnyWindy from "./assets/images/sunny-windy.png";
import HumidityImg from './assets/images/humidity.png'
import WindImg from './assets/images/wind.png'
// import { WiHumidity, WiStrongWind } from 'react-icons/wi';

const WeatherAppCurrentForecast = () => {
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");

  const handleUnitChange = (event) => {
    setTemperatureUnit(event.target.value);
  };

  return (
    <Box display={"flex"} flexDirection={"row-reverse"} justifyContent={'space-between'} width={'100%'}>
  
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width={'100%'}
      >
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width={"100%"}>
          <Box
            component="img"
            src={SunnyWindy}
            alt="SunnyWindy"
            sx={themeStyle.image}
          />

          <Box  display={'flex'} flexDirection={'column'} justifyContent={'start'} alignItems={'flex-start'} width={"100%"}>
            <Typography sx={{...themeStyle.text, }} variant="h4">
              {temperatureUnit === "celsius" ? "25°C" : "77°F"}
            </Typography>
            <Typography sx={{...themeStyle.text, fontSize: '13px'}}>Feels like: {' '}
            <span sx={{fontSize: '18px', display: 'inline'}}>
            23°C
            </span>
            </Typography>
          </Box>
          <Box sx={themeStyle.degreeDropdown} justifyContent={'flex-end'} pl={1}> 
        <Select
          size="small"
          sx={themeStyle.degreeDropdownMenu}
          value={temperatureUnit}
          onChange={handleUnitChange}
        >
          <MenuItem value="celsius">Celsius</MenuItem>
          <MenuItem value="fahrenheit">Fahrenheit</MenuItem>
        </Select>
      </Box>
        </Box>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'left'} width={'100%'}>
        {/* Humidity */}
        <Stack display="flex" flexDirection={'column'} alignItems="center" pl={4} spacing={1}>
          <Box component={'img'} src={HumidityImg} alt="Humdity" />
          <Typography sx={{...themeStyle.text}} variant="body2">60%</Typography>
          <Typography sx={{...themeStyle.text}} variant="body2">Humidity</Typography>
        </Stack>

        {/* Wind Speed */}
        <Stack display="flex" flexDirection={'column'} alignItems="center" pl={6} spacing={1}>
          <Box component={'img'} src={WindImg} alt="Wind Speed" />
          <Typography sx={{...themeStyle.text}} variant="body2">2km/h</Typography>
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
    width: '100%  '
  },
  degreeDropdownMenu: {
    borderRadius: "50px",
    fontFamily: "inherit",
    color: "#616161",
    fontSize: "16px",
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
