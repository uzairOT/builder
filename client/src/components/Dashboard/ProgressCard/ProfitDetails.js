import { Box, Stack, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import RadialBarsChart from "../../UI/Charts/RadialBarsChart";
import React from "react";

const ProfitDetails = ({ TotalProfit }) => {
  return (
    <Stack pt={2} justifyContent={"center"}>
      <Typography pl={4} textAlign={"left"} sx={themeStyle.title}>
        Profit Details
      </Typography>
      <Stack pl={4} direction={"row"} width={"100%"} pt={2}>
        <Box>
          <Stack direction={"row"} sx={themeStyle.innerStackLayout}>
            <Typography textAlign={"left"} sx={themeStyle.innerTitle}>
              Total Profit
            </Typography>
            <Typography textAlign={"left"} sx={themeStyle.innerSubtitle}>
              ${TotalProfit}
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
              Profit Earned
            </Typography>
            <Typography textAlign={"left"} sx={themeStyle.innerSubtitle}>
              ${TotalProfit}
            </Typography>
          </Stack>
        </Box>
        <Stack pl={4} justifyContent={"flex-end"}>
          <Stack direction={"row"} alignItems={"flex-end"}>
            <ArrowUpwardIcon fontSize="small" style={{ color: "#00AC4F" }} />
            <Typography sx={themeStyle.innerStacktext}>
              {/* <span style={themeStyle.spanItems}>16%</span>this month */}
            </Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"flex-end"}>
            <ArrowUpwardIcon fontSize="small" style={{ color: "#00AC4F" }} />
            <Typography sx={themeStyle.innerStacktext}>
              {/* <span style={themeStyle.spanItems}>6%</span> this month */}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        ml={"-16px"}
        direction={"row"}
        alignItems={"flex-end"}
        justifyContent={"flex-start"}
      >
        <RadialBarsChart TotalProfit={TotalProfit}/>
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
              <Typography
                fontSize={"9px"}
                fontWeight={"700"}
                pl={0.2}
                fontFamily={"Inter, sans-serif"}
              >
                {TotalProfit}
              </Typography>
              <Typography fontSize={"9px"} fontFamily={"Inter, sans-serif"}>
                Total Profit
              </Typography>
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
              <Typography
                fontSize={"9px"}
                fontWeight={"700"}
                pl={0.2}
                fontFamily={"Inter, sans-serif"}
              >
                {TotalProfit}
              </Typography>
              <Typography fontSize={"9px"} fontFamily={"Inter, sans-serif"}>
                Profit Earned
              </Typography>
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
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerTitle: {
    fontFamily: "inherit",
    color: "#202227",
    fontSize: "10px",
    paddingRight: "32px",
  },
  innerSubtitle: {
    fontFamily: "inherit",
    color: "#202227",
    fontSize: "20px",
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
