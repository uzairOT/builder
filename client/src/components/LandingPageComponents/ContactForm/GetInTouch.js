import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import { useSendContactFormMutation } from "../../../redux/apis/usersApiSlice";
import * as yup from "yup";
import { PhoneInput } from "react-international-phone";
import { useFormik } from "formik";
import { PhoneNumberUtil } from "google-libphonenumber";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

const popEffect = {
  hidden: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone) => {
  try {
    if (phone === "") {
      return true;
    }
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const GetInTouch = () => {
  const { t } = useTranslation();
  const [sendContactForm, { isLoading, isSuccess, isError, error }] =
    useSendContactFormMutation();

  const isMobile = useMediaQuery("(max-width:600px)");

  const lableResponsiveFont = { fontSize: isMobile ? "0.8rem" : "1rem" };
  const borderRadiusResponsive = {
    borderRadius: isMobile ? "0.5rem" : "0.75rem",
  };
  const [phone, setPhone] = useState("");
  const [phoneIsValid, setPhoneIsValid] = useState(false);

  const validate = () => {
    const newErrors = {};

    const isValid = isPhoneValid(phone);
    setPhoneIsValid(isValid);

    return Object.keys(newErrors).length === 0 && isValid;
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    message: yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
      privacyPolicy: false,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (!isPhoneValid(values.phoneNumber)) {
          toast.error("Phone number is not valid");
          return;
        }
        if (!values.privacyPolicy) {
          toast.error("You must agree to the privacy policy");
          return;
        }
        await sendContactForm({
          ...values,
          contactUsType: "contactUs",
        }).unwrap();
        toast.success("Your message has been sent successfully!");
        resetForm();
      } catch (err) {
        toast.error(`There was an error sending your message: ${err.message}`);
      }
    },
  });

  return (
    <motion.div initial="hidden" whileHover="hover" variants={popEffect}>
      <Box
        sx={{
          padding: "20px",
          maxWidth: "900px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <Typography sx={styles.titleFont}>{t('contactus.title1')}</Typography>
        <Typography sx={styles.SubtitleFont}>
        {t('contactus.title2')}
        </Typography>
        <Typography sx={styles.DecsFont}>
        {t('contactus.title3')}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <iframe
              width={isMobile ? "100%" : "100%"}
              height={isMobile ? "100%" : "97%"}
              borderRadius="13px"
              frameBorder="0"
              style={{ border: 0, borderRadius: "10px", marginTop: "1rem" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33.6074086!2d73.100091!3dYOUR_ZOOM_LEVEL!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfeb96a77dbcff%3A0x936bce527a1d6838!2sOctathorn+Technologies!5e0!3m2!1sen!2sus!4vYOUR_EMBED_API_KEY"
              allowFullScreen
              title="Google Map"
            ></iframe>
          </Grid>
          <Grid item xs={12} md={6} mt={3}>
            <Typography sx={styles.TouchFont} textAlign="left" pb={2}>
              {" "}
              {t('contactus.title4')}{" "}
              <span style={{ ...styles.TouchFont, color: "#4C8AB1" }}>
              {t('contactus.title5')}
              </span>
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={0.3}>
                <Grid item xs={12} sm={6}>
                  <label style={{ ...labelStyle, ...lableResponsiveFont }}>
                  {t('contactus.form.name')}
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{
                      ...inputStyle,
                      ...borderRadiusResponsive,
                      ...placeholderStyle,
                      ...lableResponsiveFont,
                    }}
                    placeholder={t('contactus.form.name')}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <Typography
                      sx={{
                        color: "#d32f2f",
                        fontSize: "12px",
                        textAlign: "left",
                      }}
                    >
                      {formik.errors.firstName}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label style={{ ...labelStyle, ...lableResponsiveFont }}>
                  {t('contactus.form.lastName')}
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{
                      ...inputStyle,
                      ...borderRadiusResponsive,
                      ...placeholderStyle,
                      ...lableResponsiveFont,
                    }}
                    placeholder={t('contactus.form.lastName')}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <Typography
                      sx={{
                        color: "#d32f2f",
                        fontSize: "12px",
                        textAlign: "left",
                      }}
                    >
                      {formik.errors.lastName}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <label style={{ ...labelStyle, ...lableResponsiveFont }}>
                  {t('contactus.form.email')}
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{
                      ...inputStyle,
                      ...borderRadiusResponsive,
                      ...placeholderStyle,
                      ...lableResponsiveFont,
                    }}
                    placeholder="JohnDoe@gmail.com"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <Typography
                      sx={{
                        color: "#d32f2f",
                        fontSize: "12px",
                        textAlign: "left",
                      }}
                    >
                      {formik.errors.email}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <label
                    style={{
                      ...labelStyle,
                      fontSize: "1rem",
                      paddingTop: "5px",
                    }}
                  >
                    {t('contactus.form.phone')}
                  </label>
                  <PhoneInput
                    // disableDialCodePrefill
                    style={{ ...customPhoneStyles }}
                    defaultCountry="us"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      validate();
                    }}
                    onChange={(phone) =>
                      formik.setFieldValue("phoneNumber", phone)
                    }
                    countrySelectorStyleProps={{
                      style: {
                        "--react-international-phone-country-selector-background-color":
                          "#EDF2F6",
                        "--react-international-phone-country-selector-background-color-hover":
                          "#EDF2F6",
                      },
                      buttonStyle: {
                        filter: "none",
                      },
                    }}
                    inputStyle={{ ...customeInputStyles }}
                    inputProps={{
                      border: "none",
                      // placeholder: "+1 (123) 456-7890",
                    }}
                  />
                  {(!isPhoneValid(formik.values.phoneNumber) && formik.touched.phoneNumber)&& (
                    <Typography
                      sx={{
                        color: "#d32f2f",
                        fontSize: "12px",
                        marginLeft: "14px",
                        marginTop: "3px",
                        textAlign: "left",
                      }}
                    >
                      Phone number is not valid
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <label style={{ ...labelStyle, ...lableResponsiveFont }}>
                  {t('contactus.form.message')}
                  </label>
                  <textarea
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{
                      ...inputStyle,
                      ...borderRadiusResponsive,
                      ...placeholderStyle,
                      ...lableResponsiveFont,
                      height: "100px",
                    }}
                    placeholder="Your message here"
                  />
                  {formik.touched.message && formik.errors.message && (
                    <Typography
                      sx={{
                        color: "#d32f2f",
                        fontSize: "12px",
                        textAlign: "left",
                      }}
                    >
                      {formik.errors.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Box justifyContent={"left"} mr={{ sm: 15, xs: "0" }}>
                <FormControlLabel
                  sx={{ justifyContent: "left", textAlign: "left" }}
                  control={
                    <Checkbox
                      name="privacyPolicy"
                      checked={formik.values.privacyPolicy}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      {t('contactus.form.title1')}{" "}
                      <span
                        style={{
                          textDecoration: "none",
                          color: "#4C8AB1",
                          cursor: "pointer",
                        }}
                        // href="/privacypolicy"
                        onClick={() => {
                          openInNewTab("/privacypolicy");
                        }}
                      >
                        {t('contactus.form.title2')}
                      </span>
                      .
                    </Typography>
                  }
                />
                {formik.touched.privacyPolicy &&
                  formik.errors.privacyPolicy && (
                    <Typography
                      sx={{
                        color: "#d32f2f",
                        fontSize: "12px",
                        textAlign: "left",
                      }}
                    >
                      {formik.errors.privacyPolicy}
                    </Typography>
                  )}
              </Box>
              <Button
                type="submit"
                fullWidth
                sx={{
                  backgroundColor: "#2E728F",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "grey",
                    color: "white",
                  },
                  fontWeight: 500,
                  fontFamily: "var(--main-font-family)",
                  borderRadius: "8px",
                  textTransform: "none",
                }}
                disabled={isLoading}
              >
                {isLoading ? `${t('contactus.form.btn1')}` : `${t('contactus.form.submit')}`}
              </Button>
            </form>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default GetInTouch;

const inputStyle = {
  height: "2.5rem",
  alignSelf: "stretch",
  width: "calc(100% - 16px)",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: 1,
  marginBottom: { lg: "1rem", md: "1rem", sm: "1rem", xs: "1rem" },
};

const placeholderStyle = {
  color: "black",
  padding: "5px",
  fontFamily: "var(--main-font-family)",
  fontSize: "1rem",
  fontWeight: 400,
};

const labelStyle = {
  textAlign: "left",
  display: "block",
  marginBottom: "0.2rem",
  color: "#16181B",
  fontFamily: "var(--main-font-family)",
  fontSize: { lg: "1rem", md: "1rem", sm: "0.9rem", xs: "0.75rem" },
  fontWeight: 400,
};

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
    mb: 3,
  },
  TouchFont: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "20px", sm: "20px", xs: "18px" },
    fontWeight: 500,
  },
  CardDesc: {
    fontFamily: "var(--main-font-family) !important",
    fontSize: { md: "18px", sm: "18px", xs: "16px" },
    fontWeight: 400,
    color: "#454245",
  },
  container: {
    padding: "32px",
  },
};

const customPhoneStyles = {
  borderRadius: "12px",
  border: "1px solid #D8D8D8",
  background: "#FFF",
  width: "calc(100% - 8px)",
  // height: heightValue,
  alignSelf: "stretch",
  paddingLeft: "8px",
  height: "2.8rem",
  display: "flex",
  alignItems: "center",
  // paddingTop: "0.5rem",
  // padding: "0.5rem",
};

const customeInputStyles = {
  width: "85%",
  border: "none",
  padding: "0px 10px 0px 0px",
};
