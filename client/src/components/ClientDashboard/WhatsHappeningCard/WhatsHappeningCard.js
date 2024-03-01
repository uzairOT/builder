import { Typography, useTheme, Button, Box } from '@mui/material';
import React from 'react';
import '../../../App.css';

function WhatsHappeningCard() {
    const theme = useTheme();

    // Define your data
    const data = [
        { title: 'Recent Daily Logs' },
        { title: 'Incomplete To-Do’s' },
        { title: 'Pending Change Orders' },
        { title: 'Upcoming Selections' },
        { title: 'Unread Messages' },
        { title: 'Incomplete Surveys' },
        { title: 'Incomplete Invoices' }
    ];

    return (
        <div>
            <Typography sx={themeStyle.heading}>
                What’s Happening
            </Typography>


            {/* Map over the data to generate boxes and buttons */}
            {data.map((item, index) => (
                <Box key={index} sx={themeStyle.box}>
                    <Typography sx={themeStyle.listItem}>
                        {item.title}
                    </Typography>
                    <Button sx={themeStyle.circleButton}>
                        1
                    </Button>
                </Box>
            ))}
        </div>
    );
}

const themeStyle = {
    heading: {
        color: "#4C8AB1",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        fontSize: "1.3rem",
        marginBottom: "1rem",
    },
    box: {
        display: "flex",
        marginTop: "0.3rem",
        justifyContent: "space-between",
    },
    listItem: {
        color: "#000000",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        opacity: "70%",
        paddingLeft: "2rem",
        fontWeight: 200
    },
    circleButton: {
        borderRadius: '50%', // Make the button circular
        minWidth: "7%",
        backgroundColor: '#FFAC00', // Yellow color
        color: 'white', // White content color
        fontSize: '12px', // Adjust the font size
        fontWeight: 100, // Adjust the font weight if needed
        marginRight: "2rem",
        transition: 'background-color 0.3s', // Add transition for smooth effect
        '&:hover': {
            backgroundColor: '#FFD740', // Yellow color with shade
        }

    }
};

export default WhatsHappeningCard;
