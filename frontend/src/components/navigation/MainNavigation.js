import React, {useContext, useState} from 'react';
// NavLink is same as anchor tag but it prevent the default behaviour i.e reloading
import {NavLink} from 'react-router-dom'
import AuthContext from './../../context/auth-context';
import './MainNaviagtion.scss'


function MainNavigation(props) {
    let authDetails = useContext(AuthContext);
    return (
        <header className="main-navigation">
            <div className="main-navigation_logo">
                <h1>EasyEvent</h1>
            </div>
            <nav className="main-navigation_items">
                <ul>
                    {!authDetails.token && <li>
                        <NavLink to="/auth0">Authentication</NavLink>
                    </li>}
                    <li>
                        <NavLink to="/events">Events</NavLink>
                    </li>
                    {authDetails.token &&
                        <React.Fragment>
                            <li>
                                <NavLink to="/bookings">Booking</NavLink>
                            </li>
                            <li>
                                <button onClick={authDetails.logout}>Logout</button>
                            </li>
                        </React.Fragment>
                    }
                </ul>
            </nav>
        </header>)

}

export default MainNavigation;
