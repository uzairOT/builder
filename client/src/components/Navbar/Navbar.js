import { AppBar, Box, Tab, Tabs, Toolbar, useTheme, useMediaQuery } from '@mui/material'
import {ReactComponent as BuilderProNavbarLogo} from './assets/svgs/builder-pro-logo-navbar.svg'
import {ReactComponent as BuilderProNavbarShare} from './assets/svgs/builder-pro-navbar-share.svg'
import {ReactComponent as BuilderProNavbarLogout} from './assets/svgs/builder-pro-navbar-logout.svg'
import React, { useState } from 'react'
import SearchBar from '../UI/SearchBar/SearchBar';
import BuilderProButton from '../UI/Button/BuilderProButton';
import NavbarDrawer from './NavbarDrawer'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    
    const [selectedTab, setSelectedTab] =useState(0);
    const theme = useTheme(); 
    const showHamburger = useMediaQuery(theme.breakpoints.down('lg'));
    const responsiveButton = useMediaQuery(theme.breakpoints.up('sm'));
    const navigate = useNavigate();

    const  handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
            }
    const handleOnClick = () =>{
      localStorage.clear();
      navigate('/login');
    }

    // Navbar styles
    const themeStyle = {
        navbar: {
            background: "#FFF",
            boxShadow: "0px 1px 1.3px 0px rgba(0, 0, 0, 0.05)",
            padding: "16px 16px 16px 16px",
            
        },
        logo: {
            width: '130px',
            height: '69px',
            marginLeft: '28px'
        },
        tabs: {
            margin: 'auto',
            display: {xl: 'flex', lg: 'flex', md:'none', sm:'none', xs:'none'}
        },
        getTabColor: (tabIndex) => ({
            fontFamily: 'inherit',
            color: selectedTab === tabIndex ? '#FFAC00' : '',
            textTransform: 'capitalize',
            fontSize: '15px',
        }),
        search: {
          display: {xl: 'flex', lg:'none', md: 'flex'},
        },
        toolbar:{
          justifyContent: 'space-between',
        }
    }

  return (
    <>
      <AppBar  position='static' sx={themeStyle.navbar}>
        <Toolbar sx={themeStyle.toolbar}>
          {showHamburger && <NavbarDrawer />}
            <BuilderProNavbarLogo aria-label= "Builder Pro Logo" style={themeStyle.logo}/>
            <Tabs sx={themeStyle.tabs} value={selectedTab} onChange={handleTabChange} indicatorColor='' centered>
            <Tab label= 'Dashboard' style={themeStyle.getTabColor(0)}/>
            <Tab label= 'Projects' style={themeStyle.getTabColor(1)}/>
            <Tab label= 'Reports' style={themeStyle.getTabColor(2)}/>
            <Tab label= 'Chat' style={themeStyle.getTabColor(3)}/>
            <Box sx={themeStyle.search}>
            <SearchBar />
            </Box>
            <Tab label='Subscription' style={themeStyle.getTabColor(5)}/>
            <Tab label='Settings' style={themeStyle.getTabColor(6)}/>
            </Tabs>
            <Box display={'flex'}>
            <BuilderProButton backgroundColor={'#FFAC00'} variant={'contained'} Icon={BuilderProNavbarShare}>{ responsiveButton ? "Share" : ""}</BuilderProButton>
            <BuilderProButton backgroundColor={'#4C8AB1'} variant={'outlined'} Icon={BuilderProNavbarLogout} handleOnClick={handleOnClick}>{ responsiveButton ? "Logout" : ""}</BuilderProButton>
            </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar

