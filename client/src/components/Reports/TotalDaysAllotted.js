import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CircleIcon from "@mui/icons-material/Circle";

const TotalDaysAllotted = ({ data }) => {
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
        fontSize={"15px"}
        fontWeight={"500"}
        fontFamily={"Inter, sans serif"}
        p={1}
        pl={2}
      >
        Total Projects--
      </Typography>
      <Typography
        fontSize={"27px"}
        fontWeight={"500"}
        fontFamily={"Inter, sans serif"}
        p={"0px 8px 8px 16px"}
      >
        {data?.totalProjectsCount}
      </Typography>
      <Divider variant="fullWidth" />
      <Stack width={250} direction={"row"} p={2} py={3}>
        <Box
          backgroundColor={"#2D9CDB"}
          width={(250 * data?.totalWorkDaysSpent) / 14}
          height={"20px"}
          borderRadius={"14px"}
        ></Box>
        <Box
          backgroundColor={"#90BE6D"}
          width={(250 * data?.totalWorkDaysRemaining) / 14}
          height={"20px"}
          borderRadius={"14px"}
        ></Box>
      </Stack>
      <Stack direction={"column"} spacing={1} width={"70%"} pb={2} pl={3}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <CircleIcon sx={{ color: "#2D9CDB", fontSize: "10px" }} />
            <Typography fontFamily={"Inter, sans serif"} fontSize={"12px"}>
              Work Days spent
            </Typography>
          </Stack>
          <Typography textAlign={"right"}>
            {data?.totalWorkDaysSpent}
          </Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <CircleIcon sx={{ color: "#90BE6D", fontSize: "10px" }} />
            <Typography fontFamily={"Inter, sans serif"} fontSize={"12px"}>
              Work Days Remaining
            </Typography>
          </Stack>
          <Typography textAlign={"center"}>
            {data?.totalWorkDaysRemaining}
          </Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <CircleIcon sx={{ color: "#F94144", fontSize: "10px" }} />
            <Typography fontFamily={"Inter, sans serif"} fontSize={"12px"}>
              Work Days Overdue
            </Typography>
          </Stack>
          <Typography textAlign={"center"}>
            {data?.totalWorkDaysOverdue}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TotalDaysAllotted;
