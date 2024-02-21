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
  fontWeight: '600'
}));

function PieCenterLabel({ children }) {
  return (
    <StyledText x={158} y={100} color="#F65E5E">
      {children}
    </StyledText>
  );
}
function PieCenterLabel2({ children }) {
  return (
    <StyledText x={160} y={120} color="#2D9CDB">
      {children}
    </StyledText>
  );
}

const OverBudgetPie = () => {
   const data= [
        { id: 0, value: 25, color: "#1F9EF3, #1B59F800" },
        { id: 1, value: 75, color: "#eff5ff" },
      ];
  return (
    <Stack 
    width={'100%'}
    height={"100%"}
    justifyContent={'center'}
    alignItems={'center'}
    >
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 25, color: "#F65E5E, #1B59F800" },
              { id: 1, value: 75, color: "#2D9CDB" },
            ],
            innerRadius: 40,
            outerRadius: 75,
            paddingAngle: 2,
            cornerRadius: 2,
            startAngle: -435,
            endAngle: 360,
            cx: 150,
            cy: 100,
          },
        ]}
        height={190}
        width={300}
        >
        <PieCenterLabel>25%</PieCenterLabel>
      </PieChart>
    </Stack>
  );
};

export default OverBudgetPie;
