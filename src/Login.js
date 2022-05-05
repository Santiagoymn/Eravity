import { getRedirectResult, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { useDispatch } from 'react-redux';
import { auth, db } from './firebase';
import { login } from './features/userSlice';
import { useNavigate } from "react-router-dom";
import './loginStyle.css';
import { Link } from "react-router-dom";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userAuth) => {
                //if (userAuth.user.emailVerified) {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName,
                })

                );
                alert("Log in succesful!")
                navigate("/Home")
                //} else {
                //   alert("User must be verified first. Check your email");
                //}
            }).catch(error => alert(error));
    };

    let navigate = useNavigate();







    return (
        <div>
            <Helmet>
                <title>Login Page</title>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script src="https://kit.fontawesome.com/f9a9bc67cc.js" crossorigin="anonymous"></script>

            </Helmet>
        
            <div className="container">
                <div className="left">
                    <div className="contentLeft">
                        <div className="title1">Join us!</div>
                        <div className="title2">The easiest way to go on Erasmus</div>
                    </div>
                </div>

                <div className="right">
                    <div className="contentRight">

                        <div className="titlePage"><Link to="/" className='TextLink'>Eravity </Link> </div>

                        <form className="login">
                            <div className="column">
                                <div className="login__field" id="top">
                                    <div className="login__icon fas fa-user fa-2xl"></div>
                                    <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="login__input" placeholder="email" required />
                                </div>
                                <div className="login__field" id="down">
                                    <div className="login__icon fas fa-lock fa-2xl"></div>
                                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="login__input" placeholder="password" required />
                                </div>
                                <div className="button">
                                    <button id="buttonLogIn" className="button login__submit" type="submit" onClick={loginToApp}>Login</button>
                                </div>
                            </div>
                        </form>

                        <div className="textQuestionSignUp">If you don't have an account:</div>
                        <button id="buttonSignUp" type="submit" className="button login__submit" onClick={() => navigate("/Register")}>Sign up</button>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login