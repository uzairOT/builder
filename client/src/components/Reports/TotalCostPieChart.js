import { Divider, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import TotalCostPie from "./TotalCostPie";
import CircleIcon from "@mui/icons-material/Circle";
import { useGetProjectCostStatsMutation } from "../../redux/apis/Reports/reportsApiSlice";
import { useParams } from "react-router-dom";

const TotalCostPieChart = () => {
  let dataUser = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(dataUser);
  const currentUser = userInfo?.user;
  const userId = currentUser?.id;
  const { id } = useParams();
  const projectId = id;

  const [getProjectCostStats, { data, error, isLoading }] =
    useGetProjectCostStatsMutation();
  const fetchCostStats = async () => {
    try {
      const result = await getProjectCostStats({
        userId,
        projectId,
      }).unwrap();
      console.log("Success getProjectCostStats:", result);
    } catch (err) {
      console.error("Failed to fetch reports stats:", err);
    }
  };

  useEffect(() => {
    fetchCostStats();
  }, []);
  return (
    <Paper sx={{ borderRadius: "14px" }}>
      <Stack p={2}>
        <Typography
          fontFamily={"Inter, sans serif"}
          fontWeight={"500"}
          fontSize={"18px"}
        >
          Total Cost
        </Typography>
        <Typography
          fontFamily={"Inter, sans serif"}
          fontWeight={"500"}
          fontSize={"28px"}
        >
          ${data?.totalCost}
        </Typography>
        <Typography
          fontFamily={"Inter, sans serif"}
          fontWeight={"400"}
          fontSize={"12px"}
          color={"#4F4F4F"}
        >
          US Dollars
        </Typography>
      </Stack>
      <Divider variant="fullWidth" />
      <Stack justifyContent={"center"} alignItems={"center"} height={"100%"}>
        <TotalCostPie
          total={data?.totalCost}
          remaning={data?.remaning}
          spent={data?.spent}
        />
        <Stack direction={"column"} spacing={1} width={"70%"} pb={2}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <CircleIcon sx={{ color: "#F9C74F", fontSize: "10px" }} />
              <Typography fontFamily={"Inter, sans serif"} fontSize={"12px"}>
                Spent Amount
              </Typography>
            </Stack>
            <Typography textAlign={"right"}>$ {data?.spent}</Typography>
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <CircleIcon sx={{ color: "#45A5F6", fontSize: "10px" }} />
              <Typography fontFamily={"Inter, sans serif"} fontSize={"12px"}>
                Remaining Amount
              </Typography>
            </Stack>
            <Typography textAlign={"center"}>$ {data?.remaning}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default TotalCostPieChart;
