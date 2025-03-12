import React, { useState } from 'react';
import axios from 'axios';
import { getTokenFromLocalStorage } from '../../redux/apis/apiSlice';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { CloudQueue } from '@mui/icons-material';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import actionButton from '../../components/UI/actionButton';

const PAYMENT_URL = "https://builderbuilder.net/payment/callback";
const ConnectQuickBooksPage = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.auth.userInfo)
    const qToken = queryParams.get("token");
    const location = window.location.href
    const organizationId = userInfo.user.organization.organizationId;
    console.log("TOKEN: ",qToken)
    // console.log(getTokenFromLocalStorage())

    const navigateToDashboard = () => {
        navigate('/dashboard');
    }

    const handleConnectQuickBooks = async () => {
        setLoading(true);
        try {
            // Call your backend to get the QuickBooks authUri
            const response = await axios.post(
                PAYMENT_URL, // URL
                { url: location, organizationId: organizationId }, // Data (request body)
                { // Config (headers, etc.)
                    headers: {
                        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            // Backend route that returns the authUri
            const message = response.data.message;
            console.log(response)
            toast.success(message);
            setIsSuccess(true);
            setLoading(false);
            
        } catch (error) {
            console.error('Error connecting to QuickBooks:', error);
            toast.error(error?.response?.data?.message)
            setLoading(false);
        }
    };

    const getButtonProps = (loading, isSuccess) => {
        const { text, icon } = renderButtonContent(loading, isSuccess);

        return {
            onClick: isSuccess ? navigateToDashboard : handleConnectQuickBooks,
            text,
            icon,
            disabled: loading,
            sx: {
                ...actionButton,
                alignSelf: 'center',
            }
        }
    }

    const buttonProps = getButtonProps(loading, isSuccess);
    const { heading, body } = renderTexts(loading, isSuccess);
    return (
        <Box sx={styles.container}>
            <Typography variant="h4" sx={styles.heading}>
                {heading}
            </Typography>
            <Typography variant="body1" sx={styles.text} gutterBottom>
                {body}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={buttonProps.onClick}
                disabled={buttonProps.disabled}
                sx={buttonProps.sx}
            >
                {buttonProps.icon}
                {buttonProps.text}
            </Button>
        </Box>
    );
};


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f6f8',
        textAlign: 'center',
        padding: 3,
        boxSizing: 'border-box',
    },
    heading: {
        color: '#2C387E',
        marginBottom: '16px',
    },
    text: {
        color: '#555',
        marginBottom: '32px',
    },
    button: {
        minWidth: '200px',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
    },
    spinner: {
        color: 'white',
        marginRight: 2,
    },
    icon: {
        fontSize: 28,
        color: 'white',
        marginRight: 2,
    },
};

export default ConnectQuickBooksPage;

const renderButtonContent = (loading, isSuccess) => {
    if (loading) {
        return { text: 'Redirecting...', icon: <CircularProgress size={24} sx={styles.spinner} /> }
    } else if (isSuccess) {
        return { text: 'Return to dashboard', icon: <KeyboardReturnRoundedIcon sx={styles.icon} />, };
    } else {
        return { text: 'Link to QuickBooks', icon: <CloudQueue sx={styles.icon} /> };
    }
}

const renderTexts = (isLoading, isSuccess) => {
    if (isLoading) {
      return {
        heading: 'Redirecting...',
        body: 'Please wait while we\'re linking to QuickBooks...',
      };
    }
  
    if (isSuccess) {
      return {
        heading: 'Successfully Linked to QuickBooks',
        body: 'You can now start managing your finances directly in QuickBooks.',
      };
    }
  
    return {
        heading: 'Link Builder to QuickBooks',
        body: 'Securely link Builder to your QuickBooks account for seamless financial tracking and management.',
      };
  };
