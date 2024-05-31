import { Box, Stack } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled } from "@mui/material/styles";

import React from "react";

const StyledText = styled("text")(({ theme, color }) => ({
  fill: color,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: "18px",
  fontFamily: "Inter, sans serif",
  color: theme.palette.text.color,
  fontWeight: "500",
}));
function PieCenterLabel({ children, x, y, color }) {
  return (
    <StyledText x={x} y={y} color={color}>
      {children}
    </StyledText>
  );
}
// function PieCenterLabel({ children }) {
//   return (
//     <StyledText x={60} y={125} color="#F8961E">
//       {children}
//     </StyledText>
//   );
// }
// function PieCenterLabel2({ children }) {
//   return (
//     <StyledText x={120} y={125} color="#F94144">
//       {children}
//     </StyledText>
//   );
// }
// function PieCenterLabel3({ children }) {
//   return (
//     <StyledText x={180} y={125} color="green">
//       {children}
//     </StyledText>
//   );
// }

const BudgetPieChart = ({
  overduePercentage,
  paidPercentage,
  unpaidPercentage,
}) => {
  const data = [
    { id: 0, value: parseFloat(unpaidPercentage), color: "#F8961E" },
    { id: 1, value: parseFloat(overduePercentage), color: "#F94144" },
    { id: 2, value: parseFloat(paidPercentage), color: "green" },
  ];

  return (
    <Stack
      width={"100%"}
      height="100%"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <PieChart
        series={[
          {
            data: data,
            innerRadius: 80,
            outerRadius: 120,
            paddingAngle: 0,
            cornerRadius: 2,
            startAngle: 90,
            endAngle: 446,
            cx: 150,
            cy: 150,
            labelRadius: 140,
          },
        ]}
        height={300}
        width={300}
      >
        <PieCenterLabel x={150} y={120} color="#F8961E">
          {`${unpaidPercentage}% `}
        </PieCenterLabel>
        <PieCenterLabel x={150} y={150} color="#F94144">
          {`${overduePercentage}% `}
        </PieCenterLabel>
        <PieCenterLabel x={150} y={180} color="green">
          {`${paidPercentage}% `}
        </PieCenterLabel>
      </PieChart>
    </Stack>
  );
};

export default BudgetPieChart;
