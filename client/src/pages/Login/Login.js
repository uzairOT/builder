import React, { useState, useEffect } from 'react';
import LoginComp from '../../components/Login/Login';
import Splash from '../../components/Splash/Splash';

function Signup() {
  const [showSplash, setShowSplash] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    // Show Splash for the first 4.5 seconds
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
      setShowSignup(true);
    }, 4500);

    // Clear timers when the component is unmounted
    return () => {
      clearTimeout(splashTimer);
    };
  }, []);

  return (
    <div style={{ background: "#4C8AB1", }}>
      {showSplash && <Splash />}
      {showSignup && <LoginComp />}
    </div>
  );
}

export default Signup;


