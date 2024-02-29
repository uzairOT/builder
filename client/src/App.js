import { BrowserRouter, Routes, Route, Link, createRoutesFromElements } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { lazy, Suspense } from 'react';

const Signup = lazy(() => import("./pages/Signup/Signup"));
const Login = lazy(() => import("./pages/Login/Login"));
const AssignProject = lazy(() => import("./pages/AssignProject/AssignProject"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const ClientDashboard = lazy(() => import("./pages/ClientDashboard/ClientDashboard"));
const Permit = lazy(() => import("./components/ClientDashboard/Permit/Permit"));
const ChangeOrders = lazy(() => import("./components/ClientDashboard/ChangeOrders/ChangeOrders"));
const Invoices = lazy(() => import("./components/ClientDashboard/Invoices/Invoices"));
const Drawing = lazy(() => import("./components/ClientDashboard/Drawing/Drawing"));
const Images = lazy(() => import("./components/ClientDashboard/Images/Images"));
const Chats = lazy(() => import("./components/ClientDashboard/Chats/Chats"));
const ClientDashboardCards = lazy(() => import("./components/ClientDashboard/ClientDashboardCards/ClientDashboardCards"));
const DailyLog = lazy(() => import("./components/ClientDashboard/DailyLog/DailyLog"));


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
