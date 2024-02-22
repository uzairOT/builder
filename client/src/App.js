import { BrowserRouter, Routes, Route, Link, createRoutesFromElements } from "react-router-dom";
// import Signup from "./pages/SignUp/Signup";
import { Outlet } from "react-router-dom";
import Layout1 from "./components/Layouts/Layout1";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout2 from "./components/Layouts/Layout2";
import ProjectsDefault from "./components/Projects/ProjectsDefault/ProjectsDefault";
import ProjectsList from "./pages/Projects/ProjectsList";
import InitialProposalView from "./components/Projects/ProjectsInitialProposal/InitialProposalView";
import ImagesView from "./components/Projects/ProjectsImages/ImagesView";
import PermitView from "./components/Projects/ProjectsPermit/PermitView";
import DrawingFilesView from "./components/Projects/ProjectsDrawingFiles/DrawingFilesView";
import WorkOrderView from "./components/Projects/ProjectsWorkOrder/WorkOrderView";
import ChatView from "./components/Projects/ProjectsChat/ChatView";
import ReportView from "./components/Projects/ProjectsReport/ReportView";
import NotesView from "./components/Projects/ProjectNotes/NotesView";
import InnerLayout2 from "./components/Layouts/InnerLayout2";
import ReportsPage from "./pages/Reports/ReportsPage";

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
import Chats from "./components/ClientDashboard/Chats/Chats";
import ClientDashboardCards from "./components/ClientDashboard/ClientDashboardCards/ClientDashboardCards";
import DailyLog from "./components/ClientDashboard/DailyLog/DailyLog";



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout1 />}>
        <Route index element={<Dashboard />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/projects/:id" element={<Layout2 />} >
          <Route path="" element={<InnerLayout2 />} >
            <Route path="default" element={<ProjectsDefault />} />
            <Route path="images" element={<ImagesView />} />
            <Route path="permit" element={<PermitView />} />
            <Route path="drawing-files" element={<DrawingFilesView />} />
          </Route>
          <Route path="initial-proposal" element={<InitialProposalView />} />
          <Route path="work-order" element={<WorkOrderView />} />
          <Route path="chat" element={<ChatView />} />
          <Route path="notes" element={<NotesView />} />
          <Route path="project-report" element={<ReportView />} />
        </Route>
        <Route path='reports' element={<ReportsPage />} />

        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/assignproject" element={<AssignProject />} />
        <Route path="/settings" element={<Settings />} />
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

      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
