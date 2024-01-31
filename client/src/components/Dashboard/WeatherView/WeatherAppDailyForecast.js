import React from 'react';
import { Stack, Paper, Typography, Divider, Box } from '@mui/material';

const WeatherAppDailyForecast = ({ forecast }) => {
    return (
        <Stack key={forecast.id} justifyContent='center' alignItems='center'>
            <Paper sx={themeStyle.dailyForecastBubble}>
                <Typography sx={themeStyle.dailyForecastBubbleText}>{forecast.day}</Typography>
                <Divider variant="fullWidth" />
                <Box
                    component="img"
                    src={forecast.icon}
                    alt="/"
                    sx={themeStyle.dailyForecastBubbleImg}
                ></Box>
                <Typography sx={{...themeStyle.dailyForecastBubbleText, fontSize: '16px'} }>{forecast.temp}</Typography>
            </Paper>
        </Stack>
    );
};

const themeStyle = {
    dailyForecastBubbleText: {
      textAlign: "center",
      fontFamily: "Montserrat, sans-serif",
      fontWeight: "600",
      fontSize: "12px",
    },
    dailyForecastBubbleImg: {
      width: "50px",
      height: "50px",
    },
    dailyForecastBubble: {
      borderRadius: '13px',
      width: '72px',
      textAlign: 'center'
    }
  };

export default WeatherAppDailyForecast;
