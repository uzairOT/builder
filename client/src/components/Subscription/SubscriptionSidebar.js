import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Profile from "../Dashboard/ProfileView/Profile";
import PaymentHistoryCard from "../UI/Card/PaymentHistoryCard";

let userData = localStorage.getItem("userInfo");
let userInfo = JSON.parse(userData);
const currentUser = userInfo?.user;

const SubscriptionSidebar = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  // const data = [
  //   {
  //     plan: "Business+",
  //     payment: "$7.50 USD",
  //     date: "February 12/2024",
  //   },
  //   {
  //     plan: "Business+",
  //     payment: "$7.50 USD",
  //     date: "February 12/2024",
  //   },
  //   {
  //     plan: "Business+",
  //     payment: "$7.50 USD",
  //     date: "February 12/2024",
  //   },
  //   {
  //     plan: "Business+",
  //     payment: "$7.50 USD",
  //     date: "February 12/2024",
  //   },
  //   {
  //     plan: "Business+",
  //     payment: "$7.50 USD",
  //     date: "February 12/2024",
  //   },
  //   {
  //     plan: "Business+",
  //     payment: "$7.50 USD",
  //     date: "February 12/2024",
  //   },
  // ];
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const res = await fetch("http://192.168.0.112:8080/payment/paymentHistory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser.id }),
        });
        const data = await res.json();
        if (data.success) {
          setPaymentHistory(data.payments);
        }
        console.log("0909090909--->", data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPaymentHistory();
  }, []);

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
          {paymentHistory.length > 0 ? (
            paymentHistory.map((item) => (
              <PaymentHistoryCard
                key={item.id}
                data={{
                  plan: item.planType,
                  payment: `$${item.amount} USD`,
                  date: new Date(item.createdAt).toLocaleDateString(),
                }}
              />
            ))
          ) : (
            <Typography>No payment history available.</Typography>
          )}
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
    height: "50vh",
  },
};
