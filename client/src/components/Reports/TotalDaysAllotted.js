import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { useTranslation } from 'react-i18next';
const TotalDaysAllotted = ({ data }) => {
  const {t} = useTranslation()
  // let dataUser = localStorage.getItem("userInfo");
  // let userInfo = JSON.parse(dataUser);
  // const currentUser = userInfo?.user;
  // const userId = currentUser?.id;
  // const [getWorkDayStats, { data, error, isLoading }] =
  //   useGetWorkDayStatsMutation();

  // // Trigger the mutation when needed, e.g., on a button click
  // const fetchWorkStats = async () => {
  //   try {
  //     const result = await getWorkDayStats({ userId }).unwrap();
  //     console.log("Success:", result);
  //   } catch (err) {
  //     console.error("Failed to fetch reports stats:", err);
  //   }
  // };

  // useEffect(() => {
  //   fetchWorkStats();
  // }, []);

  return (
    <Stack>
      <Typography
        fontSize={{ xl: "15px", lg: "12px", md: "15px", xs: "15px" }}
        fontWeight={"500"}
        fontFamily={'var(--main-font-family)'}
        p={1}
        pl={2}
      >
        {t("ProjectReports.totalDaysAllotted.title1")}
      </Typography>
      <Typography
        fontSize={{ xl: "27px", lg: "24px", md: "27px", xs: "27px" }}
        fontWeight={"500"}
        fontFamily={'var(--main-font-family)'}
        p={"0px 8px 8px 16px"}
      >
        {data?.totalProjectsCount}
      </Typography>
      <Divider variant="fullWidth" />
      <Stack width={{ xl: 250, lg: 150 }} direction={"row"} p={2} py={3}>
        <Box
          backgroundColor={"#2D9CDB"}
          width={{
            xl: (250 * data?.totalWorkDaysRemaining) / 14,
            lg: (100 * data?.totalWorkDaysRemaining) / 14,
          }}
          height={"20px"}
          borderRadius={"14px"}
        ></Box>
        <Box
          backgroundColor={"#90BE6D"}
          width={{
            xl: (250 * data?.totalWorkDaysRemaining) / 14,
            lg: (100 * data?.totalWorkDaysRemaining) / 14,
          }}
          height={"20px"}
          borderRadius={"14px"}
        ></Box>
      </Stack>
      <Stack direction={"column"} spacing={1} width={"80%"} pb={2} pl={2}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <CircleIcon sx={{ color: "#2D9CDB",  fontSize: {xl:"10px",lg:"8px",md:"10px",xs:"10px"} }} />
            <Typography fontFamily={'var(--main-font-family)'} fontSize={{xl:"12px",lg:"12px",md:"12px",xs:"12px"}}>
              {t("ProjectReports.totalDaysAllotted.title2")}
            </Typography>
          </Stack>
          <Typography fontSize={{xl:"16px",lg:"14px",xl:"16px",xl:"16px"}} textAlign={"right"}>
            {data?.totalWorkDaysSpent}
          </Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <CircleIcon sx={{ color: "#90BE6D", fontSize: {xl:"10px",lg:"8px",md:"10px",xs:"10px"} }} />
            <Typography fontFamily={'var(--main-font-family)'} fontSize={{xl:"12px",lg:"12px",md:"12px",xs:"12px"}}>
              {t("ProjectReports.totalDaysAllotted.title3")}
            </Typography>
          </Stack>
          <Typography fontSize={{xl:"16px",lg:"14px",xl:"16px",xl:"16px"}} textAlign={"center"}>
            {data?.totalWorkDaysRemaining}
          </Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <CircleIcon sx={{ color: "#F94144", fontSize: {xl:"10px",lg:"8px",md:"10px",xs:"10px"} }} />
            <Typography fontFamily={'var(--main-font-family)'} fontSize={{xl:"12px",lg:"12px",md:"12px",xs:"12px"}}>
              {t("ProjectReports.totalDaysAllotted.title4")}
            </Typography>
          </Stack>
          <Typography fontSize={{xl:"16px",lg:"14px",xl:"16px",xl:"16px"}} textAlign={"center"}>
            {data?.totalWorkDaysOverdue}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TotalDaysAllotted;
