
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Signup />} />
          <Route path="/login" element= {<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
