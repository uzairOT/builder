
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/Signup/Signup";
// import Login from "./components/login"

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Signup />} />
          {/* <Route path="/login" element={<Login />} /> */}
          </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
