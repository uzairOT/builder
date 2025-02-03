import {
  Divider,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProfitMarginStackedBarChart from "./ProfitMarginStackedBarChart";
import CircleIcon from "@mui/icons-material/Circle";
import {
  useGetLineItemMarginsMutation,
  useGetTotalProjectProfitMarginMutation,
} from "../../redux/apis/Reports/reportsApiSlice";
import { useParams } from "react-router-dom";
import { formatMoney } from "../../utils/Formatters/moneyFormat";

const ProfitMarginBarChartCard = () => {
  let dataUser = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(dataUser);
  const currentUser = userInfo?.user;
  const userId = currentUser?.id;
  const { id } = useParams();
  const projectId = id;
  const [getProjectDeadlineStats, { data, error, isLoading }] =
    useGetTotalProjectProfitMarginMutation();
  const [projects, setProjects] = useState();
  const [selectValue, setSelectValue] = useState("total");
  const [selectLineItems, setSelectLineItems] = useState("all");
  const [chartValues, setChartValues] = useState({
    totalCost: projects?.totalCost?.toFixed(2),
    totalMargin: projects?.totalMargin?.toFixed(2),
  });
  const [lineItems, setLineItems] =useState([]);
  const [
    getLineItemMargins,
    { data: lineItemsData, isLoading: isLoadingLineItens },
  ] = useGetLineItemMarginsMutation({ projectId });

  const handleSelectValue = (event) => {
    setSelectValue(event.target.value);
    handleMenuAction(event.target.value)
  };
  const handleSelectLineItem = (event) => {
    setSelectLineItems(event.target.value);
    handleLineItemMenu(event.target.value)
  };

  const handleLineItemMenu = (action) => {
    switch (true) {
      case action === "all":
        setChartValues((prev) => {
          const phase = lineItemsData?.lineItems?.find((phase) => phase.id === chartValues?.phaseId);
          const total = phase?.LineItems.reduce((sum, item) => sum + (Number(item.total) + Number(item.margin)),0);
          const margin = phase?.LineItems.reduce((sum, item) => sum + Number(item.margin),0);
          const marginPercentage = ((margin / total) * 100).toFixed(2);
          setLineItems(phase.LineItems)
          return {
            ...prev,
            totalCost: total,
            totalMargin: margin,
            marginPercentage: marginPercentage,
          };
        });
        break;
      case (typeof action === "number"):
        setChartValues((prev) => {
          const lineItem = lineItems?.find((lineItem) => lineItem.id === action);
          const total = Number(lineItem.total) + Number(lineItem.margin)
          const margin = Number(lineItem.margin)
          const marginPercentage = ((margin / total) * 100).toFixed(2);
          
          return {
            ...prev,
            totalCost: total,
            totalMargin: margin,
            marginPercentage: marginPercentage,
            phaseId: chartValues?.phaseId
          };
        });
        break;
      default:
        break;
    }
  }

  const handleMenuAction = (action) => {
    switch (true) {
      case action === "total":
        setChartValues(() => {
          const marginPercentage = ((projects.totalMargin / projects.totalCost) * 100).toFixed(2);
          return {
            totalCost: projects?.totalCost?.toFixed(2),
            totalMargin: projects?.totalMargin?.toFixed(2),
            marginPercentage: marginPercentage,
          };
        });
        break;
      case (typeof action === "number"):
        setChartValues(() => {
          const phase = lineItemsData?.lineItems?.find((phase) => phase.id === action);
          const total = phase?.LineItems.reduce((sum, item) => sum + (Number(item.total) + Number(item.margin)),0);
          const margin = phase?.LineItems.reduce((sum, item) => sum + Number(item.margin),0);
          const marginPercentage = ((margin / total) * 100).toFixed(2);
          setLineItems(phase.LineItems);
          setSelectLineItems('all')
          return {
            totalCost: total,
            totalMargin: margin,
            marginPercentage: marginPercentage,
            phaseId: action
          };
        });
        break;
      default:
        break;
    }

    return 
  };

  const fetchProfitStats = async () => {
    try {
      const result = await getProjectDeadlineStats({
        userId,
        projectId,
      }).unwrap();
      setProjects(result);
      setChartValues(() => {
        const marginPercentage = ((result.totalMargin / result.totalCost) * 100).toFixed(2);
        return {
          totalCost: result?.totalCost?.toFixed(2),
          totalMargin: result?.totalMargin?.toFixed(2),
          marginPercentage: marginPercentage,
        };
      });
    } catch (err) {
      console.error("Failed to fetch reports stats:", err);
    }
  };
  const fetchLineItemStats = async () => {
    try {
      await getLineItemMargins({
        projectId,
      }).unwrap();
      // console.log("Success getProjectCostStats:", result);
    } catch (err) {
      console.error("Failed to fetch reports stats:", err);
    }
  };

  useEffect(() => {
    if(!projects){
      fetchProfitStats();
    }
    fetchLineItemStats();
  }, []);

  const totalCost = projects?.totalCost?.toFixed(2);
  const totalMargin = projects?.totalMargin?.toFixed(2);
  let marginPercentage = 0; // Default value

  if (projects?.totalCost) {
    marginPercentage = (
      (projects.totalMargin / projects.totalCost) *
      100
    ).toFixed(2);
  }

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={1}
      >
        <Select
          value={selectValue}
          onChange={handleSelectValue}
          size="small"
          sx={{
            fontSize: { xl: "20px", lg: "16px", md: "20px", xs: "20px" },
            fontFamily: "var(--main-font-family)",
            fontWeight: 500,
            color: "#4C8AB1",
            maxWidth: "250px",
          }}
        >
          <MenuItem value="total">Total Cost/Margin</MenuItem>
          {/* <MenuItem value="month">Monthly</MenuItem> */}
          <ListSubheader>Phases</ListSubheader>
          {lineItemsData?.lineItems?.map((phase) => {
            return <MenuItem value={phase.id}>{phase.phase_name}</MenuItem>;
          })}
        </Select>
        {/* <Typography
          fontSize={{ xl: "20px", lg: "16px", md: "20px", xs: "20px" }}
          fontFamily={"var(--main-font-family)"}
          fontWeight={"500"}
          color={"#4C8AB1"}
        >
          Total Cost/Profit
        </Typography> */}
        <Typography
          color={"#606060"}
          fontFamily={"var(--main-font-family)"}
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
                Total
              </Typography>
              <Typography
                // textAlign={"center"}
                fontFamily={"var(--main-font-family)"}
                fontWeight={"500"}
                fontSize={{ xl: 18, lg: 15, md: 18, xs: 18 }}
                sx={{ whiteSpace: "nowrap", textAlign: "left" }}
              >
                ${formatMoney(chartValues?.totalCost)}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <CircleIcon
              sx={{ color: "#90BE6D", fontSize: "10px", paddingTop: "4px" }}
            />
            <Stack direction={"column"}>
              <Typography
                fontFamily={"var(--main-font-family)"}
                fontSize={{ xl: 16, lg: 14, md: 16, xs: 16 }}
                sx={{ textAlign: "left" }}
              >
                Profit Margin
              </Typography>
              <Typography
                sx={{ whiteSpace: "nowrap", textAlign: "left" }}
                fontFamily={"var(--main-font-family)"}
                fontWeight={"500"}
                fontSize={{ xl: 18, lg: 15, md: 18, xs: 18 }}
              >
                ${formatMoney(chartValues?.totalMargin)}
              </Typography>
              <Typography
                textAlign={"center"}
                color={chartValues?.marginPercentage < 0 ? "#F94144" : "#90BE6D"}
                fontSize={{ xl: 26, lg: 23, md: 26, xs: 26 }}
                fontWeight={"600"}
                fontFamily={"var(--main-font-family)"}
              >
                {chartValues?.marginPercentage ? chartValues?.marginPercentage : 0}%
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          justifyContent={"flex-start"}
          alignItems={"start"}
          width={"100%"}
        >
          <Select
            size="small"
            value={selectLineItems}
            onChange={handleSelectLineItem}
            sx={{
              fontSize: { xl: "16px", lg: "14px", md: "16px", xs: "16px" },
              fontFamily: "var(--main-font-family)",
              fontWeight: 400,
              maxWidth: "250px",
              display: selectValue === "total" ? "none" : "initial"
            }}
          >
            <MenuItem value="all">Total lineItems</MenuItem>
            {lineItems.map((lineItem) =>{ 
              return (<MenuItem value={lineItem.id}>{lineItem.title}</MenuItem>)
            })}
          </Select>
        </Stack>
        <ProfitMarginStackedBarChart
          totalMargin={chartValues?.totalMargin}
          totalCost={chartValues?.totalCost}
        />
      </Stack>
    </>
  );
};

export default ProfitMarginBarChartCard;
