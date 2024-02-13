import React, { useState } from "react";
import {
  useMediaQuery,
  Button,
  Box,
  Typography,
  TextField,
  MenuItem,
  selectClasses,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import GTWalsheimTrial from "../../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf";
const MAX_EMAIL_LENGTH = 50;
function StepFormField({ index, email, role, onUpdateEmail, onUpdateRole, onRemoveUser }) {
  
  const isMobile = useMediaQuery("(max-width:600px)");
  const [open, setOpen] = useState(false);
 

  const handleEmailChange = (event) => {
    const { value } = event.target;
    if (value.length <= MAX_EMAIL_LENGTH) {
      
      onUpdateEmail(event.target.value);
    }
  };



  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // const handleEmailChange = (event) => {
  //   onUpdateEmail(event.target.value);
  // };

  const handleRoleChange = (event) => {
    onUpdateRole(event.target.value);
  };


  return (
    <div>
      <Box sx={formBox}>
        <form style={{ marginTop: "0.1rem" }}>
          <Box sx={{ ...buttonBox, gap: "23rem", paddingLeft: "25rem" }}>
            <Box sx={{ marginTop: "0.5rem" }}>
              <Box style={{ position: "relative" }}>
                <input
                  className="placeholder"
                  type="email"
                  id="email"
                  style={{
                    ...inputStyle,
                    fontFamily: GTWalsheimTrial,
                    paddingLeft: "-1.5rem",
                    fontSize: isMobile ? "0.8rem" : "1rem",
                  }}
                  placeholder={`e.g. abc@workmail.com`}
                  value={email}
                  onChange={handleEmailChange}
                />
                <Typography
                  color={
                    email.length > MAX_EMAIL_LENGTH ? "error" : "textSecondary"
                  }
                  sx={counterTypo}
                >
                  {email.length}/{MAX_EMAIL_LENGTH}
                </Typography>
              </Box>
            </Box>

            <FormControl
              sx={{ m: 0, height: 60, minWidth: 180, borderRadius: 12 }}
            >
              {!role && (
                <InputLabel id="demo-controlled-open-select-label">
                  Select Role
                </InputLabel>
              )}
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={role} onChange={handleRoleChange}
                label="role"
                // onChange={handleChangess}
                sx={{ borderRadius: 3 }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"superadmin"}>Super Admin</MenuItem>
                <MenuItem value={"client"}>Client</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </form>
      </Box>
    </div>
  );
}

const buttonBox = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "3rem",
  marginTop: "1rem",
};
const buttonLnks = {
  fontFamily: "Inter",
  fontWeight: 500,
  height: "50%",
  marginTop: "2rem",
  textTransform: "none",
  color: "#4C8AB1",
};

const inputStyle = {
  width: "250%", // Set width to 100% for responsiveness
  height: "2rem",
  marginBottom: "1rem",
  alignSelf: "center",
  padding: "8px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "12px",
  color: "#202227",
};
const formBox = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
  marginRight: "28rem",
  gap: "1.5rem",
};
const counterTypo = {
  position: "absolute",
  right: "-18rem",
  bottom: "2rem",
  fontSize: "0.8rem",
  color: "#B8B8B8",
  fontFamily: "Inter",
  fontWeight: 500,
};
const selectLable = {
  padding: "0rem 1rem",
  marginTop: "-0.5rem",
  color: "#202227",
  fontFamily: "Inter",
  fontWeight: 500,
};
export default StepFormField;
