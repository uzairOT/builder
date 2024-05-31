import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import CheckoutForm from "../../PaymentModal/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";

const InvoicePayment = () => {
  const { invoiceId, totalAmount } = useParams();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  // const [amount, setAmount] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.0.113:8080/payment/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: totalAmount }),
    }).then(async (result) => {
      const { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, [totalAmount]);

  useEffect(() => {
    fetch("http://192.168.0.113:8080/payment/config").then(async (r) => {
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
        <Box display="flex" flexDirection="column" alignItems="center">
          {loading ? (
            <CircularProgress />
          ) : (
            clientSecret &&
            stripePromise && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm currentPlan={totalAmount} isInvoicePayment={true} invoiceId={invoiceId}/>
              </Elements>
            )
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default InvoicePayment;
