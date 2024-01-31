import { Box, Typography } from "@mui/material";
import React from "react";
import GaugeComponent from 'react-gauge-component';

const CircularGauge = ({value}) => {
        const gaugeOptions = {
            type: 'radial',
            arc: {
                subArcs: [
                    { limit: 20, color: '#FF5732' },
                    { limit: 50, color: '#82B811' },
                ],
                padding: '1px',
                width: '0.11',
                gradient: true,
              },
              labels:{
                tickLabels: {
                  type: "inner",
                  hideMinMax: true,
                },
                valueLabel: {
                  style: {
                    fontSize: '42px',
                    fill: '#443B5A',
                    textShadow: 'none',
                    fontWeight: '700'
                  },
                }
              },
        };
  return (
    <Box sx={{
      width: {md: 150, lg:150, xl:180}
    }}>
      <GaugeComponent {...gaugeOptions} />
      <Typography textAlign={'center'}>Progress</Typography>
    </Box>
  );
};

export default CircularGauge;
