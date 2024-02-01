import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";

function App() {
  return (
  
       <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Signup />} />
          <Route path="/login" element= {<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
     </BrowserRouter>
   
  );
}

export default App;
