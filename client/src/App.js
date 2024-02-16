import { BrowserRouter, Routes, Route, Link, createRoutesFromElements } from "react-router-dom";
// import Signup from "./pages/SignUp/Signup";
import { Outlet } from "react-router-dom";
import Layout1 from "./components/Layouts/Layout1";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout2 from "./components/Layouts/Layout2";
import Projects from "./pages/Projects/Projects";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout1 />}>
        <Route index element={<Dashboard />} />
        <Route path="/projects" element={<Layout2 />}>
          <Route path=":id/:view" element={<Projects />} />
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
