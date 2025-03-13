import React, { useState } from 'react';
import { Typography, Divider, Box } from '@mui/material';
import Profile from './ProfileView';
import PasswordNotifications from './PasswordAndNotifications';
import Others from './OthersView'; // Example new component for "Others"
import { useTranslation } from 'react-i18next';

function ProfileView() {
  const [currentState, setCurrentState] = useState('Profile');
  const {t} = useTranslation()

  // Define the tabs and their associated components
  const tabs = [
    { label: t("Settings.Tabs.profile"), key: 'Profile', component: <Profile /> },
    { label: t("Settings.Tabs.passwordAndNoti"), key: 'PasswordNotifications', component: <PasswordNotifications /> },
    { label: t("Settings.Tabs.others"), key: 'Others', component: <Others /> }, // Add more tabs here as needed
  ];

  const getTabStyle = (key) => ({
    color: currentState === key ? '#4C8AB1' : '#535353C9',
    fontSize: {sm:'18px', xs: "14px"},
    fontWeight: currentState === key ? 700 : 500,
    fontFamily: 'Manrope',
    cursor: 'pointer',
    marginRight: '40px',
    borderBottom: currentState === key ? '2px solid #4C8AB1' : 'none',
    paddingBottom: '10px',
  });

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'start', padding: '20px 20px 0px' }}>
        {tabs.map((tab) => (
          <Typography
            key={tab.key}
            variant="body1"
            sx={getTabStyle(tab.key)}
            onClick={() => setCurrentState(tab.key)}
          >
            {tab.label}
          </Typography>
        ))}
      </Box>
      <Box sx={{ padding: '0px 20px 0px' }}>
        <Divider sx={{ marginTop: '-2px', height: '2px', backgroundColor: '#E0E4EC' }} />
        {tabs.find((tab) => tab.key === currentState)?.component}
      </Box>
    </>
  );
}

export default ProfileView;
