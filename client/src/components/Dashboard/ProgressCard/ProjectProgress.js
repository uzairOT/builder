import { Box, Typography } from "@mui/material";
import React from "react";
import CircularGauge from "../../UI/Charts/CircularGauge";
import { useTranslation } from "react-i18next";

const ProjectProgress = ({ progress }) => {
  const { t } = useTranslation();
  return (
    <Box width={"100%"} pl={1.5} pt={2}>
      <Typography textAlign={"left"} sx={themeStyle.title}>
        {t("userProject.processcard.title5")}
      </Typography>
      <CircularGauge progress={progress} />
    </Box>
  );
};

export default ProjectProgress;

const themeStyle = {
  title: {
    fontFamily: "var(--main-font-family)",
    color: "#202224",
    opacity: "0.7",
  },
};
