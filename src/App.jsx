import React from 'react'
import GlobalStyle from './GlobalStyle';
import Auth from './App/Auth/Auth'
import Navbar from './Components/Navbar';
import Dash from './App/Dash/Dash'
import DashFire from './App/Dash/DashFire';
import {BrowserRouter as Router,Routes,Route,useLocation} from 'react-router-dom'

function App() {
  
  return (
    <div>
      <GlobalStyle/>
      <Router>
        <Navbar />
        <Routes>

        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dash />} />
        
      </Routes>

      </Router>
      
    </div>
  )
}

export default App
