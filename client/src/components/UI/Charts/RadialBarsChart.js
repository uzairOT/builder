import React from "react";
import ReactApexChart from "react-apexcharts";

const RedialBarsChart = () => {
  const options = {
    chart: {
      height: 350,
      type: "radialBar",
    },
    colors: ["#22C55E", '#1F9EF3', '#FF974F'],
    plotOptions: {
      radialBar: {
        startAngle: -90,
         endAngle: 90,
       
        dataLabels: {
            show: true,
            name: {
                show: true,
                fontSize: '16px',
                fontFamily: undefined,
                fontWeight: 600,
                color: undefined,
                offsetY: -10
              },
              value: {
                show: true,
                fontSize: '14px',
                fontFamily: undefined,
                fontWeight: 400,
                color: undefined,
                offsetY: 16,
                formatter: function (val) {
                  return val + '%'
                }
              },
          
        },
      
    },
 },
    labels: ["Apples", "Oranges", "Bananas"],
};
 
const series=[70, 80, 40];

  return (
    <div>
      <ReactApexChart options={options} series={series} type="radialBar" width="300"/>
    </div>
  );
};

export default RedialBarsChart;