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
          hour12: true,
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
  contianer: { paddingBottom: 4, paddingLeft: 0 },
  time: {
    fontSize: { xs: "58px", sm: '40px', md: "40px", lg: '42px', xl: "52px" },
    color: "#FFAC00",
    fontFamily: 'var(--main-font-family)',
    fontWeight: "600",
  },
  date: {
    // paddingLeft: 2,
    fontSize: { xs: "16px", sm: '14px', md: "14px", lg: '16px', xl: "18px" },
    color: "#4C8AB1",
    fontFamily: 'var(--main-font-family)',
    fontWeight: "400",
  },
};
