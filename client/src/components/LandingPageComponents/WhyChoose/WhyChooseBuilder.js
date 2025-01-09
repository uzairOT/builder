import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import {
  ComprehensiveIcn,
  ColabIcn,
  ScaleIcn,
  InnovateIcn,
} from "../assets/svg";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Define the hover effect animation variants
const popEffect = {
  hidden: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

const WhyChooseBuilder = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: <ComprehensiveIcn />,
      title: `${t("chooseus.features.title1")}`,
      description: `${t("chooseus.features.desc1")}`,
    },
    {
      icon: <ColabIcn />,
      title: `${t("chooseus.features.title2")}`,
      description: `${t("chooseus.features.desc2")}`,
    },
    {
      icon: <ScaleIcn />,
      title: `${t("chooseus.features.title3")}`,
      description: `${t("chooseus.features.desc3")}`,
    },
    {
      icon: <InnovateIcn />,
      title: `${t("chooseus.features.title4")}`,
      description: `${t("chooseus.features.desc4")}`,
    },
  ];
  return (
    <Box mb={5}>
      <Container>
        <Typography align="center" sx={styles.titleFont}>
          {t("chooseus.title1")}
        </Typography>
        <Typography sx={styles.SubtitleFont} align="center">
          {t("chooseus.title2")}
        </Typography>

        <Typography sx={styles.DecsFont}>{t("chooseus.title3")}</Typography>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          mt={2}
          alignItems={"center"}
        >
          {features.map((feature, index) => (
            <Grid item xs={12} md={3} key={index} alignItems={"center"}>
              <motion.div
                initial="hidden"
                whileHover="hover"
                variants={popEffect}
              >
                <Box textAlign="center">
                  <Typography>{feature.icon}</Typography>
                  <Typography sx={styles.featureTitle} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography sx={styles.featureDesc}>
                    {feature.description}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseBuilder;

const styles = {
  titleFont: {
    fontFamily: "var(--main-font-family)",
    fontWeight: 500,
    fontSize: { md: "16px", sm: "16px", xs: "14px" },
    mb: 3,
    color: "#4C8AB1",
  },
  SubtitleFont: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "36px", sm: "36px", xs: "18px" },
    fontWeight: 500,
    marginBottom: 2,
  },
  DecsFont: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "16px", sm: "16px", xs: "14px" },
    fontWeight: 400,
    color: "#454245",
  },
  featureTitle: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "24px", sm: "24px", xs: "22px" },
    fontWeight: 500,
  },
  featureDesc: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "16px", sm: "16px", xs: "14px" },
    fontWeight: 400,
    color: "#454245",
    textAlign: "left",
  },
};
