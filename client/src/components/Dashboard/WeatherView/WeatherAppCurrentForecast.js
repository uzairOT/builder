import React, { useEffect, useState } from "react";
import { Box, Typography, MenuItem, Select, Stack } from "@mui/material";
import SunnyWindy from "./assets/images/sunny-windy.png";
import HumidityImg from "./assets/images/humidity.png";
import WindImg from "./assets/images/wind.png";
import { getFormattedWeatherData } from "../../../services/WeatherService";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import {
  setDailyForecast,
  setTemperatureUnit,
} from "../../../redux/slices/DailyForecast/dailyForecastSlice";
import { getWeatherIcon } from "../../../utils/weatherFunctions";
// import { setTemperatureUnit } from "../../../redux/slices/Weather/weatherSlice";
// import { WiHumidity, WiStrongWind } from 'react-icons/wi';

const WeatherAppCurrentForecast = () => {
  const { t } = useTranslation();
  const query = useSelector((state) => state.dailyForecast.query);
  const dispatch = useDispatch();
  const [currentWeather, setCurrentWeather] = useState({});
  const handleUnitChange = (event) => {
    dispatch(setDailyForecast([]));
    dispatch(setTemperatureUnit(event.target.value));
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getFormattedWeatherData({
          lat: query.lat,
          lon: query.lon,
          units: query.temperatureUnit,
        });
        //console.log(data);
        setCurrentWeather(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeather();
  }, [query]);

  return (
    <Box
      display={"flex"}
      flexDirection={"row-reverse"}
      sx={{
        justifyContent: {
          xl: "space-between",
          lg: "space-between",
          md: "center",
          xs:'center'
        },
      }}
      width={"100%"}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width={"100%"}
      >
        <Box
          display={"flex"}
          justifyContent={{md:"start", xs:'center'}}
          alignItems={"center"}
          width={"100%"}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"flex-start"}
          >
            <Box
              component="img"
              src={getWeatherIcon(currentWeather?.details)}
              alt="SunnyWindy"
              sx={themeStyle.image}
            />
            <Box display={"flex"} flexDirection={"column"}>
              <Typography sx={{ ...themeStyle.text }} variant="h4">
                {Math.round(currentWeather?.temp ? currentWeather?.temp : 0)}°
                {query.temperatureUnit === "metric" ? "C" : "F"}
              </Typography>
              <Typography sx={{ ...themeStyle.text, fontSize: "13px" }}>
              {t('userProject.weather.title13')}{" "}
                <span sx={{ fontSize: "18px", display: "inline" }}>
                  {Math.round(
                    currentWeather?.feels_like ? currentWeather?.feels_like : 0
                  )}
                  °{query.temperatureUnit === "metric" ? "C" : "F"}
                </span>
              </Typography>
            </Box>
          </Box>
          <Box
            sx={themeStyle.degreeDropdown}
            justifyContent={"flex-end"}
            pl={1}
          >
            <Select
              size="small"
              sx={themeStyle.degreeDropdownMenu}
              value={query.temperatureUnit}
              onChange={handleUnitChange}
            >
              <MenuItem value="imperial">{t('userProject.weather.dropdown.title1')}</MenuItem>
              <MenuItem value="metric">{t('userProject.weather.dropdown.title2')}</MenuItem>
            </Select>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          sx={{
            justifyContent: {
              xl: "left",
              lg: "left",
              md: "left",
              sm: "center",
              xs: "center",
            },
          }}
          width={"100%"}
        >
          {/* Humidity */}
          <Stack
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            pl={4}
            spacing={1}
          >
            <Box component={"img"} src={HumidityImg} alt="Humdity" />
            <Typography sx={{ ...themeStyle.text }} variant="body2">
              {currentWeather?.humidity ? currentWeather?.humidity : 0}%
            </Typography>
            <Typography sx={{ ...themeStyle.text }} variant="body2">
            {t('userProject.weather.title11')}
            </Typography>
          </Stack>

          {/* Wind Speed */}
          <Stack
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            pl={6}
            spacing={1}
          >
            <Box component={"img"} src={WindImg} alt="Wind Speed" />
            <Typography sx={{ ...themeStyle.text }} variant="body2">
              {currentWeather?.speed}{" "}
              {query.temperatureUnit === "metric" ? "m/s" : "mph"}
            </Typography>
            <Typography sx={{ ...themeStyle.text }} variant="body2">
            {t('userProject.weather.title12')}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

const themeStyle = {
  degreeDropdown: {
    fontFamily: 'var(--main-font-family)',
    display: "flex",
    alignSelf: "flex-start",
    justifySelf: "flex-end",
  },
  degreeDropdownMenu: {
    borderRadius: "50px",
    fontFamily: 'var(--main-font-family)',
    color: "#616161",
    fontSize: {md:"13px", xs:"11px"},
    height: "28px",
    ".MuiOutlinedInput-notchedOutline " :{
      border: 'none',
      borderColor: 'transparent'
    }
  },
  degreeDropdownMenuItem: {
    paddingLeft: "20px",
  },
  image: {
    width: "100px",
    height: "100px",
    marginRight:'8px',
    // marginBottom: '4px'
  },
  text: {
    color: "#4C8AB1",
    fontFamily: 'var(--main-font-family)',

  },
};

export default WeatherAppCurrentForecast;
