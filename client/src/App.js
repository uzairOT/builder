
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import AssignProject from "./pages/AssignProject/AssignProject";
import Settings from "./pages/Settings/Settings"
import ClientDashboard from "./pages/ClientDashboard/ClientDashboard"
import Permit from "./components/ClientDashboard/Permit/Permit";
import ChangeOrders from "./components/ClientDashboard/ChangeOrders/ChangeOrders";
import Invoices from "./components/ClientDashboard/Invoices/Invoices";
import Drawing from "./components/ClientDashboard/Drawing/Drawing";
import Images from "./components/ClientDashboard/Images/Images";
import Dashboard from "./components/ClientDashboard/Dashboard/Dashboard";
import DailyLog from "./components/ClientDashboard/DailyLog/DailyLog";
import Chats from "./components/ClientDashboard/Chats/Chats";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/assignproject" element={<AssignProject />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/clientdashboard" element={<ClientDashboard />}>
            <Route path="/clientdashboard" element={<Dashboard />} />
            <Route path="permit" element={<Permit />} />
            <Route path="drawing" element={<Drawing />} />
            <Route path="images" element={<Images />} />
            <Route path="changeorders" element={<ChangeOrders />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="dailylog" element={<DailyLog />} />
            <Route path="chats" element={<Chats />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
