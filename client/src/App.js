
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup/Signup";


function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Signup />} />
          </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
