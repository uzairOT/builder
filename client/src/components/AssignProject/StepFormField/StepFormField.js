import React, { useState } from 'react'
import {
  useMediaQuery,
  Box, Typography, MenuItem, InputLabel, Select, FormControl
} from "@mui/material";
import GTWalsheimTrial from "../../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf";
const MAX_EMAIL_LENGTH = 50;
function StepFormField() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const lableResponsiveFont = { fontSize: isMobile ? "0.8rem" : "1rem" }
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    const { value } = event.target;
    if (value.length <= MAX_EMAIL_LENGTH) {
      setEmail(value);
    }
  };





  const [role, setRole] = useState('');
  const [open, setOpen] = useState(false);

  const handleChangess = (event) => {
    setRole(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <Box
        sx={formBox}
      >
        <form style={{ marginTop: "0.1rem", }}>
          <Box sx={buttonBox}>





            <Box sx={{ marginTop: "0.5rem" }}>
              <Box style={{ position: 'relative' }}>
                <input
                  className='placeholder'
                  type="email"
                  id="email"
                  style={{ ...inputStyle, ...lableResponsiveFont }}
                  placeholder={`e.g. abc@workmail.com`}
                  value={email}
                  onChange={handleEmailChange}
                />
                <Typography color={email.length > MAX_EMAIL_LENGTH ? 'error' : 'textSecondary'} sx={counterTypo}>
                  {email.length}/{MAX_EMAIL_LENGTH}
                </Typography>
              </Box>
            </Box>



            <FormControl sx={formControlStyle}>
              {!role && <InputLabel id="demo-controlled-open-select-label">Select Role</InputLabel>}
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={role}
                label="Role"
                onChange={handleChangess}
                sx={{ borderRadius: 3 }}

              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Admin</MenuItem>
                <MenuItem value={20}>Super Admin</MenuItem>
                <MenuItem value={30}>Client</MenuItem>
              </Select>
            </FormControl>

          </Box>
        </form>
      </Box>
    </div>
  )
}

const buttonBox = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
  gap: "23rem",
  paddingLeft: "25rem"
}

const formControlStyle = {
  m: 0,
  height: 60,
  minWidth: 180,
  borderRadius: 12
}


const inputStyle = {
  width: "250%", // Set width to 100% for responsiveness
  height: "2rem",
  marginBottom: '1rem',
  alignSelf: "center",
  padding: '8px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '12px',
  color: "#202227",
  fontFamily: GTWalsheimTrial,
  paddingLeft: "-1.5rem",
};
const formBox = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
  marginRight: "28rem",
  gap: "1.5rem"
};
const counterTypo = {
  position: 'absolute', right: '-18rem', bottom: '2rem', fontSize: '0.8rem',
  color: "#B8B8B8",
  fontFamily: 'Inter',
  fontWeight: 500
}

export default StepFormField
