import { Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import SubscriptionCard from "../UI/Card/SubscriptionCard";

const SubscriptionPlans = ({setCurrentPlan,currentPlan}) => {
  
  return (
    <Stack p={1} pl={4}>
      {/* <Typography sx={themeStyle.title} pl={1}>
        Your Current Plan
      </Typography>
      <Stack spacing={2} pb={1} p={1}>
        <SubscriptionCard
          currentPlan={currentPlan}
          setCurrentPlan={setCurrentPlan}
          current={true}
          planType={"Business"}
        />
        <Divider />
      </Stack> */}
      <Typography sx={themeStyle.title} pb={2}>
        {/* Update Plan */}
        Choose plan
      </Typography>
      <Grid container spacing={4} p={1}>
        <Grid item xl={6}>
          <SubscriptionCard
            currentPlan={currentPlan}
            setCurrentPlan={setCurrentPlan}
            planType={"Pro"}
          />
        </Grid>
        <Grid item xl={6}>
          <SubscriptionCard
            currentPlan={currentPlan}
            setCurrentPlan={setCurrentPlan}
            planType={"Business"}
          />
        </Grid>
        <Grid item xl={6}>
          <SubscriptionCard
            currentPlan={currentPlan}
            setCurrentPlan={setCurrentPlan}
            planType={"EnterpriseGrid"}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default SubscriptionPlans;

const themeStyle = {
  title: {
    fontSize: "28px",
    fontWeight: "500",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    color: "#000000",
  },
};
