import {
    AppBar, Box, Tab, Tabs, Toolbar, useTheme, useMediaQuery, MenuItem, Menu, IconButton, Select,
    List, ListItemButton, ListItemText, Divider,
} from '@mui/material';
import { ReactComponent as BuilderProNavbarLogo } from './assets/svgs/builder-pro-logo-navbar.svg';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import React, { useState } from 'react';
import "./ClientNavbar.css"
import "../../../App.css"
import { useNavigate } from 'react-router-dom'; // Import useHistory
import SearchBar from '../../UI/SearchBar/SearchBar';
import BuilderProButton from '../../UI/Button/BuilderProButton';
import { ReactComponent as BuilderProNavbarLogout } from './assets/svgs/builder-pro-navbar-logout.svg'
import ClientNavbarDrawer from './ClientNavbarDrawer';

const ClientNavbar = () => {

    const navigate = useNavigate()
    const [openMenu, setOpenMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTab, setSelectedTab] = useState(null);
    const theme = useTheme();
    const showHamburger = useMediaQuery(theme.breakpoints.down('lg'));
    const responsiveButton = useMediaQuery(theme.breakpoints.up('sm'));

    const [dropdownOpen, setDropdownOpen] = useState({});

    const handleToggleMenu = () => {
        setOpenMenu(!openMenu);
    };


    const handleTabClick = (event, tabName) => {
        if (event && event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }

        setSelectedTab(tabName);
        if (tabName === 'Dashboard') {
            navigate('/clientdashboard', { state: { heading: "Dashboard" } });
        }
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (item, index) => {
        setAnchorEl(null);
        // Handle item click logic here
        setAnchorEl(null);
        let path = '';
        let heading = '';
        switch (item) {
            case 'Change Order':
                path = '/clientdashboard/changeorders';
                heading = "Project Management"
                break;
            case 'Daily Log':
                path = '/clientdashboard/dailylog';
                heading = "Project Management"
                break;
            case 'Permits':
                path = '/clientdashboard/permit';
                heading = "Files"
                break;
            case 'Drawing':
                path = '/clientdashboard/drawing';
                heading = "Files"
                break;
            case 'Images':
                path = '/clientdashboard/images';
                heading = "Files"
                break;
            case 'Chats':
                path = '/clientdashboard/chats';
                heading = "Messages"
                break;
            case 'Invoices':
                path = '/clientdashboard/invoices';
                heading = "Financial"
                break;
            default:
                break;
        }
        // Navigate to the selected path and pass the corresponding heading
        navigate(path, { state: { heading } });


        console.log('Clicked item:', item);
    };

    const tabsWithDropdown = [
        { name: 'Project Management', items: ['Change Order', 'Daily Log'] },
        { name: 'Files', items: ['Permits', 'Drawing', 'Images'] },
        { name: 'Messages', items: ['Chats'] },
        { name: 'Financial', items: ['Invoices'] }
    ];


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
            display: { xl: 'flex', lg: 'flex', md: 'none', sm: 'none', xs: 'none' },
            color: "#484848",
            '& .MuiTypography-root': {
                fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
                fontSize: "1rem"
            },

        },
        tabText: {
            color: "#484848",
            fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
            '&:hover': {
                color: "#FFAC00"
            },

        },
        search: {
            marginLeft: "1rem",
            display: { xl: 'flex', lg: 'none', md: 'flex' },
        },
        toolbar: {
            justifyContent: 'space-between',
        },

    };

    return (
        <>
            <AppBar position='static' sx={themeStyle.navbar}>
                <Toolbar sx={themeStyle.toolbar}>
                    {showHamburger && <ClientNavbarDrawer />}
                    <BuilderProNavbarLogo aria-label="Builder Pro Logo" style={themeStyle.logo} />
                    <Box sx={themeStyle.tabs}>
                        <List sx={themeStyle.tabs}>
                            <ListItemButton
                                onClick={() => handleTabClick(null, 'Dashboard')} // Pass null as event object
                                sx={{
                                    ...themeStyle.tabText,
                                    ...(selectedTab === 'Dashboard' && { color: '#FFAC00' }) // Apply selected tab text color
                                }}
                            >
                                <ListItemText
                                    sx={{
                                        ...themeStyle.tabText,
                                        ...(selectedTab === 'Dashboard' && { color: '#FFAC00' }),
                                        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
                                    }}
                                >
                                    Dashboard
                                </ListItemText>
                            </ListItemButton>
                            {tabsWithDropdown.map((tab, index) => (
                                <React.Fragment key={index}>
                                    <ListItemButton
                                        onClick={(event) => handleTabClick(event, tab.name)}
                                        sx={{
                                            ...themeStyle.tabText,
                                        }}
                                    >
                                        <ListItemText
                                            sx={{
                                                ...themeStyle.tabText,
                                                ...(selectedTab === tab.name && { color: '#FFAC00' })
                                            }}
                                        >
                                            {tab.name}
                                        </ListItemText>
                                        {dropdownOpen[tab.name] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                    </ListItemButton>
                                </React.Fragment>
                            ))}
                        </List>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            {selectedTab && tabsWithDropdown.find(tab => tab.name === selectedTab)?.items.map((item, index) => (
                                <MenuItem sx={themeStyle.tabText} key={index} onClick={() => handleMenuItemClick(item, index)}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Menu>
                        <Box sx={themeStyle.search}>
                            <SearchBar />
                        </Box>

                    </Box>
                    <Box display={'flex'}>
                        <BuilderProButton backgroundColor={'#4C8AB1'} variant={'outlined'} Icon={BuilderProNavbarLogout}>{responsiveButton ? "Logout" : ""}</BuilderProButton>
                    </Box>
                </Toolbar>
            </AppBar >
        </>
    );
};

export default ClientNavbar;
