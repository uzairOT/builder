import { Box, Stack } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled } from "@mui/material/styles";

import React from "react";

const StyledText = styled("text")(({ theme, color }) => ({
  fill: color,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: '24px',
  fontFamily: "Inter, sans serif",
  color: theme.palette.text.color,
  fontWeight: '500'
}));

function PieCenterLabel({ children }) {
  return (
    <StyledText x={90} y={125} color="#F8961E">
      {children}
    </StyledText>
  );
}
function PieCenterLabel2({ children }) {
  return (
    <StyledText x={180} y={125} color="#F94144">
      {children}
    </StyledText>
  );
}

const BudgetPieChart = () => {
   const data= [
        { id: 0, value: 80, color: "#F8961E" },
        { id: 1, value: 20, color: "#F94144" },
      ];
  return (
    <Stack 
    width={'100%'}
    height="100%"
    justifyContent={'center'}
    alignItems={'center'}
    >
      <PieChart
        series={[
          {
            data: data,
            innerRadius: 80,
            outerRadius: 120,
            paddingAngle: 0,
            cornerRadius: 2,
            startAngle: -90,
            endAngle: 90,
            cx: 130,
            cy: 130,
          },
        ]}
        height={160}
        width={272}
        >
        <PieCenterLabel>80%</PieCenterLabel>
        <PieCenterLabel2>20%</PieCenterLabel2>
      </PieChart>
    </Stack>
  );
};

export default BudgetPieChart;
