import { Button, Stack, Typography } from "@mui/material";
import moment from "moment-timezone";
import React from "react";
import BuilderProButton from "../UI/Button/BuilderProButton";
import { useNavigate } from "react-router-dom";

const InvoiceNotification = ({ data, setInvoiceNotification }) => {
  const navigate = useNavigate()
  console.log(data)

  return (
    <Stack p={1} borderRadius={"14px"}>
      <Typography
        variant="h6"
        display={"block"}
        fontFamily={"inherit"}
        fontSize={"12px"}
      >
        New Invoice: {data?.data?.InvoiceNumber}
      </Typography>
      <Typography variant="body2" fontFamily={"inherit"} fontSize={"14px"}>
        A new invoice (INV-{data?.data?.InvoiceNumber}) has been created for{" "}
        {data?.data?.Client?.firstName} by {data?.data?.Admin?.firstName}.
      </Typography>
      <Typography fontFamily={"inherit"} fontSize={"14px"}>
        Please review the invoice and make a payment by:
      </Typography>
      <Typography>
        {moment(data?.data?.InvoiceDueDate).format("MMM, DD, YYYY")}.
      </Typography>
      <Typography fontFamily={"inherit"} fontSize={"14px"}>
        Please check your email.
      </Typography>
      <Stack alignItems={"flex-end"}>
        
        <BuilderProButton
          variant={"contained"}
          backgroundColor={"#4C8AB1"}
          fontSize={"11px"}
          fontFamily={"inherit"}
          marginLeft={"5px"}
          alignSelf={"right"}
          handleOnClick={() => {
            navigate(`/invoicePayment/${data?.data?.id}/${data?.data?.Admin.id}/${data?.data?.InvoiceBill}`)
            setInvoiceNotification(null);
            }}
            >
          Pay Invoice
        </BuilderProButton>
         
      </Stack>
    </Stack>
  );
};

export default InvoiceNotification;
