import React from 'react'
import {  CircularProgress, Stack, Typography } from '@mui/material'
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectMonth, selectProjectWeather, selectWeatherLoading } from '../../../redux/slices/Project/projectWeather';
import { getTempUnit } from '../../../redux/slices/DailyForecast/dailyForecastSlice';
import { getWeatherIcon } from '../../../utils/weatherFunctions';

const currentDate = moment(new Date());
const currentFormattedDate = currentDate.format('M/D/YYYY');
const getTemperatureByDate = (date, projectWeather, temperatureUnit) => {
  const formattedDate = moment(date).format('YYYY-MM-DD');
  const weatherData = projectWeather.find(entry => entry.date === formattedDate);
  let temperature = weatherData ? weatherData.temperature : '';
  const weatherDes = weatherData ? weatherData.weatherDescription : 'No data';
  if (temperature !== '') {
    if (temperatureUnit === 'imperial') {
      temperature = ((temperature * 9/5) + 32).toFixed(2);
    } 
    // temperature = temperature?.toFixed(2);
  }
  return { temperature, weatherDes };
};



// Function to get the color based on the weather description
function getWeatherColor(weatherDes, isCurrentDay) {
  weatherDes = weatherDes.toLowerCase(); // Ensure case-insensitivity

  switch (weatherDes) {
    case 'clear sky':
      return isCurrentDay ? 'white' : '#DAA520'; // Gold for clear skies
    case 'clouds':
      return isCurrentDay ? 'white' : '#B0C4DE'; // Light steel blue for clouds
    case 'broken clouds':
      return isCurrentDay ? 'white' : '#A9A9A9'; // Dark gray for broken clouds
    case 'few clouds':
      return isCurrentDay ? 'white' : '#D3D3D3'; // Light gray for few clouds
    case 'scattered clouds':
      return isCurrentDay ? 'white' : '#B0C4DE'; // Light steel blue for scattered clouds
    case 'rain':
      return isCurrentDay ? 'white' : '#4C8AB1'; // Dodger blue for rain
    case 'drizzle':
      return isCurrentDay ? 'white' : '#87CEEB'; // Sky blue for drizzle
    case 'thunderstorm':
      return isCurrentDay ? 'white' : '#FF4500'; // Orange red for thunderstorms
    case 'snow':
      return isCurrentDay ? 'white' : '#ADD8E6'; // Light blue for snow
    case 'smoke':
      return isCurrentDay ? 'white' : '#708090'; // Slate gray for smoke
    default:
      return isCurrentDay ? 'white' : 'lightgray'; // Default color
  }
}


const MonthCellWapper = ({props, isDrawerOpen, isProjectPage, monthView}) => {
  const projectWeather = useSelector(selectProjectWeather)
  const temperatureUnit = useSelector(getTempUnit)
  const isLoading = useSelector(selectWeatherLoading);
  const monthLabel = useSelector(selectMonth);
  const selectedMonth = moment(monthLabel, "MMMM YYYY").format('MMM'); // Specify the format
  const month = moment(props.value).format('MMM');
  const {temperature, weatherDes} =getTemperatureByDate(props.value, projectWeather, temperatureUnit)
  const date = moment(props.value.toString()).format('M/D/YYYY');
  const tempUnit = temperatureUnit === 'imperial' ? 'F' : 'C'
  const isCurrentDay = currentFormattedDate === date;
  const isSeletedMonth = selectedMonth === month  
  let backgroundColor;
  if(isCurrentDay){
    backgroundColor = '#4C8AB1';
  } else if(isSeletedMonth){
    backgroundColor = 'transparent';
  }
  else{
    backgroundColor= '#E8E8E8'
  }



  if(monthView !== 'tasks' && isSeletedMonth){return (
    <Stack border={'1px solid'} width={'25%'} borderRadius={'4px 4px 4px 4px'} borderColor={'#31313159'} m={0.2} pt={isDrawerOpen ? 0 : 3} flexWrap={'wrap'} sx={{backgroundColor: backgroundColor}}>
      <Stack alignSelf={'flex-end'} width={'80%'}>
        <Typography fontSize={isDrawerOpen ? '11px' : '10px'} fontWeight={'700'} textAlign={'right'} pr={0.5} pt={0.5} color={getWeatherColor(weatherDes,isCurrentDay)}>{weatherDes}</Typography>
      </Stack>
        <Stack direction={'row'} justifyContent={isDrawerOpen ? 'space-between':'space-evenly'} px={0.5} flex={1}>
        {isLoading || weatherDes === 'No data' ? <></> :<img src={getWeatherIcon(weatherDes)} alt='logo' width={'25px'} height={'25px'} style={{marginTop: '0px'}}></img>}
        <Stack alignItems={'flex-end'}  spacing={isDrawerOpen ? 1 : 0} pr={isDrawerOpen ? 0 : 0} flex={2}>
          {isLoading ? <Stack pr={1}><CircularProgress size={'12px'}/></Stack> : <>
        <Typography fontSize={isDrawerOpen ? '14px' : '12px'} fontWeight={'700'} color={getWeatherColor(weatherDes, isCurrentDay)} textAlign={'right'}>{temperature ? `${temperature}\u00B0${tempUnit}` : ''}</Typography>
          </>}
        </Stack>
        </Stack>
    </Stack>
  )} else {
    return(
      <Stack  border={'1px solid'} width={'25%'} borderRadius={'4px 4px 4px 4px'} borderColor={'#31313159'} m={0.2} pt={isDrawerOpen ? 1 : 3} flexWrap={'wrap'} sx={{backgroundColor: backgroundColor}}>
     
      </Stack>
    )
  }
}

export default MonthCellWapper