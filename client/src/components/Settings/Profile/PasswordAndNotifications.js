import React, { useState } from "react";
import Switch from "@mui/joy/Switch";
import { Typography, Grid, TextField, Divider } from "@mui/material";
import Button from "../../UI/CustomButton";
import { useTheme } from "@mui/material/styles";

export default function MyApp() {
  const theme = useTheme();
  const isXs = theme.breakpoints.down("xs");

  
  const [checked, setChecked] = useState(true);

  return (
    <div>
      {/* Password Section */}
      <Typography sx={passwordHeadings} variant="h5" gutterBottom>
        Password
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Typography sx={subHeadings}>Current Password</Typography>
          <TextField
            fullWidth
            placeholder="Enter Current Password"
            variant="outlined"
            type="password"
            sx={InputStyle}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={subHeadings}>New Password</Typography>
          <TextField
            fullWidth
            placeholder="Enter New Password"
            variant="outlined"
            type="password"
            sx={InputStyle}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={subHeadings}>Confirm Password</Typography>
          <TextField
            fullWidth
            placeholder="Confirm your password here"
            variant="outlined"
            type="password"
            sx={InputStyle}
          />
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ my: 2, mt: 3 }} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={headings} variant="h5" gutterBottom>
            Notifications
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={subHeadings} variant="body1" gutterBottom>
            Chat Notifications
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} md={6} lg={8} xl={5} sx={{ display: "flex" }}>
            <Grid item xs={12} md={6} lg={8} xl={5}>
              <Typography sx={switchLabelstyles} variant="body1">
                Chat Notifications
              </Typography>
            </Grid>
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography sx={subHeadings} variant="body1" gutterBottom>
            List Notification
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} md={6} lg={8} xl={5} sx={{ display: "flex" }}>
            <Grid item xs={12} md={6} lg={8} xl={5}>
              <Typography sx={switchLabelstyles} variant="body1">
                Project Manager
              </Typography>
            </Grid>
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} md={6} lg={8} xl={5} sx={{ display: "flex" }}>
            <Grid item xs={12} md={6} lg={8} xl={5}>
              <Typography sx={switchLabelstyles} variant="body1">
                Team Member
              </Typography>
            </Grid>
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} md={6} lg={8} xl={5} sx={{ display: "flex" }}>
            <Grid item xs={12} md={6} lg={8} xl={5}>
              <Typography sx={switchLabelstyles} variant="body1">
                Sub- Contractor
              </Typography>
            </Grid>
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} md={6} lg={8} xl={5} sx={{ display: "flex" }}>
            <Grid item xs={12} md={6} lg={8} xl={5}>
              <Typography sx={switchLabelstyles} variant="body1">
                Client
              </Typography>
            </Grid>
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          lg={3}
          sx={{ display: "flex", justifyContent: "center", gap: 1, my: 6 }}
        >
          <Button
            buttonText="Update Profile"
            color="#ffffff"
            backgroundColor="#4C8AB1"
            width="112px"
            height="38px"
            borderRadius="50px"
          />

          <Button
            buttonText="Reset"
            color="#4C8AB1"
            border={"1px solid #4C8AB1"}
            width="112px"
            height="38px"
            borderRadius="50px"
            fontSize={"13px"}
            
          />
        </Grid>
      </Grid>
    </div>
  );
}

const switchLabelstyles = {
  fontFamily: "GT Walsheim Trial",
  fontWeight: "400",
  color: "#2022279C",
  marginLeft: "15px",
};
const passwordHeadings = {
  marginTop: "20px",
  marginBottom: "20px",
  fontFamily: "Manrope, sans-serif",
  fontWeight: "400",
  color: "#4C8AB1",
};
const headings = {
  marginTop: "10px",
  marginBottom: "10px",
  fontFamily: "Manrope, sans-serif",
  fontWeight: "400",
  color: "#4C8AB1",
};
const subHeadings = {
  ...headings,
  color: "#202227",
  fontWeight: "500",
  marginBottom: "5px",
  marginTop: "0px",
};
const InputStyle = {
  backgroundColor: "#EDF2F6",
  borderRadius: "8px",
  fontFamily: "Manrope, sans-serif",
  "& input": {
    border: "1px solid #E0E4EC",
    borderRadius: "8px",
    padding: "10px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
  },
};
