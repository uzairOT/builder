import moment from "moment";

const API_KEY = '003ed04f67528d396b90b9fba45d1278';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({...searchParams, appId: API_KEY});

    return fetch(url).then(response => response.json());
}


const formatCurrentWeather = (data) =>{
    const {
        coord: {lat, lon},
        main: {temp, humidity, feels_like},
        weather,
        wind: {speed},
        name,
        sys: {country}
    } = data;
    const {main: details, icon} = weather[0];

    return {lat, lon, temp, feels_like, speed, name, country, details, icon, humidity}
}

export const getFormattedWeatherData = async (searchParams) =>{
    const formattedCurrentWeather = await getWeatherData('weather', searchParams)
    .then(formatCurrentWeather);
    return formattedCurrentWeather
}

export const getFormattedFiveDayWeather = async (searchParams) => {
    const forecastData = await getFiveDayForcast(searchParams);
    const formattedFiveDayWeather = formatFiveDayWeather(forecastData);

    return formattedFiveDayWeather;
}

const getFiveDayForcast = async (searchParams) => {
    const forecastData = await getWeatherData('forecast', searchParams);
    return forecastData.list;
  
}

const formatFiveDayWeather = async (forecastData) => {
    const formattedData =[];

    const currentDate = moment().format('YYYY-MM-DD');
    for(const forecast of forecastData) {
        const forecastDate  = forecast.dt_txt.split(' ')[0];
        const forecastTime  = forecast.dt_txt.split(' ')[1];

        const formattedDay = moment(forecastDate).format('ddd'); // Formats day to 'Mon', 'Tue', etc.
     
        const  {main , weather} = forecast;

        const {temp} = main;
        const {main: weatherDetails} = weather[0];
        if(forecastTime === '09:00:00' && forecastDate !== currentDate){

            formattedData.push({day: formattedDay, temp, weatherDetails});
        }
        }
        return formattedData;
    }
