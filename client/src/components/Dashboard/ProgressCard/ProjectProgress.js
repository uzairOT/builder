import { Box, Typography } from "@mui/material";
import React from "react";
import CircularGauge from "../../UI/Charts/CircularGauge";

const ProjectProgress = ({ progress }) => {
  return (
    <Box width={"100%"} pl={1.5} pt={2}>
      <Typography textAlign={"left"} sx={themeStyle.title}>
        Project Progress
      </Typography>
      <CircularGauge progress={progress}/>
    </Box>
  );
};

export default ProjectProgress;

const themeStyle = {
  title: {
    fontFamily: 'var(--main-font-family)',
    color: "#202224",
    opacity: "0.7",
  },
};
