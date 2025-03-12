import { Button, Stack, Typography } from "@mui/material";
import moment from "moment-timezone";
import React from "react";
import BuilderProButton from "../UI/Button/BuilderProButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const InvoiceNotification = ({ data, setInvoiceNotification }) => {
  const { t } = useTranslation
  const navigate = useNavigate()
  // console.log(data)

  return (
    <Stack p={1} borderRadius={"14px"}>
      <Typography
        variant="h6"
        display={"block"}
        fontFamily={'var(--main-font-family)'}
        fontSize={"12px"}
      >
        {t("InvoiceNotification.newInvoice")}: {data?.data?.InvoiceNumber}
      </Typography>
      <Typography variant="body2" fontFamily={'var(--main-font-family)'} fontSize={"14px"}>
        {t("InvoiceNotification.body.part1")} (INV-{data?.data?.InvoiceNumber}) {t("InvoiceNotification.body.part2")}{" "}
        {data?.data?.Client?.firstName} {t("InvoiceNotification.body.part3")} {data?.data?.Admin?.firstName}.
      </Typography>
      <Typography fontFamily={'var(--main-font-family)'} fontSize={"14px"}>
        {t("InvoiceNotification.body2")}
      </Typography>
      <Typography>
        {moment(data?.data?.InvoiceDueDate).format("MM/DD/YYYY")}.
      </Typography>
      <Typography fontFamily={'var(--main-font-family)'} fontSize={"14px"}>
        {t("InvoiceNotification.body3")}
      </Typography>
      <Stack alignItems={"flex-end"}>

        <BuilderProButton
          variant={"contained"}
          backgroundColor={"#4C8AB1"}
          fontSize={"11px"}
          fontFamily={'var(--main-font-family)'}
          marginLeft={"5px"}
          alignSelf={"right"}
          handleOnClick={() => {
            navigate(`/invoicePayment/${data?.data?.id}/${data?.data?.Admin.id}/${data?.data?.InvoiceBill}`)
            setInvoiceNotification(null);
          }}
        >
          {t("InvoiceNotification.button")}
        </BuilderProButton>

      </Stack>
    </Stack>
  );
};

export default InvoiceNotification;
