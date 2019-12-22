import React, {useContext, useState, useRef, useEffect} from 'react';
// NavLink is same as anchor tag but it prevent the default behaviour i.e reloading
import {NavLink} from 'react-router-dom'
import AuthContext from './../../context/auth-context';
import ConfigContext from './../../context/config-context';
import './MainNaviagtion.scss'


function MainNavigation(props) {
    let authDetails = useContext(AuthContext);
    let configContext = useContext(ConfigContext);
    let style = {
        background: configContext.background,
        color :  configContext.color
    };

    //useEffect(() => {authDetails.ref.navRef = navRef})
    return (
        <header className="main-navigation" style={style}>
            <div className="main-navigation_logo">
                <h1>EasyEvent</h1>
            </div>
            <nav className="main-navigation_items">
                <ul>
                    <li>
                        <NavLink to="/settings"> Settings </NavLink>
                    </li>
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
