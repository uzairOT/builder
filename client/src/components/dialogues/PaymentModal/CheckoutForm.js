import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { getTokenFromLocalStorage } from "../../../redux/apis/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../../redux/slices/authSlice";

export default function CheckoutForm({
  address,
  currentPlan,
  currentPakage,
  orgName,
  userId,
  orgId,
  selectedPlan,
  isInvoicePayment = false,
  invoiceId,
  paymentType,
  setPaymentType,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const status = "success";
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const payload = {
    address: address,
    amount: currentPlan,
    planType: currentPakage,
    orgName: orgName,
    userId: userId,
    status,
    organizationId: orgId,
    paymentType,

    // Add other form values here as needed
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(
    //   "-=-=-=-=-=-",
    //   address,
    //   currentPlan,
    //   currentPakage,
    //   orgName,
    //   userId,
    //   orgId,
    //   selectedPlan
    // );
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      // console.log("Where here???");
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        // return_url: `${window.location.origin}/completion`,
      },
      redirect: "if_required",
    });

    if (error) {
      console.log(paymentIntent, "Rrror", error);
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // console.log(paymentIntent, "----0-009-00-09-=");

      // Call the appropriate API when payment succeeds
      const apiUrl = isInvoicePayment
        ? "https://builderbuilder.net/invoice/payInvoice"
        : "https://builderbuilder.net/payment/addPayment";

      const apiPayload = isInvoicePayment
        ? { invoiceId, totalAmount: currentPlan, paymentMethod:'Stripe' }
        : payload;

      // Call the API with the payload when payment succeeds
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
          body: JSON.stringify(apiPayload),
        });

        if (response.ok) {
          setMessage("Your payment was " + paymentIntent.status);
          const responseData = await response.json();
          const data = {
            ...userInfo,
            user: {
              ...userInfo.user,
              hasValidSubscription: responseData?.hasValidSubscription,
            },
          };
          if(!isInvoicePayment){
            dispatch(setCredentials(data));
          }
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
    } else {
      // console.log(paymentIntent, "Nonono Fail");
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form">
      <PaymentElement id="payment-element" />
      <button
        disabled={isProcessing || !stripe || !elements}
        id="submit"
        // type="submit"
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
