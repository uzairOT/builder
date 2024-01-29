import { AppBar, Tab, Tabs, Toolbar } from '@mui/material'
import {ReactComponent as BuilderProNavbarLogo} from './assets/svgs/builder-pro-logo-navbar.svg'
import {ReactComponent as BuilderProNavbarShare} from './assets/svgs/builder-pro-navbar-share.svg'
import {ReactComponent as BuilderProNavbarLogout} from './assets/svgs/builder-pro-navbar-logout.svg'
import React, { useState } from 'react'
import SearchBar from '../UI/SearchBar/SearchBar';
import BuilderProButton from '../UI/Button/BuilderProButton';
import GTWalsheimTrial from './assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf';

const Navbar = () => {
    
    const [selectedTab, setSelectedTab] =useState(0);

    const  handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
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
            margin: 'auto'
        },
        getTabColor: (tabIndex) => ({
            fontFamily: `${GTWalsheimTrial}, sans-serif`,
            color: selectedTab === tabIndex ? '#FFAC00' : ''
        })
    }

  return (
    <>
      <AppBar  position='static' sx={themeStyle.navbar}>
        <Toolbar>
            <BuilderProNavbarLogo aria-label= "Builder Pro Logo" style={themeStyle.logo}/>
            <Tabs sx={themeStyle.tabs} value={selectedTab} onChange={handleTabChange} indicatorColor='' centered>
            <Tab label= 'Dashboard' style={themeStyle.getTabColor(0)}/>
            <Tab label= 'Projects' style={themeStyle.getTabColor(1)}/>
            <Tab label= 'Reports' style={themeStyle.getTabColor(2)}/>
            <Tab label= 'Chat' style={themeStyle.getTabColor(3)}/>
            <SearchBar />
            <Tab label='Subscription' style={themeStyle.getTabColor(5)}/>
            <Tab label='Settings' style={themeStyle.getTabColor(6)}/>
            </Tabs>
            <BuilderProButton backgroundColor={'#FFAC00'} variant={'contained'} Icon={BuilderProNavbarShare}>Share</BuilderProButton>
            <BuilderProButton backgroundColor={'#4C8AB1'} variant={'outlined'} Icon={BuilderProNavbarLogout}>Logout</BuilderProButton>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar

