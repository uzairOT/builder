import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm({
  address,
  currentPlan,
  currentPakage,
  orgName,
  userId,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const status = "success";
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const payload = {
    address: address,
    amount: currentPlan,
    planType: currentPakage,
    orgName: orgName,
    userId: userId,
    status,
    // Add other form values here as needed
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "-=-=-=-=-=-",
      address,
      currentPlan,
      currentPakage,
      orgName,
      userId
    );
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      console.log("Where here???");
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
      redirect: "if_required",
    });

    if (error) {
      console.log(paymentIntent, "Rrror", error);
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log(paymentIntent, "----0-009-00-09-=");
      setMessage("Your payment was " + paymentIntent.status);

      // Call the API with the payload when payment succeeds
      try {
        const response = await fetch("http://3.135.107.71/payment/addPayment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("API Response:", responseData);
        } else {
          console.error("API Response Error:", response.statusText);
        }
      } catch (apiError) {
        console.error("API Call Error:", apiError);
      }
    } else {
      console.log(paymentIntent, "Nonono Fail");
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        disabled={isProcessing || !stripe || !elements}
        id="submit"
        onClick={handleSubmit}
        style={{ borderRadius: "10px" }}
      >
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      <div style={{ marginTop: "1rem" }}>
        {message && <alert id="payment-message">{message}</alert>}
      </div>
    </form>
  );
}
