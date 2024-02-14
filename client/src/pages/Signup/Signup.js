import React, { useState, useEffect } from 'react';
import SignupComp from '../../components/Signup/Signup';
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
    <div>
      {showSplash && <Splash />}
      {showSignup && <SignupComp />}
    </div>
  );
}

export default Signup;

