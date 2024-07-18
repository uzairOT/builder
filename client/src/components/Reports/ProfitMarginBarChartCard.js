import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProfitMarginStackedBarChart from "./ProfitMarginStackedBarChart";
import CircleIcon from "@mui/icons-material/Circle";
import SelectMenuBarChart from "./SelectMenuBarChart";
import { useGetTotalProjectProfitMarginMutation } from "../../redux/apis/Reports/reportsApiSlice";
import { useParams } from "react-router-dom";
import { formatMoney } from "../../utils/Formatters/moneyFormat";

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
  let marginPercentage = 0; // Default value

if (projects?.totalCost) {
  marginPercentage = ((projects.totalMargin / projects.totalCost) * 100).toFixed(2);
}

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
          fontSize={{ xl: "20px", lg: "16px", md: "20px", xs: "20px" }}
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
      <Stack
        justifyContent={"space-evenly"}
        height={"100%"}
        alignItems={"center"}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          spacing={1}
          pt={1}
        >
          <Stack direction={"row"} spacing={1}>
            <CircleIcon
              sx={{ color: "#2D9CDB", fontSize: {xl:"10px",lg:8, md:10,xs:10}, paddingTop: "4px" }}
            />
            <Stack direction={"column"}>
              <Typography fontFamily={"Inter, sans serif"} fontSize={{xl:16,lg:14, md:16,xs:16}} sx={{textAlign:"left"}}>
                Total
              </Typography>
              <Typography
                // textAlign={"center"}
                fontFamily={"Inter, sans serif"}
                fontWeight={"500"}
                fontSize={{xl:18,lg:15,md:18,xs:18}}
                sx={{whiteSpace: "nowrap",textAlign: "left"}}

              >
                $ {formatMoney(totalCost)}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <CircleIcon
              sx={{ color: "#90BE6D", fontSize: "10px", paddingTop: "4px" }}
            />
            <Stack direction={"column"}>
              <Typography fontFamily={"Inter, sans serif"} fontSize={{xl:16,lg:14, md:16,xs:16}} sx={{textAlign:"left"}}>
                Profit Margin
              </Typography>
              <Typography
                sx={{whiteSpace: "nowrap",textAlign: "left"}}
                fontFamily={"Inter, sans serif"}
                fontWeight={"500"}
                fontSize={{xl:18,lg:15,md:18,xs:18}}
              >
                $ {formatMoney(totalMargin)}
              </Typography>
              <Typography
                textAlign={"center"}
                color={marginPercentage < 0 ? "#F94144" : "#90BE6D"}
                fontSize={{xl:26,lg:23,md:26,xs:26}}
                fontWeight={"600"}
                fontFamily={"Inter, sans serif"}
              >
                {projects?.totalCost
                  ? marginPercentage
                  : 0}{" "}
                %
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <ProfitMarginStackedBarChart
          totalMargin={totalMargin}
          totalCost={totalCost}
        />
      </Stack>
    </>
  );
};

export default ProfitMarginBarChartCard;
