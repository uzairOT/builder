import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import WeatherAppDailyForecast from "./WeatherAppDailyForecast";
import WeatherAppCurrentForecast from "./WeatherAppCurrentForecast";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

const WeatherView = ({
  dailyForecast,
  loading,
  error,
  userGreetings = "Admin",
}) => {
  //console.log(dailyForecast)
  const userInfo = useSelector((state) => state.auth.userInfo);
  const firstName = userInfo?.user?.firstName;

  return (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
        md: "row",
        lg: "row",
        xl: "row",
      }}
      spacing={2}
      padding={2}
    >
      <Box flex={{md:2, xs:0}}>
        <Typography display={{md:'block', xs:'none'}} sx={themeStyle.title}>
          Good Morning, {firstName ? `${firstName}` : userGreetings}
        </Typography>
        <Stack
          direction="row"
          justifyContent={{ xl: "flex-start", lg: "space-evenly", md: "center" }}
          alignItems={"center"}
          height={"50%"}
          spacing={1}
          pl={3}
          pr={2.5}
          flexWrap={"wrap"}
          display={{md:'flex', xs:'none'}}
        >
          {(!loading && Array.isArray(dailyForecast)) ? (
            dailyForecast?.map((forecast, index) => (
              <React.Fragment key={index}>
                <WeatherAppDailyForecast
                  key={index}
                  forecast={forecast}
                />
                {error}
              </React.Fragment>
            ))
          ) : (
            <Stack
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <CircularProgress></CircularProgress>
            </Stack>
          )}
        </Stack>
      </Box>
      <Box flex={1} display={"flex"} flexDirection={'column'} width={"100%"}>
      <Typography display={{md:'none', xs:'block'}} sx={themeStyle.title}>
          Good Morning, {firstName ? `${firstName}` : userGreetings}
        </Typography>
        <WeatherAppCurrentForecast />
      </Box>
    </Stack>
  );
};

export default WeatherView;

const themeStyle = {
  title: {
    color: "var(--Link-Text, #4C8AB1)",
    fontFamily: 'var(--main-font-family)',
    fontSize: {xs:'18px',sm:'18px', md:'18px',lg:'22px',xl:"22px"},
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "20px" /* 90.909% */,
    padding: "16px",
    paddingLeft: "24px",
  },
};
