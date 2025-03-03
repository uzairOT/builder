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
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation();
  const faqData = [
    {
      question: `${t("faqs.drawer1.title")}`,
      answer: `${t("faqs.drawer1.desc")}`,
    },
    {
      question: `${t("faqs.drawer2.title")}`,
      answer: `${t("faqs.drawer2.desc")}`, 
    },
    {
      question: `${t("faqs.drawer3.title")}`,
      answer: `${t("faqs.drawer3.desc")}`,
    },
    {
      question: `${t("faqs.drawer4.title")}`,
      answer: `${t("faqs.drawer4.desc")}`,
    },
    {
      question: `${t("faqs.drawer5.title")}`,
      answer: `${t("faqs.drawer5.desc")}`,
    },
    {
      question: `${t("faqs.drawer6.title")}`,
      answer: `${t("faqs.drawer6.desc")}`,
    },
  ];
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <Box>
      <Container style={styles.container}>
        <Typography sx={styles.titleFont}>{t("faqs.title1")}</Typography>

        <Typography sx={styles.SubtitleFont} align="center" gutterBottom>
          {t("faqs.title2")}
        </Typography>
        <Typography sx={styles.SubtitleFont} align="center" paragraph>
          {t("faqs.title3")}
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
          <Typography
            sx={styles.contactFirstHeading}
            align="center"
            gutterBottom
          >
            {t("faqs.title4")}
          </Typography>
          <Typography sx={styles.Contactsecondheading} align="center">
            {t("faqs.title5")}
          </Typography>

          <Button style={styles.button} href="/#contact">
            {t("faqs.title6")}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;

const styles = {
  titleFont: {
    marginBottom: "20px",
    fontFamily: "var(--main-font-family)",
    fontWeight: 600,
    fontSize: { md: "16px", sm: "16px", xs: "14px" },
    color: "#2E728F",
    textAlign: "center",
  },
  SubtitleFont: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "36px", sm: "36px", xs: "18px" },
    fontWeight: 500,
    marginBottom: 2,
    textAlign: "jutiify",
    hyphens: "auto"
  },
  DecsFont: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "16px", sm: "16px", xs: "14px" },
    fontWeight: 400,
    color: "#454245",
  },
  container: {
    marginTop: 40,
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
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "16px", sm: "16px", xs: "14px" },
    fontWeight: 700,
  },
  answer: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "16px", sm: "16px", xs: "14px" },
    fontWeight: 400,
    color: "#454245",
    textAlign: "justify",
    hyphens: "auto"
  },
  contactSection: {
    marginTop: "32px",
    padding: "16px",
    backgroundColor: "#FFEEC9",
    borderRadius: "8px",
    textAlign: "center",
  },
  contactFirstHeading: {
    fontFamily: "var(--main-font-family)",
    fontWeight: 900,
    fontSize: "20px",
  },
  Contactsecondheading: {
    fontFamily: "var(--main-font-family)",
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
    fontFamily: "var(--main-font-family)",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "grey",
      color: "white",
    },
    borderRadius: "8px",
    textTransform: "none",
  },
};
