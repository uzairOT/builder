import { Box, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ReportsPieChart from "./ReportsPieChart";
import CircleIcon from "@mui/icons-material/Circle";
import { useGetReportsStatsMutation } from "../../redux/apis/Reports/reportsApiSlice";
import { useParams } from "react-router-dom";

const TotalProjects = () => {
  let dataUser = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(dataUser);
  const currentUser = userInfo?.user;
  const userId = currentUser?.id;
  const { id } = useParams();
  const projectId = id;
  const [getReportsStats, { data, error, isLoading }] =
    useGetReportsStatsMutation();

  // Trigger the mutation when needed, e.g., on a button click
  const fetchReportsStats = async () => {
    try {
      const result = await getReportsStats({ userId, projectId }).unwrap();
      console.log("Success:", result);
    } catch (err) {
      console.error("Failed to fetch reports stats:", err);
    }
  };

  useEffect(() => {
    console.log("090909()()()(userIduserIduserId", userId);
    fetchReportsStats();
  }, []);
  const remainingPercent =
    (data?.remainingProjects / data?.totalProjects) * 100;
  const donePercent = ((data?.completedProjects / data?.totalProjects)  * 100);
  //   const [data, setData] = React.useState([]);
  //   const fetchData = async () => {

  //     try {

  //       const response = await getReportsStats().unwrap();

  //       if (response.data.length === 0) {
  //         return;
  //       } else {
  //         console.log("--6--666--6-6-6-6", response);

  //       }
  //     } catch (error) {

  //       console.error("API call failed:", error);
  //     }

  //   };
  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  const completeProjectPercentage = Number.isNaN(data?.completedProjects / 100) ? '-' : data?.completedProjects / 100;

  console.log("==-=-=-=-KPIIII", completeProjectPercentage);

  return (
    <>
      {isLoading ? (
        <Box sx={{ pt: 0.5 }}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Box>
      ) : (
        <Stack p={1}>
          <Typography
            fontSize={{xl:"15px", lg:"12px",md:"15px",xs:"15px"}}
            fontWeight={"500"}
            fontFamily={'var(--main-font-family)'}
            p={1}
          >
            Total Projects
          </Typography>
          <Stack direction={"row"}>
            <Stack flex={1}>
              <Typography
            fontSize={{xl:"27px", lg:"24px",md:"27px",xs:"27px"}}
            fontWeight={"500"}
                fontFamily={'var(--main-font-family)'}
                p={"0px 8px 8px 8px"}
              >
                {data?.totalProjects ? data.totalProjects : <Skeleton />}
              </Typography>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <CircleIcon sx={{ color: "#45A5F6", fontSize: {xl:"10px",lg:"8px",md:"10px",xs:"10px"} }} />
                <Typography fontFamily={'var(--main-font-family)'} fontSize={{xl:"12px",lg:"10px",md:"12px",xs:"12px"}}>
                  Done
                </Typography>
              </Stack>
              <Typography
                pl={2}
                fontFamily={'var(--main-font-family)'}
                fontSize={{xl:"18px",lg:"15px",md:"18px",xs:"18px"}}
              >
                {data?.completedProjects}
              </Typography>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <CircleIcon sx={{ color: "#DDE6FE", fontSize: {xl:"10px",lg:"8px",md:"10px",xs:"10px"} }} />
                <Typography fontFamily={'var(--main-font-family)'} fontSize={{xl:"12px",lg:"10px",md:"12px",xs:"12px"}}>
                  Remaining
                </Typography>
              </Stack>
              <Typography
                pl={2}
                fontFamily={'var(--main-font-family)'}
                fontSize={{xl:"18px",lg:"15px",md:"18px",xs:"18px"}}
              >
                {data?.remainingProjects}
              </Typography>
            </Stack>
            <Stack flex={2} justifyContent={"center"} alignItems={"center"}>
              <ReportsPieChart
                remainingPercent={remainingPercent?.toFixed(2)}
                donePercent={donePercent?.toFixed(2)}
              />
              <Stack
                direction={"row"}
                justifyContent={"space-evenly"}
                spacing={1}
              >
                <Stack direction={"column"}>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <CircleIcon sx={{ color: "#45A5F6", fontSize: {xl:"10px",lg:"8px",md:"10px",xs:"10px"} }} />
                    <Typography
                      fontFamily={'var(--main-font-family)'}
                      fontSize={{xl:"12px",lg:"10px",md:"12px",xs:"12px"}}
                    >
                      Done
                    </Typography>
                  </Stack>
                  <Typography textAlign={"right"}>
                    {Number.isNaN((data?.completedProjects / data?.totalProjects) * 100) ? '-' : ((data?.completedProjects / data?.totalProjects)  * 100).toFixed(2)}%
                  </Typography>
                </Stack>
                <Stack direction={"column"}>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <CircleIcon sx={{ color: "#DDE6FE", fontSize:{xl:"10px",lg:"8px",md:"10px",xs:"10px"}}} />
                    <Typography
                      fontFamily={'var(--main-font-family)'}
                      fontSize={{xl:"12px",lg:"10px",md:"12px",xs:"12px"}}
                    >
                      Remaining
                    </Typography>
                  </Stack>
                  <Typography textAlign={"center"}>
                    {Number.isNaN((data?.remainingProjects / data?.totalProjects) * 100) ? '-': ((data?.remainingProjects / data?.totalProjects) * 100).toFixed(2)}%
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default TotalProjects;
