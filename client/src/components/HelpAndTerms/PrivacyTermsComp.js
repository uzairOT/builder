import React from "react";
import Header from "./Header";
import { Box, Button, Typography } from "@mui/material";
import YellowBtn from "../UI/button";
import { useNavigate } from "react-router-dom";
const PrivacyTermsComp = () => {
  const navigate = useNavigate();

  const handleAccept = () => {
    navigate(-1);
  };
  return (
    <div style={{ width: "100%" }}>
      <Header />
      <Box sx={styles.container}>
        <Typography variant="h4" sx={styles.heading}>
          Builder Builder Pro Terms & Conditions
        </Typography>

        <Typography
          variant="body2"
          sx={{ ...styles.text, lineHeight: "24px" }}
          gutterBottom
        >
          Welcome to Builder Builder Pro! By using our website, you agree to
          abide by the following terms and conditions:
        </Typography>

        {termsAndConditions.map((item, index) => (
          <Typography key={index} variant="body2" sx={styles.text} gutterBottom>
            {item}
          </Typography>
        ))}

        <Button
          sx={{
            ...YellowBtn,
            width: "fit-content",
            marginTop: "2.5rem",
            borderRadius: "4px",
          }}
          onClick={handleAccept}
          type="submit"
        >
          {"Back"}
        </Button>
      </Box>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "6rem",
    marginTop: "3.5rem",
    lineHeight: "24px",
  },
  heading: {
    fontSize: {xs:"18px",sm:"27px",md:"32px"},
    fontWeight: 600,
    fontFamily: "GT Walsheim Trial",
    marginBottom: "2.5rem",
    color: "#202227",
  },
  text: {
    lineHeight: { xl: "12px", lg: "16px", md: "20px" },
    fontFamily: "GT Walsheim Trial",
    color: "#202227",
    marginBottom: "1.5rem",
    fontSize: "16px",
    fontWeight: 300,
  },
};

const termsAndConditions = [
  "1. Use of Cookies: We utilize cookies to enhance user experience. By using our site, you consent to the use of cookies in accordance with our Privacy Policy.",
  "2. Intellectual Property: All content on Builder Builder Pro is owned by us unless otherwise stated. You may access this content for personal use only, subject to the restrictions outlined in these terms.",
  "3. User-Generated Content: Users may post comments on our website. However, Builder Builder Pro is not responsible for the content of these comments. We reserve the right to monitor and remove any inappropriate or offensive comments.",
  "4. Hyperlinking: Certain organizations may link to our website with prior approval. However, links should not be deceptive or imply endorsement by Builder Builder Pro.",
  "5. Reservation of Rights: We reserve the right to request the removal of any links to our website. We also reserve the right to amend these terms and conditions at any time.",
  "6. Content Liability: Builder Builder Pro is not responsible for content that appears on external websites linked to our site.",
  "7. Disclaimer: While we strive to provide accurate information, we cannot guarantee the completeness or accuracy of the content on our website. We also exclude certain liabilities to the extent permitted by law.",
];

export default PrivacyTermsComp;
