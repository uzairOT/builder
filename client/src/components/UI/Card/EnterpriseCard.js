import Stack from "@mui/joy/Stack";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import React, { cloneElement, useState } from "react";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import EnterpriseUs from "./EnterpriseUs";

const EnterpriseCard = ({
  planType,
  // current,
  // setCurrentPlan,
  // currentPlan,
  // setCurrentPakage,
}) => {
  const plan = (() => {
    switch (planType) {
      default:
        return {
          name: "Enterprise",
          color: "#3E226C",
          yearCost: 5,
          monthCost: 1,
          planPackage: ["10+", "10", "5", false],
        };
    }
  })();

  // const [paymentType, setPaymentType] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  // const handlePaymentTypeChange = (event) => {
  //   setPaymentType(event.target.value);
  // };

  // const handleClick = () => {
  //   // console.log(
  //   //   "Cost:",
  //   //   paymentType === "Monthly" ? plan.monthCost : plan.yearCost
  //   // );
  //   setCurrentPlan(paymentType === "Monthly" ? plan.monthCost : plan.yearCost);
  //   setCurrentPakage(plan.name);
  // };

  // const handlePrevious = () => {
  //   // console.log("first");
  // };

  const generateList = (renderItem) => {
    return [" Users"].map((value, index) =>
      cloneElement(renderItem(value, index), { key: value, value: value })
    );
  };

  return (
    <Paper style={{ width: "100%", borderRadius: "14px", cursor: "pointer" }}>
      <Stack backgroundColor={plan.color} borderRadius={"14px 14px 0 0"}>
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
            A Enterprise Plan for users who want to maximize the app potential
            contact us and we will get back to you!
          </Typography>
        </Stack>
        <Stack px={2}>
          <Typography sx={{ ...themeStyle.bodyText, fontWeight: 600 }} pl={1}>
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
                    primary={`${value}  ${
                      typeof plan.planPackage[index] === "boolean"
                        ? ""
                        : `- ${plan.planPackage[index]}`
                    }`}
                  />
                </ListItem>
              );
            })}
          </List>
          <Button
            variant="contained" // Use 'contained' variant for a more solid button
            sx={{
              backgroundColor: "white",
              color: "#3E226C",
              marginBottom: 2,
              borderRadius: "8px", // Round corners for a modern look
              fontSize: "16px", // Adjust font size
              fontWeight: "bold", // Make text bold
              padding: "8px 16px", // Increase padding for a more prominent button
              textTransform: "uppercase", // Transform text to uppercase
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add shadow for depth
              "&:hover": {
                backgroundColor: "grey", // Darker shade on hover
                color: "white",
                boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.2)", // Darker shadow on hover
              },
            }}
            onClick={() => setModalOpen(true)}
          >
            Contact Us
          </Button>

          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "90%", sm: "80%", md: "60%" },
                maxWidth: "1000px",
                bgcolor: "background.paper",
                borderRadius: "8px",
                boxShadow: 24,
                p: 4,
              }}
            >
              <EnterpriseUs />
            </Box>
          </Modal>
        </Stack>
      </Stack>
      <Stack p={1} px={4} direction={"row"} gap={2}></Stack>
    </Paper>
  );
};

export default EnterpriseCard;

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
    fontSize: { xl: "24px", lg: 22, md: "24px", xs: "24px" },
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
