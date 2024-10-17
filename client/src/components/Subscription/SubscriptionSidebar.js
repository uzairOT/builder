import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Profile from "../Dashboard/ProfileView/Profile";
import PaymentHistoryCard from "../UI/Card/PaymentHistoryCard";
import { getTokenFromLocalStorage } from "../../redux/apis/apiSlice";
import AreYouSureModal from "../dialogues/AreYouSureModal/AreYouSureModal";
import { toast } from "react-toastify";

let userData = localStorage.getItem("userInfo");
let userInfo = JSON.parse(userData);
const currentUser = userInfo?.user;

const SubscriptionSidebar = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [open, setOpen] = useState(false)
  const [refundPlan, setRefundPlan] = useState();
  const [loading, setLoading] = useState(false);

  const handleOpenModal = (refundAmount) => {
    setRefundPlan(refundAmount)
    setOpen(true)
  }
  const handleConfirm = async (action) => {
    if(action){
      await createRefundIntent()
      setOpen(false)
    }else{
      setOpen(false)
    }
  }
  const createRefundIntent = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://builderbuilder.net/payment/create-refund-intent", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }),
        body: JSON.stringify(refundPlan),
      });
  
      const message = await response.json();
      if (message?.error?.message) {
        throw new Error(message.error.message); // Throw the error message if it exists
      } else if (message?.error) {
        throw new Error('An unknown error occurred'); // Generic error if only message.error exists without a message property
      }if(message?.error){
        throw new Error (message?.error?.message)
      }
      console.log(message)
      toast.success(message?.message||'Success')
      setLoading(false)
    } catch (error) {
      const errorMessage = error.message || 'Something went wrong'; // Extract the error message
      toast.error(errorMessage); // Pass the string to toast.error
      setLoading(false);
      console.log(error); // Log the actual error object
    }
  };
  
  // Call this function whenever you need to create a refund intent
  
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const res = await fetch("https://builderbuilder.net/payment/paymentHistory", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          }),
          body: JSON.stringify({ userId: currentUser.id }),
        });
        const data = await res.json();
        if (data.success) {
          setPaymentHistory(data.payments);
        }

        // console.log("0909090909--->", data);
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
        <Box sx={themeStyle.scrollable} overflow={"hidden"} pb={0.5}>
          <Stack px={2} spacing={1}>
            {paymentHistory.length > 0 ? (
              paymentHistory.map((item) => (
                <PaymentHistoryCard
                  key={item.id}
                  handleOpenModal={handleOpenModal}
                  data={{
                    id:item.id,
                    plan: item.planType,
                    payment: `$${item.amount} USD`,
                    date: new Date(item.createdAt),
                    status: item.status,
                    paymentIntentId: item.paymentIntentId,
                    amount: item.amount
                  }}
                />
              ))
            ) : (
              <Typography fontFamily={"var(--main-font-family)"}>
                No payment history available.
              </Typography>
            )}
          </Stack>
        </Box>
      </Paper>
      <AreYouSureModal
        open={open}
        question={`This process may take 5-10 days.<br />Are you sure you want to refund`}
        handleConfirmDelete={handleConfirm}
        isLoading={loading}
      />
    </>
  );
};

export default SubscriptionSidebar;

const themeStyle = {
  title: {
    fontSize: "22px",
    fontWeight: "500",
    fontFamily: "var(--main-font-family)",
    color: "#000000",
  },
  subtitle: {
    fontSize: { xl: "28px", lg: 20, md: "28px", xs: "28px" },
    fontWeight: "500",
    fontFamily: "var(--main-font-family)",
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
    height: "calc(93vh - 350px)",
  },
};
