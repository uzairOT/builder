import React from "react";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled } from "@mui/material/styles";
import { valueFormatterPercentage as valueFormatter } from "../../utils/Formatters/valueFormatter";

const StyledText = styled("text")(({ theme, color, fontSize }) => ({
  fill: color,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize,
  fontFamily: "Arial Rounded MT, sans-serif",
  fontWeight: "500",
}));

function PieCenterLabel({ children, x, y, color, fontSize }) {
  return (
    <StyledText x={x} y={y} color={color} fontSize={fontSize}>
      {children}
    </StyledText>
  );
}

const BudgetPieChart = ({ overduePercentage, paidPercentage, unpaidPercentage }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  const data = [
    { id: 0, value: parseFloat(unpaidPercentage), color: "#F8961E" },
    { id: 1, value: parseFloat(overduePercentage), color: "#F94144" },
    { id: 2, value: parseFloat(paidPercentage), color: "green" },
  ];

  const getDimensions = () => {
    if (isMobile) {
      return {
        width: 250,
        height: 250,
        outerRadius: 60,
        innerRadius: 50,
        cx: 125,
        cy: 125,
        fontSize: "14px",
      };
    } else if (isTablet) {
      return {
        width: 300,
        height: 300,
        outerRadius: 75,
        innerRadius: 60,
        cx: 150,
        cy: 150,
        fontSize: "16px",
      };
    } else if (isDesktop) {
      return {
        width: 200,
        height: 350,
        outerRadius: 90,
        innerRadius: 70,
        cx: 95,
        cy: 175,
        fontSize: "18px",
      };
    } else if (isLg) {
      return {
        width: 400,
        height: 400,
        outerRadius: 110,
        innerRadius: 80,
        cx: 200,
        cy: 200,
        fontSize: "20px",
      };
    } else {
      return {
        width: 300,
        height: 300,
        outerRadius: 80,
        innerRadius: 60,
        cx: 150,
        cy: 150,
        fontSize: "16px",
      };
    }
  };

  const { width, height, outerRadius, innerRadius, cx, cy, fontSize } = getDimensions();

  return (
    <Stack
      width={{ xl: "100%", lg: "100%", md: "100%", xs: "100%" }}
      height="100%"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <PieChart
        series={[
          {
            data: data,
            innerRadius: innerRadius,
            outerRadius: outerRadius,
            paddingAngle: 0,
            cornerRadius: 2,
            startAngle: 90,
            endAngle: 450,
            cx: cx,
            cy: cy,
            labelRadius: outerRadius + 20,
            valueFormatter,
          },
        ]}
        height={height}
        width={width}
      >
        <PieCenterLabel x={cx} y={cy - 30} color="#F8961E" fontSize={fontSize}>
          {`${unpaidPercentage}%`}
        </PieCenterLabel>
        <PieCenterLabel x={cx} y={cy} color="#F94144" fontSize={fontSize}>
          {`${overduePercentage}%`}
        </PieCenterLabel>
        <PieCenterLabel x={cx} y={cy + 30} color="green" fontSize={fontSize}>
          {`${paidPercentage}%`}
        </PieCenterLabel>
      </PieChart>
    </Stack>
  );
};

export default BudgetPieChart;
