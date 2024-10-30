import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
} from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import CheckoutForm from "../../PaymentModal/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserAccountsMutation } from "../../../../redux/apis/Account/AccountApiSlice";
import { fetchUserCoupons } from "../../../Settings/Cupon/apis/fetchUserCoupon";
import { toast } from "react-toastify";
import { getTokenFromLocalStorage } from "../../../../redux/apis/apiSlice";

const InvoicePayment = () => {
  const { invoiceId, totalAmount, adminId } = useParams();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  // const [amount, setAmount] = useState(10);
  const [message, setMessage] = useState("");
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo?.user?.id;
  const [getUserAccounts, { data, isLoading, isError }] =
    useGetUserAccountsMutation({ userId: userId });
  const [loading, setLoading] = useState(true);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const handleChange = (event) => {
    setSelectedAccountId(event.target.value);
  };
  // console.log(selectedAccountId);
  const handleNext = async () => {
    if (selectedAccountId) {
      // Call the appropriate API when payment succeeds
      const apiUrl = "https://builderbuilder.net/invoice/payInvoice";

      const apiPayload = {
        invoiceId,
        totalAmount: totalAmount,
        accountNumber:
          selectedAccountId === "Cash"
            ? ""
            : data?.accounts[selectedAccountId]?.accountNumber,
        accountName:
          selectedAccountId === "Cash"
            ? ""
            : data?.accounts[selectedAccountId]?.accountName,
        paymentMethod: selectedAccountId === "Cash" ? "Cash" : data?.accounts[selectedAccountId]?.accountName,
      };

      // Call the API with the payload when payment succeeds
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          }),
          body: JSON.stringify(apiPayload),
        });
        // console.log(response);
        if (response.ok) {
          setMessage("Complete");
          const responseData = await response.json();
          // console.log("API Response:", responseData);
          window.location.href = `${window.location.origin}/completion`;
        } else {
          const responseData = await response.json();
          setMessage("Payment can't be completed");
          // console.log(
          //   "API Response Error:-=-=-=-=-=-==-=",
          //   responseData?.message
          // );
          toast.warning(`${responseData?.message}`);
        }
      } catch (apiError) {
        console.log("API Call Error:", apiError);
        alert("API Error2:", apiError);
      }
    }
  };

  // console.log(adminId);

  useEffect(() => {
    fetchUserCoupons(getUserAccounts, { userId: adminId });
  }, []);

  useEffect(() => {
    fetch("https://builderbuilder.net/payment/create-payment-intent", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      }),
      body: JSON.stringify({ amount: totalAmount }),
    }).then(async (result) => {
      const { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, [totalAmount]);

  useEffect(() => {
    fetch("https://builderbuilder.net/payment/config", {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      }),
    }).then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
      setLoading(false);
    });
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          <span style={{ color: "#448cb8" }}>Invoice</span>
          <span style={{ color: "#ffb41a" }}>Payment</span>
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Amount to Pay: ${totalAmount}
        </Typography>
        <Typography>Online Payment:</Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          {loading ? (
            <CircularProgress />
          ) : (
            clientSecret &&
            stripePromise && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm
                  paymentAmount={totalAmount}
                  isInvoicePayment={true}
                  invoiceId={invoiceId}
                />
              </Elements>
            )
          )}
        </Box>
        <Typography>Other Payments:</Typography>
        <div>
          <RadioGroup value={selectedAccountId} onChange={handleChange}>
            <Typography fontSize={"14px"}>Account Details:</Typography>
            {data?.accounts.map((account, index) => {
              return (
                <FormControlLabel
                  key={account.id}
                  value={index}
                  control={<Radio />}
                  label={
                    <>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <Avatar>
                          {account?.accountImage ? (
                            <img
                              src={account.accountImage}
                              alt="Account"
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                              }}
                            />
                          ) : (
                            <></>
                          )}
                        </Avatar>
                        <Typography>
                          {account.accountName}-
                          <a
                            href={account.accountLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {account.accountLink}
                          </a>{" "}
                          - {account.accountType}
                        </Typography>
                      </Box>
                    </>
                  }
                />
              );
            })}
            <FormControlLabel
              value={"Cash"}
              label={"Cash"}
              control={<Radio />}
            ></FormControlLabel>
          </RadioGroup>
          <Button
            variant="contained"
            disabled={!selectedAccountId}
            onClick={handleNext}
          >
            Complete Payment
          </Button>
          <>{message}</>
        </div>
      </Paper>
    </Container>
  );
};

export default InvoicePayment;
