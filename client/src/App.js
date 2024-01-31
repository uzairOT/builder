
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";


function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Signup />} />
          <Route path="/login" element= {<Login />} />
          <Route path="/home" element= {<Home />} />
          
          </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
