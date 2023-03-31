import React, { useContext, useRef } from 'react';
import "./login.css";
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';
import { Navigate } from 'react-router-dom';


export default function Login() {

    const email = useRef();
    const password = useRef();

    const { user, isFetching,  dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
            { email: email.current.value, password: password.current.value },
            dispatch
        );

        // window.localStorage.setItem("user", JSON.stringify({ 
        //     email: email.current.value, password: password.current.value }));
    };
    console.log(user);
    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <div class="login">
            <div class="loginWrapper">
                <div class="loginLeft">
                    <h3 class="loginLogo">Artovox</h3>
                    <span class="loginDes">
                        Connect and fall in love with Art on Artovox.
                    </span>
                </div>
                {/* <form action="/login" method="post"> */}
                <div class="loginRight">
                    <form class="loginBox" onSubmit={handleClick}>
                        <input type="email" name="email" required placeholder="Email" class="loginInput" ref={email} />
                        <input type="password" name="password" required
                            minLength="6" placeholder="password" class="loginInput" ref={password} />
                        <button class="loginButton">{isFetching ? <CircularProgress color="white" size='18px' /> : "Log In"}</button>
                        <span class="loginForgot">Forgot Password?</span>
                        
                        
                        <button class="loginRegister">
                            <a href="/register">
                                Create New Account
                            </a>

                        </button>

                    </form>
                </div>
                {/* </form> */}
            </div>
        </div>

    )
}
