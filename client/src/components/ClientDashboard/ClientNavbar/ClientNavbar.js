import { AppBar, Box, Tab, Tabs, Toolbar, useTheme, useMediaQuery, MenuItem, Menu, IconButton, Select } from '@mui/material';
import { ReactComponent as BuilderProNavbarLogo } from './assets/svgs/builder-pro-logo-navbar.svg';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React, { useState } from 'react';
import "./ClientNavbar.css"
import { useNavigate } from 'react-router-dom'; // Import useHistory
import SearchBar from '../../UI/SearchBar/SearchBar';
import BuilderProButton from '../../UI/Button/BuilderProButton';
import { ReactComponent as BuilderProNavbarLogout } from './assets/svgs/builder-pro-navbar-logout.svg'
import ClientNavbarDrawer from './ClientNavbarDrawer';
import Permit from '../Permit/Permit';

const ClientNavbar = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [anchorEl, setAnchorEl] = useState(0);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const theme = useTheme();
    const showHamburger = useMediaQuery(theme.breakpoints.down('lg'));
    const responsiveButton = useMediaQuery(theme.breakpoints.up('sm'));
    const navigate = useNavigate(); // Initialize useHistory

    const handleDashboard = () => {
        navigate('/clientdashboard', { state: { heading: "Dashboard" } });
    }


    const handleMenuItemClick = (index) => {
        setAnchorEl(null);
        setSelectedIndex(index);
        let path = '';
        let heading = '';
        switch (index) {
            case 0:
            case 1:
                path = '/clientdashboard/changeorders';
                heading = "Project Management"
                break;
            case 2:
                path = '/clientdashboard/dailylog';
                heading = "Project Management"
                break;
            case 3:
                path = '/clientdashboard/permit';
                heading = "Files"
                break;
            case 4:
                path = '/clientdashboard/drawing';
                heading = "Files"
                break;
            case 5:
                path = '/clientdashboard/images';
                heading = "Files"
                break;
            case 6:
                path = '/clientdashboard/chats';
                heading = "Messages"
                break;
            case 7:
                path = '/clientdashboard/invoices';
                heading = "Financial"
                break;
            default:
                break;
        }
        // Navigate to the selected path and pass the corresponding heading
        navigate(path, { state: { heading } });
    };


    const ProjectdropItems = [
        { label: 'Project Management', value: 0 },
        { label: 'Change Order', value: 1 },
        { label: 'Daily Log', value: 2 },

    ];
    const FilesdropItems = [
        { label: 'Files', value: 0 },
        { label: 'Permits', value: 3 },
        { label: 'Drawing', value: 4 },
        { label: 'Images', value: 5 },

    ];
    const MessagesdropItems = [
        { label: 'Messages', value: 0 },
        { label: 'Chats', value: 6 },

    ];
    const FinancialdropItems = [
        { label: 'Financial', value: 0 },
        { label: 'Invoices', value: 7 },

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
            display: { xl: 'flex', lg: 'flex', md: 'none', sm: 'none', xs: 'none' }
        },
        getTabColor: (tabIndex) => ({
            fontFamily: 'inherit',
            color: selectedTab === tabIndex ? '#FFAC00' : '',
            textTransform: 'capitalize',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center'
        }),
        search: {
            marginLeft: "1rem",
            display: { xl: 'flex', lg: 'none', md: 'flex' },
        },
        toolbar: {
            justifyContent: 'space-between',
        },
        arrowIcon: {
            marginLeft: '5px', // Adjust the spacing between tab label and arrow icon as needed
            color: '#666' // Set the color of the arrow icon
        }
    };

    return (
        <>
            <AppBar position='static' sx={themeStyle.navbar}>
                <Toolbar sx={themeStyle.toolbar}>
                    {showHamburger && <ClientNavbarDrawer />}
                    <BuilderProNavbarLogo aria-label="Builder Pro Logo" style={themeStyle.logo} />

                    <Tabs sx={themeStyle.tabs} value={selectedTab} indicatorColor='' centered>


                        <Tab
                            label={
                                <Box sx={themeStyle.getTabColor(0)}
                                    onClick={() => handleDashboard()}>
                                    Dashboard
                                </Box>
                            }

                        />
                        <Select
                            value={selectedTab}
                            variant="standard"
                            sx={{ ...themeStyle.select, marginLeft: "1rem" }}


                        >

                            {ProjectdropItems.map((item, index) => (
                                <MenuItem key={index} value={item.value} onClick={() => handleMenuItemClick(item.value)}
                                    disabled={selectedTab === 0 && index === 0} // Disable when selectedTab is 0 and index is 0
                                >

                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select
                            value={selectedTab}
                            variant="standard"
                            sx={{ ...themeStyle.select, marginLeft: "1rem" }}


                        >

                            {FilesdropItems.map((item, index) => (
                                <MenuItem key={index} value={item.value} onClick={() => handleMenuItemClick(item.value)}
                                    disabled={selectedTab === 0 && index === 0} // Disable when selectedTab is 0 and index is 0
                                >

                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select
                            value={selectedTab}
                            variant="standard"
                            sx={{ ...themeStyle.select, marginLeft: "1rem" }}


                        >

                            {MessagesdropItems.map((item, index) => (
                                <MenuItem key={index} value={item.value} onClick={() => handleMenuItemClick(item.value)}
                                    disabled={selectedTab === 0 && index === 0} // Disable when selectedTab is 0 and index is 0
                                >

                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select
                            value={selectedTab}
                            variant="standard"
                            sx={{ ...themeStyle.select, marginLeft: "1rem" }}


                        >

                            {FinancialdropItems.map((item, index) => (
                                <MenuItem key={index} value={item.value} onClick={() => handleMenuItemClick(item.value)}
                                    disabled={selectedTab === 0 && index === 0} // Disable when selectedTab is 0 and index is 0
                                >

                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>


                        <Box sx={themeStyle.search}>
                            <SearchBar />
                        </Box>
                    </Tabs>

                    <Box display={'flex'}>
                        <BuilderProButton backgroundColor={'#4C8AB1'} variant={'outlined'} Icon={BuilderProNavbarLogout}>{responsiveButton ? "Logout" : ""}</BuilderProButton>
                    </Box>
                </Toolbar>
            </AppBar >
        </>
    );
};

export default ClientNavbar;
