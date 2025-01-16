import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// import { features } from "./FeaturesData";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DashboardFeature from "../assets/Card/dashboardCard.png";
import EventFeature from "../assets/Card/workEventsCard.png";
import SubscriptionFeature from "../assets/Card/subsciptionCard.png";
import ReportsFeature from "../assets/Card/reportsCard.png";
import InvitationFeature from "../assets/Card/invitationCard.png";
import InvoiceFeature from "../assets/Card/invoiceCard.png";
import {
  CheckIcn,
  DashboardCardIcn,
  InvoiceCardIcn,
  ReportCardIcn,
  SubCardIcn,
  TeamCardIcn,
  WorkOrderCardIcn,
} from "../assets/svg";
import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";

const popEffect = {
  hidden: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

const FeatureCard = ({ title, features, image, icon }) => {
  return (
    <Box style={styles.card}>
      <Grid container sx={{ justifyContent: "center" }}>
        <Container
          maxWidth={"sm"}
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          {icon && <icon.Component />}
          <Typography sx={styles.CardTitle} gutterBottom>
            {title}
          </Typography>
          <List>
            {features.map((feature, index) => (
              <ListItem
                sx={styles.CardDesc}
                key={index}
                style={styles.listItem}
              >
                <ListItemIcon>
                  <CheckIcn />
                </ListItemIcon>
                <ListItemText style={styles.CardDesc} primary={feature} />
              </ListItem>
            ))}
          </List>
        </Container>
      </Grid>
    </Box>
  );
};

const BuilderFeatures = () => {
  const { t } = useTranslation();
  const features = {
    dashboardFeature: [
      `${t('features.features.desc1.list1')}`,
      `${t('features.features.desc1.list2')}`,
      `${t('features.features.desc1.list3')}`,
    ],
    eventFeature: [
      `${t('features.features.desc2.list1')}`,
      `${t('features.features.desc2.list2')}`,
      `${t('features.features.desc2.list3')}`,
    ],
    subscriptionFeature: [
      `${t('features.features.desc3.list1')}`,
      `${t('features.features.desc3.list2')}`,
      `${t('features.features.desc3.list3')}`,
    ],
    reportFeature: [
      `${t('features.features.desc4.list1')}`,
      `${t('features.features.desc4.list2')}`,
      `${t('features.features.desc4.list3')}`,
    ],
    inviteFeature: [
      `${t('features.features.desc5.list1')}`,
      `${t('features.features.desc5.list2')}`,
      `${t('features.features.desc5.list3')}`,
    ],
    invoiceFeature: [
      `${t('features.features.desc6.list1')}`,
      `${t('features.features.desc6.list2')}`,
      `${t('features.features.desc6.list3')}`,
    ],
  };
  const theme = useTheme();
  const xsView = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Grid style={styles.container}>
      <Container maxWidth={"xl"} sx={{ textAlign: "center", mt: 4 }}>
        <Typography sx={styles.titleFont}> {t("features.title1")}</Typography>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={styles.title}
        >
          {t('features.title2')}{" "}
          <strong style={{ color: "#2E728F" }}>{t('features.title3')}</strong> {t('features.title4')}
        </Typography>
        <Container maxWidth={"lg"}>
          <Typography
            variant="body1"
            align="center"
            paragraph
            style={styles.DecsFont}
          >
            {t('features.title5')}
          </Typography>
        </Container>
      </Container>
      {/* Dashboard Feature Section */}
      <Grid container justifyContent="center" padding={2}>
        <Grid item xs={12} md={4}>
          <motion.div initial="hidden" whileHover="hover" variants={popEffect}>
            <Box>
              <img
                src={DashboardFeature}
                style={{
                  width: xsView ? "20%" : "100%",
                  borderRadius: "14px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
                alt="Dashboard Features"
                loading="lazy"
              />
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <FeatureCard
            title={t('features.features.title1')}
            features={features.dashboardFeature}
            image={DashboardFeature}
            icon={{ Component: DashboardCardIcn }}
          />
        </Grid>
      </Grid>

      {/* Event Feature Section */}
      <Grid container padding={2} mt={5}>
        <Grid item xs={12} md={6} sx={{ justifyContent: "left" }}>
          <FeatureCard
            title={t('features.features.title2')}
            features={features.eventFeature}
            image={EventFeature}
            icon={{ Component: WorkOrderCardIcn }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial="hidden" whileHover="hover" variants={popEffect}>
            <Box>
              <img
                src={EventFeature}
                style={{
                  width: xsView ? "20%" : "100%",
                  borderRadius: "14px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
                alt="Event Features"
                loading="lazy"
              />
            </Box>
          </motion.div>
        </Grid>
      </Grid>

      {/* Subscription Feature Section */}
      <Grid container justifyContent="center" padding={2} mt={5}>
        <Grid item xs={12} md={4}>
          <motion.div initial="hidden" whileHover="hover" variants={popEffect}>
            <Box>
              <img
                src={SubscriptionFeature}
                style={{
                  width: xsView ? "20%" : "100%",
                  borderRadius: "14px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
                alt="Subscription Features"
                loading="lazy"
              />
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6} sx={{ justifyContent: "left" }}>
          <FeatureCard
            title={t('features.features.title3')}
            features={features.subscriptionFeature}
            image={SubscriptionFeature}
            icon={{ Component: SubCardIcn }}
          />
        </Grid>
      </Grid>

      {/* Reports Feature Section */}
      <Grid container padding={2} mt={5}>
        <Grid item xs={12} md={6} sx={{ justifyContent: "left" }}>
          <FeatureCard
            title={t('features.features.title4')}
            features={features.reportFeature}
            image={ReportsFeature}
            icon={{ Component: ReportCardIcn }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial="hidden" whileHover="hover" variants={popEffect}>
            <Box>
              <img
                src={ReportsFeature}
                style={{
                  width: xsView ? "20%" : "100%",
                  borderRadius: "14px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
                alt="Reports Features"
                loading="lazy"
              />
            </Box>
          </motion.div>
        </Grid>
      </Grid>

      {/* Invitation Feature Section */}
      <Grid container justifyContent="center" padding={2} mt={5}>
        <Grid item xs={12} md={4}>
          <motion.div initial="hidden" whileHover="hover" variants={popEffect}>
            <Box>
              <img
                src={InvitationFeature}
                style={{
                  width: xsView ? "20%" : "100%",
                  borderRadius: "14px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
                alt="Invitation Features"
                loading="lazy"
              />
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6} sx={{ justifyContent: "left" }}>
          <FeatureCard
            title={t('features.features.title5')}
            features={features.inviteFeature}
            image={SubscriptionFeature}
            icon={{ Component: TeamCardIcn }}
          />
        </Grid>
      </Grid>

      {/* Invoice Feature Section */}
      <Grid container padding={2} mt={5}>
        <Grid item xs={12} md={6} sx={{ justifyContent: "left" }}>
          <FeatureCard
            title={t('features.features.title6')}
            features={features.invoiceFeature}
            image={InvitationFeature}
            icon={{ Component: InvoiceCardIcn }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial="hidden" whileHover="hover" variants={popEffect}>
            <Box>
              <img
                src={InvoiceFeature}
                style={{
                  width: xsView ? "20%" : "100%",
                  borderRadius: "14px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
                alt="Invoice Features"
                loading="lazy"
              />
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default BuilderFeatures;

const styles = {
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
    textAlign: "left",
  },
  CardTitle: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "30px", sm: "30px", xs: "20px" },
    fontWeight: 400,
  },
  CardDesc: {
    fontFamily: "var(--main-font-family) !important",
    fontSize: { md: "18px", sm: "18px", xs: "16px" },
    fontWeight: 400,
    color: "#454245",
  },
  container: {
    mt: { xl: 20, lg: 45, md: 20, xs: 2 },
    padding: "32px",
  },
  title: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "36px", sm: "36px", xs: "18px" },
    fontWeight: 500,
  },
  description: {
    marginBottom: "16px",
  },
  card: {
    display: "flex",
    flexDirection: "row",
  },
  media: {
    width: "100%",
    height: "auto",
  },
  listItem: {
    marginBottom: "8px",
  },
};
