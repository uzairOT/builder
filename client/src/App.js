import { BrowserRouter, Routes, Route, Link, createRoutesFromElements } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { lazy, Suspense } from 'react';

import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import AssignProject from "./pages/AssignProject/AssignProject";
import Settings from "./pages/Settings/Settings";
import ClientDashboard from "./pages/ClientDashboard/ClientDashboard";
import Permit from "./components/ClientDashboard/Permit/Permit";
import ChangeOrders from "./components/ClientDashboard/ChangeOrders/ChangeOrders";
import Invoices from "./components/ClientDashboard/Invoices/Invoices";
import Drawing from "./components/ClientDashboard/Drawing/Drawing";
import Images from "./components/ClientDashboard/Images/Images";
import Chats from "./components/ClientDashboard/Chats/Chats";
import ClientDashboardCards from "./components/ClientDashboard/ClientDashboardCards/ClientDashboardCards";
import DailyLog from "./components/ClientDashboard/DailyLog/DailyLog";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path="/">
        <Route index element={<Signup />} />
        <Route path="/clientdashboard" element={<ClientDashboard />}>
          <Route path="/clientdashboard" element={<ClientDashboardCards />} />
          <Route path="permit" element={<Permit />} />
          <Route path="drawing" element={<Drawing />} />
          <Route path="images" element={<Images />} />
          <Route path="changeorders" element={<ChangeOrders />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="dailylog" element={<DailyLog />} />
          <Route path="chats" element={<Chats />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/assignproject" element={<AssignProject />} />
        <Route path="/settings" element={<Settings />} />


      </Route>

    )
  );

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
