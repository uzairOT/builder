import { Typography, useTheme, Box, Avatar } from '@mui/material'
import Avatarimg from "./assets/imgAvatar.png";
import "../../../App.css";
import DateAndTime from '../../UI/DataAndTime/DataAndTime';
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
                <DateAndTime />
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
        fontSize: { lg: "1.5rem", md: "1.5rem", xs: "1.2rem" },
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
        width: 150, height: 150, marginTop: "-1rem"
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
        alignItems: "center",
        textAlign: "center",
        whiteSpace: "nowrap",
        justifyContent: "space-between",

        padding: { lg: "0rem 1rem", xs: "0rem 0rem" },
        gap: { lg: "1rem", sm: "1rem", xs: "1rem" }
    },
    listItem: {
        color: "#202227",
        marginTop: "0.2rem",
        fontSize: { lg: '0.9rem', sm: "0.75rem", xs: "0.9rem" },
        textAlign: "center",
        display: "flex",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        paddingLeft: "1rem",
        fontWeight: 400

    },
    costText: {
        color: "#4C8AB1",
        display: "flex",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        textAlign: "center",
        fontSize: { lg: '0.9rem', sm: "0.75rem", xs: "0.9rem" },
        marginRight: "1rem",
        fontWeight: 400


    }
};
export default ProfileView
