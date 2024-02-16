import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout3 from "./components/Layouts/Layout3";
import Profile from "./components/Settings/Profile/Profile";
import Admin from "./components/Settings/Profile/Profile";
import ProjectManager from "./components/Settings/ProjectManager/ProjectManager";
import Client from "./components/Settings/Client/Client";
import Subcontractor from "./components/Settings/Subcontractor/Subcontractor";
import SupplierList from "./components/Settings/SupplierList/SupplierList";
import MasterLineItem from "./components/Settings/MasterLineItem/MasterLineItem";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/settings" element={<Layout3 />}>
          <Route index element={<Profile/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="admin" element={<Admin/>} />
          <Route path="projectmanager" element={<ProjectManager/>} />
          <Route path="clients" element={<Client/>} />
          <Route path="subcontractor" element={<Subcontractor />} />
          <Route path="supplier" element={<SupplierList />} />
          <Route path="materline" element={<MasterLineItem/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
