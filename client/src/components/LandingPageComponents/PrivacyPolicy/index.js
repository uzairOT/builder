import React from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import { Grid } from "@mui/material";

export default function PolicyPage() {
  return (
    <>
      {/* <Navbar/> */}
      <Grid mt={5}>
        <PrivacyPolicy />
      </Grid>
      {/* <Grid sx={{mb:25}}>
    <GetInTouch/>
    </Grid> */}
      {/* <StatsAndDownload/> */}
      {/* <Footer /> */}
    </>
  );
}
