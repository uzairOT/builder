import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Signup from "./pages/Signup/Signup"
import Login from "./pages/Login/Login"
// import Dashboard from "./pages/"
import AssignProject from "./pages/AssignProject/AssignProject"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Chat from "./pages/Chat/Chat";
import Settings from "./pages/Settings/Settings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
    <Route path="/" element={<Signup />} />
   {/* <Route path="/dashboard" element={<Dashboard />} /> */}
   <Route path="/signup" element={<Signup />} />
   <Route path="/login" element={<Login />} />
   <Route path="/settings" element={<Settings />} />
   <Route path="" element={<PrivateRoute />}>
     <Route path="/chat" element={<Chat />} />
     <Route path="/assignproject" element= {<AssignProject />} />
   </Route>
 </Route>

    
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();



