import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import SubscriptionSidebar from "../../components/Subscription/SubscriptionSidebar";
import SubscriptionPlans from "../../components/Subscription/SubscriptionPlans";
import SubscriptionForm from "../../components/Subscription/SubscriptionForm";

const Subscription = () => {

  return (
    <>
      <Grid container height={"100vh"} backgroundColor={"#eff5ff"} spacing={1} overflow={'hidden'} sx={themeStyle.scrollable}>
        <Grid item xl={2} lg={4} md={4} sm={12} xs={12} height={"99vh"}>
            <SubscriptionSidebar />
        </Grid>
        <Grid item container xl={10} lg={8} md={8} sm={12} xs={12} spacing={2} height={"99vh"} style={{overflow:'hidden', ...themeStyle.scrollable}}>
        <Grid item xl={7} lg={12} md={12} sm={12} xs={12}>
        <SubscriptionPlans />
        </Grid>
        <Grid item xl={5} lg={12} md={12} sm={12} xs={12}>
        <SubscriptionForm />
        </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Subscription;

const themeStyle = {
  scrollable:{
    overflowY: 'scroll',
    scrollbarWidth: 'none',  // For Firefox
    '-ms-overflow-style': 'none',  // For IE and Edge
    '&::-webkit-scrollbar': {
      width: '6px'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
      transition: 'background-color 0.3s',
    },
    '&:hover::-webkit-scrollbar-thumb': {
      backgroundColor: '#ddd',
    }, }
}