import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function AddModal({ title, open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Upload image icon */}
            <CloudUploadIcon style={{ width: 664, height: 147 }} />
          </Grid>
          <Grid item xs={6}>
            {/* Name input */}
            <TextField label="Name" fullWidth />
          </Grid>
          <Grid item xs={6}>
            {/* Phone Number input */}
            <TextField label="Phone Number" fullWidth />
          </Grid>
          <Grid item xs={4}>
            {/* Projects input */}
            <TextField label="Projects" fullWidth />
          </Grid>
          <Grid item xs={4}>
            {/* Country input */}
            <TextField label="Country" fullWidth />
          </Grid>
          <Grid item xs={4}>
            {/* Email input */}
            <TextField label="Email" fullWidth />
          </Grid>
          <Grid item xs={6}>
            {/* Status input */}
            <TextField label="Status" fullWidth />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {/* Button to close the modal */}
        <Button onClick={{}} color="primary">Cancel</Button>
        {/* Button to submit */}
        <Button onClick={{}} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddModal;
