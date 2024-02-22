import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import UploadIcon from "../../../assets/settings/uploadimg.png";
import Button from "../../UI/CustomButton";

function UpdateModal({ title, open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" sx={{}}>
      <DialogTitle sx={headingStyle}>Update {title}</DialogTitle>
      <DialogContent
        sx={{ display: "flex", justifyContent: "center", margin: "30px" }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px dashed #000",
              borderRadius: "18px",
              justifyContent: "center",
              margin: "20px",
              height: "147px",
            }}
          >
            {/* Upload image icon */}
            <img src={UploadIcon} alt="" />

            {/* Text */}
            <Typography variant="body1" sx={labelStyle}>
              Upload your photo
            </Typography>
          </Grid>

          <Grid item xs={12}  sm={6}>
            {/* Name input */}
            <Typography variant="body1">Name</Typography>
            <TextField placeholder="Name" fullWidth sx={InputStyle} />
          </Grid>
          <Grid item xs={12}  sm={6}>
            {/* Phone Number input */}
            <Typography variant="body1">Phone Number</Typography>
            <TextField
              placeholder="Enter your phone number"
              fullWidth
              sx={InputStyle}
            />
          </Grid>
          <Grid item xs={12}  sm={6}>
            {/* Projects input */}
            <Typography variant="body1">Projects</Typography>
            <TextField placeholder="Projects" fullWidth sx={InputStyle} />
          </Grid>
          <Grid item xs={12}  sm={6}>
            {/* Country input */}
            <Typography variant="body1">Country</Typography>
            <TextField placeholder="Country" fullWidth sx={InputStyle} />
          </Grid>
          <Grid item xs={12}  sm={6}>
            {/* Email input */}
            <Typography variant="body1">Email</Typography>
            <TextField placeholder="Email" fullWidth sx={InputStyle} />
          </Grid>
          <Grid item xs={12}  sm={6}>
            {/* Status input */}
            <Typography variant="body1">Status</Typography>
            <TextField placeholder="Status" fullWidth sx={InputStyle} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center",mb:2 }}>
        <Grid item xs={8} sm={4} md={3} lg={2} sx={{ textAlign: "center" }}>
          <Button
            buttonText="Add New"
            color="#ffffff"
            backgroundColor="#4C8AB1"
            width="150px"
            height="44px"
            borderRadius="50px"
          />
        </Grid>
        <Grid item xs={8} sm={4} md={3} lg={2} sx={{ textAlign: "center" }}>
          <Button
            buttonText="Reset"
            color="#4C8AB1"
            border={"1px solid #4C8AB1"}
            width="150px"
            height="44px"
            borderRadius="50px"
            fontSize={"13px"}
          />
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateModal;
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

const headingStyle = {
  marginTop: "20px",
  // marginBottom: "10px",
  marginLeft: "25px",
  fontFamily: "Poppins",
  fontWeight: "500",
  fontSize: "22px",
  color: "#4C8AB1",
};
const labelStyle = {
  marginTop: "10px",
  fontFamily: "Poppins",
  fontWeight: "400",
  fontSize: "13px",
  color: "#535353C9",
};
