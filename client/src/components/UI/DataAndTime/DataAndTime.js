import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const DateAndTime = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
  }, []);

  return (
    <Box sx={themeStyle.contianer}>
      <Typography variant="h2" sx={themeStyle.time}>
        {currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </Typography>
      <Typography variant="subtitle1" sx={themeStyle.date}>
        {currentDate.toLocaleDateString([], {
          weekday: "long",
          day: "numeric",
          month: "short",
        })}
      </Typography>
    </Box>
  );
};

export default DateAndTime;

const themeStyle = {
  contianer: { textAlign: "center", paddingBottom: 4 },
  time: {
    fontSize: { xs: "50px", md: "50px", xl: "71px" },
    color: "#FFAC00",
    fontFamily: "inherit",
    fontWeight: "300",
  },
  date: {
    fontSize: { xs: "14px", md: "14px", xl: "19px" },
    color: "#4C8AB1",
    fontWeight: "400",
  },
};
