import React, { useState } from 'react'
import {
    Grid, Paper, Box, Typography, Button, Avatar
} from "@mui/material";
import '../../../App.css';
import img from "../ProfileView/assets/house.jpg"
import placeholderImg from "../ProfileView/assets/placeholder.png"
import YellowBtn from '../../UI/button';
function Images() {
    const objectFit = { objectFit: "none" }

    const permitsData = [
        { type: 'Recent', count: '4' },
        { type: 'Last Week', count: '16' }
    ];
    return (
        <div>
            <Box sx={themeStyle.titleBox}>
                <Typography sx={themeStyle.titleTypo}>Images</Typography>
                <Button sx={{ ...YellowBtn, ...themeStyle.buttonStyle }}>
                    Add Images
                </Button>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>

                <Box sx={themeStyle.permitBox}>
                    <Box sx={{ width: "15%" }} >
                        <Typography sx={{ ...themeStyle.titleTypo, ...themeStyle.permitType }}>
                            Recent
                        </Typography>
                        <Typography sx={{ ...themeStyle.titleTypo, ...themeStyle.permitNumber }}>
                            4 Permits
                        </Typography>
                    </Box>
                    <Avatar
                        alt="Avatar"
                        src={img}
                        sx={themeStyle.AvatarBox} // Adjust size as needed
                    />
                    <Avatar
                        alt="AB"
                        src={""}
                        sx={{ ...themeStyle.AvatarBox }} // Adjust size as needed
                    />
                    <Avatar
                        alt="AB"
                        src={""}
                        sx={themeStyle.AvatarBox} // Adjust size as needed
                    />
                    <Avatar
                        alt="AB"
                        src={""}
                        sx={themeStyle.AvatarBox} // Adjust size as needed
                    />

                </Box>
                <Box sx={themeStyle.permitBox}>
                    <Box sx={{ width: "15%" }} >
                        <Typography sx={{ ...themeStyle.titleTypo, ...themeStyle.permitType }}>
                            Last Week
                        </Typography>
                        <Typography sx={{ ...themeStyle.titleTypo, ...themeStyle.permitNumber }}>
                            16 Permits
                        </Typography>
                    </Box>
                    <Avatar
                        alt="Avatar"
                        src={img || placeholderImg}
                        sx={themeStyle.AvatarBox} // Adjust size as needed
                    />
                    <Avatar
                        alt="Avatar"
                        src={img || placeholderImg}
                        sx={themeStyle.AvatarBox} // Adjust size as needed
                    />
                    <Avatar
                        alt="Avatar"
                        src={img || placeholderImg}
                        sx={themeStyle.AvatarBox} // Adjust size as needed
                    />
                    <Avatar
                        alt="Avatar"
                        src={img || placeholderImg}
                        sx={themeStyle.AvatarBox} // Adjust size as needed
                    />

                </Box>
            </Box>



        </div>
    )
}
const themeStyle = {
    titleBox: {
        display: "flex",
        width: "57vw",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#FFF6E4"
    },
    titleTypo: {
        color: "#484848",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        fontSize: "1.3rem",
        margin: "1rem 2rem"
    },
    buttonStyle: {
        padding: "0.7rem 0.1rem",
        fontSize: "0.9rem",
        marginRight: "1rem"
    },
    permitBox: {
        borderRadius: "0.5rem",
        background: "#EFF5FF",
        width: "90%",
        display: "flex",
        flexDirection: "row",
        marginTop: "2rem"
    },
    permitType: {
        color: "#4C8AB1",
        whiteSpace: "nowrap"

    },
    permitNumber: {
        fontSize: "1rem",
        marginTop: "-1rem",
        fontWeight: 275,
        color: "#202227"
    },
    AvatarBox: {
        border: "1px solid #9B9696",
        borderRadius: "0.4rem",
        background: "none",
        width: "9vw",
        height: "20vh",
        margin: "2rem 0.5rem",
        ObjectFit: "cover",

    }
}
export default Images
