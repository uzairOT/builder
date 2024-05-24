import Stack from "@mui/joy/Stack";
import { Paper, Typography } from "@mui/material";
import React, { useState } from "react";

const SubscriptionCard = ({
  planType,
  current,
  setCurrentPlan,
  currentPlan,
  setCurrentPakage,
}) => {
  const plan = (() => {
    switch (planType) {
      case "Business +":
        return {
          name: "Business +",
          color: "#22506C",
          cost: 10,
        };
      case "Pro":
        return {
          name: "Pro",
          color: "#226C6C",
          cost: 15,
        };
      default:
        return {
          name: "Enterprise Grid",
          color: "#3E226C",
          cost: 5,
        };
    }
  })();
  const handleClick = () => {
    console.log("Cost:", plan.cost);
    setCurrentPlan(plan?.cost);
    setCurrentPakage(plan.name);
  };
  const handlePrevious = () => {
    console.log("first");
  };
  // console.log("plan",plan)
  return (
    <Paper
      style={{ width: "100%", borderRadius: "14px", cursor: "pointer" }}
      onClick={current ? handlePrevious : handleClick}
    >
      <Stack
        backgroundColor={plan.color}
        p={2}
        px={4}
        borderRadius={"14px 14px 0 0"}
      >
        <Typography sx={themeStyle.title}>{plan.name}</Typography>
        <Typography sx={themeStyle.subtitle}>
          Scale your business, increase productivity, and keep your teams
          connected
        </Typography>
      </Stack>
      <Stack p={1} px={4}>
        <Typography sx={themeStyle.bodyTitle} color={plan.color}>
          ${plan.cost}
        </Typography>
        {/* { current ? <Typography sx={themeStyle.bodyText} >Last Paid: 12/12/2024</Typography> : <Typography sx={themeStyle.bodyText} >per person/month, when billed monthly</Typography>} */}
      </Stack>
    </Paper>
  );
};

export default SubscriptionCard;

const themeStyle = {
  title: {
    fontSize: "28px",
    fontWeight: "500",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    color: "#FFF",
    padding: "8px",
  },
  subtitle: {
    fontSize: "16px",
    fontWeight: "500",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    color: "#FFF",
  },
  bodyTitle: {
    fontSize: "24px",
    fontWeight: "500",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  },
  bodyText: {
    fontSize: "16px",
    fontWeight: "500",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  },
};
