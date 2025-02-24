import { Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SubscriptionCard from "../UI/Card/SubscriptionCard";
import { getTokenFromLocalStorage } from "../../redux/apis/apiSlice";
import EnterpriseCard from "../UI/Card/EnterpriseCard";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const SubscriptionPlans = ({
  setCurrentPlan,
  currentPlan,
  setCurrentPakage,
  setCurrentPayment,
  currentPayment,
  setRefundPlan
}) => {
  const {t} = useTranslation()
  const [expiryDate, setExpiryDate] = useState(null)
  let userData = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(userData);
  const currentUser = userInfo?.user;
  useEffect(() => {
    const fetchCurrentPayment = async () => {
      try {
        const res = await fetch(
          "https://builderbuilder.net/payment/checkPaymentPlan",
          {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: `Bearer ${getTokenFromLocalStorage()}`,
            }),
            body: JSON.stringify({ orgName: currentUser?.companyName }),
          }
        );
        const data = await res.json();
        if (data.success) {
          setCurrentPayment(data?.payment?.planType);
          setExpiryDate(data?.payment.expiryDate)
        }else{
          toast.warning(data?.message)
        }
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentPayment();
    // console.log("currentPaymentcurrentPaymentcurrentPayment", currentPayment);
  }, []);
  return (
    <Stack p={1} pl={4}>
      {currentPayment.length > 0 ? (
        <>
          <Typography sx={themeStyle.title} pl={1}>
            {t("Subscription.currentPlan")}
          </Typography>
          <Stack spacing={2} pb={1} p={1}>
            <SubscriptionCard current={true} planType={currentPayment} expiryDate={expiryDate}/>
            <Divider />
          </Stack>
        </>
      ) : (
        <></>
      )}

      <Typography sx={themeStyle.title} pb={2}>
        {currentPayment ? t("Subscription.updatePlan") : t("Subscription.choosePlan")}
      </Typography>
      <Grid container spacing={4} p={1}>
        <Grid item xs={12}>
          <SubscriptionCard
            currentPlan={currentPlan}
            setCurrentPlan={setCurrentPlan}
            setCurrentPakage={setCurrentPakage}
            planType={"Business +"}
          />
        </Grid>
        <Grid item xs={12}>
          <SubscriptionCard
            currentPlan={currentPlan}
            setCurrentPlan={setCurrentPlan}
            setCurrentPakage={setCurrentPakage}
            planType={"Business Pro"}
          />
        </Grid>

        <Grid item xs={12}>
          <EnterpriseCard
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
    fontSize: { xl: "28px", lg: "25px", md: "28px", xs: "28px" },
    fontWeight: "500",
    fontFamily: "var(--main-font-family)",
    color: "#000000",
  },
};
