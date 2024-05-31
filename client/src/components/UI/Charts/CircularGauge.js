import { Box, Typography } from "@mui/material";
import React from "react";
import GaugeComponent from "react-gauge-component";

const CircularGauge = ({ progress }) => {
  console.log("aiaa kiaa?", progress);
  const gaugeOptions = {
    type: "radial",
    arc: {
      subArcs: [
        { limit: 40, color: "#FF5732" },
        { limit: 60, color: "#82B811" },
      ],
      padding: "1px",
      width: "0.11",
      gradient: false,
    },
    labels: {
      tickLabels: {
        type: "inner",
        hideMinMax: true,
      },
      valueLabel: {
        style: {
          fontSize: "42px",
          fill: "#443B5A",
          textShadow: "none",
          fontWeight: "700",
        },
      },
    },
  };
  return (
    <Box
      sx={{
        width: { xs: 180, md: 150, lg: 150, xl: 180 },
        textAlign: "center",
      }}
    >
      <GaugeComponent
        value={progress}
        {...gaugeOptions}
        // pointer={{
        //   animate: true,
        //   elastic: true,
        //   animationDelay: 5,
        //   animationDuration:5000
        // }}
      />
      <Typography textAlign={"center"}>Progress</Typography>
    </Box>
  );
};

export default CircularGauge;
