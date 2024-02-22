// components/Settings/SettingsWithSidebar.js
import React from 'react';
import {  Outlet } from 'react-router-dom';
import SideBar from '../../components/Settings/SideBar/SideBar';


function SettingsWrapper() {
  return (
    <div>
      <SideBar />
      <Outlet /> 
    </div>
  );
}

export default SettingsWrapper;
 