import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Signup from "./pages/Signup/Signup"
import Login from "./pages/Login/Login"
import AssignProject from "./pages/AssignProject/AssignProject"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Chat from "./pages/Chat/Chat";
import Settings from "./pages/Settings/SettingsWrapper";
import Layout3 from './components/Layouts/Layout3'

  


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <RouterProvider router={router} /> */}
      <App/>
    </React.StrictMode>
  </Provider>
);


reportWebVitals();



