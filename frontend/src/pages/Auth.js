import React, { useState , useContext } from 'react';
import AuthContext from './../context/auth-context'
import { useSnackbar } from 'notistack';
import './Auth.scss'
import { APP } from "./../helper/axios/custom-axios"
import { getCreateUserQuery, getLoginQuery } from "./../helper/graphql/auth"

function AuthPage() {
    const { enqueueSnackbar } = useSnackbar();
    let emailElement = React.createRef();
    let passwordElement = React.createRef();

    let [isLogin, setLogin] = useState(true);
    let authDetails = useContext(AuthContext);

    let switchModeHandler = () => {
        setLogin(!isLogin);
    };

    /* ------------ login usecases --------------  */
    let successLoginCallback = (response) => {
        const loginResponse = response.data.data.login;
        if(loginResponse) {
            authDetails.login(loginResponse.token,loginResponse.userId, loginResponse.tokenExpiration);
        }
    };
    let failureLoginCallback = (response) => {
        if(response && response.data && response.data.errors && response.data.errors.length > 0) {
            let errorMessage = response.data.errors[0].message;
            enqueueSnackbar(errorMessage, {
                variant : "error"
            });
        } else {
            enqueueSnackbar("something went wrong", {
                variant : "error"
            });
        }

    };
    /* ------------ login usecases --------------  */

    /* ------------ create user usecases  --------------  */
    let successCreateUserCallback = (response) => {
        const user = response.data.data.createUser;
        if(user) {
            enqueueSnackbar("User created successfully", {
                variant : "success"
            });
            emailElement.current.value = "";
            passwordElement.current.value = "";
        }
    };
    let failureCreateUserCallback = (response) => {
        if(response && response.data && response.data.errors && response.data.errors.length > 0) {
            let errorMessage = response.data.errors[0].message;
            enqueueSnackbar(errorMessage, {
                variant : "error"
            });
        } else {
            enqueueSnackbar("something went wrong", {
                variant : "error"
            });
        }

    };
    /* ------------ create user usecases  --------------  */


    let submitHandler = (event) => {
        event.preventDefault();
        const email = emailElement.current.value;
        const password = passwordElement.current.value;
        if(email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        if (!isLogin) {
            APP.POST(getCreateUserQuery(email, password), successCreateUserCallback, failureCreateUserCallback);
        } else {
            APP.POST(getLoginQuery(email, password), successLoginCallback, failureLoginCallback);
        }
    };


    return (
        <form className="auth-form" onSubmit={submitHandler}>
            <div className="form-control">
                <label htmlFor="email"> E-mail </label>
                <input type="email" id="email" ref={emailElement} />
            </div>
            <div className="form-control">
                <label htmlFor="password"> Password </label>
                <input type="password" id="password" ref={passwordElement} />
            </div>
            <div className="form-action">
                <button className="btn" type="submit">Submit</button>
                <button className="btn" type="button" onClick={switchModeHandler} >Switch to {isLogin ? "SignUp" : "Login"}</button>
            </div>
        </form>
    );
}

export default AuthPage;
