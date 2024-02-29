import { BrowserRouter, Routes, Route, Link, createRoutesFromElements } from "react-router-dom";
// import Signup from "./pages/SignUp/Signup";
import { Outlet } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {lazy, Suspense} from 'react';
import { loader } from "./pages/Projects/ProjectsTable";
import PageLoader from "./components/UI/Loaders/PageLoader/PageLoader";

const Layout1 = lazy( () => import("./components/Layouts/Layout1"))
const Dashboard =  lazy(() => import("./pages/Dashboard/Dashboard"))
const ProjectsTable = lazy(() => import("./pages/Projects/ProjectsTable"));
const Layout2 = lazy(() => import("./components/Layouts/Layout2"));
const ReportsPage = lazy(() => import("./pages/Reports/ReportsPage"))
const Subscription = lazy(() => import("./pages/Subscription/Subscription"));
const InnerLayout2 = lazy(() => import("./components/Layouts/InnerLayout2"));
const ProjectsDefault = lazy(() => import("./components/Projects/ProjectsDefault/ProjectsDefault"));
const ImagesView = lazy(() => import("./components/Projects/ProjectsImages/ImagesView"));
const PermitView = lazy(() => import("./components/Projects/ProjectsPermit/PermitView"));
const DrawingFilesView = lazy(() => import("./components/Projects/ProjectsDrawingFiles/DrawingFilesView"));
const InitialProposalView = lazy(() => import("./components/Projects/ProjectsInitialProposal/InitialProposalView"));
const WorkOrderView = lazy(() => import("./components/Projects/ProjectsWorkOrder/WorkOrderView"));
const ChatView = lazy(() => import("./components/Projects/ProjectsChat/ChatView"));
const NotesView = lazy(() => import("./components/Projects/ProjectNotes/NotesView"));
const ReportView = lazy(() => import("./components/Projects/ProjectsReport/ReportView"));


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
     
      <Route path="/" element={<Layout1 />}>
        <Route index element={<Dashboard />} />
        <Route path="/projects" element={<ProjectsTable />}/>
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
     <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
     </Suspense>
    </>
  );
}

export default App;
