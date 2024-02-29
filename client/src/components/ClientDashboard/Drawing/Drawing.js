import React, { useState } from 'react'
import {
    Grid, Paper, Box, Typography, Button, Avatar
} from "@mui/material";
import '../../../App.css';
import img from "../ProfileView/assets/house.jpg"
import placeholderImg from "../ProfileView/assets/placeholder.png"
import YellowBtn from '../../UI/button';
import AddImage from '../../dialogues/AddImage/AddImage';
function Drawing() {
    const objectFit = { objectFit: "none" }

    const permitsData = [
        { type: 'Recent', count: '4' },
        { type: 'Last Week', count: '16' }
    ];
    const [showAddImage, setShowAddImage] = useState(false);

    const handleAddDrawing = () => {
        setShowAddImage(true);
    };

    const handleOpen = () => {
        setShowAddImage(true);
    };

    const handleClose = () => {
        setShowAddImage(false);
    };
    return (
        <div style={{ width: "100%", marginBottom: "1rem" }}>
            <Box sx={themeStyle.titleBox}>
                <Typography sx={themeStyle.titleTypo}>Drawing</Typography>
                <Button sx={{ ...YellowBtn, ...themeStyle.buttonStyle }}
                    onClick={handleAddDrawing}>
                    Add Drawing
                </Button>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>

                <Box sx={themeStyle.permitBox}>
                    <Box sx={{ width: { lg: "15%", xs: "100%" } }} >
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
                    <Box sx={{ width: { lg: "15%", xs: "100%" } }} >
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

            {showAddImage && (
                <AddImage
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    heading={"Drawing Files"}
                />
            )}

        </div>
    )
}
const themeStyle = {
    titleBox: {
        display: "flex",
        width: "100%",
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
        width: "5rem",
        fontSize: "0.9rem",
        marginRight: "1rem"
    },
    permitBox: {
        borderRadius: "0.5rem",
        background: "#EFF5FF",
        width: "90%",
        display: "flex",
        flexDirection: { lg: "row", md: "column", xs: "column" },
        justifyContent: "center",
        alignItems: { lg: "flex-start", xs: "center" },
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
        width: { lg: "8vw", md: "30vw", sm: "40%", xs: "50vw" },
        height: "20vh",
        margin: "4rem 0.5rem 1rem 0.5rem",
        ObjectFit: "cover",

    }
}
export default Drawing
