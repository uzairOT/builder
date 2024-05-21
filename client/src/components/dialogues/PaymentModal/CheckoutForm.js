import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("-=-=-=-=-=-");
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
