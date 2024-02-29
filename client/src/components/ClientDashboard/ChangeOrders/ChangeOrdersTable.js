import React from 'react'
import { TabPanel, Tab, TabList, Tabs } from '@mui/joy';
import {
    Grid, Paper, Box, Typography, Button
    , Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer
} from "@mui/material";


function ChangeOrdersTable({ status, background, color }) {

    function createData(name, calories, fat, carbs, protein, calorie, fa, carb, protei) {
        return { name, calories, fat, carbs, protein, calorie, fa, carb, protei };
    }
    const rows = [
        createData('Demolition', 6.0, 24, 4.0, 'client',),
        createData('Rebuild', 9.0, 37, 4.3, 'Admin',),
        createData('New Build', 9.0, 37, 4.3, 'Team'),
    ];
    return (
        <div>
            <Box sx={{ marginTop: "2rem", overflowX: "auto" }}>
                <Table>
                    <TableHead sx={{
                        borderRadius: "1rem",
                        background: "#F4F4F4"
                    }}>
                        <TableRow>


                            <TableCell
                                sx={{ ...themeStyle.tableHeadings, paddingLeft: "1rem" }}
                            >
                                Line Item
                            </TableCell>

                            <TableCell sx={{ ...themeStyle.tableHeadings, paddingLeft: "2rem" }}>Status</TableCell>
                            <TableCell sx={themeStyle.tableHeadings}>Total</TableCell>
                            <TableCell sx={themeStyle.tableHeadings}>Start</TableCell>
                            <TableCell sx={themeStyle.tableHeadings}>End</TableCell>
                            <TableCell sx={themeStyle.tableHeadings}>Member</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>
                        {rows.map((row, index) => (
                            <React.Fragment key={row.name}>
                                <TableRow>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>
                                        <Button sx={{ ...themeStyle.buttonStyle, background: background, color: color }}>
                                            {status}
                                        </Button>
                                    </TableCell>
                                    <TableCell component="th" scope="row">{row.calories}</TableCell>
                                    <TableCell>{row.fat}</TableCell>
                                    <TableCell>{row.carbs}</TableCell>
                                    <TableCell>{row.protein}</TableCell>
                                    <TableCell>{row.calorie}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={7}>
                                        <hr style={themeStyle.hrLine} />
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </Box>

        </div>
    )
}

const themeStyle = {

    tableHeadings: {
        width: "21%",
        fontFamily: "Poppins, sans-serif",
        whiteSpace: "nowrap",
        fontWeight: 500,
        fontSize: "0.9rem",
        color: "#8C8C8C",
        paddingLeft: "0rem"
    },
    buttonStyle: {
        borderRadius: '28px',
        padding: '0.2rem 1.5rem',
        background: "#FFC8C8",
        color: "#F03434",
        textTransform: "none",
    },
    hrLine: {
        width: "100%",
        border: 0,
        height: "1.3px",
        backgroundColor: "#DCDCDC",
        opacity: "50%",
    },

}

export default ChangeOrdersTable
