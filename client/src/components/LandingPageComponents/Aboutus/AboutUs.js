import React from "react";
import { Grid, Container, Box, Typography } from "@mui/material";
import { DotSvg, MissionSvg, VisionSvg } from "../assets/svg";

const SectionTitle = ({ subtitle, title, description }) => {
  return (
    <Box sx={styles.sectionTitleContainer}>
      <Typography variant="subtitle2" sx={styles.sectionSubtitle}>
        {subtitle}
      </Typography>
      <Typography variant="h5" sx={styles.sectionTitle}>
        {title}
      </Typography>
      <Typography variant="body1" sx={styles.sectionDescription}>
        {description}
      </Typography>
    </Box>
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
  return (
    <Box sx={styles.container}>
      <Container>
        <SectionTitle
          subtitle="About Us"
          title="Personalized Primary Care at Your Doorstep"
          description="At Builder Pro, we understand the complexities and challenges of managing construction projects. Our mission is to empower construction professionals with the tools they need to succeed in an ever-evolving industry."
        />
        <Grid container spacing={4} sx={styles.gridContainer}>
          <Grid item xs={12} md={6}>
            <InfoCard
              icon={<VisionSvg />}
              title="Vision"
              description="We envision a world where construction projects are completed on time, within budget, and to the highest standards. Builder Pro aims to be the leading platform for construction management by continually innovating and adapting to the needs of our users."
              position="topLeft"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoCard
              icon={<MissionSvg />}
              title="Mission"
              description="At Builder Pro, we believe that every construction project, big or small, deserves to be managed with excellence, precision, and efficiency. Our mission is to empower construction professionals with the tools they need to succeed, streamline their workflows, and bring their visions to life."
              position="bottomRight"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;

const styles = {
  container: {
    padding: { lg: 8, md: 10, xs: 4 },
    backgroundColor: "#ffffff",
    mt: { xl: 30, lg: 48, md: 20, xs: 2 },
  },
  sectionTitleContainer: {
    textAlign: "center",
    marginBottom: 4,
  },
  sectionSubtitle: {
    marginBottom: "20px",
    fontFamily: "Arial Rounded MT, sans-serif",
    fontWeight: 600,
    fontSize: "16px",
    color: "#2E728F",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginBottom: 2,
  },
  sectionDescription: {
    maxWidth: "600px",
    margin: "0 auto",
    color: "#666666",
  },
  gridContainer: {
    marginTop: 4,
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
    fontWeight: "bold",
    marginTop: 2,
  },
  cardDescription: {
    marginTop: 1,
    color: "#666666",
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
