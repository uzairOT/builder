import React from "react";
import { Box, Typography, Grid, Container, Button } from "@mui/material";
import {
  BuilderLgIcn,
  DownloadAppStore,
  DownloadGooglePlay,
} from "../assets/svg";
import Elipse from "../assets/PNG/Elipse.png";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
const popEffect = {
  hidden: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

const backgroundImage = `url(${Elipse})`;

const StatsAndDownload = () => {
  const { t } = useTranslation();
  return (
    <Box sx={styles.section}>
      <Grid container spacing={5} alignItems="center" justifyContent={"space"}>
        <Grid item xs={12} md={6} justifyContent={"center"}>
          <Container maxWidth={"sm"}>
            <Typography sx={styles.heading}>
            {t('testimonials.title8')}
            </Typography>
            <Typography sx={styles.subHeading}>
            {t('testimonials.title9')}
            </Typography>
          </Container>
        </Grid>
        <Grid item xs={12} md={6} sx={{ justifyContent: "center" }}>
          <Container sx={styles.statsGrid} maxWidth={"sm"}>
            <motion.div
              initial="hidden"
              whileHover="hover"
              variants={popEffect}
            >
              <Box maxWidth={"sm"} sx={styles.statItem}>
                <Typography sx={styles.statValue}>2M+</Typography>
                <Typography sx={styles.statLabel}>
                {t('testimonials.title10')}
                </Typography>
              </Box>
            </motion.div>
            <motion.div
              initial="hidden"
              whileHover="hover"
              variants={popEffect}
            >
              <Box maxWidth={"sm"} sx={styles.statItem}>
                <Typography sx={styles.statValue}>46K+</Typography>
                <Typography sx={styles.statLabel}>
                {t('testimonials.title11')}
                </Typography>
              </Box>
            </motion.div>
            <motion.div
              initial="hidden"
              whileHover="hover"
              variants={popEffect}
            >
              <Box maxWidth={"sm"} sx={styles.statItem}>
                <Typography sx={styles.statValue}>99%</Typography>
                <Typography sx={styles.statLabel}>
                {t('testimonials.title12')}
                </Typography>
              </Box>
            </motion.div>
          </Container>
        </Grid>
      </Grid>
      <Container
        maxWidth={"xl"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { lg: "space-between", xs: "center" },
          marginTop: 5,
        }}
      >
        {/* <Box sx={styles.logoContainer}>
          <BuilderLgIcn />
        </Box>
        <Box sx={styles.downloadSection}>
          <Typography variant="body2" sx={styles.downloadText}>
            TRY ON MOBILE
          </Typography>
          <Box maxWidth={"sm"} >
          <Typography variant="h5" sx={styles.heading}>
            Download our app for free
          </Typography>
          </Box>
          <Box sx={styles.appIcons}>
            <Button>
              <a
                href="https://apps.apple.com/us/app/builderbuilder-pro/id6714458398"
                target="blank"
              >
                <DownloadAppStore />
              </a>
            </Button>
            <Button>
              <a
                href="https://play.google.com/store/apps/details?id=com.npisoftware.builder_builder_pro"
                target="blank"
              >
                <DownloadGooglePlay />
              </a>
            </Button>
          </Box>
        </Box> */}
      </Container>
    </Box>
  );
};

export default StatsAndDownload;

const styles = {
  section: {
    mb: 10,
    padding: "50px 0",
    textAlign: "left",
    // backgroundColor: "#f5f5f5",
  },
  heading: {
    fontFamily: "var(--main-font-family)",
    fontWeight: 500,
    textAlign: { md: "left", xs: "center" },
    fontSize: { md: "60px", sm: "60px", xs: "40px" },
    color: "#1D1C1D",
    marginBottom: "20px",
    lineHeight: 1,
  },
  subHeading: {
    textAlign: { md: "justify", xs: "justify" },
    fontFamily: "var(--main-font-family)",
    marginBottom: "20px",
    color: "gray",
    hyphens: "auto"
  },
  statsGrid: {
    justifyContent: "center",
    alignItems: "center",
    background: backgroundImage,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  statItem: {
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundBlendMode: "overlay",
    backdropFilter: "blur(5px)",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: { lg: "30rem", md: "20rem", xs: "80%" },
    backgroundColor: "rgba(76, 138, 177, 0.17)",
  },
  statValue: {
    fontFamily: "var(--main-font-family)",
    fontWeight: 500,
    fontSize: { md: "60px", sm: "60px", xs: "40px" },
    color: "#2E2E2E",
  },
  statLabel: {
    fontFamily: "var(--main-font-family)",
    fontWeight: 500,
    fontSize: { md: "18px", sm: "18px", xs: "16px" },
    color: "#2E2E2E",
  },
  logoContainer: {
    display: { md: "flex", xs: "none" },
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "150px",
    height: "auto",
  },
  downloadSection: {
    textAlign: "center",
  },
  downloadText: {
    color: "gray",
    marginBottom: "10px",
  },
  appIcons: {
    display: "flex",
    flexDirection: { lg: "Row", xs: "column" },
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
};
