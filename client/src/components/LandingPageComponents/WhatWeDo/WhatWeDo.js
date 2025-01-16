import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import {
  DashboardCardIcn,
  InvoiceCardIcn,
  ReportCardIcn,
  SubCardIcn,
  TeamCardIcn,
  WorkOrderCardIcn,
} from "../assets/svg";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

const popEffect = {
  hidden: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

const WhatWeDo = () => {
  const { t } = useTranslation();
  return (
    <Grid container style={styles.section}>
      <Container
        sx={{
          justifyContent: "center",
          textAlign: "center",
          mt: 6,
        }}
      >
        <Typography sx={styles.titleFont}>{t('whatwedo.title1')}</Typography>
        <Typography sx={styles.SubtitleFont}>
        {t('whatwedo.title2')}
        </Typography>
        <Typography variant="body1" sx={styles.DecsFont}>
        {t('whatwedo.title3')}
        </Typography>
      </Container>
      <Grid
        padding={2}
        container
        spacing={2}
        justifyContent="center"
        sx={styles.gridContainer}
      >
        <Grid item xs={12} md={4}>
          <motion.div initial="hidden" whileHover="hover" variants={popEffect}>
            <CardItem
              icon={<DashboardCardIcn />}
              title={t('whatwedo.features.title1')}
              description={t('whatwedo.features.desc1')}
              decorationPosition="topLeft"
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial="hidden" whileHover="hover" variants={popEffect}>
            <CardItem
              icon={<WorkOrderCardIcn />}
              title={t('whatwedo.features.title2')}
              description={t('whatwedo.features.desc2')}/>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial="hidden" whileHover="hover" variants={popEffect}>
            <CardItem
              icon={<SubCardIcn />}
              decorationPosition="bottomRight"
              title={t('whatwedo.features.title3')}
              description={t('whatwedo.features.desc3')}
              />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial="hidden" whileHover="hover" variants={popEffect}>
            <CardItem
              icon={<ReportCardIcn />}
              title={t('whatwedo.features.title4')}
              description={t('whatwedo.features.desc4')}
              />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial="hidden" whileHover="hover" variants={popEffect}>
            <CardItem
              icon={<TeamCardIcn />}
              title={t('whatwedo.features.title5')}
              description={t('whatwedo.features.desc5')}
              />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial="hidden" whileHover="hover" variants={popEffect}>
            <CardItem
              icon={<InvoiceCardIcn />}
              title={t('whatwedo.features.title6')}
              description={t('whatwedo.features.desc6')}
              />
          </motion.div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WhatWeDo;

const CardItem = ({ icon, title, description, decorationPosition }) => (
  <Card sx={styles.card}>
    <CardMedia>
      <Box sx={styles.icon}>{icon}</Box>
    </CardMedia>
    <CardContent>
      <Typography sx={styles.CardTitleFont}>{title}</Typography>
      <Typography sx={styles.CardDesc}>{description}</Typography>
    </CardContent>
  </Card>
);

const styles = {
  section: {
    padding: 5,
    width: "100%",
    textAlign: "center",
    backgroundColor: "#F7FAFC",
  },
  titleFont: {
    fontFamily: "var(--main-font-family)",
    fontWeight: 500,
    fontSize: { md: "16px", sm: "16px", xs: "14px" },
    mb: 3,
    color: "#4C8AB1",
  },
  SubtitleFont: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "36px", sm: "36px", xs: "18px" },
    fontWeight: 500,
    marginBottom: 2,
  },
  DecsFont: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "16px", sm: "16px", xs: "14px" },
    fontWeight: 400,
    color: "#454245",
    textAlign:'left'
  },
  CardTitleFont: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "18px", sm: "18px", xs: "16px" },
    fontWeight: 500,
  },
  CardDesc: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "16px", sm: "16px", xs: "14px" },
    fontWeight: 400,
    color: "#454245",
    textAlign:'left'
  },
  gridContainer: {
    marginTop: 1,
  },
  card: {
    // cursor:"pointer",
    height: { lg: "230px", xs: "290px" },
    textAlign: "center",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    "&:hover": {
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
    },
  },
  icon: {
    fontSize: "3rem",
    color: "#2E728E",
  },
};
