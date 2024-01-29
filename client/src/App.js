import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
         <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
