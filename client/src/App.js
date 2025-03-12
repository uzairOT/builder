import {
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import React, { Suspense, useCallback, useEffect, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Subscription from "./pages/Subscription/Subscription";
import { useDispatch, useSelector } from "react-redux";
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
  setDefaultLocation,
} from "./redux/slices/DailyForecast/dailyForecastSlice.js";
import Help from "./pages/Help/Help.jsx";
import PrivacyTerms from "./pages/PrivacyTerms/PrivacyTerms.jsx";
import { getUserRoleFromRedux } from "./redux/slices/auth/userRoleSlice.js";
import moment from "moment";
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';
import 'dayjs/locale/zh';
import 'moment/min/locales';
import MainHome from "./components/LandingPageComponents/MainHome.js";
import PolicyPage from "./components/LandingPageComponents/PrivacyPolicy/index.js";
import TermsPage from "./components/LandingPageComponents/Terms/index.js";
import { localeMapping } from "./utils/MomentLocales/locales.js";
import { useTranslation } from "react-i18next";
import { projectUserRoleAuth } from "./components/Projects/ProjectsInitialProposal/InitialProposalView";
import PageLoader from "./components/UI/Loaders/PageLoader/PageLoader";
import NoInternetConnection from "./pages/NoInternetPage/NoInternetConnection.js";
// Lazy-loaded components
import { Auth, Settings, Projects, Dashboard, Layouts, Pages, Modals } from "./config/lazyImports";
import { languageOptions } from "./config/languageConsts.js";

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
  const {t, i18n} = useTranslation();
  const language = useSelector((state) => state.auth.language);
  const currentLanguage = i18n.language;
  moment.locale(localeMapping[currentLanguage]);
  dayjs.locale(localeMapping[currentLanguage]);
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          
          console.log(lat, lon)
          dispatch(setLatLon({ lat, lon }));
          dispatch(setDefaultLocation(false));
          if (dailyForecast.length < 1) {
            fetchWeather(lat, lon);
          }
        }, (error) => {
          // If location access is denied, use the default location (California, USA)
          if (error.code === error.PERMISSION_DENIED) {
            const defaultLat = 36.7783; // Latitude for California
            const defaultLon = -119.4179; // Longitude for California
            dispatch(setLatLon({ lat: defaultLat, lon: defaultLon }));
            dispatch(setDefaultLocation(true));
            if (dailyForecast.length < 1) {
              fetchWeather(defaultLat, defaultLon);
            }
          }
        }
      );
    }
  }
}, [dailyForecast, query.temperatureUnit, query.lat, isAuthenticated, currentUser, currentLanguage]);

