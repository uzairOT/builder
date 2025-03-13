import { Box, Card, CardContent, CircularProgress, Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { useGetMonthlyMarginMutation } from '../../redux/apis/Reports/reportsApiSlice';
import { useParams } from 'react-router-dom';
import { formatMoney } from '../../utils/Formatters/moneyFormat';
import CircleIcon from "@mui/icons-material/Circle";
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
const MonthlyMarginChart = () => {
  const {t} = useTranslation()
  let dataUser = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(dataUser);
  const currentUser = userInfo?.user;
  const userId = currentUser?.id;
  const { id } = useParams();
  const projectId = id;
  const [getMonthlyMargin, { data: monthlyMarginData, isLoading: isLoadingMonthlyMargin }] = useGetMonthlyMarginMutation();
  useEffect(() => {
    getMonthlyMargin({  
      projectId,
      userId
    });
  }, []);
  return (
    <Card sx={{ p: 0, borderRadius: 3, boxShadow: 0 }}>
      <CardContent sx={{ p: 0 }}>

        <Typography
          fontSize={{ xl: "20px", lg: "16px", md: "20px", xs: "20px" }}
          fontFamily={"var(--main-font-family)"}
          fontWeight={"500"}
          color={"#4C8AB1"}
          variant="h6"
          p={1}
        >
          {t("ProjectReports.MonthlyMarginChart.title1")}
        </Typography>
        <Divider variant="fullWidth" />
        <Stack direction={"row"} spacing={1} ml={1}>
            <CircleIcon
              sx={{
                color: "#2D9CDB",
                fontSize: { xl: "10px", lg: 8, md: 10, xs: 10 },
                paddingTop: "4px",
              }}
            />
            <Stack direction={"column"}>
              <Typography
                fontFamily={"var(--main-font-family)"}
                fontSize={{ xl: 16, lg: 14, md: 16, xs: 16 }}
                sx={{ textAlign: "left" }}
              >
                {t("ProjectReports.MonthlyMarginChart.title2")}
              </Typography>
              <Typography
                // textAlign={"center"}
                fontFamily={"var(--main-font-family)"}
                fontWeight={"500"}
                fontSize={{ xl: 18, lg: 15, md: 18, xs: 18 }}
                sx={{ whiteSpace: "nowrap", textAlign: "left"}}
              >
                ${formatMoney(monthlyMarginData?.avgMonthlyMargin)}
              </Typography>
            </Stack>
          </Stack>

      <MonthlyChart t={t} monthlyReport={monthlyMarginData?.monthlyReport} isLoadingMonthlyMargin={isLoadingMonthlyMargin} />
      </CardContent>
    </Card>
  )

}

const MonthlyChart = ({ t, monthlyReport, isLoadingMonthlyMargin }) => {
  const theme = useTheme();
  const isMobile =  useMediaQuery(theme.breakpoints.only('xs'));

  // Show a loader while data is loading
  if (isLoadingMonthlyMargin) {
    return (

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height={350}
      >
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          {t("ProjectReports.MonthlyMarginChart.loadingChart")}
        </Typography>
      </Box>
    );
  }

  // Check if monthlyReport exists and has data
  if (!monthlyReport || monthlyReport.length === 0) {
    return <Typography fontFamily={'var(--main-font-family)'} p={2} textAlign={"center"} fontWeight={"500"} fontSize={{ xl: "16px", lg: "13px", md: "16px", xs: "16px" }} color={"#5B5B5B"}>{t("ProjectReports.MonthlyMarginChart.noData")}</Typography>;
  }

  // Extract month labels from the monthlyReport array
  const categories = monthlyReport.map(report => report.month);

  // Build series data:
  // 1. Work Order Total (from report.total)
  // 2. Work Order Margin (from report.margin)
  // 3. Payment Pending (sum of paymentPending from each line item in the report)
  const workOrderTotals = monthlyReport.map(report => Number(report.total));
  const workOrderMargins = monthlyReport.map(report => Number(report.margin));

  const paymentPendings = monthlyReport.map(report => {
    if (report.lineItems && report.lineItems.length > 0) {
      return report.lineItems.reduce(
        (sum, item) => sum + Number(item.paymentPending),
        0
      );
    }
    return 0;
  });

// Mobile view
  const seriesMob = [
    {
      name: t("ProjectReports.MonthlyMarginChart.tooltip.title1"),
      data: workOrderTotals,
    },
    {
      name: t("ProjectReports.MonthlyMarginChart.tooltip.title2"),
      data: workOrderMargins,
    },
  ];

  // Define series for a combination chart:
  const series = [
    {
      name: t("ProjectReports.MonthlyMarginChart.tooltip.title1"),
      type: 'column',
      data: workOrderTotals,
    },
    {
      name: t("ProjectReports.MonthlyMarginChart.tooltip.title2"),
      type: 'column',
      data: workOrderMargins,
    },
    {
      name: t("ProjectReports.MonthlyMarginChart.tooltip.title3"),
      type: 'line',
      data: workOrderMargins,
    },
    {
      name: t("ProjectReports.MonthlyMarginChart.tooltip.title4"),
      type: 'line',
      data: paymentPendings,
    },
  ];
// Mobile options
const optionsMob = {
  chart: {
    type: 'bar', // Bar chart for mobile
    height: 400, // Increase height to avoid overlap
    toolbar: { show: false }, // Hide toolbar for mobile
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '40%', // Adjust bar height for spacing
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12px', // Smaller font size for mobile
    },
    formatter: function (val) {
      if (val >= 1_000_000_000) {
        return (val / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
      } else if (val >= 1_000_000) {
        return (val / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
      } else if (val >= 100_000) {
        return (val / 1_000).toFixed(0).replace(/\.0$/, '') + 'K';
      } else if (val >= 1_000) {
        return (val / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
      } else {
        return val;
      }
    }
  },
  xaxis: {
    categories: categories,
    labels: {
      formatter: function (val) {
        if (val >= 1_000_000_000) {
          return (val / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
        } else if (val >= 1_000_000) {
          return (val / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        } else if (val >= 100_000) {
          return (val / 1_000).toFixed(0).replace(/\.0$/, '') + 'K';
        } else if (val >= 1_000) {
          return (val / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
        } else {
          return val;
        }
      },
      style: {
        fontSize: '10px', // Smaller labels for mobile
      },
    },
  },
  legend: {
    position: 'bottom', // Better for mobile
    horizontalAlign: 'center',
    fontSize: '12px',
  },
  tooltip: {
    y: {
      formatter: function (val) {
        if (val >= 1_000_000_000) {
          return (val / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
        } else if (val >= 1_000_000) {
          return (val / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        } else if (val >= 100_000) {
          return (val / 1_000).toFixed(0).replace(/\.0$/, '') + 'K';
        } else if (val >= 1_000) {
          return (val / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
        } else {
          return val;
        }
      },
    },
  },
  title: {
    text: t("ProjectReports.MonthlyMarginChart.title3"),
    align: 'center',
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
  },
  colors: ['#007bff', '#28a745'], // Optional: Adjust colors
  noData: {
    text: t("ProjectReports.MonthlyMarginChart.noData"),
  },
};

  // Chart options configuration
  const options = {
    chart: {
      height: 350,
      type: 'line', // This enables the combination chart
      stacked: true,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    stroke: {
      width: [0, 0,2, 2], // Thicker stroke for the line series (payment pending)
    },
    title: {
      text: t("ProjectReports.MonthlyMarginChart.title3"),
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
      },
    },
    xaxis: {
      categories: categories,
      title: {
        text: t("ProjectReports.MonthlyMarginChart.title4"),
      },
    },
    yaxis: [
      {
        title: {
          text: t("ProjectReports.MonthlyMarginChart.title5"),
        },
        labels: {
          formatter: val => `$${val}`,
        },
      },
      {
        opposite: true,
        title: {
          text: t("ProjectReports.MonthlyMarginChart.title6"),
        },
        labels: {
          formatter: val => `$${val}`,
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: val => `$${val}`,
      },
    },
    legend: {
      position: 'top',
    },
    noData: {
      text: t("ProjectReports.MonthlyMarginChart.loadingChart"),
    },
  };

  return (
    <Box sx={{ p: 2 }}>
      {isMobile ? <Chart options={optionsMob} series={seriesMob} type="bar" height={350} />  : <Chart options={options} series={series} type="line" height={350} />}
    </Box>
  );
};

export default MonthlyMarginChart
