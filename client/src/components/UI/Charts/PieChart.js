import { Box, useMediaQuery, useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled } from "@mui/material/styles";

import React from "react";
import { formatMoney } from "../../../utils/Formatters/moneyFormat";
import { valueFormatter } from "../../../utils/Formatters/valueFormatter";

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 12,
  fontFamily: 'var(--main-font-family)',
  color: "#000000B2",
  fontWeight: "600",
  textLength: 100,
  lengthAdjust: "spacingAndGlyphs"
}));

function PieCenterLabel({ children }) {
  return (
    <StyledText x={65} y={76}>
      {children}
    </StyledText>
  );
}
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    // console.log(text.substring(0, maxLength - 3) + '...')
    return parseInt(text.substring(0, maxLength - 3));
  }
  return text;
};
function PieCenterLabel2({ isMobile, totalProjectCost }) {

  const truncatedText = truncateText(totalProjectCost, 10); // Adjust maxLength as needed
  const decimal = 0
  return (
    <svg width="200" height="100">
      <StyledText x={isMobile ? 58 : 65} y={85}>
      ${totalProjectCost?.length > 10 ? `${formatMoney(truncatedText, decimal)}...` : formatMoney(truncatedText)}
      </StyledText>
    </svg>
  );
}

const PieChartDisplay = ({ totalProjectCost }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  const getDimensions = () => {
    if (isMobile) {
      return {
        innerRadius: 42,
        outerRadius: 55,
        paddingAngle: 2,
        cornerRadius: 2,
        startAngle: -435,
        endAngle: 360,
        cx: 51,
        cy: 80,
        valueFormatter,
        fontSize: {md:"14px", xs:"11px"},
      };
    } else if (isTablet) {
      return {
        innerRadius: 55,
        outerRadius: 65,
        paddingAngle: 2,
        cornerRadius: 2,
        startAngle: -435,
        endAngle: 360,
        cx: 60,
        cy: 80,
        valueFormatter,
        fontSize: "16px",
      };
    } else if (isDesktop) {
      return {
        innerRadius: 55,
        outerRadius: 65,
        paddingAngle: 2,
        cornerRadius: 2,
        startAngle: -435,
        endAngle: 360,
        cx: 60,
        cy: 80,
        valueFormatter,
        fontSize: "18px",
      };
    } else if (isLg) {
      return {
        innerRadius: 55,
        outerRadius: 65,
        paddingAngle: 2,
        cornerRadius: 2,
        startAngle: -435,
        endAngle: 360,
        cx: 60,
        cy: 80,
        valueFormatter,
        fontSize: "20px",
      };
    } else {
      return {
        innerRadius: 55,
        outerRadius: 65,
        paddingAngle: 2,
        cornerRadius: 2,
        startAngle: -435,
        endAngle: 360,
        cx: 60,
        cy: 80,
        valueFormatter,
        fontSize: "16px",
      };
    }
  };

  const { width, height, outerRadius, innerRadius, cx, cy, fontSize } =
    getDimensions();

  return (
    <Box width={"80%"} height="100%">
      <PieChart
        series={[
          {
            data: [
              {
                id: 0,
                value: Number(!totalProjectCost ? 0 : totalProjectCost),
                color:"#1F9EF3",
              },
              // { id: 1, value: 60, color: "#eff5ff" },
            ],
            innerRadius: innerRadius,
            outerRadius: outerRadius,
            paddingAngle: 2,
            cornerRadius: 2,
            startAngle: -435,
            endAngle: 360,
            cx: cx,
            cy: cy,
            valueFormatter,
          },
        ]}
        height={200}
        width={130}
      >
        {/* <PieCenterLabel>Total Price</PieCenterLabel> */}
        <PieCenterLabel2 isMobile={isMobile} style={{fontSize:{fontSize}}} totalProjectCost={totalProjectCost ?totalProjectCost : 0}></PieCenterLabel2>
      </PieChart>
    </Box>
  );
};

export default PieChartDisplay;
