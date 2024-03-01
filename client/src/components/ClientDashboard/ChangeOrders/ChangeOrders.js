import React, { useState } from 'react'
import {
    Grid, Paper, Box, Typography, Button

} from "@mui/material";

import { TabPanel, Tab, TabList, Tabs } from '@mui/joy';
import "./ChangeOrders.css"
import '../../../App.css';
import YellowBtn from '../../UI/button';
import ChangeOrdersTable from './ChangeOrdersTable';
import ChangeOrderRequest from '../../dialogues/ChangeOrderRequest/ChangeOrderRequest';

function ChangeOrders() {
    const [showChangeOrder, setShowChangeOrder] = useState(false);

    const handleChangeOrder = () => {
        setShowChangeOrder(true);
    };

    const handleOpen = () => {
        setShowChangeOrder(true);
    };

    const handleClose = () => {
        setShowChangeOrder(false);
    };

    return (
        <div style={{ width: "100%", height: "100vh", marginBottom: "1rem" }}>
            <Box sx={themeStyle.titleBox}>
                <Typography sx={themeStyle.titleTypo}>Change orders</Typography>
            </Box>


            <Tabs aria-label="Basic tabs" defaultValue={0}>
                <TabList sx={{
                    ...themeStyle.titleTypo,
                    ...themeStyle.selectTypo,
                }}>
                    <Tab sx={{

                    }} >Pending</Tab>
                    <Tab>Approved</Tab>
                    <Tab>Decline</Tab>
                </TabList>
                <TabPanel value={0}>
                    <ChangeOrdersTable status={"Pending"} background={"#FFC8C8"} color={"#F03434"} />
                </TabPanel>
                <TabPanel value={1}>
                    <ChangeOrdersTable status={"Approved"} background={"#6BFFAF"} color={"#00AC4F"} />
                </TabPanel>
                <TabPanel value={2}>
                    <ChangeOrdersTable status={"Decline"} background={"#ede47e"} color={"#917e01"} />
                </TabPanel>
            </Tabs>
            <Box sx={themeStyle.buttonBox}>
                <Button sx={{ ...YellowBtn, ...themeStyle.requestButton }}
                    onClick={handleChangeOrder}>
                    Change Order Request
                </Button>
            </Box>

            {showChangeOrder && (
                <ChangeOrderRequest
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    heading={"Change Order"}
                />
            )}
        </div>
    )
}

const themeStyle = {
    titleBox: {
        display: "flex",
        width: "100%",
        justifyContent: { lg: "flex-start", xs: "center" },
        alignItems: { lg: "flex-start", xs: "center" },
        background: "#FFF6E4"
    },
    titleTypo: {
        color: "#484848",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        fontSize: "1.3rem",
        margin: "1rem 2rem"
    },
    selectTypo: {
        fontSize: "1.1rem",
        cursor: 'pointer',
        marginTop: "2rem",

    },
    requestButton: {
        background: "#4C8AB1",
        display: "flex",
        justifyContent: { lg: "flex-end", sm: "flex-end", xs: "center" },
        textAlign: "flex-end"
    },
    buttonBox: {
        display: "flex", justifyContent: "flex-end", padding: "0 2rem", marginTop: "13rem"
    }
}

export default ChangeOrders
