import React from "react";
import { Grid, Container, Box, Typography } from "@mui/material";
import {
  ColabAbtIcn,
  DotSvg,
  InnIcn,
  MissionSvg,
  SolutionIcn,
  VisionSvg,
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

const SectionTitle = ({ subtitle, title, description }) => {
  return (
    <Container maxWidth="lg" sx={styles.sectionTitleContainer}>
      <Typography variant="subtitle2" sx={styles.sectionSubtitle}>
        {subtitle}
      </Typography>
      <Typography variant="h5" sx={styles.sectionTitle}>
        {title}
      </Typography>
      <Typography variant="body1" sx={styles.sectionDescription}>
        {description}
      </Typography>
    </Container>
  );
};

const InfoCard = ({ icon, title, description, position }) => {
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Box sx={styles.card}>
        {position === "topLeft" && (
          <Box sx={styles.decorationTopLeft}>
            <DotSvg />
          </Box>
        )}
        <Box sx={styles.icon}>{icon}</Box>
        <Typography variant="h6" sx={styles.cardTitle}>
          {title}
        </Typography>
        <Typography variant="body2" sx={styles.cardDescription}>
          {description}
        </Typography>
        {position === "bottomRight" && (
          <Box sx={styles.decorationBottomRight}>
            <DotSvg />
          </Box>
        )}
      </Box>
    </Grid>
  );
};

const AboutSection = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: <SolutionIcn />,
      title: `${t('aboutus.features.title1')}`,
      description:
        `${t('aboutus.features.desc1')}`,
    },
    {
      icon: <ColabAbtIcn />,
      title: `${t('aboutus.features.title2')}`,
      description:
        `${t('aboutus.features.desc2')}`,
    },
    {
      icon: <InnIcn />,
      title: `${t('aboutus.features.title3')}`,
      description:
        `${t('aboutus.features.desc3')}`,
    },
  ];

  return (
    <Box sx={styles.container}>
      <Container>
        <SectionTitle
          subtitle="About Us"
          title={t('aboutus.text1')}
          description={t('aboutus.text2')}
        />
        <Grid container spacing={4} sx={styles.gridContainer}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              whileHover="hover"
              variants={popEffect}
            >
              <InfoCard
                icon={<VisionSvg />}
                title={t('aboutus.cards.title1')}
                description={t('aboutus.cards.desc1')}
                position="topLeft"
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              whileHover="hover"
              variants={popEffect}
            >
              <InfoCard
                icon={<MissionSvg />}
                title={t('aboutus.cards.title2')}
                description={t('aboutus.cards.desc2')}
                position="bottomRight"
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      <Grid
        container
        justifyContent="space-between"
        mt={20}
        gap={0}
        sx={{
           alignItems:"center",
          // padding: { lg: , xs: 2 },
          width: "100%",
          maxWidth:'1200px',
          // backgroundColor: "#F7FAFC",
        }}
      >
        {features.map((feature, index) => (
          <>
            <Grid item xs={12} lg={4} key={index} width={'100%'}>
              <Box sx={{ display: "flex", justifyContent:"center", alignItems:"center", padding:3 }}>
                <motion.div
                  initial="hidden"
                  whileHover="hover"
                  variants={popEffect}
                >
                  <Box>{feature.icon} </Box>
                  <Box>
                    <Typography sx={styles.featureTitle} gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography sx={styles.featureDesc}>
                      {feature.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            </Grid>
          </>
        ))}
      </Grid>
    </Box>
  );
};

export default AboutSection;

const styles = {
  container: {
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    padding: { lg: 8, md: 10, xs: 4 },
    backgroundColor: "#ffffff",
    mt: { xl: 20, lg: 40, md: 2, xs: 2 },
  },
  sectionTitleContainer: {
    textAlign: "center",
    marginBottom: 1,
    width: "100%",
  },
  sectionSubtitle: {
    fontFamily: "var(--main-font-family)",
    fontWeight: 500,
    fontSize: { md: "16px", sm: "16px", xs: "14px" },
    mb: 3,
    color: "#4C8AB1",
  },
  featureTitle: {
    textAlign: { md: "left", xs: "left" },
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "24px", sm: "24px", xs: "22px" },
    fontWeight: 500,
  },
  featureDesc: {

    textAlign: { md: "justify", xs: "justify" },
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "16px", sm: "16px", xs: "14px" },
    fontWeight: 400,
    color: "#454245",
    hyphens: "auto"
  },
  sectionTitle: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "36px", sm: "36px", xs: "18px" },
    fontWeight: 500,
    marginBottom: 2,
    textAlign:'justify'
  },
  sectionDescription: {
    maxWidth: "100%",
    fontFamily: "var(--main-font-family)",
    fontWeight: 400,
    fontSize: { md: "16px", sm: "16px", xs: "14px" },
    margin: "0 auto",
    color: "#666666",
    textAlign:'justify',
    hyphens: "auto"
  },
  gridContainer: {
    marginTop: 10,
  },
  card: {
    height: { md: "250px", xs: "80%" },
    width: { md: "400px", xs: "80%" },
    padding: 3,
    backgroundColor: "#E4EEF4",
    borderRadius: 5,
    textAlign: "center",
    position: "relative",
  },
  icon: {
    fontSize: "3rem",
    color: "#2E728E",
  },
  cardTitle: {
    textAlign: { md: "left", xs: "center" },
    fontSize: { md: "36px", sm: "36px", xs: "20px" },
    fontWeight: 500,
    fontFamily: "var(--main-font-family)",
    marginTop: 2,
  },
  cardDescription: {
    textAlign: { md: "justify", xs: "justify" },
    marginTop: 1,
    fontSize: { md: "16px", sm: "16px", xs: "14px" },
    fontWeight: 400,
    fontFamily: "var(--main-font-family)",
    color: "#666666",
    hyphens: "auto"
    },
  decorationTopLeft: {
    position: "absolute",
    top: -70,
    left: -60,
    transform: "translate(-50%, -50%)",
    width: "50px",
    height: "50px",
    display: { md: "block", xs: "none" },
  },
  decorationBottomRight: {
    position: "absolute",
    bottom: 5,
    right: 45,
    transform: "translate(50%, 50%)",
    width: "50px",
    height: "50px",
    display: { md: "block", xs: "none" },
  },
};
