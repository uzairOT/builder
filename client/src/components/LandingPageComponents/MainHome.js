import React from "react";
import { Grid } from "@mui/material";
import Navbar from "./NavBar/Navbar";
import MainContent from "./MainComp/MainComp";
import AboutUs from "./Aboutus/AboutUs";
import WhyChooseBuilder from "./WhyChoose/WhyChooseBuilder";
import WhatWeDo from "./WhatWeDo/WhatWeDo";
import BuilderFeatures from "./BuilderFeatures/Features";
import GetInTouch from "./ContactForm/GetInTouch";
import FAQ from "./FAQ/Faq";
import StatsAndDownload from "./Statistics/StatsAndDownload";
import Footer from "./Footer/Footer";
import { motion } from "framer-motion";
import BG from "./assets/PNG/BG.png";
import Testimonials from "./Testimonials/Testimonials";

const backgroundImage = `url(${BG})`;

// Define animations
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Section = ({ id, Component, animation }) => {
  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }} // Adjust the viewport trigger point
      variants={animation}
    >
      <Grid>
        <Component />
      </Grid>
    </motion.div>
  );
};

const styles = {
  container: {
    overflow: "hidden",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.40), rgba(255, 255, 255, 0.70)), url(${BG})`,
  },
};

const MainHome = () => {
  return (
    <Grid sx={{ overflow: "hidden" }}>
      <Grid sx={styles.container}>
        <Navbar />
        <Section id="main-content" Component={MainContent} animation={fadeInUp} />
      </Grid>
      
      <Section id="about" Component={AboutUs} animation={fadeInUp} />
      <Section id="why-choose" Component={WhyChooseBuilder} animation={fadeInUp} />
      <Section id="what-we-do" Component={WhatWeDo} animation={fadeInUp} />
      <Section id="features" Component={BuilderFeatures} animation={fadeInUp} />
      <Section id="contact" Component={GetInTouch}  />
      <Section id="faqs" Component={FAQ}  />
      <Section id="testimonials" Component={Testimonials} animation={fadeInUp} />
      <Section id="stats" Component={StatsAndDownload} animation={fadeInUp} />

      <Grid sx={{ zIndex: 1 }}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default MainHome;
