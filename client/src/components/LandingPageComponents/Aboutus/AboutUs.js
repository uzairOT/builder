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
  const features = [
    {
      icon: <SolutionIcn />,
      title: "Solution",
      description:
        "BuilderBuilder Pro offers a comprehensive suite of tools designed to streamline every aspect of construction management. From project planning and resource allocation to real-time collaboration and progress tracking, our software ensures a smooth and efficient workflow, accessible from any device.",
    },
    {
      icon: <ColabAbtIcn />,
      title: "Collaboration ",
      description:
        "At BuilderBuilder pro, we believe that great construction projects are built on strong collaboration. Our platform fosters seamless communication and coordination among all stakeholders, from architects and engineers to contractors and clients, ensuring everyone is on the same page.",
    },
    {
      icon: <InnIcn />,
      title: "Innovation",
      description:
        "Innovation is at the heart of BuilderBuilder pro. We continually invest in the latest technologies and integrate advanced features to keep our users ahead of the curve, making construction management more efficient, transparent, and adaptable to changing industry demands.",
    },
  ];

  return (
    <Box sx={styles.container}>
      <Container>
        <SectionTitle
          subtitle="About Us"
          title="Personalized Primary Care at Your Doorstep"
          description="Hello and welcome! Our journey in the construction industry began in 2004, inspired by our founder, a third-generation construction professional.
           With a passion for excellence and innovation, the National Property Institute was established. Over the years, 
           we’ve encountered the same challenges as many in our field—juggling the demands of on-site work with the complexities of office management. 
           We needed a solution that could seamlessly bridge both worlds, and that’s how BuilderBuilder Pro was born.
           BuilderBuilder Pro is more than just construction management software;
            it’s a tool forged from our firsthand experiences. Designed to streamline project management and enhance collaboration,
             it empowers you to efficiently manage your projects, whether you're on-site or in the office.
              We’re proud to introduce BuilderBuilder Pro and excited to help you build smarter, faster, and more efficiently. BuilderBuilder Pro will make you good, better and best!
           "
        />
        <Grid container spacing={4} sx={styles.gridContainer}>
          <Grid item xs={12} md={6}>
            <InfoCard
              icon={<VisionSvg />}
              title="Vision"
              description="To revolutionize the construction industry by providing seamless, innovative management solutions that empower professionals to build smarter, faster, and more efficiently."
              position="topLeft"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoCard
              icon={<MissionSvg />}
              title="Mission"
              description="Our mission is to simplify construction management through cutting-edge technology, ensuring projects are completed on time, within budget, and to the highest standards of quality."
              position="bottomRight"
            />
          </Grid>
        </Grid>
      </Container>
      <Grid
        container
        justifyContent="center"
        mt={20}
        sx={{
          gap:2,
          padding: 5,
          width: "100%",
          // backgroundColor: "#F7FAFC",
        }}
      >
        {features.map((feature, index) => (
<> <Box>{feature.icon} </Box>
          <Grid item xs={12} md={3} key={index}>    
            <Box >
              <Typography sx={styles.featureTitle} gutterBottom>
                {feature.title}
              </Typography>
              <Typography sx={styles.featureDesc}>{feature.description}</Typography>
            </Box>
          </Grid></>

        ))}
      </Grid>
    </Box>
  );
};

export default AboutSection;

const styles = {
  container: {
    padding: { lg: 8, md: 10, xs: 4 },
    backgroundColor: "#ffffff",
    mt: { xl: 20, lg: 45, md: 20, xs: 2 },
  },
  sectionTitleContainer: {
    textAlign: "center",
    marginBottom: 4,
    width: "100%",
  },
  sectionSubtitle: {
    fontFamily: 'var(--main-font-family)',
    fontWeight: 500,
    fontSize: { md: "16px",sm:"16px", xs: "14px" },
    mb: 3, 
    color: "#4C8AB1"
  },
  featureTitle:{
    textAlign: {md:"left", xs:"center"},
    fontFamily: 'var(--main-font-family)',
    fontSize: { md: "24px",sm:"24px", xs: "22px" },
    fontWeight:500,
  },
  featureDesc:{
    textAlign: {md:"left", xs:"center"},
    fontFamily: 'var(--main-font-family)',
    fontSize: { md: "16px",sm:"16px", xs: "14px" },
    fontWeight:400,
    color:"#454245"
  },
  sectionTitle: {
    fontFamily: 'var(--main-font-family)',
    fontSize: { md: "36px",sm:"36px", xs: "18px" },
    fontWeight:500,
    marginBottom: 2,
  },
  sectionDescription: {
    maxWidth: "100%",
    fontFamily: 'var(--main-font-family)',
    fontWeight: 400,
    fontSize: { md: "16px",sm:"16px", xs: "14px" },
    margin: "0 auto",
    color: "#666666",
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
    textAlign: {md:"left", xs:"center"},
    fontSize: { md: "36px",sm:"36px", xs: "20px" },
    fontWeight:500,
    fontFamily: 'var(--main-font-family)',
    marginTop: 2,
  },
  cardDescription: {
    textAlign: {md:"left", xs:"center"},
    marginTop: 1,
    fontSize: { md: "16px",sm:"16px", xs: "14px" },
    fontWeight:400,
    fontFamily: 'var(--main-font-family)',
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
