import Dashboard from './pages/Dashboard/Dashboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import Signup from "./pages/Signup/Signup";
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    {/* <Route path="/" element= {<Signup />} /> */}
     <Route path="/" element={<Dashboard />} />
      </Routes>
 </BrowserRouter>
  );
}

export default App;
