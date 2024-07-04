import React from "react";
import ReactApexChart from "react-apexcharts";
import { formatMoney } from "../../../utils/Formatters/moneyFormat";

const RedialBarsChart = ({ TotalProfit, totalProfitFromPaidInvoices }) => {
  const options = {
    chart: {
      height: 250,
      type: "radialBar",
    },
    colors: ["#22C55E", "#1F9EF3", "#FF974F"],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,

        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: "16px",
            fontFamily: undefined,
            fontWeight: 600,
            color: undefined,
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: "14px",
            fontFamily: undefined,
            fontWeight: 400,
            color: undefined,
            offsetY: 16,
            formatter: function (val) {
              const formattedVal = formatMoney(val);
              return `$${formattedVal}` ;
            },
          },
        },
      },
    },
    labels: ["Total Profit", "Profit Earned"],
  };

  const series = [TotalProfit, totalProfitFromPaidInvoices];

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        width="250"
        height={'200'}
      />
    </div>
  );
};

export default RedialBarsChart;
