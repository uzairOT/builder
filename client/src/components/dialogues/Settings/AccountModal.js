import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Stack,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  couponSchema,
  settingsSchema,
} from "../../../utils/Validation/settingsPageSchema";
import UploadIcon from "../../../assets/settings/uploadimg.svg";
import Button from "../../UI/CustomButton";
import {
  useGetCreateUserCouponsMutation,
  useUpdateUserCouponsMutation,
} from "../../../redux/apis/Coupon/CouponApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Close } from "@mui/icons-material";
import axios from "axios";
import { getTokenFromLocalStorage } from "../../../redux/apis/apiSlice";
import { uploadToS3 } from "../../../utils/S3";
import { useTranslation } from "react-i18next";

const AccountModal = ({
  open,
  title,
  onClose,
  updateOpen,
  updateClose,
  userId,
  couponId,
  addUserAccount,
  updateCoupon,
  account,
  updateUserAccount,
}) => {
  const {t} = useTranslation()
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [image, setImage] = useState(null);
  const handleClose = () => {
    setFileName(null);
    setFileType(null);
    setSelectedFile(null);
    setImage(null);
    if (updateOpen) {
      updateClose();
    } else {
      onClose();
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFileName(file.name);
    setFileType(file.type);
    setSelectedFile(file);
    previewImage(file);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setFileType(file.type);
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadFileToServer = async (selectedFile) => {
    if (selectedFile) {
      try {
        const res = await axios.post(
          "https://builderbuilder.net/project/file",
          {
            fileName,
            fileType,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getTokenFromLocalStorage()}`,
            },
          }
        );
        // //console.log(res);
        return res.data.data.url;
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle error
      }
    }
  };
  const onSubmit = async (values, action) => {
    if (open) {
      try {
        const fileUrl = await uploadFileToServer(selectedFile);
        const uploadedFileUrl = await uploadToS3(fileUrl, selectedFile);
        const res = await addUserAccount({
          accountNumber: values.accountNumber,
          accountLink: values.accountLink,
          accountType: values.accountType,
          accountName: values.accountName,
          userId: userId,
          accountImage: uploadedFileUrl,
        });
        // console.log(res);
        if (res?.error?.status === "FETCH_ERROR") {
          throw new Error("Network response was not OK");
        }
        toast.success("Account added successfully");
        setFileName(null);
        setFileType(null);
        setSelectedFile(null);
        setImage(null);
      } catch (e) {
        console.log(e);
        toast.error("Something went wrong");
        setFileName(null);
        setFileType(null);
        setSelectedFile(null);
        setImage(null);
      }
    } else {
      try {
        const fileUrl = await uploadFileToServer(selectedFile);
        const uploadedFileUrl = await uploadToS3(fileUrl, selectedFile);
        await updateUserAccount({
          ...account,
          accountNumber: values.accountNumber,
          accountLink: values.accountLink,
          accountType: values.accountType,
          accountName: values.accountName,
          userId: userId,
          accountImage: uploadedFileUrl,
        });
        toast.success("Account updated successfully");
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    }
  };

  const {
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    handleReset,
    setValues,
  } = useFormik({
    initialValues: {
      accountNumber: "",
      accountLink: "",
      accountType: "",
      accountName: "",
    },
    onSubmit,
  });
  useEffect(() => {
    if (account && updateOpen) {
      setValues({
        accountNumber: account.accountNumber,
        accountLink: account.accountLink,
        accountType: account.accountType,
        accountName: account.accountName,
      });
      setImage(account.accountImage)
    } else {
      handleReset();
    }
  }, [account, open]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Dialog
          open={open || updateOpen}
          onClose={handleClose}
          maxWidth="md"
          sx={{}}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mr={5}
          >
            <DialogTitle sx={headingStyle}>
              {open ? t("Button.add") : updateOpen ? t("Button.update") : ""} {title}
            </DialogTitle>
            <IconButton
              style={{ width: "30px", height: "30px" }}
              onClick={handleClose}
            >
              <Close />
            </IconButton>
          </Stack>
          <DialogContent
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "30px",
              flexDirection: "column",
              gap: "16px",
              marginTop: "15px",
            }}
          >
            <Grid container spacing={4}>
              <Grid
                item
                xs={12}
                sx={{
                  mt: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px dashed #000",
                  borderRadius: "18px",
                  justifyContent: "center",
                  margin: "20px",
                  height: "180px"
                }}
              >
                <div
                  style={{ textAlign: "center", width: "100%", height: "100%" }}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  {/* Upload image icon */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    id="avatarInput"
                    name="image"
                  />
                  <label htmlFor="avatarInput">
                    <img
                      src={image ? image : UploadIcon}
                      alt=""
                      width={"120px"}
                      height={"100px"}
                    />

                    {/* Text */}
                    <Typography variant="body1" sx={labelStyle}>
                      {image ? <></> : `${t("Button.upload")} ${t("Settings.Accounts.table.accountImg")}`}
                    </Typography>
                  </label>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">{t("Settings.Accounts.table.accountName")}</Typography>
                <TextField
                  error={errors.accountName ? true : false}
                  value={values.accountName}
                  placeholder={t("Settings.Accounts.table.accountName")}
                  fullWidth
                  name={"accountName"}
                  inputProps={{
                    style: {
                      ...InputStyle,
                      border:
                        errors.accountName && touched.accountName
                          ? "1px solid #d32f2f"
                          : "1px solid #E0E4EC",
                    },
                    maxLength: 50,
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.accountName && touched.accountName
                      ? errors.accountName
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">{t("Settings.Accounts.table.accountLink")}</Typography>
                <TextField
                  type="text"
                  error={errors.accountLink ? true : false}
                  value={values.accountLink}
                  placeholder={t("Settings.Accounts.table.accountLink")}
                  fullWidth
                  name={"accountLink"}
                  inputProps={{
                    style: {
                      ...InputStyle,
                      border:
                        errors.accountLink && touched.accountLink
                          ? "1px solid #d32f2f"
                          : "1px solid #E0E4EC",
                    },
                    maxLength: 50,
                    //   type: 'number'
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.accountLink && touched.accountLink
                      ? errors.accountLink
                      : ""
                  }
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12}>
                <Typography variant="body1">{t("Settings.Accounts.table.accountDetails")}</Typography>
                <TextField
                  // padding={1}
                  multiline
                  minRows={4}
                  error={errors.accountType ? true : false}
                  value={values.accountType}
                  placeholder={t("Settings.Accounts.table.accountDetails")}
                  fullWidth
                  name={"accountType"}
                  InputProps={{
                    style:{
                      padding:0
                    }
                  }}
                  inputProps={{
                    style: {
                      ...InputStyle,
                      border:
                        errors.accountType && touched.accountType
                          ? "1px solid #d32f2f"
                          : "1px solid #E0E4EC",
                    },
                    maxLength: 100,
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.accountType && touched.accountType
                      ? errors.accountType
                      : ""
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 1, sm: 0 },
            }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              sx={{ textAlign: "center" }}
            >
              <Button
                buttonText={
                  isSubmitting
                    ? t("Button.submitting")
                    : updateOpen
                    ? `${t("Button.update")} ${title}`
                    : `${t("Button.add")} ${title}`
                }
                color="#ffffff"
                backgroundColor={isSubmitting ? "gray" : "#4C8AB1"}
                width="150px"
                height="44px"
                borderRadius="50px"
                type={"submit"}
                onClick={handleSubmit}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              sx={{ textAlign: "center" }}
            >
              <Button
                buttonText={t("Button.reset")}
                color="#4C8AB1"
                border={"1px solid #4C8AB1"}
                width="150px"
                height="44px"
                borderRadius="50px"
                fontSize={"13px"}
                onClick={handleReset}
              />
            </Grid>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
};
const InputStyle = {
  backgroundColor: "#EDF2F6",
  borderRadius: "8px",
  fontFamily: 'var(--main-font-family)',
  border: "1px solid #E0E4EC",
  padding: "10px",
  width: { xl: "250px", lg: "100%", md: "100%", sm: "100%", xs: "100%" },
  "& .MuiOutlinedInputRoot": {
    "& fieldset": {
      border: "none",
    },
  },
};
const labelStyle = {
  marginTop: "10px",
  fontFamily: 'var(--main-font-family)',
  fontWeight: "400",
  fontSize: "13px",
  color: "#535353C9",
};

const headingStyle = {
  marginTop: "20px",
  // marginBottom: "10px",
  marginLeft: "25px",
  fontFamily: 'var(--main-font-family)',
  fontWeight: "500",
  fontSize: "22px",
  color: "#4C8AB1",
};

export default AccountModal;
