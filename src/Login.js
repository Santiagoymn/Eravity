import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { auth } from './firebase';
import { login, logout, selectUser } from './features/userSlice';
import { useNavigate } from "react-router-dom";
import './loginStyle.css';
import { useDispatch, useSelector } from 'react-redux';

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
                navigate("/")
                //} else {
                //   alert("User must be verified first. Check your email");
                //}
            }).catch(error => alert(error));
    };

    let navigate = useNavigate();

    const user = useSelector(selectUser);

    useEffect(() => {
        onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                // user is logged in, send the user's details to redux, store the current user in the state
                dispatch(
                    login({
                        email: userAuth.email,
                        uid: userAuth.uid,
                        displayName: userAuth.displayName,
                        photoUrl: userAuth.photoURL,
                    })
                );
            } else {
                dispatch(logout());
            }
        });
    }, []);

    function loggedIn() {
        if (user) {
            return (true);
        } else {
            return (false);

        }
    }


    return (
        <Fragment>
            {(() => {
                if (loggedIn()) {
                    console.log(loggedIn());
                    return (
                        <Fragment>
                            {alert("Already logged")}
                            {navigate("/Home")}
                            
                        </Fragment>

                    )
                } else {
                    return (
                        <Fragment>
                            <Helmet>
                            <script src="https://kit.fontawesome.com/f9a9bc67cc.js" crossorigin="anonymous"></script>
                            </Helmet>

                            <div className="Login__container">

                                <div className="Login__left">
                                    <div className="Login__contentLeft">
                                        <div className="Login__title1">Join us!</div>
                                        {console.log("Aqui")}
                                        <div className="Login__title2">The easiest way to go on Erasmus</div>
                                    </div>
                                </div>

                                <div className="Login__right">
                                    <div className="Login__contentRight">

                                        <div className="Login__titlePage"> Eravity </div>

                                        <form className="login">
                                            <div className="Login__column">
                                                <div className="login__field" id="Login__top">
                                                    <div className="login__icon fas fa-user fa-2xl"></div>
                                                    <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="login__input" placeholder="email" required />
                                                </div>
                                                <div className="login__field" id="Login__down">
                                                    <div className="login__icon fas fa-lock fa-2xl"></div>
                                                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="login__input" placeholder="password" required />
                                                </div>
                                                <div className="Login__button">
                                                    <button id="buttonLogIn" className="button login__submit" type="submit" onClick={loginToApp}>Login</button>
                                                </div>
                                            </div>
                                        </form>

                                        <div className="textQuestionSignUp">If you don't have an account:</div>
                                        <button id="buttonSignUp" type="submit" className="button login__submit" onClick={() => navigate("/Register")}>Sign up</button>

                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )
                }
            })()}


        </Fragment>

    )
}

export default Login