import React from "react";
import Header from "./Header";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Box, IconButton, Typography } from "@mui/material";

const HelpComp = () => {
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandButton />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              I’m having problem with my content
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandButton />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              I’m having problem with my content
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
        </Box>
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
