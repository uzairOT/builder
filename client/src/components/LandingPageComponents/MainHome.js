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
import BG from "./assets/PNG/BG.png";
import Testimonials from "./Testimonials/Testimonials";

const backgroundImage = `url(${BG})`;

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } },
};

const fadeInDown = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } },
};

const fadeInLeft = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } },
};

const zoomIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } },
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
        <Grid>
          <Navbar />
        </Grid>
        <Section
          id="main-content"
          Component={MainContent}
          animation={fadeInUp}
          delay={0}
        />
      </Grid>
      <Grid>
        <Section
          id="about"
          Component={AboutUs}
          animation={fadeInDown}
          delay={0.5}
        />
      </Grid>
      <Grid>
        <Section
          id="why-choose"
          Component={WhyChooseBuilder}
          animation={fadeInLeft}
          delay={0.5}
        />
      </Grid>
      <Grid>
        <Section
          id="what-we-do"
          Component={WhatWeDo}
          animation={fadeInRight}
          delay={0.5}
        />
      </Grid>
      <Grid>
        <Section
          id="features"
          Component={BuilderFeatures}
          animation={zoomIn}
          delay={0.5}
        />
      </Grid>
      <Grid >
        <Section
          id="contact"
          Component={GetInTouch}
          animation={fadeInUp}
          delay={0.5}
        />
      </Grid>
      <Grid >
        <Section id="faqs" Component={FAQ} animation={fadeInUp} delay={0.5} />
      </Grid>
      <Grid>
        <Section
          id="testimonials"
          Component={Testimonials}
          animation={fadeInDown}
          delay={0.5}
        />
      </Grid>

      <Grid>
        <Section
          id="stats"
          Component={StatsAndDownload}
          animation={fadeInDown}
          delay={0.5}
        />
      </Grid>

      <Grid sx={{ zIndex: 1 }}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default MainHome;
