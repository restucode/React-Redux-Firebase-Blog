import React from 'react'
import { NavLink } from 'react-router-dom'
import { useFirebase } from "react-redux-firebase";


const NavbarDashboard = () => {
    const firebase = useFirebase()

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/dashboard">Restu Blog</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <NavLink className="nav-link" to="/dashboard/profile">Profile</NavLink>
                <NavLink className="nav-link" to=''  onClick={() => firebase.logout()}>Logout</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default NavbarDashboard
