
import { Typography, useTheme, Button, Box } from '@mui/material';
import LinearProgress from '@mui/joy/LinearProgress';

import React from 'react';
import '../../../App.css';



function ProjectCard() {
    const theme = useTheme();

    // Define your data
    const data = [
        { title: 'Collected' },
        { title: 'Approved Price' },
        { title: 'Remaining Balance' },
        { title: 'Cost to Complete' },
        { title: 'Projected Profit' },
        { title: 'Projected Margin' },
    ];
    const data1 = [
        { title1: 'Client:', description1: 'Jackson', title2: 'Job Running Total :', description2: '$ 765.88' },
        { title1: 'Admin Name:', description1: 'XYZ', title2: 'Location :', description2: 'St 34 Omaha' }
    ];

    return (
        <div>
            <Typography sx={themeStyle.heading}>
                Project
            </Typography>


            {data1.map((item, index) => (
                <Box key={index} sx={themeStyle.box}>
                    <Typography sx={themeStyle.descriptionText}>
                        {`${item.title1} ${item.description1}`}
                    </Typography>
                    <Typography sx={themeStyle.descriptionText}>
                        {`${item.title2} ${item.description2}`}
                    </Typography>
                </Box>
            ))}

            <Box sx={{ ...themeStyle.box, marginTop: "1.5rem", }}>
                <Typography sx={themeStyle.listItem}>Start</Typography>
                <Typography sx={{ ...themeStyle.listItem, marginRight: "3rem" }}>End</Typography>
            </Box>
            <Box sx={{ ...themeStyle.box, marginBottom: "1.3rem" }}>
                <LinearProgress
                    determinate
                    variant="outlined"
                    size="sm"
                    thickness={24}
                    value={60}
                    sx={{
                        '--LinearProgress-radius': '20px',
                        '--LinearProgress-thickness': '15px',
                    }}
                >

                </LinearProgress>
                <Typography sx={{ ...themeStyle.listItem, }}> 2/6</Typography>
            </Box>


            {data.map((item, index) => (
                <Box key={index} sx={themeStyle.box}>
                    <Typography sx={themeStyle.listItem}>
                        {item.title}
                    </Typography>
                    <Typography sx={themeStyle.costText}>
                        $7524,45
                    </Typography>
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
    descriptionText: {
        color: "#202227",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        padding: "0rem 1rem",
    },
    box: {
        display: "flex",
        marginTop: "0.3rem",
        justifyContent: "space-between",
    },
    evenBox: {
        display: "flex",
        justifyContent: "space-evenly",
    },
    listItem: {
        color: "#2F2F2F",
        fontSize: "0.7rem",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        opacity: "70%",
        paddingLeft: "1rem",
        fontWeight: 300

    },
    costText: {
        color: "#4C8AB1",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        fontSize: '0.7rem',
        marginRight: "1rem",
        fontWeight: 600


    }
};

export default ProjectCard