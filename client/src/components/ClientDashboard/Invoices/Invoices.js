
import React, { useState } from 'react'
import {
    Grid, Paper, Box, Typography, Button
    , Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer, Modal
} from "@mui/material";

import '../../../App.css';
import YellowBtn from '../../UI/button';
import PaymentModal from '../../dialogues/PaymentModal/PaymentModal/PaymentModal';
function Invoices() {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    function createData(id, title, status, invoicesAmount, AmountPaid, Balance, DeadLine, DatePaid) {
        return { id, title, status, invoicesAmount, AmountPaid, Balance, DeadLine, DatePaid };
    }
    const rows = [
        createData('01-0001 ', 6.0, 24, 4.0, 23, 321, 21, "22-24"),
        createData('01-0002', 9.0, 37, 4.3, 21, 214, 321, "23-24"),
        createData('01-0003', 9.0, 37, 4.3, 123, 421, 321, "21-24"),
    ];
    const invoiceData = [
        { title: 'Invoice Amount Total', amount: '$652,972.99' },
        { title: 'Amount Total Paid', amount: '$412,972.99' },
        { title: 'Remaining Balance', amount: '$21,972.99' }
    ];

    const handleMakePaymentClick = () => {
        setShowPaymentModal(true);
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div style={{ width: "100%", height: "100vh", marginBottom: "1rem" }}>
            <Modal
                sx={{
                    display: "flex",
                    alignItems: "center",
                    left: { lg: "30%", md: "20%", sm: "15%", xs: "10%", },
                    width: { lg: "35%", md: "60%", sm: "70%", xs: "80%" },
                }}
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <PaymentModal />
            </Modal>
            <Box sx={themeStyle.titleBox}>
                <Typography sx={themeStyle.titleTypo}>Invoices</Typography>
                <Button sx={{ ...YellowBtn, ...themeStyle.buttonStyle }} onClick={handleOpen}>
                    Make Payment
                </Button>

            </Box>
            <Box sx={{ ...themeStyle.titleBox, ...themeStyle.evenBox }}>
                {invoiceData.map((item, index) => (
                    <Box key={index} sx={themeStyle.amountBox}>
                        <Typography sx={themeStyle.titleTypo}>
                            {item.title}
                        </Typography>
                        <Typography sx={{ ...themeStyle.titleTypo, ...themeStyle.amountSize }}>
                            {item.amount}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box sx={{ margin: "2rem 1rem", overflowX: "auto" }}>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ ...themeStyle.tableHeadings, paddingLeft: "1.5rem" }}>ID#</TableCell>
                            <TableCell sx={themeStyle.tableHeadings}>Title</TableCell>
                            <TableCell sx={{ ...themeStyle.tableHeadings, paddingLeft: "1.5rem" }}>Status</TableCell>
                            <TableCell sx={themeStyle.tableHeadings}>Invoices Amount</TableCell>
                            <TableCell sx={themeStyle.tableHeadings}>Amount Paid</TableCell>
                            <TableCell sx={themeStyle.tableHeadings}>Balance</TableCell>
                            <TableCell sx={themeStyle.tableHeadings}>Deadline</TableCell>
                            <TableCell sx={themeStyle.tableHeadings}>Date Paid</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <React.Fragment key={row.name}>
                                <TableRow>
                                    <TableCell sx={themeStyle.tableRowText}>{row.id}</TableCell>
                                    <TableCell sx={themeStyle.tableRowText} component="th" scope="row">{row.title}</TableCell>
                                    <TableCell>
                                        <Button sx={{ ...themeStyle.buttonStatus, background: "#6BFFAF", color: "#00AC4F" }}>
                                            Paid
                                        </Button>
                                    </TableCell>
                                    <TableCell sx={themeStyle.tableRowText}>{row.invoicesAmount}</TableCell>
                                    <TableCell sx={themeStyle.tableRowText}>{row.AmountPaid}</TableCell>
                                    <TableCell sx={themeStyle.tableRowText}>{row.Balance}</TableCell>
                                    <TableCell sx={themeStyle.tableRowText}>{row.DeadLine}</TableCell>
                                    <TableCell sx={themeStyle.tableRowText}>{row.DatePaid}</TableCell>
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
    evenBox: {
        justifyContent: "space-around",
        display: "flex",
        flexDirection: { lg: "row", xs: "column" },
        background: "none"
    },
    amountBox: {
        borderRadius: "0.5rem",
        background: "#EFF5FF",
        width: { lg: "30%", xs: "80%" },
        display: "flex",
        flexDirection: "column",
        marginTop: "1rem"
    },
    amountSize: {
        fontSize: { lg: "1.9rem", xs: "1.5rem" },
        marginTop: "0.5rem",
    },
    tableHeadings: {
        fontFamily: "Poppins, sans-serif",
        whiteSpace: "nowrap",
        fontWeight: 500,
        fontSize: "0.9rem",
        color: "#8C8C8C",
        paddingLeft: "0rem"
    },
    buttonStatus: {
        borderRadius: '10px',
        padding: '0.2rem 1.5rem',
        background: "#FFC8C8",
        color: "#F03434",
        textTransform: "none",
    },
    tableRowText: {
        fontSize: "0.9rem", borderBottom: "none",
        color: "#000000",
    }

}

export default Invoices
