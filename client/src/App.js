import {
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import React, { lazy, Suspense, useCallback, useEffect, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout3 from "./components/Layouts/Layout3";
import Profile from "./components/Settings/Profile/Profile";
import Admin from "./components/Settings/Admin/Admin";
import ProjectManager from "./components/Settings/ProjectManager/ProjectManager";
import Client from "./components/Settings/Client/Client";
import Subcontractor from "./components/Settings/Subcontractor/Subcontractor";
import SupplierList from "./components/Settings/SupplierList/SupplierList";
import MasterLineItem from "./components/Settings/MasterLineItem/MasterLineItem";
import Drawing from "./components/ClientDashboard/Drawing/Drawing";
import Images from "./components/ClientDashboard/Images/Images";
import ClientDashboardCards from "./components/ClientDashboard/ClientDashboardCards/ClientDashboardCards";
import DailyLog from "./components/ClientDashboard/DailyLog/DailyLog";
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
import { fetchEvents } from "./redux/slices/Events/eventsSlice.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  setIsLoading,
  setError,
} from "./redux/slices/Events/eventsSlice.js";
import {
  setDailyForecast,
  setForecastLoading,
  setForecastError,
  getForecast,
  setLatLon,
} from "./redux/slices/DailyForecast/dailyForecastSlice.js";
import GoogleLogin from "./components/Login/GoogleLogin/GoogleLogin.js";
import Help from "./pages/Help/Help.jsx";
import PrivacyTerms from "./pages/PrivacyTerms/PrivacyTerms.jsx";
import ChangeOrder from "./pages/Projects/ChangeOrder.js";
import Employee from "./components/Settings/Employee/Employee.js";
import NoInternetConnection from "./pages/NoInternetPage/NoInternetConnection.js";
import Units from "./components/Settings/Units/Units.js";
import ClientLayout from "./components/Layouts/ClientLayout.js";
import { getUserRoleFromRedux } from "./redux/slices/auth/userRoleSlice.js";
import Completion from "./components/dialogues/PaymentModal/Completion.js";
import ChatViewMain from "./components/Projects/ProjectsChat/ChatViewMain.js";
import PermitClient from "./components/ClientDashboard/Permit/Permit";
import NotFound from "./pages/NotFound/NotFound.js";
import ProjectInvoicesView from "./components/Projects/ProjectInvoices/ProjectInvoicesView.js";
import Coupon from "./components/Settings/Cupon/Coupon.js";
import Accounts from "./components/Settings/Accounts/Accounts.js";
import Others from "./components/Settings/Others/Others.js";
import Chat from "./components/Projects/ProjectsChat/Chat.js";
import MainHome from "./components/LandingPageComponents/MainHome.js";
import PolicyPage from "./components/LandingPageComponents/PrivacyPolicy/index.js";
import TermsPage from "./components/LandingPageComponents/Terms/index.js";
import PermissionAccess from "./components/Settings/PermissionAccess/Permissions.js";
const SetNewPassword = lazy(() => import("./components/Login/ForgotPassword/SetNewPassword.js"));
const InvoicePayment = lazy(() => import("./components/dialogues/GenerateInvoice/InvoicePayment/InvoicePayment.js"));
const PasswordReset = lazy(()=> import("./components/Login/ForgotPassword/PasswordReset.js"))
const VerifyCode = lazy(()=> import("./components/Login/ForgotPassword/VerifyCode.js"))
const ForgotPassword = lazy(()=> import("./components/Login/ForgotPassword/ForgotPassword.js"))
const AssignProject = lazy(()=>import("./pages/AssignProject/AssignProject"))
const Signup  = lazy(()=> import("./pages/Signup/Signup"))
const Login  = lazy(()=> import("./pages/Login/Login"))
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

const ProjectPermissionsView = lazy(() =>
  import("./components/Projects/ProjectPermissions/ProjectPermissionsView.js")
);

const ReportView = lazy(() =>
  import("./components/Projects/ProjectsReport/ReportView")
);

function App() {
  const isAuthenticated = useSelector((state) => state.auth.userInfo);
  const userId = isAuthenticated ? isAuthenticated?.user?.id : null;
  let data = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(data);
  const isInLocalStorage = userInfo?.user;
  const currentUser = isInLocalStorage ? userInfo?.user?.id : null;
  const userRole = useSelector(getUserRoleFromRedux);
  const query = useSelector((state) => state.dailyForecast.query);
  const forecast = useSelector(getForecast);
  const dailyForecast = useMemo(() => forecast.dailyForecast || [], [forecast]);
  const dispatch = useDispatch();

  useEffect(() => {
    if(isAuthenticated && currentUser){

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;

        dispatch(setLatLon({ lat, lon }));
        if (dailyForecast.length < 1) {
          fetchWeather(lat, lon);
        }
      });
    }
  }
  },[dailyForecast, query.temperatureUnit, query.lat, isAuthenticated, currentUser]);

  const fetchWeather =useCallback(async (lat,lon) => {
    // setLoading(true);
    dispatch(setForecastLoading(true));

    try {
      const data = await getFormattedFiveDayWeather({
        lat: lat,
        lon: lon,
        units: query.temperatureUnit,
      });
      dispatch(setDailyForecast(data));
      dispatch(setForecastLoading(false));
    } catch (error) {
      dispatch(setError(error));
      dispatch(setForecastError(error));
    } finally {
      dispatch(setForecastLoading(false));
    }
  },[query.temperatureUnit]);

  // useEffect(() => {
  //   if (dailyForecast.length > 1) {
  //     dispatch(fetchEvents({ userId: userId, dailyForecast: dailyForecast }));
  //   }
  // }, [userId, dailyForecast]);

  useEffect(() => {
    if (userId) {
      // dispatch(setIsLoading(true));
      dispatch(fetchEvents({ userId: userId, dailyForecast: [] }));
    }
  }, [userId]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainHome />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacypolicy" element={<PolicyPage />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userinfo" element={<GoogleLogin />} />
        <Route path="/assignproject" element={<AssignProject />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
        <Route path="/verifycode" element={<VerifyCode />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
        <Route path="/setnewpassword" element={<SetNewPassword />} />
        <Route path="/help" element={<Help />} />
        <Route path="/privacyandterms" element={<PrivacyTerms />} />
        <Route
          path="/invoicePayment/:invoiceId/:adminId/:totalAmount"
          element={<InvoicePayment />}
        />
        {/* <Route path="/subscribe" element={<NewSubscription />} /> */}

        {isAuthenticated && currentUser ? (
          <Route path="/" element={<Layout1 />}>
            <Route path="/dashboard" element={<Dashboard />} />
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
                    {/* <Route path="invoices" element={<Invoices />} /> */}
                    <Route path="dailylog" element={<DailyLog />} />
                    <Route path="chat" element={<Chat />} />
                    <Route
                      path="project-report"
                      element={<>Project reports are only accessible to team</>}
                    />
                    <Route
                      path="notes"
                      element={<>Project notes are only accessible to team</>}
                    />
                    <Route
                      path="initial-proposal"
                      element={<InitialProposalView />}
                      // loader={projectUserRoleAuth}
                    />
                    <Route path="work-order" element={<WorkOrderView />} />
                    <Route path="invoices" element={<ProjectInvoicesView />} />
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
                  <Route path="invoices" element={<ProjectInvoicesView />} />
                  <Route
                    path="project-permissions"
                    element={<ProjectPermissionsView />}
                  />
                </>
              )}
            </Route>
            <Route path="reports" element={<ReportsPage />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="/completion" element={<Completion />} />
            <Route path="/settings" element={<Layout3 />}>
              <Route index element={<Profile />} />
              <Route path="" element={<Profile />} />
              <Route path="admin" element={<Admin />} />
              <Route path="projectManager" element={<ProjectManager />} />
              <Route path="client" element={<Client />} />
              <Route path="employee" element={<Employee />} />
              <Route path="subcontractor" element={<Subcontractor />} />
              <Route path="supplier" element={<SupplierList />} />
              <Route path="others" element={<Others />} />
              {/* Added by Zeeshan */}
              <Route path="accounts" element={<Accounts />} />

              <Route path="coupon" element={<Coupon />} />
              {/* -- */}
              <Route path="materline" element={<MasterLineItem />} />
              <Route path="permissions" element={<PermissionAccess />} />
              <Route path="units" element={<Units />} />
            </Route>
          </Route>
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        <Route
          path="/invitation/:invitationId/:email/:companyName"
          element={<Invitation />}
        />

        {/* <Route path="/clientdashboard" element={<ClientDashboard />}>
          <Route path="/clientdashboard" element={<ClientDashboardCards />} />
          <Route path="permit" element={<Permit />} />
          <Route path="drawing" element={<Drawing />} />
          <Route path="images" element={<Images />} />
          <Route path="changeorders" element={<ChangeOrders />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="dailylog" element={<DailyLog />} />
          <Route path="chats" element={<Chats />} />
        </Route> */}
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
