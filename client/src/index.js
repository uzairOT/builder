import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Dashboard from "./pages/Dashboard/Dashboard";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Chat from "./pages/Chat/Chat";
import Projects from "./pages/Projects/Projects";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/chat" element={<Chat />} />
        <Route path="/projects/:id/default" element={<Projects />} />
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
