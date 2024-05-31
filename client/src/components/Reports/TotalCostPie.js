import { Box, Stack } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled } from "@mui/material/styles";

import React from "react";

const StyledText = styled("text")(({ theme, color }) => ({
  fill: color,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: "24px",
  fontFamily: "Inter, sans serif",
  color: theme.palette.text.color,
  fontWeight: "600",
}));

function PieCenterLabel({ children }) {
  return (
    <StyledText x={160} y={95} color="#F9C74F">
      {children}
    </StyledText>
  );
}
function PieCenterLabel2({ children }) {
  return (
    <StyledText x={160} y={135} color="#2D9CDB">
      {children}
    </StyledText>
  );
}

const TotalCostPie = ({ spent, remaning, total }) => {
  const remainingAmount = (remaning / total) * 100;
  const spentPercent = Number.isNaN((spent / total) * 100)
    ? 0
    : (spent / total) * 100;
  const remaininPercent = Number.isNaN((remaning / total) * 100)
    ? 0
    : (remaning / total) * 100;
  const data = [
    { id: 0, value: 25, color: "#1F9EF3, #1B59F800" },
    { id: 1, value: 75, color: "#eff5ff" },
  ];
  console.log("first:", "+ remaning", remainingAmount, remaning, spent, total);
  return (
    <Stack
      width={"100%"}
      height={240}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: spent, color: "#F9C74F, #1B59F800" },
              { id: 1, value: remaning, color: "#2D9CDB" },
            ],
            innerRadius: 55,
            outerRadius: 95,
            paddingAngle: 2,
            cornerRadius: 2,
            startAngle: -435,
            endAngle: 360,
            cx: 150,
            cy: 105,
          },
        ]}
        height={240}
        width={290}
      >
        <PieCenterLabel>{spentPercent}%</PieCenterLabel>
        <PieCenterLabel2>{remaininPercent}%</PieCenterLabel2>
      </PieChart>
    </Stack>
  );
};

export default TotalCostPie;
