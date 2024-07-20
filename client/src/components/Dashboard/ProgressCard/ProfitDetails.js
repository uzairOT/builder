import { Box, Stack, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import RadialBarsChart from "../../UI/Charts/RadialBarsChart";
import React from "react";
import { formatMoney } from "../../../utils/Formatters/moneyFormat";
import { Textarea } from "@mui/joy";
import { valueFormatter } from "../../../utils/Formatters/valueFormatter";

const ProfitDetails = ({ TotalProfit, totalProfitFromPaidInvoices, totalProjectCost }) => {
  const percentage = (parseFloat(TotalProfit)/parseFloat(totalProjectCost)) * 100;
  return (
    <Stack pt={2} justifyContent={"center"}>
      <Typography pl={4} textAlign={"left"} sx={themeStyle.title}>
        Profit Details
      </Typography>
      <Stack pl={0} direction={"row"} justifyContent={"center"} width={"100%"} pt={2}>
        <Box>
          <Stack direction={"row"} sx={themeStyle.innerStackLayout}>
            <Typography textAlign={"left"} sx={themeStyle.innerTitle}>
              Projected Profit
            </Typography>
            <Typography textAlign={"left"} sx={{...themeStyle.innerSubtitle, maxWidth:'300px', overflow:'hidden', textOverflow:'ellipsis'}}>
              ${formatMoney(TotalProfit)}
            </Typography>
          </Stack>
          {/* <Stack direction={"row"} sx={themeStyle.innerStackLayout}>
            <Typography textAlign={"left"} sx={themeStyle.innerTitle}>
              Gross Profit
            </Typography>
            <Typography textAlign={"left"} sx={themeStyle.innerSubtitle}>
              $286,657.13
            </Typography>
          </Stack> */}
          <Stack direction={"row"} sx={themeStyle.innerStackLayout}>
            <Typography textAlign={"left"} sx={themeStyle.innerTitle}>
              Margin
            </Typography>
            <Typography textAlign={"left"} sx={themeStyle.innerSubtitle}>
              {isNaN(percentage)  ? 0 : percentage?.toFixed(2)}%
            </Typography>
          </Stack>
        </Box>
        {/* <Stack pl={4} justifyContent={"flex-end"}>
          <Stack direction={"row"} alignItems={"flex-end"}>
            <ArrowUpwardIcon fontSize="small" style={{ color: "#00AC4F" }} />
            <Typography sx={themeStyle.innerStacktext}>
              <span style={themeStyle.spanItems}>16%</span>this month
            </Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"flex-end"}>
            <ArrowUpwardIcon fontSize="small" style={{ color: "#00AC4F" }} />
            <Typography sx={themeStyle.innerStacktext}>
              <span style={themeStyle.spanItems}>6%</span> this month
            </Typography>
          </Stack>
        </Stack> */}
      </Stack>
      <Stack
        ml={"16px"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <RadialBarsChart
          TotalProfit={TotalProfit}
          totalProfitFromPaidInvoices={totalProfitFromPaidInvoices}
        />
        <Stack pb={4} width={"100%"}>
          <Stack spacing={1}>
            <Stack
              direction={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              spacing={0.2}
            >
              <Box
                backgroundColor={"#52ab6c"}
                width={"16px"}
                height={"8px"}
                borderRadius={0.7}
              ></Box>
              <Stack
                direction={{
                  xl: "row",
                  lg: "row",
                  md: "column",
                  sm: "row",
                  xs: "row",
                }}
                spacing={{ xl: 0.5, lg: 0.5, md: 0, sm: 0.5, xs: 0.5 }}
              >
                {/* <Typography
                  fontSize={"9px"}
                  fontWeight={"700"}
                  pl={0.2}
                  fontFamily={"Inter, sans-serif"}
                
                >
                  ${formatMoney(TotalProfit)}
                </Typography> */}
                <Typography
                  fontSize={"9px"}
                  fontFamily={"Inter, sans-serif"}
                 
                >
                  Projected Profit
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              spacing={0.2}
            >
              <Box
                backgroundColor={"#76d3fd"}
                width={"16px"}
                height={"8px"}
                borderRadius={0.7}
              ></Box>
              <Stack
                direction={{
                  xl: "row",
                  lg: "row",
                  md: "column",
                  sm: "row",
                  xs: "row",
                }}
                spacing={{ xl: 0.5, lg: 0.5, md: 0, sm: 0.5, xs: 0.5 }}
              >
                {/* <Typography
                  fontSize={"9px"}
                  fontWeight={"700"}
                  pl={0.2}
                  fontFamily={"Inter, sans-serif"}
                  
                 
                >
                  ${formatMoney(totalProfitFromPaidInvoices)}
                </Typography> */}
                <Typography fontSize={"9px"} fontFamily={"Inter, sans-serif"}>
                  Margin
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProfitDetails;

const themeStyle = {
  title: {
    fontFamily: "inherit",
    color: "#202224",
    opacity: "0.7",
  },
  innerStackLayout: {
    textAlign: "left",
    width: "100%",
    justifyContent: "left",
    alignItems: "center",
  },
  innerTitle: {
    maxWidth: 80,
    minWidth: 80,
    textAlign: "left",
    fontFamily: "inherit",
    color: "#202227",
    fontSize: "10px",
    paddingRight: "32px",
  },
  innerSubtitle: {
    maxWidth: 10,
    minWidth: 10,
    textAlign: "left",
    fontFamily: "inherit",
    color: "#202227",
    fontSize: {xl:"20px",lg:"20px"},
  },
  innerStacktext: {
    fontSize: "10px",
    color: "#292D32",
  },
  spanItems: {
    color: "#00AC4F",
    fontWeight: "700",
  },
};
