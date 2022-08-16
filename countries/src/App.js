import Home from './pages/home.js'
import Country from './pages/country.js'
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';


function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/country" element={<Country/>} />
    </Routes>
    
    
  );
}

export default App;
