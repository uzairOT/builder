import React from 'react';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function CustomInput({ value, onChange, onKeyPress, placeholder,backgroundColor }) {
  return (
    <TextField
      sx={{
        backgroundColor: backgroundColor,
        height: "40px",
        borderRadius: 25,
        margin: "10px",
        display: "flex",
        justifyContent: "center",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            border: "none",
          },
        },
        "& .MuiInputAdornment-root": {
          margin: 0,
        },
      }}
      id="custom-input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      InputProps={{
        startAdornment: (
          <IconButton>
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
}

export default CustomInput;
