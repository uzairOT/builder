import React from 'react';
import ReactDOM from 'react-dom';

const CustomTooltip = ({ visible, position, children }) => {
  if (!visible) return null;

  const style = {
    position: 'fixed',
    top: position.top,
    left: position.left,
    background: '#fff',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
    zIndex: 9999,
    pointerEvents: 'none', // So that it doesn’t interfere with mouse events
  };

  return ReactDOM.createPortal(
    <div style={style}>{children}</div>,
    document.body
  );
};

export default CustomTooltip;
