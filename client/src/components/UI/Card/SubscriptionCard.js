import Stack from "@mui/joy/Stack";
import { Divider, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import React, { cloneElement, useState } from "react";
import CheckSharpIcon from '@mui/icons-material/CheckSharp';

const SubscriptionCard = ({
  planType,
  current,
  setCurrentPlan,
  currentPlan,
  setCurrentPakage,
}) => {
  const plan = (() => {
    switch (planType) {
      case "Business +":
        return {
          name: "Business +",
          color: "#22506C",
          cost: 10,
          planPackage: ["15mb", "15", "8", true],
        };
      case "Pro":
        return {
          name: "Pro",
          color: "#226C6C",
          cost: 15,
          planPackage: ["25mb", "20", "10", true],
        };
      default:
        return {
          name: "Enterprise Grid",
          color: "#3E226C",
          cost: 5,
          planPackage: ["10mb", "10", "5", false],
        };
    }
  })();
  const generateList = (renderItem) => {
    return [
      "File size",
      "Amount of pics",
      "Amount of users",
      "Yearly plan option",
    ].map((value, index) =>
      cloneElement(renderItem(value, index), { key: value, value: value })
    );
  };
  const handleClick = () => {
    console.log("Cost:", plan.cost);
    setCurrentPlan(plan?.cost);
    setCurrentPakage(plan.name);
  };
  const handlePrevious = () => {
    console.log("first");
  };
  // console.log("plan",plan)
  return (
    <Paper
      style={{ width: "100%", borderRadius: "14px", cursor: "pointer" }}
      onClick={current ? handlePrevious : handleClick}
    >
      <Stack
        backgroundColor={plan.color}
        // p={2}
        // px={4}
        borderRadius={"14px 14px 0 0"}
      >
        <Stack
      
        
        >
        <Typography   p={2} sx={themeStyle.title} pl={3}>{plan.name}</Typography>
        <Divider variant="fullWidth" orientation="horizontal"  sx={{backgroundColor:'white'}} />
        <Typography    p={1} pl={3} sx={themeStyle.subtitle}>
          Scale your business, increase productivity, and keep your teams
          connected
        </Typography>
        </Stack>
        <Stack
        px={2}
        
        >
        <Typography sx={{...themeStyle.bodyText, fontWeight:600 }} pl={1}>
          Prescription Plan
        </Typography>
        <List>
          {generateList((value, index) => {
            if (index === 3 && !plan.planPackage[index]) {
              return <></>;
            }
            return (
              <ListItem
                dense={true}
                secondaryAction={
                  <Typography sx={themeStyle.bodyText}>
                   
                  </Typography>
                }
              >
                <ListItemIcon><CheckSharpIcon sx={{color:'white'}}/></ListItemIcon>
                <ListItemText
                  sx={{...themeStyle.bodyText, marginLeft:'-8px'}}
                  primary={`${value}  ${typeof plan.planPackage[index] === 'boolean' ? '' : `- ${plan.planPackage[index]}`}`}
                  // secondary={secondary ? `Secondary text: ${value}` : null}
                />
              </ListItem>
            );
          })}
        </List>
        </Stack>
      </Stack>
      <Stack p={1} px={4}>
        <Typography sx={themeStyle.bodyTitle} color={plan.color}>
          ${plan.cost}
        </Typography>
        {/* { current ? <Typography sx={themeStyle.bodyText} >Last Paid: 12/12/2024</Typography> : <Typography sx={themeStyle.bodyText} >per person/month, when billed monthly</Typography>} */}
      </Stack>
    </Paper>
  );
};

export default SubscriptionCard;

const themeStyle = {
  title: {
    fontSize: "28px",
    fontWeight: "500",
    fontFamily: "Arial Rounded MT, sans-serif",
    color: "#FFF",
    padding: "8px",
  },
  subtitle: {
    fontSize: "16px",
    fontWeight: "500",
    fontFamily: "Arial Rounded MT, sans-serif",
    color: "#FFF",
  },
  bodyTitle: {
    fontSize: "24px",
    fontWeight: "500",
    fontFamily: "Arial Rounded MT, sans-serif",
  },
  bodyText: {
    fontSize: "16px",
    fontWeight: "400",
    fontFamily: "Arial Rounded MT, sans-serif",
    color: "#FFF",
   
  },
};
