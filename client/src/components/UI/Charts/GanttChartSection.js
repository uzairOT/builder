// Import necessary libraries
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import { Box, Typography } from "@mui/material";
import React from "react";

// Replace Gantt chart rendering with ApexChart
export const GanttChartSection = () => {
  const [chartData, setChartData] = React.useState({
    series: [
      {
        name: "Planning",
        data: [
          {
            x: "Project Assessment",
            y: [
              new Date("2019-03-05").getTime(),
              new Date("2019-03-08").getTime(),
            ],
          },
          {
            x: "Code",
            y: [
              new Date("2019-03-08").getTime(),
              new Date("2019-03-11").getTime(),
            ],
          },
          {
            x: "Test",
            y: [
              new Date("2019-03-11").getTime(),
              new Date("2019-03-16").getTime(),
            ],
          },
        ],
      },
      {
        name: "Development",
        data: [
          {
            x: "Pages",
            y: [
              new Date("2019-03-05").getTime(),
              new Date("2019-03-08").getTime(),
            ],
          },
          {
            x: "Login/Signup",
            y: [
              new Date("2019-03-08").getTime(),
              new Date("2019-03-11").getTime(),
            ],
          },
          {
            x: "Launch App",
            y: [
              new Date("2019-03-11").getTime(),
              new Date("2019-03-16").getTime(),
            ],
          },
        ],
      },
      {
        name: "Design",
        data: [
          {
            x: "Wireframe",
            y: [
              new Date("2019-03-02").getTime(),
              new Date("2019-03-05").getTime(),
            ],
          },
          {
            x: "Mock-up",
            y: [
              new Date("2019-03-06").getTime(),
              new Date("2019-03-09").getTime(),
            ],
          },
          {
            x: "Reviews",
            y: [
              new Date("2019-03-10").getTime(),
              new Date("2019-03-19").getTime(),
            ],
          },
        ],
      },
      {
        name: "Viscosity",
        data: [
          {
            x: "Pages",
            y: [
              new Date("2019-03-05").getTime(),
              new Date("2019-03-08").getTime(),
            ],
          },
          {
            x: "Login/Signup",
            y: [
              new Date("2019-03-08").getTime(),
              new Date("2019-03-11").getTime(),
            ],
          },
          {
            x: "Launch App",
            y: [
              new Date("2019-03-11").getTime(),
              new Date("2019-03-16").getTime(),
            ],
          },
        ],
      },
      {
        name: "Testing",
        data: [
          {
            x: "Wireframe",
            y: [
              new Date("2019-03-02").getTime(),
              new Date("2019-03-05").getTime(),
            ],
          },
          {
            x: "Mock-up",
            y: [
              new Date("2019-03-06").getTime(),
              new Date("2019-03-09").getTime(),
            ],
          },
          {
            x: "Reviews",
            y: [
              new Date("2019-03-10").getTime(),
              new Date("2019-03-19").getTime(),
            ],
          },
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "rangeBar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
        formatter: function (val) {
          const start = moment(val[0]);
          const end = moment(val[1]);
          const diff = end.diff(start, "days");
          return diff + (diff > 1 ? " days" : " day");
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          opacityFrom: 1,
          opacityTo: 1,
        },
      },
      xaxis: {
        type: "datetime",
      },
      legend: {
        position: "top",
      },
    },
  });

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Gantt Chart</Typography>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="rangeBar"
        height={350}
      />
    </Box>
  );
};
