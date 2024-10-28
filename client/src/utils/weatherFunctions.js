
export function getWeatherIcon(weatherDes) {
    weatherDes = weatherDes ? weatherDes.toLowerCase() : '';
  
    if (weatherDes.includes("clear")) {
      return '/images/clearSky.svg';
    } else if (weatherDes.includes("clouds")) {
      return '/images/clouds.svg';
    } else if (weatherDes.includes("broken clouds")) {
      return '/images/cloudy.svg';
    } else if (weatherDes.includes("few clouds")) {
      return '/images/clearSky.svg';
    } else if (weatherDes.includes("scattered clouds")) {
      return '/images/cloudyDay.svg'; 
    } else if (weatherDes.includes("rain")) {
      return '/images/rainyDay.svg';
    } else if (weatherDes.includes("drizzle")) {
      return '/images/drizzle.svg';
    } else if (weatherDes.includes("thunderstorm")) {
      return '/images/storm.svg'; 
    } else if (weatherDes.includes("snow")) {
      return '/images/snow.svg';
    } else {
      return '/images/mist.svg';
    }
  }
  