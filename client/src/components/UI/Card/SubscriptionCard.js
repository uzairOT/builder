import Stack from "@mui/joy/Stack";
import { Paper, Typography } from "@mui/material";
import React from "react";

const SubscriptionCard = ({ planType, current }) => {
  const plan = (() => {
    switch (planType) {
      case "Business":
        return {
            name: "Business +",
            color: '#22506C'
        };
      case "Pro":
        return  {
            name: "Pro",
            color: '#226C6C'
        };
      default:
        return  {
            name: "Enterprise Grid",
            color: '#3E226C'
        };
    }
  })();
  return (
    <Paper style={{ width: "100%", borderRadius: '14px' }}>
      <Stack backgroundColor={plan.color} p={2} px={4} borderRadius={'14px 14px 0 0'}>
        <Typography sx={themeStyle.title} >{plan.name}</Typography>
        <Typography sx={themeStyle.subtitle}>
          Scale your business, increase productivity, and keep your teams
          connected
        </Typography>
      </Stack>
      <Stack p={1} px={4}>
      <Typography sx={themeStyle.bodyTitle} color={plan.color}>$7.50 USD</Typography>
     { current ? <Typography sx={themeStyle.bodyText} >Last Paid: 12/12/2024</Typography> : <Typography sx={themeStyle.bodyText} >per person/month, when billed monthly</Typography>}
      </Stack>
    </Paper>
  );
};

export default SubscriptionCard;

const themeStyle = {
  title: {
    fontSize: "28px",
    fontWeight: "500",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    color: "#FFF",
    padding: '8px'
  },
  subtitle: {
    fontSize: "16px",
    fontWeight: "500",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    color: "#FFF",
  },
  bodyTitle: {
    fontSize: "24px",
    fontWeight: "500",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  },
  bodyText: {
    fontSize: "16px",
    fontWeight: "500",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  },
};
