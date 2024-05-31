import { Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SubscriptionCard from "../UI/Card/SubscriptionCard";

const SubscriptionPlans = ({
  setCurrentPlan,
  currentPlan,
  setCurrentPakage,
}) => {
  const [currentPayment, setCurrentPayment] = useState([]);
  let userData = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(userData);
  const currentUser = userInfo?.user;
  useEffect(() => {
    const fetchCurrentPayment = async () => {
      try {
        const res = await fetch(
          "http://3.135.107.71/payment/checkPaymentPlan",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ orgName: currentUser.companyName }),
          }
        );
        const data = await res.json();
        if (data.success) {
          console.log("080808080--->", data?.payment?.planType);
          setCurrentPayment(data?.payment?.planType);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentPayment();
    console.log("currentPaymentcurrentPaymentcurrentPayment", currentPayment);
  }, []);
  return (
    <Stack p={1} pl={4}>
      {currentPayment.length > 0 ? (
        <>
          <Typography sx={themeStyle.title} pl={1}>
            Your Current Plan
          </Typography>
          <Stack spacing={2} pb={1} p={1}>
            <SubscriptionCard current={true} planType={currentPayment} />
            <Divider />
          </Stack>
        </>
      ) : (
        <></>
      )}

      <Typography sx={themeStyle.title} pb={2}>
        {currentPayment ? "Update Plan" : "Choose plan"}
      </Typography>
      <Grid container spacing={4} p={1}>
        <Grid item xl={6}>
          <SubscriptionCard
            currentPlan={currentPlan}
            setCurrentPlan={setCurrentPlan}
            setCurrentPakage={setCurrentPakage}
            planType={"Pro"}
          />
        </Grid>
        <Grid item xl={6}>
          <SubscriptionCard
            currentPlan={currentPlan}
            setCurrentPlan={setCurrentPlan}
            setCurrentPakage={setCurrentPakage}
            planType={"Business +"}
          />
        </Grid>
        <Grid item xl={6}>
          <SubscriptionCard
            currentPlan={currentPlan}
            setCurrentPlan={setCurrentPlan}
            setCurrentPakage={setCurrentPakage}
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
