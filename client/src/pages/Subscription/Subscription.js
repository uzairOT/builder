import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import SubscriptionSidebar from "../../components/Subscription/SubscriptionSidebar";
import SubscriptionPlans from "../../components/Subscription/SubscriptionPlans";

const Subscription = () => {

  return (
    <>
      <Grid container height={"100vh"} backgroundColor={"#eff5ff"} spacing={1}>
        <Grid item xl={2} md={2} height={"99vh"}>
            <SubscriptionSidebar />
        </Grid>
        <Grid item xl={6}>
        <SubscriptionPlans />
        </Grid>
      </Grid>
    </>
  );
};

export default Subscription;


