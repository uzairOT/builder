import { Grid, } from "@mui/material";
import React, { useState } from "react";
import SubscriptionSidebar from "../../components/Subscription/SubscriptionSidebar";
import SubscriptionPlans from "../../components/Subscription/SubscriptionPlans";
import SubscriptionForm from "../../components/Subscription/SubscriptionForm";

const Subscription = () => {
  const [currentPlan, setCurrentPlan] = useState("");
  const [currentPakage, setCurrentPakage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  let userInfo = localStorage.getItem("userInfo");
  const userParseInfo = JSON.parse(userInfo);
  let IsValidSub = userParseInfo?.user?.hasValidSubscription;
  const subHeight = !IsValidSub ? "100vh" : "93vh";
  // console.log("Plan Type", IsValidSub);
  return (
    <>
      <Grid
        container
        height={subHeight}
        mt={"0.0000001px"}
        backgroundColor={"#eff5ff"}
        spacing={1}
        overflow={"hidden"}
        sx={themeStyle.scrollable}
      >
        <Grid
          item
          xl={2}
          lg={2}
          md={4}
          sm={12}
          xs={12}
          height={subHeight}
          overflow={"hidden"}
          mb={4}
        >
          <SubscriptionSidebar />
        </Grid>
        <Grid
          item
          container
          xl={10}
          lg={10}
          md={8}
          sm={12}
          xs={12}
          spacing={2}
          height={subHeight}
          style={{ overflow: "hidden", ...themeStyle.scrollable }}
        >
          <Grid item xl={7} lg={7} md={12} sm={12} xs={12}>
            <SubscriptionPlans
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              setCurrentPlan={setCurrentPlan}
              currentPlan={currentPlan}
              setCurrentPakage={setCurrentPakage}
            />
          </Grid>
          <Grid item xl={5} lg={5} md={12} sm={12} xs={12}>
            <SubscriptionForm
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              currentPlan={currentPlan}
              currentPakage={currentPakage}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Subscription;

const themeStyle = {
  scrollable: {
    overflowY: "scroll",
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
  },
};
