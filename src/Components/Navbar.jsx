import React from 'react'
import {BrowserRouter as Router,Routes,Route,useLocation, Navigate, useNavigate} from 'react-router-dom'
import "./Navbar.css"

function Navbar() {
    let navigate = useNavigate();
    return (
        <div className='header'>
            <nav className='nav-links'>
                <span className='nav-link' onClick={()=>navigate('/')}>Home</span> 
                <span className='nav-link'>IoT</span>
                <span className='nav-link'> About us</span>
            </nav>
        </div>
    )
}

export default Navbar
