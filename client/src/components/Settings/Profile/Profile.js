import React, { useState } from 'react';
import { Typography, Divider, Box } from '@mui/material';
import Profile from './ProfileView';
import PasswordNotifications from './PasswordAndNotifications';

function ProfileView() {
  const [currentState, setCurrentState] = useState('Profile');
  const profileTextStyle = {
    color: currentState === 'Profile' ? '#4C8AB1' : '#535353C9',
    fontSize: '18px',
    fontWeight: currentState === 'Profile' ? 700 : 500,
    fontFamily: 'Manrope',
    cursor: 'pointer',
    marginRight: '40px',
    borderBottom: currentState === 'Profile' ? '2px solid #4C8AB1' : 'none',
    paddingBottom: "10px",
  };

  const passwordTextStyle = {
    ...profileTextStyle,
    color: currentState === 'PasswordNotifications' ? '#4C8AB1' : '#535353C9',
    fontWeight: currentState === 'PasswordNotifications' ? 700 : 500,
    borderBottom: currentState === 'PasswordNotifications' ? '2px solid #4C8AB1' : 'none'
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'start',padding:"20px 20px 0px" }}>
        <Typography
          variant="body1"
          sx={profileTextStyle}
          onClick={() => setCurrentState('Profile')}
        >
          Profile
        </Typography>
        <Typography
          variant="body1"
          sx={passwordTextStyle}
          onClick={() => setCurrentState('PasswordNotifications')}
        >
          Passwords & Notifications
        </Typography>
      </Box>
      <Box sx={{ padding:"0px 20px 0px" }}>
      <Divider sx={{ marginTop:"-2px", height: '2px', backgroundColor: '#E0E4EC' }} />
      
      {currentState === 'Profile' ? <Profile /> : <PasswordNotifications />}
      </Box>
     
    </>
  );
}

export default ProfileView;
