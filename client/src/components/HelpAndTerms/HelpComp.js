import React from "react";
import Header from "./Header";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Box, IconButton, Typography, Button } from "@mui/material";
import YellowBtn from "../UI/button";
import { useNavigate } from "react-router-dom";


const HelpComp = () => {
  const navigate = useNavigate();

  const handleAccept = () => {
    navigate(-1);
  };
  return (
    <div style={{ width: "100%" }}>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "5rem",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "32px",
            fontWeight: 600,
            fontFamily: "GT Walsheim Trial",
            marginBottom: "2rem",
            color: "#202227",
          }}
        >
          How we can help you?
        </Typography>
        <Box sx={{ border: "1px solid #B1B1B1" }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandButton />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              I’m having problems with signing in
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                <li>
                  Wrong credentials? Check caps lock & try again. Forgot
                  password? Click "Forgot Password".
                </li>
                <li>Browser/device issue? Try a different one.</li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandButton />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              I’m having problem with my builder pro account.
            </AccordionSummary>
            <AccordionDetails>
              Troubleshooting:
              <ul>
                <li>Subscription active? Check expiration.</li>
                <li>Clear cache & cookies for smoother experience.</li>
                <li>
                  Billing information up-to-date? Avoid service interruptions.
                </li>
              </ul>
              Need further help? Contact support: help@builderbuilderpro.net
            </AccordionDetails>
          </Accordion>
   
        </Box>
        <Button
          sx={{
            ...YellowBtn,
            width: "fit-content",
            marginTop: "2.5rem",
            borderRadius: "4px",
          }}
          onClick={handleAccept}
          type="submit"
        >
          {"Back"}
        </Button>
      </Box>
    </div>
  );
};
const ExpandButton = () => {
  return (
    <IconButton
      sx={{ m: 1, color: "primary.main", border: "1px solid #4C8AB1" }}
    >
      <ExpandMoreIcon />
    </IconButton>
  );
};
export default HelpComp;
