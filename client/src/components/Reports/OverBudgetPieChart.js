import { Divider, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import OverBudgetPie from "./OverBudgetPie";
import CircleIcon from "@mui/icons-material/Circle";
import { useGetProjectDeadlineStatsMutation } from "../../redux/apis/Reports/reportsApiSlice";
import moment from "moment";
import { useParams } from "react-router-dom";

const OverBudgetPieChart = () => {
  let dataUser = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(dataUser);
  const currentUser = userInfo?.user;
  const userId = currentUser?.id;
  const { id } = useParams();
  const projectId = id;

  const [getProjectDeadlineStats, { data, error, isLoading }] =
    useGetProjectDeadlineStatsMutation();
  const [projects, setProjects] = useState([]);
  const fetchDeadlineStats = async () => {
    try {
      const result = await getProjectDeadlineStats({
        userId,
        projectId,
      }).unwrap();
      setProjects(result);
      console.log("Success GetProjectDeadlineStats:", result);
    } catch (err) {
      console.error("Failed to fetch reports stats:", err);
    }
  };

  useEffect(() => {
    fetchDeadlineStats();
  }, []);
  const height = `calc(93vh - 557px)`;
  return (
    <Paper sx={{ height: "100%", borderRadius: "14px" }}>
      <Stack p={2}>
        <Typography
          fontFamily={"inherit"}
          fontWeight={"500"}
          fontSize={{ xl: "18px", lg: "15px", md: "18px", xs: "18px" }}
        >
          Upcoming DeadLines
        </Typography>
        {/* <Typography
          fontFamily={"inherit"}
          fontWeight={"500"}
          fontSize={"28px"}
        >
          25
        </Typography> */}
        {/* <Typography fontFamily={'inherit'} fontWeight={'400'} fontSize={'12px'} color={'#4F4F4F'}>
               US Dollars
            </Typography> */}
      </Stack>
      <Divider variant="fullWidth" />
      {/* <OverBudgetPie /> */}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        spacing={1}
        pt={2}
        pb={2}
        px={2}
        sx={{
          height: {
            xl: height,
            lg: `calc(93vh - 357px)`,
            md: `lg:calc(93vh - 357px)`,
            sm: `calc(93vh - 357px)`,
            xs: `calc(93vh - 357px)`,
          },
          overflow: "auto",
        }}
      >
        <Stack direction={"row"} spacing={1}>
          <CircleIcon
            sx={{
              color: "#2D9CDB",
              fontSize: { xl: "10px", lg: "8px", md: "10px", xs: "10px" },
              paddingTop: "4px",
            }}
          />
          <Stack direction={"column"}>
            <Typography
              fontFamily={"inherit"}
              fontSize={{ xl: "14px", lg: "12px", md: "14px", xs: "14px" }}
              fontWeight="bold"
            >
              Project Name
            </Typography>
            {projects.map((project, index) => (
              <Typography
                key={index}
                fontFamily={"inherit"}
                fontSize={"14px"}
                width={"25ch"}
                overflow={'hidden'}
                whiteSpace={'nowrap'}
                textOverflow={'ellipsis'}
              >
                {project.projectName}
              </Typography>
            ))}
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={1}>
          <CircleIcon
            sx={{
              color: "#F65E5E",
              fontSize: { xl: "10px", lg: "8px", md: "10px", xs: "10px" },
              paddingTop: "4px",
            }}
          />
          <Stack direction={"column"}>
            <Typography
              fontFamily={"inherit"}
              fontSize={{ xl: "14px", lg: "12px", md: "14px", xs: "14px" }}
              fontWeight="bold"
            >
              DeadLine
            </Typography>
            {projects.map((project, index) => (
              <Typography
                key={index}
                fontFamily={"inherit"}
                fontSize={{ xl: "14px", lg: "14px", md: "14px", xs: "14px" }}
              >
                {moment(project.end_time).format("YYYY-MM-DD")}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default OverBudgetPieChart;
