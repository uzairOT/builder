import { Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled } from "@mui/material/styles";

import React from "react";
import { formatMoney } from "../../../utils/Formatters/moneyFormat";
import {valueFormatter} from "../../../utils/Formatters/valueFormatter";

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 12,
  fontFamily: "inherit",
  color: "#000000B2",
  fontWeight:'600'
}));

function PieCenterLabel({ children }) {
  return (
    <StyledText x={65} y={76}>
      {children}
    </StyledText>
  );
}
function PieCenterLabel2({ children }) {
  return (
    <StyledText x={65} y={85}>
      {children}
    </StyledText>
  );
}

const PieChartDisplay = ({totalProjectCost}) => {
  return (
    <Box 
    width={'80%'}
    height="100%"
    >
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: totalProjectCost, color:  "#1F9EF3, #1B59F800" },
              // { id: 1, value: 60, color: "#eff5ff" },
            ],
            innerRadius: 55,
            outerRadius: 65,
            paddingAngle: 2,
            cornerRadius: 2,
            startAngle: -435,
            endAngle: 360,
            cx: 60,
            cy: 80,
            valueFormatter
          },
        ]}
        height={200}
        width={130}
        >
        {/* <PieCenterLabel>Total Price</PieCenterLabel> */}
        <PieCenterLabel2>${formatMoney(totalProjectCost)}</PieCenterLabel2>
      </PieChart>
    </Box>
  );
};

export default PieChartDisplay;
