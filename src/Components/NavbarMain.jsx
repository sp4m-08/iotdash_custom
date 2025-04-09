import React from 'react'
import "./Navbar.css"

function Navbar() {
    return (
        <div className='header'>
            <nav className='nav-links'>
                <span className='nav-link'>Dashboard</span> 
                <span className='nav-link'>Devices</span>
                <span className='nav-link'> About us</span>
            </nav>
        </div>
    )
}

export default Navbar
