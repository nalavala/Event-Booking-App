import React, { useState , useContext } from 'react';
import AuthContext from './../context/auth-context'
import './Auth.scss'
function AuthPage() {
    let emailElement = React.createRef();
    let passwordElement = React.createRef();

    let [isLogin, setLogin] = useState(true);
    let authDetails = useContext(AuthContext);

    let switchModeHandler = () => {
        setLogin(!isLogin);
    }

    let submitHandler = (event) => {
        event.preventDefault();
        const email = emailElement.current.value;
        const password = passwordElement.current.value;
        if(email.trim().length === 0 || password.trim().length === 0) {
            return;
        }
        //console.log(email,password);
        let requestBody = {
            query : `query {
                login(email : "${email}", password : "${password}") {
                    userId 
                    email 
                    token 
                    tokenExpiration
                }
            }`
        };

        if(!isLogin) {
            requestBody = {
                query:`
                mutation {
  createUser(userInput : {email: "${email}",password: "${password}"}) {
    _id
  }
}`
        }

        };


        fetch('http://localhost:1742/graphql', {
            method : 'POST',
            body : JSON.stringify(requestBody),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then((response) => {
            if(response.status !== 200 && response.status !== 201) {
                throw new Error('Failed');
            }

            return response.json();
        } ).then((response) => {
            const loginResponse = response.data.login;
            if(response.data.login) {
                authDetails.login(loginResponse.token,loginResponse.userId, loginResponse.tokenExpiration);
            }
            console.log(response);
        }).catch((e) => {
            throw e;
        });
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
                <button type="submit">Submit</button>
                <button type="button" onClick={switchModeHandler} >Switch to {isLogin ? "SignUp" : "Login"}</button>
            </div>
        </form>
    );
}

export default AuthPage;
