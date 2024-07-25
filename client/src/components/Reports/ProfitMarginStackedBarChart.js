import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const valueFormatter = (value) => `$${value}`;
const ProfitMarginStackedBarChart = ({ totalMargin, totalCost }) => {
  
  return (
    <>
       <BarChart
        colors={["#2D9CDB", "#90BE6D"]}
        width={250}  // Increased width
        height={300}
        axisHighlight={{ x: "band", y: "none" }}
        margin={{ left: 100, right: 60, top: 50, bottom: 50 }} 
        series={[
          { data: [totalCost], stack: "A", valueFormatter },
          { data: [totalMargin], stack: "A", valueFormatter },
        ]}
        xAxis={[{ data: ["Cost"], scaleType: "band", labelRotation: -45 }]}  // Rotated x-axis labels
      >
      </BarChart>
    </>
  );
};

export default ProfitMarginStackedBarChart;
