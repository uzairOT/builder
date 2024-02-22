import { Typography, useTheme, Box, Avatar } from '@mui/material'
import Avatarimg from "./assets/imgAvatar.png";
import "../../../App.css"
import React from 'react'

function ProfileView({ heading }) {
    const theme = useTheme();

    const data = [
        { title: 'Contract Price:' },
        { title: 'Change Order:' },
        { title: 'Selections Made:' },
        { title: 'Running Jobs:' },
        { title: 'Less Payments:' },
        { title: 'Received:' },
    ];
    return (
        <div>
            <Typography sx={themeStyle.heading}>
                {heading}
            </Typography>
            <Box sx={themeStyle.box}>
                <Typography sx={themeStyle.timeHeading}>
                    09:03
                </Typography>
                <Typography sx={themeStyle.dateText}>
                    Thursday, 31 Aug
                </Typography>

                <Avatar
                    alt="Avatar"
                    src={Avatarimg}
                    sx={themeStyle.avatarStyle} // Adjust size as needed
                />
                <Typography sx={themeStyle.avatarCaption}>
                    Hi Client!
                </Typography>
                <Typography sx={themeStyle.projectName}>
                    2020-2023 New Build
                </Typography>
                <Typography sx={themeStyle.projectDetails}>
                    4500 NW 23
                </Typography>
                <Typography sx={themeStyle.projectDetails}>
                    Chesapeake VA 23323
                </Typography>
                <Typography sx={themeStyle.jobPrice}>
                    Job Price
                </Typography>
            </Box>
            {data.map((item, index) => (
                <Box key={index} sx={themeStyle.evenBox}>
                    <Typography sx={themeStyle.listItem}>
                        {item.title}
                    </Typography>
                    <Typography sx={themeStyle.costText}>
                        $7524,45.00
                    </Typography>
                </Box>
            ))}
        </div>
    )
}



const themeStyle = {
    heading: {
        color: "#000000",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        fontSize: "1.5rem",
        padding: "1rem 1rem 0rem 1rem",
    },

    timeHeading: {
        fontSize: "4.4rem",
        color: "#FFAC00",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',

    },
    dateText: {
        fontSize: "1.1rem",
        color: "#4C8AB1",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        marginTop: "-1rem",

    },
    descriptionText: {
        color: "#202227",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        padding: "0rem 1rem",
    },
    avatarStyle: {
        width: 150, height: 150, marginTop: "2rem"
    },
    avatarCaption: {
        color: "#202227",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        marginTop: "0.5rem",
        fontWeight: 400
    },
    projectName: {
        color: "#202227",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        fontWeight: "bold",
        marginTop: "1rem",
    },
    projectDetails: {
        color: "#202227",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        fontWeight: 100
    },
    jobPrice: {
        color: "#4C8AB1",
        fontWeight: 600,
        fontFamily: "Inter",
        marginTop: "2rem",
        marginBottom: "2rem"
    },
    box: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

    },
    evenBox: {
        display: "flex",
        justifyContent: "space-between",

    },
    listItem: {
        color: "#202227",
        fontSize: "0.9rem",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        paddingLeft: "1rem",
        fontWeight: 400

    },
    costText: {
        color: "#4C8AB1",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        fontSize: '0.9rem',
        marginRight: "1rem",
        fontWeight: 400


    }
};
export default ProfileView
