import React, { useState } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import AuthPage from './pages/Auth';
import EventsPage from './components/events/Events';
import BookingsPage from './components/booking/Bookings';
import MainNavigation from './components/navigation/MainNavigation';
import AuthContext from './context/auth-context'
import './App.css';
import Configuration from "./pages/Configuration";
import ConfigContext from './context/config-context';

function App() {

    console.log("modee " + process.env.NODE_ENV);
    let [authDetails, setAuthDetails] = useState({
        token : null,
        userId : null,
        tokenExpiration: null
    });

    let [colors, setColors] = useState({
        background : "#5101d1",
        color : "#fff"
    });

    let login = (token, userId, tokenExpiration) => {
        setAuthDetails({
            token : token,
            userId : userId,
            tokenExpiration: tokenExpiration
        })
    };

    let logout = () => {
        setAuthDetails({
            token : null,
            userId : null,
            tokenExpiration: null
        })
    };

    let applyColors = (newBackground, newColor) => {
        if (colors.background == newBackground && colors.color === newColor) {
            return;
        }
        setColors({
            background : newBackground,
            color : newColor
        })
    };


    return (
        <BrowserRouter>
            <React.Fragment>
                <ConfigContext.Provider value={{
                    background : colors.background,
                    color : colors.color,
                    applyColors : applyColors

                }}>
                    <AuthContext.Provider value={{
                        token : authDetails.token,
                        userId : authDetails.userId,
                        login : login,
                        logout : logout,
                    }}>
                    <MainNavigation />
                    <main className="main-content">
                        <Switch>
                            {!authDetails.token && <Redirect from="/" to="/auth0" exact/>}
                            {authDetails.token && <Redirect from="/" to="/events" exact/>}
                            {authDetails.token && <Redirect from="/auth0" to="/events" exact/>}
                            {!authDetails.token && <Redirect from="/bookings" to="/auth0" exact/>}
                            {!authDetails.token && <Route path="/auth0" component={AuthPage}/>}
                            <Route path="/events" component={EventsPage}/>
                            <Route path="/settings" component={Configuration}/>
                            {authDetails.token && <Route path="/bookings" component={BookingsPage}/>}
                        </Switch>
                    </main>
                    </AuthContext.Provider>
                </ConfigContext.Provider>
            </React.Fragment>
        </BrowserRouter>
    )

}

export default App;
