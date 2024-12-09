import axios from 'axios';
import { useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import "./register.css";
import api from '../../utils/api';

export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const history = useNavigate();
    
    
    const handleClick = async(e) => {
        e.preventDefault();
        const user = {
            username : username.current.value,
            email : email.current.value,
            password : password.current.value
     }
     try{
        await axios.post(`${api}/auth/register`, user);
        // return < Navigate to="/login" />;
         history('/login');

          
     }catch(err){
        console.log(err)
     }
    
    //  window.localStorage.setItem("user", JSON.stringify(user));
    };
    
    return ( 
        <div class="login">
            <div class="loginWrapper">
                <div class="loginLeft">
                    <h3 class="loginLogo">Artovox</h3>
                    <span class="loginDes">
                        Connect and fall in love with Art on Artovox.
                    </span>
                </div>
                {/* <form action="/register" method="post"> */}
                    <div class="loginRight">
                        <form class="loginBox" onSubmit={handleClick}>

                            <input type="text" name="username" required ref={username} placeholder="Username" class="loginInput" />
                            <input type="email" name="email" required ref={email} placeholder="Email" class="loginInput" />
                            <input type="password" name="password"  required ref={password} placeholder="password" class="loginInput" 
                            minLength="6"/>

                            <button class="loginButton" id="submition" name="submit" type="submit">
                                <span>Sign Up</span>

                            </button>
 
                            <button class="loginRegister"><a href="/login">
                                Log Into Account

                            </a>
                            </button>
                        
                        </form>
                    </div>
            
            </div>
        </div>
    )
}
