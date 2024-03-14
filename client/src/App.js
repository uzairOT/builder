
import { BrowserRouter, Routes, Route, Link, createRoutesFromElements } from "react-router-dom";
// import Signup from "./pages/SignUp/Signup";
import { Outlet } from 'react-router-dom';
import Layout3 from "./components/Layouts/Layout3";
import Profile from "./components/Settings/Profile/Profile";
import Admin from "./components/Settings/Admin/Admin";
import ProjectManager from "./components/Settings/ProjectManager/ProjectManager";
import Client from "./components/Settings/Client/Client";
import Subcontractor from "./components/Settings/Subcontractor/Subcontractor";
import SupplierList from "./components/Settings/SupplierList/SupplierList";
import MasterLineItem from "./components/Settings/MasterLineItem/MasterLineItem";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {lazy, Suspense} from 'react';
import { loader } from "./pages/Projects/ProjectsTable";
import PageLoader from "./components/UI/Loaders/PageLoader/PageLoader";
import InnerLayout2 from './components/Layouts/InnerLayout2'
import ProjectsDefault from './components/Projects/ProjectsDefault/ProjectsDefault'
import InitialProposalView from "./components/Projects/ProjectsInitialProposal/InitialProposalView"
import WorkOrderView from './components/Projects/ProjectsWorkOrder/WorkOrderView'
import NotesView from "./components/Projects/ProjectNotes/NotesView"
import Layout1 from "./components/Layouts/Layout1";
import ProjectsTable from "./pages/Projects/ProjectsTable";
import Layout2 from "./components/Layouts/Layout2";
import ChatView from "./components/Projects/ProjectsChat/ChatView";
import Subscription from "./pages/Subscription/Subscription";

const Dashboard =  lazy(() => import("./pages/Dashboard/Dashboard"))
const ReportsPage = lazy(() => import("./pages/Reports/ReportsPage"))
const ImagesView = lazy(() => import("./components/Projects/ProjectsImages/ImagesView"))
const PermitView = lazy(() => import("./components/Projects/ProjectsPermit/PermitView"))
const DrawingFilesView = lazy(() => import("./components/Projects/ProjectsDrawingFiles/DrawingFilesView"))
const ReportView = lazy(() => import("./components/Projects/ProjectsReport/ReportView"))



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout1 />}>
        <Route index element={<Dashboard />} />
        <Route path="/projects" element={<ProjectsTable />}/>
        <Route path="/projects/:id" element={ <Layout2 />} >
           <Route path="" element={ <InnerLayout2 />} >
             <Route path="" element={ <ProjectsDefault />} />
             <Route path="images" element={ <ImagesView />} />
             <Route path="permit" element={ <PermitView />} />
             <Route path="drawing-files" element={ <DrawingFilesView />} />
           </Route>
           <Route path="initial-proposal" element={ <InitialProposalView />} />
           <Route path="work-order" element={ <WorkOrderView />} />
           <Route
            path="chat"
            element={ <ChatView />}
            />
           <Route path="notes" element={ <NotesView />} />
           <Route path="project-report" element={ <ReportView />} />
        </Route>
        <Route path='reports' element={<ReportsPage />} />
        <Route path='subscription' element={<Subscription />} />
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
      </Route>
    )
  );

  return (

    <>
    <Suspense fallback={<PageLoader />}>
     <RouterProvider router={router} />
    </Suspense>
   </>
  );
}

export default App;
