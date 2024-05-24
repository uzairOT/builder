import React from 'react';

function NotFound() {
  const styles = {
    notFound: {
      textAlign: 'center',
      margin: '50px auto',
      maxWidth: '600px',
    },
    notFoundH1: {
      fontSize: '2em',
      marginBottom: '20px',
    },
    notFoundP: {
      fontSize: '1.2em',
      lineHeight: '1.5',
      marginBottom: '20px',
    },
    notFoundImg: {
      display: 'block',
      margin: '0 auto',
      width: '300px',
    },
    notFoundA: {
      display: 'inline-block',
      padding: '10px 20px',
      backgroundColor: '#333',
      color: '#fff',
      textDecoration: 'none',
      fontWeight: 'bold',
      marginTop: '20px',
    },
  };

  return (
    <div className="not-found" style={styles.notFound}>
      <h1>Whoops! Page not Found!</h1>
      <p style={styles.notFoundP}>
        The page you requested could not be found.  
      </p>
      {/* <img src={require('./error.gif')} alt="Error: Page not found" style={styles.notFoundImg} /> */}
      <a href="/" style={styles.notFoundA}>Take me back to (Home Page)</a>
    </div>
  );
}

export default NotFound;
