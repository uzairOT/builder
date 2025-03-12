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
          BuilderBUILDER PRO Terms & Conditions
        </Typography>

        <Typography
          variant="body2"
          sx={{ ...styles.text, lineHeight: "24px" }}
          gutterBottom
        >
          Welcome to BuilderBUILDER PRO! By using our website, you agree to
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
    fontFamily: 'var(--main-font-family)',
  },
  heading: {
    fontSize: {xs:"18px",sm:"27px",md:"32px"},
    fontWeight: 600,
    fontFamily: 'var(--main-font-family)',
    marginBottom: "2.5rem",
    color: "#202227",
  },
  text: {
    lineHeight: { xl: "12px", lg: "16px", md: "20px" },
    fontFamily: 'var(--main-font-family)',
    color: "#202227",
    marginBottom: "1.5rem",
    fontSize: "15px",
    fontWeight: 300,
  },
};

const termsAndConditions = [
  "1. Use of Cookies: We utilize cookies to enhance user experience. By using our site, you consent to the use of cookies in accordance with our Privacy Policy.",
  "2. Intellectual Property: All content on BuilderBUILDER PRO is owned by us unless otherwise stated. You may access this content for personal use only, subject to the restrictions outlined in these terms.",
  "3. User-Generated Content: Users may post comments on our website. However, BuilderBUILDER PRO is not responsible for the content of these comments. We reserve the right to monitor and remove any inappropriate or offensive comments.",
  "4. Hyperlinking: Certain organizations may link to our website with prior approval. However, links should not be deceptive or imply endorsement by BuilderBUILDER PRO.",
  "5. Reservation of Rights: We reserve the right to request the removal of any links to our website. We also reserve the right to amend these terms and conditions at any time.",
  "6. Content Liability: BuilderBUILDER PRO is not responsible for content that appears on external websites linked to our site.",
  "7. Disclaimer: While we strive to provide accurate information, we cannot guarantee the completeness or accuracy of the content on our website. We also exclude certain liabilities to the extent permitted by law.",
];

export default PrivacyTermsComp;
