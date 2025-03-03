// Import necessary libraries
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import moment from "moment";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useProjectGanttChartMutation } from "../../../redux/apis/Project/projectApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { allUserProjects, setGanttChart } from "../../../redux/slices/Project/userProjectsSlice";
import loader from "../../../assets/gifs/loader.gif";
import { useParams } from "react-router-dom";
import actionButton from "../actionButton";
import { useTranslation } from "react-i18next";
const options = {
  chart: {
    id: "gantt-chart",
    height: 350,
    type: "rangeBar",
    toolbar: {
      show: true,
      offsetX: 0,
      offsetY: -30,
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
    // labels: {
    //   formatter: function (value) {
    //     console.log("Original X-Axis value:", value); // Log the original value

    //     // If you need to format the label only, pass the raw timestamp to ApexCharts
    //     // Use moment just to format it for display purposes
    //     return moment(value).format("MM-DD-YYYY"); // Keep the timestamp for the chart, format it for display
    //   },
    // },
  },
  
  legend: {
    position: "top",
  },
};


export const GanttChartSection = () => {
  const params = useParams()
  const projects = useSelector(allUserProjects)
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);
  const currentProject = useMemo(() => {
    return projects[0].find(project => project.id === Number(params.id));
  }, [params.id, projects]);
  const [chartData, setChartData] = useState(currentProject?.ganttChart ? JSON.parse(JSON.stringify(currentProject?.ganttChart)) : []);
  const chartRef = useRef(null); // Reference for the ApexChart instance
  const [generateProjectGanttChart, { isLoading }] = useProjectGanttChartMutation();
  const chartContainerRef = useRef(null);
  const dispatch = useDispatch();
console.log(chartData)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const generateGanttChart = async () => {
    try {
      toast.info("Creating your Gantt chart now. Please allow 2 minutes for the process to complete.");
      const data = await generateProjectGanttChart({ projectId: params?.id });

      if (data?.data?.genText) {
        const ganttChart = JSON.parse(JSON.stringify(data.data.genText));
        setChartData(JSON.parse(JSON.stringify(data.data.genText)));
        dispatch(setGanttChart({ projectId: params?.id, ganttChart: ganttChart }))
      } else {
        toast.error("Something went wrong! " + data?.error?.data?.message);
      }
    } catch (error) {
      console.error("Error generating Gantt chart:", error);
      toast.error("Something went wrong! Please wait a minute before making another request.");
    }
  };
  useEffect(() => {
    if (!currentProject?.ganttChart) {
      generateGanttChart();
    }
  }, []);
  
  const safeChartData = (chartData || []).map(series => ({
    ...series,
    data: Array.isArray(series.data) ? series.data : []
  }));
  return (
    <Box sx={{ padding: 2 }} ref={chartContainerRef}>
      <Typography variant="h6">{t('GanttChart.title1')}</Typography>
      {isLoading ? <Stack justifyContent={'center'} alignItems={'center'}>
        <img src={loader} alt="Loading animation"></img>
        <Typography>{t('GanttChart.title2')}</Typography>
      </Stack> : safeChartData && <>
        <ReactApexChart
          ref={chartRef} // Attach the chart reference
          options={options}
          series={safeChartData ? safeChartData : []}
          type="rangeBar"
          height={350}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          sx={{
            ...actionButton,
            background: "#4C8AB1",
            marginTop: "0.7rem",
            "@media (max-width: 600px)": {
              fontFamily: "var(--main-font-family)",
              minWidth: 0,
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "50%",
              padding: 0,
              fontSize: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          {t('GanttChart.title3')}
        </Button>
        {/* Fullscreen Modal */}
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              bgcolor: "background.paper",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "90%", height: "90%" }}>
              <ReactApexChart
                options={options}
                series={safeChartData}
                type="rangeBar"
                height={"100%"}
              />
            </div>
            <Button
              onClick={handleClose}
              variant="contained"
              color="secondary"
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                zIndex: 10,
                ...actionButton,
                background: "#4C8AB1",
              }}
            >
              {t('GanttChart.title4')}
            </Button>
          </Box>
        </Modal>
      </>}
    </Box>
  );
};
