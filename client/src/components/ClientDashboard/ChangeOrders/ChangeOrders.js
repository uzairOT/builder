import React, { useState } from 'react'
import {
    Grid, Paper, Box, Typography, Button

} from "@mui/material";

import { TabPanel, Tab, TabList, Tabs } from '@mui/joy';
import "./ChangeOrders.css"
import '../../../App.css';
import YellowBtn from '../../UI/button';
import ChangeOrdersTable from './ChangeOrdersTable';

function ChangeOrders() {

    return (
        <div>
            <Box sx={themeStyle.titleBox}>
                <Typography sx={themeStyle.titleTypo}>Change orders</Typography>
            </Box>


            <Tabs aria-label="Basic tabs" defaultValue={0}>
                <TabList sx={{
                    ...themeStyle.titleTypo,
                    ...themeStyle.selectTypo,
                }}>
                    <Tab >Pending</Tab>
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
            <Box sx={{ display: "flex", justifyContent: "flex-end", }}>
                <Button sx={{ ...YellowBtn, ...themeStyle.requestButton }}>
                    Change Order Request
                </Button>
            </Box>
        </div>
    )
}

const themeStyle = {
    titleBox: {
        display: "flex",
        width: "57vw",
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
        justifyContent: "flex-end",
        textAlign: "flex-end"
    }
}

export default ChangeOrders
