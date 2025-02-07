import React from 'react';
import actionButton from '../../components/UI/actionButton';
import { Button } from '@mui/material';

// A simple helper to parse query parameters from the URL
const useQuery = () => {
  return new URLSearchParams(window.location.search);
};

const ErrorPage = () => {
  const query = useQuery();
  const errorMessage =
    query.get('error') ||
    'An unexpected error occurred. Please try again later.';

  const handleGoHome = () => {
    // Redirect user back to your home page or login page
    window.location.href = 'https://builderbuilder.net/dashboard';
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Something Went Wrong</h1>
        <p style={styles.message}>{errorMessage}</p>
        <Button style={actionButton} onClick={handleGoHome}>
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f2f2f2',
    padding: '0 20px',
  },
  card: {
    maxWidth: '500px',
    width: '100%',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    margin: '0 0 1rem',
    color: '#e74c3c',
    fontSize: '2rem',
  },
  message: {
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '2rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default ErrorPage;
