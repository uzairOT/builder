import React from 'react'
import { Typography, useTheme, Box, Avatar } from '@mui/material'
import Houseimg from "../ProfileView/assets/house.jpg";

import "../../../App.css"


function RecentImagesAndComments() {
    const theme = useTheme();
    return (
        <div style={{height:'100%'}}>

            <Box sx={themeStyle.box}>
                <Avatar
                    alt="Avatar"
                    src={Houseimg}
                    sx={themeStyle.imgBox} // Adjust size as needed
                />


            </Box>
            <Typography sx={themeStyle.typoText}>
                Recent Images
            </Typography>
            <Box sx={themeStyle.evenBox}>
                <Avatar
                    alt="Avatar"
                    src={Houseimg}
                    sx={themeStyle.smallimgBox} // Adjust size as needed
                />
                <Avatar
                    alt="Avatar"
                    src={Houseimg}
                    sx={themeStyle.smallimgBox} // Adjust size as needed
                />
            </Box>
            <Box sx={themeStyle.evenBox}>
                <Avatar
                    alt="Avatar"
                    src={Houseimg}
                    sx={themeStyle.smallimgBox} // Adjust size as needed
                />
                <Avatar
                    alt="Avatar"
                    src={Houseimg}
                    sx={themeStyle.smallimgBox} // Adjust size as needed
                />
            </Box>
            <Typography sx={{ ...themeStyle.typoText, color: "#4C8AB1" }}>
                Recent Comments
            </Typography>


            <Box sx={themeStyle.commentBox}>
                <Typography sx={themeStyle.commentText}>
                    Selection
                </Typography>
                <Typography sx={{ ...themeStyle.commentText, ...themeStyle.commentHeadingText }}>
                    Carpets for upstairs bedroom
                </Typography>
                <Box sx={themeStyle.commentInnerBox}>
                    <Typography sx={{ ...themeStyle.commentText, ...themeStyle.italicDate }}>Dec 31, 2023 , 10:28</Typography>
                    <Typography sx={{ ...themeStyle.commentText, margin: "0rem 0.5rem", }} >Color Should be brown</Typography>
                </Box>
                <Typography sx={{ ...themeStyle.commentText, ...themeStyle.conversationText }}>
                    Open Conversation
                </Typography>
            </Box>
            <Box sx={themeStyle.commentBox}>
                <Typography sx={themeStyle.commentText}>
                    Selection
                </Typography>
                <Typography sx={{ ...themeStyle.commentText, ...themeStyle.commentHeadingText }}>
                    Carpets for upstairs bedroom
                </Typography>
                <Box sx={themeStyle.commentInnerBox}>
                    <Typography sx={{ ...themeStyle.commentText, ...themeStyle.italicDate }}>Dec 31, 2023 , 10:28</Typography>
                    <Typography sx={{ ...themeStyle.commentText, margin: "0rem 0.5rem", }} >Color Should be brown</Typography>
                </Box>
                <Typography sx={{ ...themeStyle.commentText, ...themeStyle.conversationText }}>
                    Open Conversation
                </Typography>
            </Box>


        </div>
    )
}








const themeStyle = {
    box: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

    },
    imgBox: {
        marginTop: "0.5rem",
        width: '95%',
        height: '100%',
        borderRadius: '14px',
        alignItems: "center",
    },
    typoText: {
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        fontSize: '1.3rem',
        color: '#484848',
        margin: "1rem 0rem 0rem 1.5rem"
    },

    smallimgBox: {
        marginTop: "0.5rem",
        width: '45%',
        height: '100%',
        borderRadius: '14px',
    },
    evenBox: {
        display: "flex",
        justifyContent: "center",
        gap: "1rem"
    },
    commentBox: {
        display: "flex",
        margin: "0.5rem 1rem",
        flexDirection: "column",
        background: "#FFF",
        borderRadius: "14px",
        border: '1px solid #C7CDEA',
    },
    commentInnerBox: {
        background: "#D3E5FF",
        borderRadius: "10px",
        display: "flex",
        margin: "0.5rem 1rem",
        flexDirection: "column",

    },
    commentText: {
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        fontSize: "1rem",
        color: "#484848",
        margin: "0.5rem"
    },
    italicDate: {
        margin: "0.3rem 0.5rem", fontStyle: "italic"
    },
    conversationText: {
        color: "#777777", marginTop: "-0.2rem"
    },
    commentHeadingText: {
        margin: "-0.5rem 0.5rem", color: "#4C8AB1"
    }
}
export default RecentImagesAndComments
