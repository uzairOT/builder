import React, { useState } from "react";
import {
  useMediaQuery,
  Button,
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  formControlStyle,
  Select,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../../../App.css";
import "./StepFormField.css";
import { toast } from "react-toastify";

function ProjectFormFields({
  index,
  email,
  role,
  onUpdateEmail,
  onUpdateRole,
  removeIndex,
  userInfo,
  usersLength
}) {
  const MAX_EMAIL_LENGTH = 50;
  const isSmallMobile = useMediaQuery("(max-width:500px)");
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTab = useMediaQuery("(max-width:900px)");
  const formWidth = { width: isMobile ? "75%" : isTab ? "65%" : "48%" };
  const borderRadiusResponsive = {
    borderRadius: isMobile ? "0.5rem" : "0.75rem",
  };
  const labelResponsiveFont = { fontSize: isMobile ? "0.8rem" : "1rem" };
  const placeholderText =
    !isTab && !isMobile ? "ex: johndoe@workmail.com" : "@mail";

  const handleEmailChange = (event) => {
    // const userEmail = userInfo.user.email;
    const { value } = event.target;
    // if (value === userEmail) {
    //   toast.warning("You can't invite yourself to the project", {
    //     toastId: "invitationValidation",
    //   });
    //   return;
    // }
    if (value.length <= MAX_EMAIL_LENGTH) {
      onUpdateEmail(value);
    }
  };

  const handleRoleChange = (event) => {
    onUpdateRole(event.target.value);
  };

  return (
    <div>
      <Box sx={formBox}>
        <form style={{ ...formStyle, ...formWidth }}>
          <Box sx={formInnerBox}>
            <Box sx={fieldBox1}>
              <input
                className="placeholder"
                type="email"
                id="email"
                style={{
                  ...inputStyle,
                  ...borderRadiusResponsive,
                  ...labelResponsiveFont,
                }}
                placeholder={placeholderText}
                value={email}
                onChange={handleEmailChange}
              />
              {email.length > 5 && isSmallMobile ? (
                <></>
              ) : (
                <Typography
                  color={
                    email.length > MAX_EMAIL_LENGTH ? "error" : "textSecondary"
                  }
                  sx={counterTypo}
                >
                  {email.length}/{MAX_EMAIL_LENGTH}
                </Typography>
              )}
            </Box>

            <Box sx={{ flex: 1 }}>
              <TextField
                sx={{
                  ...inputStyle,
                  ...borderRadiusResponsive,
                 
                  "& input": {
                    borderBottom: "none", // Remove bottom border of the input
                     
                  },

                  ".MuiInput-input": {
                    color: role === "none" ? "lightgray" : "#202227",
                    fontSize: "12px",
                  },
                }}
                inputProps={{ maxLength: 50 }}
                id="standard-select-currency"
                select
                variant="standard"
                value={role}
                // label='Select'
                onChange={handleRoleChange}
                // helperText={'Select user role'}
              >
                <MenuItem sx={{ ...menuItem }} value={"none"} disabled>
                  Select Role
                </MenuItem>
                <MenuItem sx={menuItem} value={"admin"}>
                  Admin
                </MenuItem>
                <MenuItem sx={menuItem} value={"projectManager"}>
                  Project Manager
                </MenuItem>
                <MenuItem sx={menuItem} value={"client"}>
                  Client
                </MenuItem>
                <MenuItem sx={menuItem} value={"subcontractor"}>
                  Subcontractor
                </MenuItem>
                <MenuItem sx={menuItem} value={"supplier"}>
                  Supplier
                </MenuItem>
                <MenuItem sx={menuItem} value={"employee"}>
                  Employee
                </MenuItem>
                <MenuItem sx={menuItem} value={"others"}>
                  Others
                </MenuItem>
              </TextField>
            </Box>
            <Box display={"flex"} alignItems={"center"} pb={"8px"}>
              {( usersLength > 1)? (
                <IconButton
                  onClick={() => {
                    removeIndex(index);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              ) : (
                <Box width={"40px"}></Box>
              )}
            </Box>
          </Box>
        </form>
      </Box>
    </div>
  );
}

const inputStyle = {
  width: "100%", // Set width to 100% for responsiveness
  height: "2rem",
  marginBottom: "0.5rem",
  alignSelf: "center",
  padding: "8px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "12px",
  fontFamily: 'var(--main-font-family)',
  paddingLeft: "-1.5rem",
};
const formBox = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "0.5rem",
  marginLeft: "2.5rem",
};

const formInnerBox = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: { lg: "1rem", md: "1rem", sm: "1rem", xs: "0.5rem" },
};
const fieldBox1 = {
  justifyContent: "space-between",
  flex: 4,
  marginRight: "1rem",
  marginLeft: "-1rem",
  position: "relative",
};

const formStyle = {
  marginTop: "0.1rem",
};

const counterTypo = {
  position: "absolute",
  right: "-0.2rem",
  bottom: "1.5rem",
  fontSize: "0.8rem",
  color: "#B8B8B8",
  fontFamily: 'var(--main-font-family)',
  fontWeight: 500,
};

const menuItem = {
  fontSize: { lg: "0.8rem", md: "0.7rem", sm: "0.7rem", xs: "0.7rem" },
};
export default ProjectFormFields;
