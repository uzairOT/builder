import { Box, Card, CardContent, CircularProgress, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useGetMonthlyMarginMutation } from '../../redux/apis/Reports/reportsApiSlice';
import { useParams } from 'react-router-dom';
import { formatMoney } from '../../utils/Formatters/moneyFormat';
import CircleIcon from "@mui/icons-material/Circle";
import Chart from 'react-apexcharts';

const MonthlyMarginChart = () => {
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
          Monthly Margin
        </Typography>
        <Divider variant="fullWidth" />
        <Stack direction={"row"} spacing={1}>
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
                Monthly Avg. Margin
              </Typography>
              <Typography
                // textAlign={"center"}
                fontFamily={"var(--main-font-family)"}
                fontWeight={"500"}
                fontSize={{ xl: 18, lg: 15, md: 18, xs: 18 }}
                sx={{ whiteSpace: "nowrap", textAlign: "left" }}
              >
                ${formatMoney(monthlyMarginData?.avgMonthlyMargin)}
              </Typography>
            </Stack>
          </Stack>

      <MonthlyChart monthlyReport={monthlyMarginData?.monthlyReport} isLoadingMonthlyMargin={isLoadingMonthlyMargin} />
      </CardContent>
    </Card>
  )

}

const MonthlyChart = ({ monthlyReport, isLoadingMonthlyMargin }) => {
  console.log(monthlyReport);
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
          Loading Chart...
        </Typography>
      </Box>
    );
  }

  // Check if monthlyReport exists and has data
  if (!monthlyReport || monthlyReport.length === 0) {
    return <Typography>No data available.</Typography>;
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

  // Define series for a combination chart:
  const series = [
    {
      name: 'Monthly Cost',
      type: 'column',
      data: workOrderTotals,
    },
    {
      name: 'Montly Margin',
      type: 'column',
      data: workOrderMargins,
    },
    {
      name: 'Montly Margin',
      type: 'line',
      data: workOrderMargins,
    },
    {
      name: 'Payment Pending',
      type: 'line',
      data: paymentPendings,
    },
  ];

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
      text: 'Monthly Report',
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
      },
    },
    xaxis: {
      categories: categories,
      title: {
        text: 'Month',
      },
    },
    yaxis: [
      {
        title: {
          text: 'Work Order Total / Margin',
        },
        labels: {
          formatter: val => `$${val}`,
        },
      },
      {
        opposite: true,
        title: {
          text: 'Payment Pending',
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
      text: 'Loading data...',
    },
  };

  return (
    <Box sx={{ p: 2 }}>
      <Chart options={options} series={series} type="line" height={350} />
    </Box>
  );
};

export default MonthlyMarginChart
