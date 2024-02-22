import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, List, ListItemText, ListItem } from '@mui/material';
import "../../../App.css";

function SideBar() {
    const [selectedItem, setSelectedItem] = useState(0);

    const handleItemClick = (index) => {
        setSelectedItem(index);
    };

    return (
        <Box padding={"2rem"}>
            <Typography sx={listHeading}>My Profile</Typography>
            <List sx={list} >
                <ListItem
                    to="/settings/profile"
                    onClick={() => handleItemClick(0)}
                    selected={selectedItem === 0}
                >
                    Profile
                </ListItem>
                <ListItem

                    to="/settings/admin"
                    onClick={() => handleItemClick(1)}
                    selected={selectedItem === 1}
                >
                    Admin
                </ListItem>
                <ListItem

                    to="/settings/projectmanager"
                    onClick={() => handleItemClick(2)}
                    selected={selectedItem === 2}
                >
                    Project Manager
                </ListItem>
                <ListItem

                    to="/settings/clients"
                    onClick={() => handleItemClick(3)}
                    selected={selectedItem === 3}
                >
                    Clients
                </ListItem>
                <ListItem

                    to="/settings/subcontractor"
                    onClick={() => handleItemClick(4)}
                    selected={selectedItem === 4}
                >
                    Subcontractor
                </ListItem>
                <ListItem

                    to="/settings/supplier"
                    onClick={() => handleItemClick(5)}
                    selected={selectedItem === 5}
                >
                    Supplier List
                </ListItem>
                <ListItem

                    to="/settings/materline"
                    onClick={() => handleItemClick(6)}
                    selected={selectedItem === 6}
                >
                    Master Line List
                </ListItem>
            </List>
        </Box>
    );
}

const listHeading = {
    fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
    fontSize: '1.5rem',
    color: "#000"
};

const list = {
    ...listHeading,
    fontSize: "1rem",
    marginTop: "2rem",
    "& > li": {
        marginBottom: "1rem", // Setting margin bottom to create a gap between list items
        cursor: "pointer", // Change cursor to pointer on hover
        "&:hover": {
            backgroundColor: "#E9F6FF",
        },
        '&.Mui-selected': {
            backgroundColor: '#E9F6FF',
            borderRadius: "0 0.375rem 0.375rem 0",
            borderLeft: "6px solid #1F9EF3",
            color: "#4C8AB1"

        },
    }
};

export default SideBar;
