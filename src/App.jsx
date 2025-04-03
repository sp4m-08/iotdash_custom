import React from 'react'
import GlobalStyle from './GlobalStyle';
import Auth from './Components/Auth/Auth'
import Navbar from './Navbar';
import Dash from './Components/Dash/Dash'
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
