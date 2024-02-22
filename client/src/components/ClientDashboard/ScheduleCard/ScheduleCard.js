import React, { useState } from 'react'
import { Grid, Paper, Box, Typography, Button } from "@mui/material";
import Sun from "../ProfileView/assets/Sunny.png"
import '../../../App.css';


function ScheduleCard() {
    const [selectedOption, setSelectedOption] = useState('Daily');
    const [isActive, setIsActive] = useState(false);

    const handleButtonClick = (option) => {
        setSelectedOption(option);
    };
    const handleClick = () => {
        setIsActive(!isActive);
    };
    const daysData = [
        { day: "Monday", date: "04", image: Sun, temperature: "14°" },
        { day: "Tuesday", date: "05", image: Sun, temperature: "12°" },
        { day: "Wednesday", date: "06", image: Sun, temperature: "10°" },
        { day: "Thursday", date: "07", image: Sun, temperature: "16°" },
        { day: "Friday", date: "08", image: Sun, temperature: "18°" },

    ];
    const buttonOptions = [
        { label: 'Daily', value: 'Daily' },
        { label: 'Weekly', value: 'Weekly' },
        { label: 'Monthly', value: 'Monthly' }
    ];

    return (
        <div>
            <Box sx={themeStyle.box}>
                <Typography sx={themeStyle.heading}>
                    Schedule
                </Typography>

                <Button sx={themeStyle.viewAllButton}>
                    view all
                </Button>
            </Box>
            <Box sx={themeStyle.evenBox}>
                {buttonOptions.map(option => (
                    <Button
                        key={option.value}
                        sx={{
                            ...themeStyle.buttonStyle,
                            backgroundColor: selectedOption === option.value ? '#FFC650' : '#F7F9FC',
                        }}
                        onClick={() => handleButtonClick(option.value)}
                    >
                        {option.label}
                    </Button>
                ))}
            </Box>
            <Box sx={themeStyle.whiteBox}>
                <Typography sx={themeStyle.monthName}>
                    January
                </Typography>
                <hr style={themeStyle.hrLine} />
                <Box sx={{ display: "flex", flexDirection: { lg: "row", xs: "column" } }}>


                    {daysData.map((day, index) => (
                        <Box key={index} sx={themeStyle.dayBox}>
                            <Typography sx={themeStyle.dayTypo}>
                                {day.day}
                            </Typography>
                            <Button sx={themeStyle.dayCount}>
                                {day.date}
                            </Button>
                            <div>
                                <img src={day.image} alt="Weather" />
                            </div>
                            <Typography sx={themeStyle.degreeCount}>
                                {day.temperature}
                            </Typography>
                        </Box>
                    ))}
                    <Box sx={{ ...themeStyle.dayBox, ...themeStyle.holidayBox }}>
                        <Typography sx={themeStyle.dayTypo}>
                            Saturday
                        </Typography>

                        <Button sx={themeStyle.dayCount}>
                            09
                        </Button>

                        <Typography sx={themeStyle.noWorkingDay}>
                            No Working Day
                        </Typography>
                        <div>
                            <img src={Sun} alt="Weather" />
                        </div>
                        <Typography sx={themeStyle.degreeCount}>
                            14°
                        </Typography>
                    </Box>


                </Box>
            </Box>

        </div >
    )
}

const themeStyle = {
    box: {
        display: "flex",
        marginTop: "0.3rem",
        justifyContent: "space-between",
    },
    heading: {
        color: "#4C8AB1",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        fontSize: "1.3rem",
    },
    viewAllButton: {
        color: "#FFAC00",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        fontSize: "0.9rem",
        marginRight: "1rem",
        textTransform: "none"
    },
    evenBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: "0.3rem",
    },
    buttonStyle: {
        width: '54px',
        height: '21px',
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        borderRadius: '26px',
        border: '1px solid #DBDBDB',
        backgroundColor: '#F7F9FC',
        color: "#2F2F2F",
        fontSize: "10px",
        textTransform: "none",
        '&:hover': {
            backgroundColor: '#FFC650', // Change to the hover color
        },
    },
    whiteBox: {
        borderRadius: "0.9rem",
        background: "#FFF",
        marginTop: "0.5rem",

    },
    monthName: {
        textAlign: "center",
        paddingTop: "0.3rem",
        fontSize: "1.2rem",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',

    },
    hrLine: {
        border: "1px solid #CBCBCB",
    },
    dayBox: {
        borderRight: { lg: '1px solid #CBCBCB', xs: "none" },
        borderBottom: { lg: 'none', xs: "1px solid #CBCBCB" },
        display: "flex",
        width: { lg: "20%", xs: "97%" },
        flexDirection: "column",
        justifyContent: "center",
        marginTop: { lg: "-10px", xs: "0px" },
        padding: "0.3rem 0.3rem 0.3rem 0.3rem",
        alignItems: "center",
    },
    holidayBox: {
        background: "#FFE4E4", borderRight: "none"
    },
    dayTypo: {
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        fontStyle: 'italic',
        color: "#000000"
    },
    dayCount: {
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: '14px',
        color: "#676161",
        margin: "0.5rem 0rem",
        paddingLeft: "0.5rem",
        borderRadius: "50%",
        height: "50%",
        '&:hover': {
            backgroundColor: '#FFC650',
            color: "#FFF"
        },
    },
    degreeCount: {
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        fontWeight: 500,
        fontSize: '19px',
        color: '#202227',
        marginTop: "0.5rem",
        paddingLeft: "0.5rem"
    },
    noWorkingDay: {
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        fontSize: "0.7rem",
        marginTop: "-1rem",
        zIndex: 1
    }
}


export default ScheduleCard
