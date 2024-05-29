import React, { useState, useEffect } from "react";
import './no-internet-connection.css'
import WifiOffIcon from '@mui/icons-material/WifiOff';

const NoInternetConnection = (props) => {
  // state variable holds the state of the internet connection
  const [isOnline, setOnline] = useState(true);
    
  // On initization set the isOnline state.
  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  // event listeners to update the state
  window.addEventListener("online", () => {
    setOnline(true);
  });

  window.addEventListener("offline", () => {
    setOnline(false);
  });

  // if user is online, return the child component else return a custom component
  if (isOnline) {
    return props.children;
  } else {
    return (
      <div className="no-internet-container">
        {!isOnline && (
          <div className="no-internet-message">
            <i className="fa fa-wifi fa-inverse">
                <WifiOffIcon />
                </i> {/* Font Awesome icon */}
            <h1>No internet connection</h1>
            <p>
              You are currently offline. This application may have limited
              functionality.
            </p>
            {/* Add optional retry button or suggested actions based on your app */}
            <button
              onClick={() => {
                window.location.href = '/'
              }}
            >
              Retry
            </button>
          </div>
        )}
        {isOnline && props.children}
      </div>
    );
  }
};

export default NoInternetConnection;
