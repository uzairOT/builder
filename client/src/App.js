import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  createRoutesFromElements,
  useNavigate,
  useParams,
} from "react-router-dom";
// import Signup from "./pages/SignUp/Signup";
import { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout3 from "./components/Layouts/Layout3";
import Profile from "./components/Settings/Profile/Profile";
import Admin from "./components/Settings/Admin/Admin";
import ProjectManager from "./components/Settings/ProjectManager/ProjectManager";
import Client from "./components/Settings/Client/Client";
import Subcontractor from "./components/Settings/Subcontractor/Subcontractor";
import SupplierList from "./components/Settings/SupplierList/SupplierList";
import MasterLineItem from "./components/Settings/MasterLineItem/MasterLineItem";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import AssignProject from "./pages/AssignProject/AssignProject";
import ClientDashboard from "./pages/ClientDashboard/ClientDashboard";
import Permit from "./components/ClientDashboard/Permit/Permit";
import ChangeOrders from "./components/ClientDashboard/ChangeOrders/ChangeOrders";
import Invoices from "./components/ClientDashboard/Invoices/Invoices";
import Drawing from "./components/ClientDashboard/Drawing/Drawing";
import Images from "./components/ClientDashboard/Images/Images";
import Chats from "./components/ClientDashboard/Chats/Chats";
import ClientDashboardCards from "./components/ClientDashboard/ClientDashboardCards/ClientDashboardCards";
import DailyLog from "./components/ClientDashboard/DailyLog/DailyLog";

import { loader } from "./pages/Projects/ProjectsTable";
import PageLoader from "./components/UI/Loaders/PageLoader/PageLoader";
import InnerLayout2 from "./components/Layouts/InnerLayout2";
import ProjectsDefault from "./components/Projects/ProjectsDefault/ProjectsDefault";
import InitialProposalView, {
  projectUserRoleAuth,
} from "./components/Projects/ProjectsInitialProposal/InitialProposalView";
import WorkOrderView from "./components/Projects/ProjectsWorkOrder/WorkOrderView";
import NotesView from "./components/Projects/ProjectNotes/NotesView";
import Layout1 from "./components/Layouts/Layout1";
import ProjectsTable from "./pages/Projects/ProjectsTable";
import Layout2 from "./components/Layouts/Layout2";
import Subscription from "./pages/Subscription/Subscription";
import { useDispatch, useSelector } from "react-redux";
import Invitation from "./pages/InvitationView/Invitation";
import { ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import { getFormattedFiveDayWeather } from "./services/WeatherService.js";
import { addEvents, fetchEvents } from "./redux/slices/Events/eventsSlice.js";

import ProjectsChangeOrder from "./components/Projects/ProjectsChangeOrder/ProjectsChangeOrder";
import { useGetUserEventsMutation } from "./redux/apis/usersApiSlice.js";
import moment from "moment";
import {
  allEvents,
  setIsLoading,
  setError,
} from "./redux/slices/Events/eventsSlice.js";
import {
  setDailyForecast,
  setForecastLoading,
  setForecastError,
  getForecast,
} from "./redux/slices/DailyForecast/dailyForecastSlice.js";
import GoogleLogin from "./components/Login/GoogleLogin/GoogleLogin.js";
import ForgotPassword from "./components/Login/ForgotPassword/ForgotPassword.js";
import VerifyCode from "./components/Login/ForgotPassword/VerifyCode.js";
import PasswordReset from "./components/Login/ForgotPassword/PasswordReset.js";
import SetNewPassword from "./components/Login/ForgotPassword/SetNewPassword.js";
import Help from "./pages/Help/Help.jsx";
import PrivacyTerms from "./pages/PrivacyTerms/PrivacyTerms.jsx";
import ChangeOrder from "./pages/Projects/ChangeOrder.js";
import Employee from "./components/Settings/Employee/Employee.js";
import NoInternetConnection from "./pages/NoInternetPage/NoInternetConnection.js";
import useSocket from "./utils/useSocket.js";
import Units from "./components/Settings/Units/Units.js";
import ClientLayout from "./components/Layouts/ClientLayout.js";
import { useGetProjectUserRoleMutation } from "./redux/apis/Project/userProjectApiSlice.js";
import { getUserRoleFromRedux } from "./redux/slices/auth/userRoleSlice.js";
import Completion from "./components/dialogues/PaymentModal/Completion.js";
import ChatViewMain from "./components/Projects/ProjectsChat/ChatViewMain.js";
import PermitClient from "./components/ClientDashboard/Permit/Permit";
import NotFound from "./pages/NotFound/NotFound.js";
import ProjectsChangeOrderView from "./components/Projects/ProjectsChangeOrder/ProjectsChangeOrderView.js";
import InvoicePayment from "./components/dialogues/GenerateInvoice/InvoicePayment/InvoicePayment.js";
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const ReportsPage = lazy(() => import("./pages/Reports/ReportsPage"));
const ImagesView = lazy(() =>
  import("./components/Projects/ProjectsImages/ImagesView")
);
const PermitView = lazy(() =>
  import("./components/Projects/ProjectsPermit/PermitView")
);
const DrawingFilesView = lazy(() =>
  import("./components/Projects/ProjectsDrawingFiles/DrawingFilesView")
);
const ReportView = lazy(() =>
  import("./components/Projects/ProjectsReport/ReportView")
);

function App() {
  const isAuthenticated = useSelector((state) => state.auth.userInfo);
  const userId = isAuthenticated ? isAuthenticated?.user?.id : null;
  const [getUserRole] = useGetProjectUserRoleMutation();
  const userRole = useSelector(getUserRoleFromRedux);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [dailyForecast, setDailyForecast] = useState(null);
  const { emit, on } = useSocket();
  const [events, setEvents] = useState();
  const [getEvents] = useGetUserEventsMutation();
  const allEvent = useSelector(allEvents);
  const temperatureUnit = useSelector(state => state.dailyForecast.temperatureUnit);
  const forecast = useSelector(getForecast);
  const dailyForecast = forecast.dailyForecast || [];
  const dispatch = useDispatch();
  
  const fetchWeather = async () => {
    // setLoading(true);
    dispatch(setIsLoading(true));
    dispatch(setForecastLoading(true));
    
    try {
      console.log("IN APP JS: ", temperatureUnit);
      const data = await getFormattedFiveDayWeather({
        lat: "36.7783",
        lon: "119.4179",
        units: temperatureUnit,
      });
      dispatch(setDailyForecast(data));
      dispatch(setForecastLoading(false));
    } catch (error) {
      dispatch(setError(error));
      dispatch(setForecastError(error));
    } finally {
      dispatch(setForecastLoading(false));
    }
  };
  useEffect(() => {

    if (dailyForecast.length < 1) {
      fetchWeather();
    }
  }, [dailyForecast, temperatureUnit]); // Run this effect whenever dailyForecast changes or on initial mount

  useEffect(() => {
    // getFormattedEvents();
    if (dailyForecast.length > 1) {
      dispatch(fetchEvents({ userId: userId, dailyForecast: dailyForecast }));
    }
  }, [userId, dailyForecast]); // Run this effect whenever userId or dailyForecast changes

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userinfo" element={<GoogleLogin />} />
        <Route path="/assignproject" element={<AssignProject />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
        <Route path="/verifycode" element={<VerifyCode />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
        <Route path="/setnewpassword" element={<SetNewPassword />} />
        <Route path="/help" element={<Help />} />
        <Route path="/privacyandterms" element={<PrivacyTerms />} />
        <Route path="/invoicePayment/:invoiceId/:totalAmount" element={<InvoicePayment />} />

        {isAuthenticated ? (
          <Route path="/" element={<Layout1 />}>
            <Route index element={<Dashboard />} />
            <Route
              path="/projects"
              element={<ProjectsTable />}
              loader={() => {
                //console.log("hello from loader");
                return null;
              }}
            />
            <Route path="/projects/:id" element={<Layout2 />}>
              {userRole.userRole === "client" ? (
                <>
                  <Route path="" element={<ClientLayout />}>
                    <Route path="" element={<ClientDashboardCards />} />
                    <Route path="permit" element={<PermitClient />} />
                    <Route path="drawing-files" element={<Drawing />} />
                    <Route path="images" element={<Images />} />
                    <Route path="change-order" element={<ChangeOrder />} />
                    <Route path="invoices" element={<Invoices />} />
                    <Route path="dailylog" element={<DailyLog />} />
                    <Route path="chat" element={<Chats />} />
                    <Route
                    path="initial-proposal"
                    element={<InitialProposalView />}
                    // loader={projectUserRoleAuth}
                  />
                    <Route path="work-order" element={<WorkOrderView />} />
                  </Route>
                </>
              ) : (
                <>
                  <Route path="" element={<InnerLayout2 />}>
                    <Route path="" element={<ProjectsDefault />} />
                    <Route path="images" element={<ImagesView />} />
                    <Route path="permit" element={<PermitView />} />
                    <Route
                      path="drawing-files"
                      element={<DrawingFilesView />}
                    />
                  </Route>
                  <Route
                    path="initial-proposal"
                    element={<InitialProposalView />}
                    loader={projectUserRoleAuth}
                  />
                  <Route path="work-order" element={<WorkOrderView />} />
                  <Route path="chat" element={<ChatViewMain />} />
                  <Route path="notes" element={<NotesView />} />
                  <Route path="project-report" element={<ReportView />} />
                  <Route path="change-order" element={<ChangeOrder />}></Route>
                </>
              )}
            </Route>
            <Route path="reports" element={<ReportsPage />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="/completion" element={<Completion />} />
            <Route path="/settings" element={<Layout3 />}>
              <Route index element={<Profile />} />
              <Route path="profile" element={<Profile />} />
              <Route path="admin" element={<Admin />} />
              <Route path="projectManager" element={<ProjectManager />} />
              <Route path="client" element={<Client />} />
              <Route path="employee" element={<Employee />} />
              <Route path="subcontractor" element={<Subcontractor />} />
              <Route path="supplier" element={<SupplierList />} />
              <Route path="materline" element={<MasterLineItem />} />
              <Route path="units" element={<Units />} />
            </Route>
          </Route>
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route
          path="/invitation/:invitationId/:email/:companyName"
          element={<Invitation />}
        />

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
        <Route path="/*" element={<NotFound />} /> 
      </>
    )
  );

  return (
    <>
      <NoInternetConnection>
        <Suspense fallback={<PageLoader />}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="light"
          />
          <RouterProvider router={router} />
        </Suspense>
      </NoInternetConnection>
    </>
  );
}

export default App;
