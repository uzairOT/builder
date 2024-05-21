import React, { useState } from 'react';
import { Box, Typography, List, ListItemText, ListItem } from '@mui/material';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import "../../../App.css";
function SideBar() {
    const location = useLocation();
   



    const paths = [
        '/settings/materline',
        '/settings/units',
        '/settings/profile',
        '/settings/admin',
        '/settings/projectManager',
        '/settings/client',
        '/settings/employee',
        '/settings/subcontractor',
        '/settings/supplier',
      ];

      const selectedItem = paths.findIndex(path => path === location.pathname);

    return (
        <Box padding={"2rem"}>
            <Typography sx={listHeading}>My Profile</Typography>
            <List sx={{ ...listHeading, fontSize: "1rem", marginTop: "2rem" }}>
            <ListItem
                component={Link}
                    to="/settings/materline"
                    
                    selected={selectedItem === 7}
                    sx={listItemStyle}
                >
                    Master Line List
                </ListItem>
                <ListItem
                component={Link}
                    to="/settings/units"
                    
                    selected={selectedItem === 8}
                    sx={listItemStyle}
                >
                    Units
                </ListItem>
                <ListItem
                    component={Link}
                    to="/settings/profile"
                  
                    selected={selectedItem === 0}
                    sx={listItemStyle}
                >
                    Profile
                </ListItem>
                <ListItem
                    component={Link}
                    to="/settings/admin"
                    
                    selected={selectedItem === 1}
                    sx={listItemStyle}
                >
                    Admin
                </ListItem>
                <ListItem
                component={Link}
                    to="/settings/projectManager"
                    
                    selected={selectedItem === 2}
                    sx={listItemStyle}
                >
                    Project Manager
                </ListItem>
                <ListItem
                component={Link}
                    to="/settings/client"
                    
                    selected={selectedItem === 3}
                    sx={listItemStyle}
                >
                    Clients
                </ListItem>
                <ListItem
                component={Link}
                    to="/settings/employee"
                  
                    selected={selectedItem === 4}
                    sx={listItemStyle}
                >
                    Employee
                </ListItem>
                <ListItem
                component={Link}
                    to="/settings/subcontractor"
                  
                    selected={selectedItem === 5}
                    sx={listItemStyle}
                >
                    Subcontractor
                </ListItem>
                <ListItem
                component={Link}
                    to="/settings/supplier"
                    
                    selected={selectedItem === 6}
                    sx={listItemStyle}
                >
                    Supplier List
                </ListItem>

            </List>
        </Box>
    );
}
const listHeading = {
  fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
  fontSize: '1.5rem',
  color: "#000",
};

const listItemStyle = {
  color: "#000",
  height:"46px",
  marginBottom: "1rem", 
  cursor: "pointer", 
  marginBottom:"0px",
  
  "&:hover": {
    //   backgroundColor: "#E9F6FF",
  },
  '&.Mui-selected': {
      backgroundColor: '#E9F6FF',
      borderRadius: "0 9px 9px 0",
      borderLeft: "6px solid #1F9EF3",
      color: "#4C8AB1"
  },
};
export default SideBar;