import React, { useState } from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import { termsData } from "./TermsData";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
//   const [agree, setAgree] = useState(false);
//   const navigate = useNavigate();

//   const handleAgree = () => {
//      setAgree(true)
//       navigate("/signup");
//       console.log("Agreed to the terms and conditions");
    
//   };

//   const handleCancel = () => {
//     console.log("Are you sure you want to cancel?");
//     navigate(-1); 
//   };

  return (
    <Grid container spacing={{ xs: 0, lg: 2 }} mt={2}>
      <Grid item xs={12} textAlign="center">
        <Typography sx={styles.font1} gutterBottom>
          Terms and Conditions
        </Typography>
        <Typography sx={styles.font2}>
          Important Information You Need to Know
        </Typography>
      </Grid>

      <Grid padding={{ xs: 0, lg: 10 }}>
        <Typography
          textAlign={{ xs: "center", lg: "left" }}
          sx={{
            fontFamily: 'var(--main-font-family)',
            fontWeight: 400,
            fontSize: "16px",
            color: "#00000099",
          }}
        >
          Welcome to BuilderBuilder Pro. These Terms and Conditions ("Terms") govern
          your use of our construction management software, available on both
          web and mobile platforms (iOS and Android). By accessing or using
          BuilderBuilder Pro, you agree to be bound by these Terms. If you do not
          agree with these Terms, you should not use our services.
        </Typography>
        {termsData.map((section, index) => (
          <Box key={index} mt={2} textAlign={{ xs: "center", lg: "left" }}>
            <Typography sx={styles.font4}>{section.title}</Typography>
            {section.content.map((paragraph, idx) => (
              <Typography key={idx} sx={styles.font3}>
                {paragraph}
              </Typography>
            ))}
          </Box>
        ))}

        {/* <Box sx={{ gap: 2, display: "flex", padding: 4 }}>
          <Button onClick={handleCancel} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={handleAgree}
            sx={{ backgroundColor: "#4C8AB1", color: "white", width: "167px" }}
          >
            Agree
          </Button>
        </Box> */}
      </Grid>
    </Grid>
  );
};

export default TermsAndConditions;

const styles = {
  font1: {
    fontFamily: 'var(--main-font-family)',
    color: "#2E728F",
    fontWeight: 500,
    fontSize: "16px",
  },
  font2: {
    fontFamily: 'var(--main-font-family)',
    fontWeight: 500,
    fontSize: "36px",
  },
  font3: {
    fontFamily: 'var(--main-font-family)',
    fontWeight: 400,
    mt: 2,
    fontSize: "16px",
    color: "#00000099",
  },
  font4: {
    fontFamily: 'var(--main-font-family)',
    fontWeight: 700,
    fontSize: "17px",
  },
};
