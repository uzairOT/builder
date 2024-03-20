
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemText, Divider, Menu, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const NavbarDrawer = () => {
    const navigate = useNavigate()
    const [openMenu, setOpenMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTab, setSelectedTab] = useState(null);

    const handleDashboard = () => {
        navigate('/clientdashboard', { state: { heading: "Dashboard" } });
        setOpenMenu(false);
    }

    const handleToggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    const handleTabClick = (event, tabName) => {
        setAnchorEl(event.currentTarget);
        setSelectedTab(tabName);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (item, index) => {
        setAnchorEl(null);
        // Handle item click logic here
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
        // Close the drawer
        setOpenMenu(false);
    };

    const tabsWithDropdown = [
        { name: 'Project Management', items: ['Change Order', 'Daily Log'] },
        { name: 'Files', items: ['Permits', 'Drawing', 'Images'] },
        { name: 'Messages', items: ['Chats'] },
        { name: 'Financial', items: ['Invoices'] }
    ];

    return (
        <>
            <Drawer open={openMenu} onClose={handleToggleMenu}>
                <List sx={{ width: { md: '30vw', sm: "40vw", xs: "60vw" } }}>
                    <ListItemButton onClick={handleDashboard}>
                        <ListItemText sx={themeStyle.tabText} >Dashboard</ListItemText>
                    </ListItemButton>
                    <Divider variant='fullWidth'></Divider>
                    {tabsWithDropdown.map((tab, index) => (
                        <React.Fragment key={index}>
                            <ListItemButton sx={themeStyle.tabText} onClick={(event) => handleTabClick(event, tab.name)}>
                                <ListItemText sx={themeStyle.tabText}>{tab.name}</ListItemText>
                                <ArrowDropDownIcon />
                            </ListItemButton>
                            <Divider variant='fullWidth' />
                        </React.Fragment>
                    ))}
                </List>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    sx={themeStyle.tabText}
                >
                    {selectedTab && tabsWithDropdown.find(tab => tab.name === selectedTab)?.items.map((item, index) => (
                        <MenuItem
                            key={index}
                            onClick={() => handleMenuItemClick(item, index)}
                            sx={{
                                ...themeStyle.tabText,
                                ...(selectedTab === item.name && { color: '#FFAC00', })
                            }}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </Menu>
            </Drawer>
            <IconButton onClick={handleToggleMenu}>
                <MenuIcon />
            </IconButton>
        </>
    );
};

const themeStyle = {
    tabText: {
        color: "#484848",
        '& .MuiTypography-root': {
            fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
            fontSize: "1rem"
        },
        '&:hover': {
            color: "#FFAC00"
        },

    },
}

export default NavbarDrawer;
