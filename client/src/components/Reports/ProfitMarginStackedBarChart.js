import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const ProfitMarginStackedBarChart = ({ totalMargin, totalCost }) => {
  return (
    <>
       <BarChart
        colors={["#2D9CDB", "#90BE6D"]}
        width={350}  // Increased width
        height={250}
        axisHighlight={{ x: "band", y: "none" }}
        margin={{ left: 130, right: 50, top: 50, bottom: 50 }} 
        series={[
          { data: [totalCost], stack: "A" },
          { data: [totalMargin], stack: "A" },
        ]}
        xAxis={[{ data: ["Line Item"], scaleType: "band", labelRotation: -45 }]}  // Rotated x-axis labels
      >
      </BarChart>
    </>
  );
};

export default ProfitMarginStackedBarChart;
