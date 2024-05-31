import { Box, Typography } from "@mui/material";
import React from "react";
import PieChartDisplay from "../../UI/Charts/PieChart";

const PaymentDetails = ({ totalProjectCost }) => {
  return (
    <Box width={"100%"} pl={4} pt={2}>
      <Typography textAlign={"left"} sx={themeStyle.title}>
        Payment Details
      </Typography>
      <PieChartDisplay totalProjectCost={totalProjectCost} />
    </Box>
  );
};

export default PaymentDetails;

const themeStyle = {
  title: {
    fontFamily: "inherit",
    color: "#202224",
    opacity: "0.7",
  },
};
