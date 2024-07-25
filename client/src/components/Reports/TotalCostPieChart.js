import { Divider, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import TotalCostPie from "./TotalCostPie";
import CircleIcon from "@mui/icons-material/Circle";
import { useGetProjectCostStatsMutation } from "../../redux/apis/Reports/reportsApiSlice";
import { useParams } from "react-router-dom";
import { formatMoney } from "../../utils/Formatters/moneyFormat";

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
          fontFamily={"inherit"}
          fontWeight={"500"}
          fontSize={{ xl: "18px", lg: "15px", md: "18px", xs: "18px" }}
        >
          Total Cost
        </Typography>
        <Typography
          fontFamily={"inherit"}
          fontWeight={"500"}
          fontSize={{ xl: "28px", lg: "24px", md: "28px", xs: "28px" }}
        >
          ${isLoading ? <>...</> : formatMoney(data?.totalCost)}
        </Typography>
        <Typography
          fontFamily={"inherit"}
          fontWeight={"400"}
          fontSize={{ xl: "12px", lg: "11px", md: "12px", xs: "12px" }}
          color={"#4F4F4F"}
        >
          US Dollars
        </Typography>
      </Stack>
      <Divider variant="fullWidth" />
      <Stack justifyContent={"center"} alignItems={"center"} height={"100%"}>
        <TotalCostPie
          total={data?.totalCost}
          remaning={data?.remaining}
          spent={data?.spent}
        />
        <Stack direction={"column"} spacing={1} width={"70%"} pb={2}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <CircleIcon sx={{ color: "#F9C74F",  fontSize: { xl: "10px", lg: "8px", md: "10px", xs: "10px" }, }} />
              <Typography
                fontFamily={"inherit"}
                fontSize={{ xl: "12px", lg: "11px", md: "12px", xs: "12px" }}
              >
                Spent Amount
              </Typography>
            </Stack>
            <Typography textAlign={"right"}>
              ${formatMoney(data?.spent)}
            </Typography>
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <CircleIcon sx={{ color: "#45A5F6",   fontSize: { xl: "10px", lg: "8px", md: "10px", xs: "10px" }, }} />
              <Typography
                fontFamily={"inherit"}
                fontSize={{ xl: "12px", lg: "11px", md: "12px", xs: "12px" }}
              >
                Remaining Amount
              </Typography>
            </Stack>
            <Typography textAlign={"center"}>
              ${formatMoney(data?.remaining)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default TotalCostPieChart;
