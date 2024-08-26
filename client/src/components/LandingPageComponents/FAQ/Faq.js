import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Typography,
  Box,
  Button,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import { FaqCloseIcn, FaqExtendIcn } from "../assets/svg";
import { faqData } from "./FaqData";

const FAQ = () => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <Container style={styles.container}>
      <Typography
        sx={styles.titleFont}
      >
        FAQ's
      </Typography>

      <Typography sx={styles.SubtitleFont} align="center" gutterBottom>
        Frequently Asked Questions
      </Typography>
      <Typography sx={styles.SubtitleFont} align="center" paragraph>
        Everything you need to know about the product and billing.
      </Typography>
      {faqData.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          style={styles.accordion}
        >
          <AccordionSummary
            expandIcon={
              expanded === `panel${index}` ? (
                <FaqCloseIcn style={styles.expandIcon} />
              ) : (
                <FaqExtendIcn style={styles.expandIcon} />
              )
            }
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography style={styles.question}>{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={styles.answer}>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <Box style={styles.contactSection}>
        <AvatarGroup max={4} style={styles.avatarGroup}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </AvatarGroup>
        <Typography sx={styles.contactFirstHeading} align="center" gutterBottom>
          Still have questions?
        </Typography>
        <Typography sx={styles.Contactsecondheading} align="center">
          Can't find the answer you're looking for? Please chat to our friendly
          team.
        </Typography>

        <Button style={styles.button}>Get in touch</Button>
      </Box>
    </Container>
  );
};

export default FAQ;

const styles = {
    titleFont:{
      marginBottom: "20px",
          fontFamily: 'var(--main-font-family)',
          fontWeight: 600,
          fontSize: { md: "16px",sm:"16px", xs: "14px" },
          color: "#2E728F",
          textAlign: "center",
    },
    SubtitleFont:{
      fontFamily: 'var(--main-font-family)',
      fontSize: { md: "36px",sm:"36px", xs: "18px" },
        fontWeight:500,
        marginBottom: 2,
    },
    DecsFont:{
      fontFamily: 'var(--main-font-family)',
      fontSize: { md: "16px",sm:"16px", xs: "14px" },
        fontWeight:400,
        color:"#454245"
    },
  container: {
    padding: "32px 16px",
  },
  accordion: {
    marginBottom: "20px",
    boxShadow: "none",
  },
  expandIcon: {
    color: "#1976D2",
  },
  question: {
    fontFamily: 'var(--main-font-family)',
    fontSize: { md: "16px",sm:"16px", xs: "14px" },
      fontWeight:700,
  },
  answer: {
    fontFamily: 'var(--main-font-family)',
    fontSize: { md: "16px",sm:"16px", xs: "14px" },
      fontWeight:400,
      color:"#454245"
  },
  contactSection: {
    marginTop: "32px",
    padding: "16px",
    backgroundColor: "#FFEEC9",
    borderRadius: "8px",
    textAlign: "center",
  },
  contactFirstHeading: {
    fontFamily: 'var(--main-font-family)',
    fontWeight: 900,
    fontSize: "20px",
  },
  Contactsecondheading: {
    fontFamily: 'var(--main-font-family)',
    fontWeight: 400,
    fontSize: "18px",
  },
  avatarGroup: {
    justifyContent: "center",
    marginBottom: "16px",
  },
  button: {
    marginTop: "16px",
    backgroundColor: "#2E728F",
    color: "white",
    fontSize: "14px",
    fontFamily: 'var(--main-font-family)',
    fontWeight: 600,
  },
};
