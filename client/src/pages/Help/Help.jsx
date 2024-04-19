import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import HelpComp from "../../components/HelpAndTerms/HelpComp";
import Splash from "../../components/Splash/Splash";

const Help = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    // Show Splash for the first 4.5 seconds
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
      setShowSignup(true);
    }, 4500);

    // Clear timers when the component is unmounted
    return () => {
      clearTimeout(splashTimer);
    };
  }, []);
  return (
    <Box sx={{ height: "100vh", backgroundColor: "#f8f9ff" }}>
      {showSplash && <Splash />}
      {showSignup && <HelpComp />}
    </Box>
  );
};

export default Help;
