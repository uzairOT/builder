import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  capitalize,
  Stack,
} from "@mui/material";
import { useTranslation } from 'react-i18next';
import { DownloadAppStore, DownloadGooglePlay } from "../assets/svg";
import devicesimg from "../assets/PNG/devices.png";
import { motion, AnimatePresence } from "framer-motion";
import { LineWeight } from "@mui/icons-material";
import googlePlay from "../../../assets/FileSvg/googlePlay.svg";
import appStore from "../../../assets/FileSvg/appStore.svg";

const popEffect = {
  hidden: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};


const fadeUpVariants = {
  hidden: { opacity: 0.5, y: 6 },
  visible: { opacity: 1, y: 2 },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 }, // Start 50px below and hidden
  visible: { opacity: 1, y: 0 }, // Animate to original position
  exit: { opacity: 0, y: -50 },  // Exit 50px above and hidden
};
const MainContent = () => {
  const { t } = useTranslation();
  const texts = [
    { text: `${t('landingPage.text4')}`, color: "green" },
    { text: `${t('landingPage.text5')}`, color: "blue" },
    { text: `${t('landingPage.text6')}`, color: "orange" },
    { text: `${t('landingPage.text7')}`, color: "grey" },
    { text: `${t('landingPage.text8')}`, color: "purple" },
    { text: `${t('landingPage.text9')}`, color: "dodgerblue" },
    { text: `${t('landingPage.text10')}`, color: "#FFAD03" },
  ];
  const theme = useTheme();
  const downView = useMediaQuery(theme.breakpoints.down("lg"));
  const mdView = useMediaQuery(theme.breakpoints.down("md"));
  const mobView = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const duration = 3000;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % texts.length;
        return nextIndex;
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [setCurrentIndex]);
 
  return (
    <Grid container md={12} sx={styles.container}>
      <Grid>
        <Grid container md={12}>
          <Grid item md={10} xs={12}>
            <Typography sx={styles.heading1}>
            {t('landingPage.text1')}
            </Typography>
            <Stack sx={{ margin: { xs: "20px 0", md: "20px 0" }, }}>

              <Typography component="div" sx={styles.heading2}>
              {t('landingPage.text2')} {mdView && 'more '}
              </Typography>
              <Stack direction={'row'} alignItems={'center'} justifyContent={mdView ? 'center': ''} gap={1.5}>
                {!mdView && <Typography component="div" sx={styles.heading2}>
                  {t('landingPage.text3')}{" "}
                </Typography>}
                <Box height={mobView ? '25px' : '58px'} sx={styles.heading2}  style={{ paddingTop: '4px', overflow: 'hidden', display: 'inline-block' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={texts[currentIndex].text}
                      initial="hidden"
                      animate="visible"
                      variants={fadeInUp}
                      transition={{ duration: mobView ? 2 : 1.5 }}
                      style={{
                        display: mobView ? "inline-block" : "inline-block",
                        color: texts[currentIndex].color,
                        fontSize: mobView ? "20px" : "48px",
                        textAlign: 'end'
                      }}
                    >
                      {texts[currentIndex].text}
                    </motion.div>
                  </AnimatePresence>
                </Box>
              </Stack>
            </Stack>

            <Typography component="div" sx={styles.bodyText}>
            {t('landingPage.text11')}
            </Typography>

            <Button variant="outlined" sx={styles.demoButton} href="/#contact">
              {t('buttons.btn1')}
            </Button>
          </Grid>

          <Grid item md={2} xs={12}>
            <Typography component="div" sx={styles.downloadText}>
              {t('buttons.btn2')}
            </Typography>
            <Box sx={{ gap: { sm: 0, xs: 2 } }}>
              <motion.div
                initial="hidden"
                whileHover="hover"
                variants={popEffect}
              >
                <Box>
                  <a
                    href="https://apps.apple.com/us/app/builderbuilder-pro/id6714458398"
                    target="blank"
                    style={{ height: 60, width: 150 }}
                  >
                    <img
                      alt="App Store"
                      src={appStore}
                      style={{ height: 60, width: 150 }}
                    />
                    {/* <DownloadAppStore /> */}
                  </a>
                </Box>
              </motion.div>
              <motion.div
                initial="hidden"
                whileHover="hover"
                variants={popEffect}
              >
                <Box>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.npisoftware.builder_builder_pro"
                    target="blank"
                    style={{ height: 60, width: 150 }}
                  >
                    <img
                      alt="Play Store"
                      src={googlePlay}
                      style={{ height: 60, width: 150 }}
                    />

                    {/* <DownloadGooglePlay /> */}
                  </a>
                </Box>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={styles.imageBox}>
        <motion.div variants={fadeInUp}>
          <img
            src={devicesimg}
            alt="Dashboard Screenshot"
            style={{ width: downView ? "100%" : "100%" }}
          />
        </motion.div>
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
    padding: { xl: 15, lg: 10, md: 5, xs: 0 },
    width: "100%",
    height: "100vh",
    overflowX: "hidden",
    overflowY: "auto",
    justifyContent: { xs: "center", md: "left" },
    textAlign: { md: "left", xs: "center" },
  },
  heading1: {
    color: "#4C8AB1",
    fontFamily: "var(--main-font-family)",
    fontWeight: 500,
    fontSize: { lg: "22px", xs: "16px" },
    lineHeight: 1,
  },
  heading2: {
    textAlign: { md: "left", xs: "center" },
    maxWidth: "100%",
    color: "black",
    fontFamily: "var(--main-font-family)",
    fontWeight: 700,
    fontSize: { lg: "40px", md: "36px", sm: "40px", xs: "20px" },
    lineHeight: 1.2,
  },
  motionDiv: {
    display: "inline-block",
    maxWidth: { xs: "100%", lg: "auto" },
    maxheight: { xs: "50%", lg: "auto" },
    fontSize: { xs: "20px", lg: "48px" },
    color: "inherit",
  },
  movingHeading: {
    color: "black",
    marginTop: 2,
    fontFamily: "var(--main-font-family)",
    fontWeight: 700,
    fontSize: { lg: "45px", xs: "10px" },
  },
  heading3: {
    color: "black",
    marginTop: 1,
    fontFamily: "var(--main-font-family)",
    fontWeight: 700,
    fontSize: { lg: "48px", xs: "25px" },
  },
  bodyText: {
    color: "#313031",
    marginTop: 2,
    maxWidth: { md: "40%", xs: "100%" },
    fontFamily: "var(--main-font-family)",
    fontWeight: 400,
    fontSize: { lg: "16px", xs: "14px" },
    textAlign: 'justify',
    paddingX: { md: 0, xs: 4 }
  },
  demoButton: {
    color: "white",
    "&:hover": {
      color: "#4C8AB1",
    },
    backgroundColor: "#4C8AB1",
    padding: "10px, 16px, 10px, 16px",
    // border: "3px solid white",
    fontFamily: "var(--main-font-family)",
    fontWeight: 500,
    fontSize: "16px",
    borderRadius: 2,
    marginTop: 4,
    textTransform: "none",
  },
  downloadText: {
    mt: 2,
    fontSize: "13px",
    fontWeight: 700,
    fontFamily: "var(--main-font-family)",
    color: "#4C8AB1",
  },
  imageBox: {
    position: "absolute",
    top: { xl: "47%", lg: "70%", md: "50%" },
    left: { xl: "45%", lg: "30%", md: "40%" },
    display: { xs: "none", md: "flex" },
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
  },
};