const fetchWeather = useCallback(async (lat, lon) => {
  // setLoading(true);
  console.log(currentLanguage)
    dispatch(setForecastLoading(true));

    try {
      const data = await getFormattedFiveDayWeather({
        lat: lat,
        lon: lon,
        units: query.temperatureUnit,
      }, currentLanguage);
      dispatch(setDailyForecast(data));
      dispatch(setForecastLoading(false));
    } catch (error) {
      dispatch(setError(error));
      dispatch(setForecastError(error));
    } finally {
      dispatch(setForecastLoading(false));
    }
  }, [query.temperatureUnit, currentLanguage]);

  useEffect(()=> {
    if(!Object.keys(languageOptions).includes(language)) return;

    i18n.changeLanguage(language)
  }, [language])

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

        <Route path="/signup" element={<Auth.Signup />} />
        <Route path="/login" element={<Auth.Login />} />
        <Route path="/userinfo" element={<Auth.GoogleLogin />} />
        <Route path="/assignproject" element={<Pages.AssignProject />} />
        <Route path="/forgetpassword" element={<Auth.ForgotPassword />} />
        <Route path="/verifycode" element={<Auth.VerifyCode />} />
        <Route path="/passwordreset" element={<Auth.PasswordReset />} />
        <Route path="/setnewpassword" element={<Auth.SetNewPassword />} />
        <Route path="/help" element={<Help />} />
        <Route path="/privacyandterms" element={<PrivacyTerms />} />
        <Route
          path="/invoicePayment/:invoiceId/:adminId/:totalAmount"
          element={<Modals.InvoicePayment />}
        />

        {/* <Route path="/subscribe" element={<NewSubscription />} /> */}

        {isAuthenticated && currentUser ? (
          <Route path="/" element={<Layouts.Layout1 />}>
            <Route path="/dashboard" element={<Dashboard.Main />} />
            <Route
              path="/projects"
              element={<Projects.Table />}
              loader={() => {
                return null;
              }}
            />
            <Route path="/projects/:id" element={<Layouts.Layout2 />}>
              {userRole.userRole === "client" ? (
                <>
                  <Route path="" element={<Layouts.ClientLayout />}>
                    <Route path="" element={<Dashboard.ClientCards />} />
                    <Route path="permit" element={<Dashboard.PermitClient />} />
                    <Route path="drawing-files" element={<Dashboard.ClientDrawing />} />
                    <Route path="images" element={<Dashboard.ClientImages />} />
                    <Route path="change-order" element={<Projects.ChangeOrder />} />
                    {/* <Route path="invoices" element={<Invoices />} /> */}
                    <Route path="dailylog" element={<Dashboard.DailyLog />} />
                    <Route path="chat" element={<Projects.Chat />} />
                    <Route
                      path="project-report"
                      element={<>{t("PermisionsMessage.reportsMsg")}</>}
                    />
                    <Route
                      path="notes"
                      element={<>{t("PermisionsMessage.notes")}</>}
                    />
                    <Route
                      path="initial-proposal"
                      element={<Projects.InitialProposalView />}
                    // loader={projectUserRoleAuth}
                    />
                    <Route path="work-order" element={<Projects.WorkOrderView />} />
                    <Route path="invoices" element={<Projects.InvoicesView />} />
                  </Route>
                </>
              ) : (
                <>
                  <Route path="" element={<Layouts.InnerLayout2 />}>
                    <Route path="" element={<Projects.Default />} />
                    <Route path="images" element={<Projects.ImagesView />} />
                    <Route path="permit" element={<Projects.PermitView />} />
                    <Route
                      path="drawing-files"
                      element={<Projects.DrawingFilesView />}
                    />
                  </Route>
                  <Route
                    path="initial-proposal"
                    element={<Projects.InitialProposalView />}
                    loader={projectUserRoleAuth}
                  />
                  <Route path="work-order" element={<Projects.WorkOrderView />} />
                  <Route path="chat" element={<Projects.ChatViewMain />} />
                  <Route path="notes" element={<Projects.NotesView />} />
                  <Route path="project-report" element={<Projects.ReportView />} />
                  <Route path="change-order" element={<Projects.ChangeOrder />}></Route>
                  <Route path="invoices" element={<Projects.InvoicesView />} />
                  <Route
                    path="project-permissions"
                    element={<Projects.PermissionsView />}
                  />
                </>
              )}
            </Route>
            <Route path="reports" element={<Pages.Reports />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="/completion" element={<Modals.Completion />} />
            <Route path="/connect-quickbooks" element={<Pages.ConnectQuickBooksPage />} />
            <Route path="/error" element={<Pages.Error />} />
            <Route path="/settings" element={<Layouts.Layout3 />}>
              <Route index element={<Settings.Profile />} />
              <Route path="" element={<Settings.Profile />} />
              <Route path="admin" element={<Settings.Admin />} />
              <Route path="projectManager" element={<Settings.ProjectManager />} />
              <Route path="client" element={<Settings.Client />} />
              <Route path="employee" element={<Settings.Employee />} />
              <Route path="subcontractor" element={<Settings.Subcontractor />} />
              <Route path="supplier" element={<Settings.SupplierList />} />
              <Route path="others" element={<Settings.Others />} />
              {/* Added by Zeeshan */}
              <Route path="accounts" element={<Settings.Accounts />} />

              <Route path="coupon" element={<Settings.Coupon />} />
              {/* -- */}
              <Route path="masterline" element={<Settings.MasterLineItem />} />
              {/* <Route path="permissions" element={<PermissionAccess />} /> */}
              <Route path="units" element={<Settings.Units />} />
            </Route>
          </Route>
        ) : (
          <Route path="/login" element={<Auth.Login />} />
        )}
        <Route
          path="/invitation/:invitationId/:email/:companyName"
          element={<Pages.Invitation />}
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
        <Route path="/*" element={<Pages.NotFound />} />
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
            theme="dark"
          />
          <RouterProvider router={router} />
        </Suspense>
      </NoInternetConnection>
    </>
  );
}

export default App;
