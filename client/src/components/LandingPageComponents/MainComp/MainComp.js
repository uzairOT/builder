import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DownloadAppStore, DownloadGooglePlay } from "../assets/svg";
import devicesimg from "../assets/PNG/devices.png";
import { motion, AnimatePresence } from "framer-motion";

const texts = [
  { text: "PROFITABLE!", color: "green" },
  { text: "ORGANIZED!", color: "blue" },
  { text: "EFFICIENT!", color: "orange" },
  { text: "STREAMLINED!", color: "grey" },
  { text: "COLABORATIVE!", color: "purple" },
  { text: "PROFESSIONAL!", color: "dodgerblue" },
  { text: "GOOD!", color: "#FFAD03" },
];
const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 2 },
};


const MainContent = () => {
  const theme = useTheme();
  const downView = useMediaQuery(theme.breakpoints.down("lg"));
  const mobView = useMediaQuery(theme.breakpoints.down("sm"));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const duration = 2500;
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % texts.length;
        setIsEnd(nextIndex === 0);
        return nextIndex;
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [currentIndex, isEnd, texts.length]);


  return (
    <Grid container md={12} sx={styles.container}>
      <Grid>
        <Grid container md={12}>
          <Grid item md={10} xs={12}>
            <Typography sx={styles.heading1}>
              Your Trusted Construction Management
            </Typography>
            <Typography component="div" sx={styles.heading2}>
      Using BuilderBuilder Pro will make you
      <br/> more{" "}
        <AnimatePresence>
          <motion.div
            key={texts[currentIndex].text}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            transition={{ duration: mobView ? 2:0.8 }}
            style={{
              display: mobView ? "inline-block" : "inline",
              color: texts[currentIndex].color,
              fontSize: mobView ? "20px" : "48px",
            }}
          >
            {texts[currentIndex].text}
          </motion.div>
        </AnimatePresence>
    </Typography>

            <Typography component="div" sx={styles.bodyText}>
              BuilderBuilder Pro is your all-in-one solution to efficiently manage
              construction projects from start to finish. Designed for
              professionals who demand precision, organization, and results,
              BuilderBuilder Pro offers robust features to streamline every aspect of
              your project management.
            </Typography>

            <Button variant="outlined" sx={styles.demoButton}>
              Schedule a Demo
            </Button>
          </Grid>

          <Grid item md={2} xs={12} sx={{ textAlign: "center" }}>
            <Typography component="div" sx={styles.downloadText}>
              DOWNLOAD NOW!
            </Typography>
            <Button>
          <a
                href="https://testflight.apple.com/join/Fejy1iQ6"
                target="blank"
              >
                <DownloadAppStore />
              </a>
            </Button>
            <Button>
            <a
                href="https://play.google.com/store/apps/details?id=com.octathorn.builder_builder_pro&pcampaignid=web_share"
                target="blank"
              >
                 
                <DownloadGooglePlay />
              </a>
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={styles.imageBox}>
        <img
          src={devicesimg}
          alt="Dashboard Screenshot"
          style={{ width: downView ? "100%" : "100%" }}
        />
      </Box>
    </Grid>
  );
};

export default MainContent;

const styles = {
  container: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: { xl: 15, lg: 10, md: 10, xs: 0 },
    width: "100%",
    height: "100vh",
    overflowX: "hidden",
    overflowY: "auto",
    justifyContent: { xs: "center", md: "left" },
    textAlign: { md: "left", xs: "center" },
  },
  heading1: {
    color: "#4C8AB1",
    fontFamily: 'var(--main-font-family)',
    fontWeight: 500,
    fontSize: { lg: "22px", xs: "16px" },
  },
  heading2: {
    textAlign: { md: "left", xs: "center" },
    maxWidth: "100%",
    color: "black",
    fontFamily: 'var(--main-font-family)',
    fontWeight: 700,
    fontSize: { md: "40px",sm:"40px", xs: "20px" },
    lineHeight: { xs: '24px',sm:"40px", md: '50px' },
    margin: { xs: '20px 0', md: '20px 0' }, 
  },
  motionDiv: {
    display: 'inline-block',
    maxWidth: { xs: '100%', lg: 'auto' }, 
    maxheight: { xs: '50%', lg: 'auto' }, 
    fontSize: { xs: '20px', lg: '48px' }, 
    color: 'inherit',
  },
  movingHeading: {
    color: "black",
    marginTop: 2,
    fontFamily: 'var(--main-font-family)',
    fontWeight: 700,
    fontSize: { lg: "45px", xs: "10px" },
  },
  heading3: {
    color: "black",
    marginTop: 1,
    fontFamily: 'var(--main-font-family)',
    fontWeight: 700,
    fontSize: { lg: "48px", xs: "25px" },
  },
  bodyText: {
    color: "#313031",
    marginTop: 2,
    maxWidth: { md: "40%", xs: "100%" },
    fontFamily: 'var(--main-font-family)',
    fontWeight: 400,
    fontSize: { lg: "16px", xs: "14px" },
  },
  demoButton: {
    color: "white",
    "&:hover": {
      color: "#4C8AB1",
    },
    backgroundColor: "#4C8AB1",
    padding: "10px, 16px, 10px, 16px",
    // border: "3px solid white",

    borderRadius: 2,
    marginTop: 4,
    fontWeight: "bold",
  },
  downloadText: {
    fontSize: "13px",
    fontWeight: 700,
    fontFamily: 'var(--main-font-family)',
    color: "#4C8AB1",
    marginBottom: 1,
  },
  imageBox: {
    position: "absolute",
    top: { xl: "42%", lg: "70%", md: "50%" },
    left: { xl: "45%", lg: "30%", md: "40%" },
    display: { xs: "none", md: "flex" },
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
  },
};
