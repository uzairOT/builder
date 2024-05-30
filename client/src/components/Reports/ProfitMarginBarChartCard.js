import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProfitMarginStackedBarChart from "./ProfitMarginStackedBarChart";
import CircleIcon from "@mui/icons-material/Circle";
import SelectMenuBarChart from "./SelectMenuBarChart";
import { useGetTotalProjectProfitMarginMutation } from "../../redux/apis/Reports/reportsApiSlice";
import { useParams } from "react-router-dom";

const ProfitMarginBarChartCard = () => {
  let dataUser = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(dataUser);
  const currentUser = userInfo?.user;
  const userId = currentUser?.id;
  const { id } = useParams();
  const projectId = id;
  const listItems = [
    { listItem: "List Item #1" },
    { listItem: "List Item #1" },
    { listItem: "List Item #1" },
  ];

  const [getProjectDeadlineStats, { data, error, isLoading }] =
    useGetTotalProjectProfitMarginMutation();
  const [projects, setProjects] = useState();
  const fetchProfitStats = async () => {
    try {
      const result = await getProjectDeadlineStats({
        userId,
        projectId,
      }).unwrap();
      setProjects(result);
      console.log(
        "Success useGetTotalProjectProfitMarginMutation Results Results Results:",
        result
      );
    } catch (err) {
      console.error("Failed to fetch reports stats:", err);
    }
  };

  useEffect(() => {
    fetchProfitStats();
  }, []);

  const totalCost = projects?.totalCost?.toFixed(2);
  const totalMargin = projects?.totalMargin?.toFixed(2);

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={1}
        pl={2}
        pr={2}
      >
        <Typography
          fontSize={"20px"}
          fontFamily={"Inter, sans serif"}
          fontWeight={"500"}
          color={"#4C8AB1"}
        >
          Total Cost/Profit
        </Typography>
        <Typography
          color={"#606060"}
          fontFamily={"Inter, sans serif"}
          fontWeight={"500"}
          fontSize={"13px"}
        >
          Profit Margin
        </Typography>
      </Stack>
      <Divider variant="fullWidth" />
      {/* <SelectMenuBarChart listItems={listItems} /> */}

      <ProfitMarginStackedBarChart
        totalMargin={totalMargin}
        totalCost={totalCost}
      />
      <Stack direction={"row"} justifyContent={"space-around"} spacing={1}>
        <Stack direction={"row"} spacing={1}>
          <CircleIcon
            sx={{ color: "#2D9CDB", fontSize: "10px", paddingTop: "4px" }}
          />
          <Stack direction={"column"}>
            <Typography fontFamily={"Inter, sans serif"} fontSize={"12px"}>
              Total
            </Typography>
            <Typography
              textAlign={"right"}
              fontFamily={"Inter, sans serif"}
              fontWeight={"500"}
            >
              $ {totalCost}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={1}>
          <CircleIcon
            sx={{ color: "#90BE6D", fontSize: "10px", paddingTop: "4px" }}
          />
          <Stack direction={"column"}>
            <Typography fontFamily={"Inter, sans serif"} fontSize={"12px"}>
              Profit Margin
            </Typography>
            <Typography
              textAlign={"center"}
              fontFamily={"Inter, sans serif"}
              fontWeight={"500"}
            >
              $ {totalMargin}
            </Typography>
            <Typography
              textAlign={"center"}
              color={"#90BE6D"}
              fontSize={"22px"}
              fontWeight={"600"}
              fontFamily={"Inter, sans serif"}
            >
              {projects?.totalCost
                ? ((projects?.totalMargin / projects?.totalCost) * 100).toFixed(
                    3
                  )
                : 0}{" "}
              %
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default ProfitMarginBarChartCard;
