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
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Define animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } }
};

const fadeInDown = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeInOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeInOut" } }
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeInOut" } }
};



const Section = ({ id, Component, animation, delay }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animation}
      transition={{ delay }}
    >
      <Grid id={id}>
        <Component />
      </Grid>
    </motion.div>
  );
};

const MainHome = () => {
  return (
    <>
      <Grid>
        <Navbar />
      </Grid>
      <Section id="main-content" Component={MainContent} animation={fadeInUp} delay={0} />
      <Section id="about" Component={AboutUs} animation={fadeInDown} delay={0.5} />
      <Section id="why-choose" Component={WhyChooseBuilder} animation={fadeInLeft} delay={1} />
      <Section id="what-we-do" Component={WhatWeDo} animation={fadeInRight} delay={1.5} />
      <Section id="features" Component={BuilderFeatures} animation={zoomIn} delay={2} />
      <Section id="contact" Component={GetInTouch} animation={fadeInUp} delay={2.5} />
      <Section id="faqs" Component={FAQ} animation={fadeInUp} delay={3} />
      <Section id="stats" Component={StatsAndDownload} animation={fadeInDown} delay={3.5} />
      <Grid sx={{zIndex:1}}>
        <Footer />
      </Grid>
    </>
  );
};

export default MainHome;
