import { Box, Button, Typography } from '@mui/material';
import React from 'react'
import axios from 'axios';
import { getTokenFromLocalStorage } from '../../../redux/apis/apiSlice';
import { ReactComponent as QuickBooksLogo } from '../../../assets/quickbooks-logo1.svg'
import { useSelector } from 'react-redux';


const PAYMENT_URL = "https://builderbuilder.net/payment/authUri";

const OthersView = () => {
    const user = useSelector((state) => state.auth.userInfo);
    console.log(user)
    const handleConnectToQuickbooks = async () => {
        try {
            const response = await axios.post(PAYMENT_URL, {
                organizationId: user.user.organization.organizationId
            } ,{
                headers: {
                    'Authorization': `Bearer ${getTokenFromLocalStorage()}`,
                    'Content-Type': 'application/json',
                },
            });
            const { apiUri } = response.data;
            window.location.href = apiUri;
        } catch (error) {
            console.error('Error fetching authUri:', error);
        }
    }

    return (
        <>
            <Typography sx={headings} variant="h5" gutterBottom>
                Connect to QuickBooks
            </Typography>
            <Button
                onClick={handleConnectToQuickbooks}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#2CA01C', // QuickBooks primary green
                    color: '#FFFFFF',
                    textTransform: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontFamily: 'AvenirNext, sans-serif',
                    fontWeight: '500',
                    fontSize: '16px',
                    '&:hover': {
                        backgroundColor: '#248017', // Slightly darker shade for hover effect
                    },
                }}
            >
                <Box
                    component={QuickBooksLogo}
                    sx={{
                        height: '24px',
                        width: '24px',
                        marginRight: '8px',
                    }}
                />
                <Typography
                    sx={{
                        fontSize: '16px',
                        fontWeight: '500',
                    }}
                >
                    Connect to QuickBooks
                </Typography>
            </Button>
        </>
    )
}

export default OthersView

const headings = {
    marginTop: "20px",
    marginBottom: "20px",
    fontFamily: "var(--main-font-family)",
    fontWeight: "400",
    color: "#4C8AB1",
};