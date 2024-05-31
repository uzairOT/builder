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
  const donePercent = data?.completedProjects / 100;
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
            fontSize={"15px"}
            fontWeight={"500"}
            fontFamily={"Inter, sans serif"}
            p={1}
          >
            Total Projects
          </Typography>
          <Stack direction={"row"}>
            <Stack flex={1}>
              <Typography
                fontSize={"27px"}
                fontWeight={"500"}
                fontFamily={"Inter, sans serif"}
                p={"0px 8px 8px 8px"}
              >
                {data?.totalProjects ? data.totalProjects : <Skeleton />}
              </Typography>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <CircleIcon sx={{ color: "#45A5F6", fontSize: "10px" }} />
                <Typography fontFamily={"Inter, sans serif"} fontSize={"12px"}>
                  Done
                </Typography>
              </Stack>
              <Typography
                pl={2}
                fontFamily={"Inter, sans serif"}
                fontSize={"18px"}
              >
                {data?.completedProjects}
              </Typography>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <CircleIcon sx={{ color: "#DDE6FE", fontSize: "10px" }} />
                <Typography fontFamily={"Inter, sans serif"} fontSize={"12px"}>
                  Remaining
                </Typography>
              </Stack>
              <Typography
                pl={2}
                fontFamily={"Inter, sans serif"}
                fontSize={"18px"}
              >
                {data?.remainingProjects}
              </Typography>
            </Stack>
            <Stack flex={2} justifyContent={"center"} alignItems={"center"}>
              <ReportsPieChart
                remainingPercent={remainingPercent}
                donePercent={donePercent}
              />
              <Stack
                direction={"row"}
                justifyContent={"space-evenly"}
                spacing={1}
              >
                <Stack direction={"column"}>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <CircleIcon sx={{ color: "#45A5F6", fontSize: "10px" }} />
                    <Typography
                      fontFamily={"Inter, sans serif"}
                      fontSize={"12px"}
                    >
                      Done
                    </Typography>
                  </Stack>
                  <Typography textAlign={"right"}>
                    {Number.isNaN(data?.completedProjects / 100) ? '-' : data?.completedProjects / 100}%
                  </Typography>
                </Stack>
                <Stack direction={"column"}>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <CircleIcon sx={{ color: "#DDE6FE", fontSize: "10px" }} />
                    <Typography
                      fontFamily={"Inter, sans serif"}
                      fontSize={"12px"}
                    >
                      Remaining
                    </Typography>
                  </Stack>
                  <Typography textAlign={"center"}>
                    {Number.isNaN((data?.remainingProjects / data?.totalProjects) * 100) ? '-': (data?.remainingProjects / data?.totalProjects) * 100}%
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
