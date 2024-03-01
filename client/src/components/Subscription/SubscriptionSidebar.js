import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import Profile from "../Dashboard/ProfileView/Profile";
import PaymentHistoryCard from "../UI/Card/PaymentHistoryCard";

const SubscriptionSidebar = () => {
    const data = [
        {
          plan: "Business+",
          payment: "$7.50 USD",
          date: "February 12/2024",
        },
        {
          plan: "Business+",
          payment: "$7.50 USD",
          date: "February 12/2024",
        },
        {
          plan: "Business+",
          payment: "$7.50 USD",
          date: "February 12/2024",
        },
        {
          plan: "Business+",
          payment: "$7.50 USD",
          date: "February 12/2024",
        },
        {
          plan: "Business+",
          payment: "$7.50 USD",
          date: "February 12/2024",
        },
        {
          plan: "Business+",
          payment: "$7.50 USD",
          date: "February 12/2024",
        },
      ];
  return (
    <>
      <Paper sx={{ height: "100%", borderRadius: "14px" }}>
        <Typography sx={themeStyle.title} p={2} pb={1.5}>
          Subscription
        </Typography>
        <Profile />
        <Typography sx={themeStyle.subtitle} p={2} pb={1.5}>
          Payment History
        </Typography>
        <Box sx={themeStyle.scrollable} overflow={"hidden"}>
          <Stack px={2} spacing={1}>
            {data.map((item, index) => (
              <PaymentHistoryCard key={index} data={item} />
            ))}
          </Stack>
        </Box>
      </Paper>
    </>
  );
};

export default SubscriptionSidebar;

const themeStyle = {
    title: {
      fontSize: "22px",
      fontWeight: "500",
      fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
      color: "#000000",
    },
    subtitle: {
      fontSize: "28px",
      fontWeight: "500",
      fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
      color: "#000000",
    },
    scrollable: {
      scrollbarWidth: "none", // For Firefox
      "-ms-overflow-style": "none", // For IE and Edge
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "transparent",
        transition: "background-color 0.3s",
      },
      "&:hover::-webkit-scrollbar-thumb": {
        backgroundColor: "#ddd",
      },
      overflowY: "scroll",
      height:'50vh'
    },
  };