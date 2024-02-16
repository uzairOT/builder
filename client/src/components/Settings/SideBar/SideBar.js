import React from 'react';
import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <div>
      <h2>SideBar</h2>
      <ul>
        <li><Link to="/settings/profile">Profile</Link></li>
        <li><Link to="/settings/admin">Admin</Link></li>
        <li><Link to="/settings/projectmanager">Project Manager</Link></li>
        <li><Link to="/settings/clients">Clients</Link></li>
        <li><Link to="/settings/subcontractor">Subcontractor</Link></li>
        <li><Link to="/settings/supplier">Supplier</Link></li>
        <li><Link to="/settings/materline">Materline</Link></li>
      </ul>
    </div>
  );
}

export default SideBar;
