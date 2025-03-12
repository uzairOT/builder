import Stack from "@mui/joy/Stack";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { cloneElement, useState } from "react";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import moment from 'moment'
import { useTranslation } from "react-i18next";

const SubscriptionCard = ({
  planType,
  current,
  setCurrentPlan,
  currentPlan,
  expiryDate,
  setCurrentPakage,
}) => {
  const { t } = useTranslation()
  const plan = (() => {
    switch (planType) {
      case "Business +":
        return {
          name: "Business +",
          color: "#22506C",
          costMonth: 39.99,
          costAnnum: 399,
          planPackage: [...(t(`Subscription.SubscriptionCard.${planType}.planPackage`).split("\n")), true],
          planId: planType
        };
      case "Business Pro":
        return {
          name: "Business Pro",
          color: "#226C6C",
          costMonth: 319,
          costAnnum: 2799,
          planPackage: [...(t(`Subscription.SubscriptionCard.${planType}.planPackage`).split("\n")), true],
          planId: planType
        };
      case "Free Trial":
        return {
          name: "30 Day Free Trial",
          color: "#4C8AB1",
          cost: 0,
          planPackage: [...(t(`Subscription.SubscriptionCard.${planType}.planPackage`).split("\n")), false],
          planId: planType
        };
      default:
        return {
          name: "Free Plan",
          color: "#3E226C",
          cost: 5,
          planPackage: ["10mb", "- 10", "5", false],
        };
    }
  })();
  const generateList = (renderItem) => {
    return [
      "",
      t("Subscription.SubscriptionCard.amountOfPhotos"),
      t("Subscription.SubscriptionCard.amountOfFiles"),
      t("Subscription.SubscriptionCard.upTo"),
      // "Yearly plan option",
      // "Monthly plan option",
    ].map((value, index) =>
      cloneElement(renderItem(value, index), { key: value, value: value })
    );
  };
  const handleClick = () => {
    // console.log("Cost:", plan.cost);
    setCurrentPlan(plan?.cost);
    setCurrentPakage(plan.name);
  };
  const handlePrevious = () => {
    // console.log("first");
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
        <Stack>
          <Typography p={2} sx={themeStyle.title} pl={3}>
            {plan.name}
          </Typography>
          <Divider
            variant="fullWidth"
            orientation="horizontal"
            sx={{ backgroundColor: "white" }}
          />
          <Typography p={1} pl={3} sx={themeStyle.subtitle}>
            {t("Subscription.SubscriptionCard.body1")}
          </Typography>
        </Stack>
        <Stack px={2}>
          <Typography sx={{ ...themeStyle.bodyText, fontWeight: 600 }} pl={1}>
          {t("Subscription.SubscriptionCard.listHeading")}
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
                    <Typography sx={themeStyle.bodyText}></Typography>
                  }
                >
                  <ListItemIcon>
                    <CheckSharpIcon
                      sx={{ color: "white", fontSize: { xl: 24, lg: 18 } }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: { xl: "14px", lg: "12px" },
                    }}
                    sx={{ ...themeStyle.bodyText, marginLeft: "-8px" }}
                    primary={`${value}  ${typeof plan.planPackage[index] === "boolean"
                        ? ""
                        : `${plan.planPackage[index]}`
                      }`}
                  // secondary={secondary ? `Secondary text: ${value}` : null}
                  />
                </ListItem>
              );
            })}
          </List>
        </Stack>
      </Stack>
      <Stack p={1} px={4} gap={2}>
        {!current &&
          <Stack direction={{ lg: 'row', md: 'row', sm: 'row', xs: 'row' }} justifyContent={'space-between'}>
            <Typography sx={themeStyle.bodyTitle} color={plan.color}>
              ${plan.costMonth}<span> {t("Subscription.SubscriptionCard.perMonth")}</span>
            </Typography>
            <Typography sx={themeStyle.bodyTitle} color={plan.color}>
              ${plan.costAnnum}<span> {t("Subscription.SubscriptionCard.perYear")}</span>
            </Typography>
          </Stack>
        }
        {/* { current ? <Typography sx={themeStyle.bodyText} >Last Paid: 12/12/2024</Typography> : <Typography sx={themeStyle.bodyText} >per person/month, when billed monthly</Typography>} */}
        {current && <Typography sx={{ ...themeStyle.bodyText, color: 'black' }} >{t("Subscription.SubscriptionCard.expiryDate")}: {moment(expiryDate).format("MM/DD/YYYY")}</Typography>}
      </Stack>
    </Paper>
  );
};

export default SubscriptionCard;

const themeStyle = {
  title: {
    fontSize: { xl: "28px", lg: 23, md: "28px", xs: "28px" },
    fontWeight: "500",
    fontFamily: "var(--main-font-family)",
    color: "#FFF",
    padding: "8px",
  },
  subtitle: {
    fontSize: { xl: "16px", lg: 14, md: "16px", xs: "16px" },
    fontWeight: "500",
    fontFamily: "var(--main-font-family)",
    color: "#FFF",
  },
  bodyTitle: {
    fontSize: { xl: "16px", lg: "14px", md: "14px", xs: "14px" },
    fontWeight: "500",
    fontFamily: "var(--main-font-family)",
  },
  bodyText: {
    fontSize: { xl: "16px", lg: "14px", md: "16px", xs: "16px" },
    fontWeight: "400",
    fontFamily: "var(--main-font-family)",
    color: "#FFF",
  },
};
