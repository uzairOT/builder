

import { Divider, Drawer, IconButton, List, ListItemButton, ListItemText, MenuItem, Menu } from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const NavbarDrawer = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTab, setSelectedTab] = useState(null);

    const handleToggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    const handleTabClick = (event, tab) => {
        setAnchorEl(event.currentTarget);
        setSelectedTab(tab);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedTab(null);
    };

    const handleMenuItemClick = (item) => {
        console.log(item); // You can implement functionality for handling menu item click here
        handleMenuClose();
    };

    // Define tabs and their corresponding dropdown items
    const tabsWithDropdown = [
        { name: 'Project Management', items: ['Item 1', 'Item 2', 'Item 3'] },
        { name: 'Files', items: ['Item A', 'Item B', 'Item C'] },
        { name: 'Messages', items: ['Item X', 'Item Y', 'Item Z'] },
        { name: 'Financial', items: ['Item P', 'Item Q', 'Item R'] }
    ];

    return (
        <>
            <Drawer open={openMenu} onClose={handleToggleMenu}>
                <List sx={{ width: '40vw' }}>
                    <ListItemButton>
                        <ListItemText>Dashboard</ListItemText>
                    </ListItemButton>
                    <Divider variant='fullWidth'></Divider>
                    {tabsWithDropdown.map((tab, index) => (
                        <React.Fragment key={index}>
                            <ListItemButton onClick={(event) => handleTabClick(event, tab.name)}>

                                <ListItemText>{tab.name}</ListItemText>
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
                >
                    {selectedTab && tabsWithDropdown.find(tab => tab.name === selectedTab)?.items.map((item, index) => (
                        <MenuItem key={index} onClick={() => handleMenuItemClick(item)}>
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

export default NavbarDrawer;
