
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import AssignProject from "./pages/AssignProject/AssignProject";


function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Signup />} />
          <Route path="/login" element= {<Login />} />
          <Route path="/assignproject" element= {<AssignProject />} />
          
          </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
