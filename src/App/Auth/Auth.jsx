import React from 'react'
import {BrowserRouter as Router,Routes,Route,useLocation, useNavigate} from 'react-router-dom'
import './Auth.css'

function Auth() {
    let navigate = useNavigate();

    const handleGoogleLogin= async() => {
       
    }

    return (
        <div className='auth-container'>
            <h1> Empower Your IoT Experience with Our Low-Code Dashboard Platform </h1>
            <p>
                Easily build exceptional, fully customizable mobile and web IoT applications.
                <br/> Securely deploy and manage millions of devices worldwide.
            </p>
            
            <button className='btn' onClick={()=>navigate('/dashboard')}> View Dashboard</button>
        </div>
    )
}

export default Auth
