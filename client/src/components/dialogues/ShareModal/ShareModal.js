          import { Divider, FormControl, IconButton, Input, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
          import React, { useState } from 'react'
          import BuilderProButton from '../../UI/Button/BuilderProButton';
          import CloseIcon from "@mui/icons-material/Close";
          import LinkIcon from "@mui/icons-material/Link";
          import users from "./assets/data/users.json";
          import { Box, Modal } from '@mui/material'

          const ShareModal = ({setShareToClient, setDone}) => {
              const [open, setOpen] = useState(true);
              const [userType, setUserType] = useState("");
              const handleClose = () => {
                setShareToClient(false)
                };
                const handleUserTypeChange = (event) => {
                    setUserType(event.target.value);
                  };
  return (
    <>
      <Modal open={open} onClose={setShareToClient}>
        <Stack sx={style}> 
         <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography sx={{ p: 1 }} color={"#4C8AB1"} fontWeight={'500'} fontSize={'20px'}>
            Send to
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ p: 2, color: "#535353", fontSize: "20px" }} />
          </IconButton>
        </Stack>
        <Divider variant="fullWidth" />
        <Stack direction={"row"} pl={4} pr={4} pt={2} pb={2} spacing={3}>
          <Stack
            direction={"row"}
            border={"2px solid #FFAC00"}
            borderRadius={"30px"}
            pl={2}
            width={'100%'}
          >
            <Input
              placeholder="Enter an Email to Send"
              aria-describedby="my-helper-text"
              sx={{
                "&::after": {
                  borderBottom: "none",
                },
                "&:before": {
                  borderBottom: "none",
                },
                "&.MuiInput-root:hover:not(.Mui-disabled, Mui-error):before": {
                  borderBottom: "none",
                },
                width: '90%'
              }}
            
            />
            <FormControl
              style={{ marginLeft: "5px", width: "120px" }}
              size="small"
              fullWidth
            >
              <InputLabel
                id="demo-simple-select-label"
                style={{
                  fontSize: "12px",
                  top: "3px",
                  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
                  color: "#202227",
                }}
                sx={{
                  "&.Mui-focused": {
                    display: 'none',
                  },
                  "&.MuiInputLabel-shrink": {
                    display: 'none',
                  },
                }}
              >
                Select Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userType}
                label={userType}
                onChange={handleUserTypeChange}
                placeholder={`Client`}
                sx={{
                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              >
                <MenuItem value={"user"}>Client</MenuItem>
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"super admin"}>Super admin</MenuItem>
              </Select>
            </FormControl>
          </Stack>

        </Stack>

        {users.map((user, index) => (
          <Stack p={0.5} pl={2.5} pr={2.5}>
            <Stack
              id={user.img}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              pb={1}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                pl={2}
              >
                <img
                  src={user.img}
                  alt="User Profile Pic"
                  width={"32px"}
                  height={"32px"}
                  style={{ borderRadius: "50px" }}
                ></img>
                <Typography
                  color={"#202227"}
                  fontSize={"14px"}
                  pl={2}
                  fontFamily={"GT-Walsheim-Regular-Trial, sans-serif"}
                >
                  {user.name}
                </Typography>
              </Stack>
              <Typography
                fontFamily={"GT-Walsheim-Regular-Trial, sans-serif"}
                fontSize={"14px"}
              >
                {user.userType}
              </Typography>
            </Stack>
            {users.length - 1 === index ? <></> : <Divider />}
          </Stack>
        ))}
        <Stack direction={"row"} p={2} pl={3} justifyContent={'center'}>
            <BuilderProButton backgroundColor={"#FFAC00"} variant={"contained"} padding={'6px 32px 6px 32px'} handleOnClick={()=>{
                setShareToClient(false)
                setDone(true);
                }}>
            <Typography>Send</Typography>
          </BuilderProButton>
        </Stack>
        </Stack>
      </Modal>
    </>
  )
}

export default ShareModal;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 1,
    borderRadius: '14px'
  };
  