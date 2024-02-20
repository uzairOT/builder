import { Box, Stack } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled } from "@mui/material/styles";

import React from "react";

const StyledText = styled("text")(({ theme, color }) => ({
  fill: color,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: '16px',
  fontFamily: "Inter, sans serif",
  color: theme.palette.text.color,
}));

function PieCenterLabel({ children }) {
  return (
    <StyledText x={65} y={70} color="#45A5F6">
      {children}
    </StyledText>
  );
}
function PieCenterLabel2({ children }) {
  return (
    <StyledText x={65} y={100} color="#888888">
      {children}
    </StyledText>
  );
}

const ReportsPieChart = () => {
   const data= [
        { id: 0, value: 20, color: "#1F9EF3, #1B59F800" },
        { id: 1, value: 80, color: "#eff5ff" },
      ];
  return (
    <Stack 
    width={'130px'}
    height="100%"
    justifyContent={'center'}
    >
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 20, color: "#1F9EF3, #1B59F800" },
              { id: 1, value: 80, color: "#eff5ff" },
            ],
            innerRadius: 55,
            outerRadius: 65,
            paddingAngle: 2,
            cornerRadius: 2,
            startAngle: -435,
            endAngle: 360,
            cx: 60,
            cy: 80,
          },
        ]}
        height={200}
        width={130}
        >
        <PieCenterLabel>20%</PieCenterLabel>
        <PieCenterLabel2>80%</PieCenterLabel2>
      </PieChart>
    </Stack>
  );
};

export default ReportsPieChart;
