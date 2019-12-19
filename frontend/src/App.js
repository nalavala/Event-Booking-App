import React, { useState } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import AuthPage from './pages/Auth';
import EventsPage from './components/events/Events';
import BookingsPage from './components/booking/Bookings';
import MainNavigation from './components/navigation/MainNavigation';
import AuthContext from './context/auth-context'
import './App.css';

function App() {

    let [authDetails, setAuthDetails] = useState({
        token : null,
        userId : null,
        tokenExpiration: null
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
    return (
        <BrowserRouter>
            <React.Fragment>
                <AuthContext.Provider value={{
                    token : authDetails.token,
                    userId : authDetails.userId,
                    login : login,
                    logout : logout,
                }}>
                <MainNavigation/>
                <main className="main-content">
                    <Switch>
                        {!authDetails.token && <Redirect from="/" to="/auth0" exact/>}
                        {authDetails.token && <Redirect from="/" to="/events" exact/>}
                        {authDetails.token && <Redirect from="/auth0" to="/events" exact/>}
                        {!authDetails.token && <Redirect from="/bookings" to="/auth0" exact/>}
                        {!authDetails.token && <Route path="/auth0" component={AuthPage}/>}
                        <Route path="/events" component={EventsPage}/>
                        {authDetails.token && <Route path="/bookings" component={BookingsPage}/>}
                    </Switch>
                </main>
                </AuthContext.Provider>
            </React.Fragment>
        </BrowserRouter>
    )

}

export default App;
