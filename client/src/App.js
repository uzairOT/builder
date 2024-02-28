import { BrowserRouter, Routes, Route, Link, createRoutesFromElements } from "react-router-dom";
// import Signup from "./pages/SignUp/Signup";
import { Outlet } from "react-router-dom";
import Layout1 from "./components/Layouts/Layout1";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout2 from "./components/Layouts/Layout2";
import Projects from "./pages/Projects/Projects";
import ProjectsDefault from "./components/Projects/ProjectsDefault/ProjectsDefault";
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
import ProjectsTable from "./pages/Projects/ProjectsTable";
import Subscription from "./pages/Subscription/Subscription";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout1 />}>
        <Route index element={<Dashboard />} />
        <Route path="/projects" element={<ProjectsTable />} loader={()=>{
           console.log('hello from loader')
            return null;
           } }/>
        <Route path="/projects/:id" element={ <Layout2 />} >
           <Route path="" element={ <InnerLayout2 />} >
             <Route path="default" element={ <ProjectsDefault />} />
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
