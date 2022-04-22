import { signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { useDispatch } from 'react-redux';
import { auth, db } from './firebase';
import { login } from './features/userSlice'
import './loginStyle.css';

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
                alert("exito");
                //} else {
                //   alert("User must be verified first. Check your email");
                //}
            }).catch(error => alert(error));
    };


    return (
        <div>
            <Helmet>
                <title>Login Page</title>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script src="https://kit.fontawesome.com/f9a9bc67cc.js" crossorigin="anonymous"></script>
                <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Droid+Sans" />

            </Helmet>
            <div>
                <div className="container">
                    <div className="rightPart">
                        <div className="title1">Join us!</div>
                        <div className="title2">The easiest way to go on Erasmus</div>
                    </div>
                    <div className="leftPart">
                        <div className="titlePage">Eravity</div>
                        <form>
                            <div className="conjuntoInput">
                                <img src="images/Imagen%202.png" className="icono" alt="Usuario" />
                                <input value={email} onChange={e => setEmail(e.target.value)} type="text" id="email" name="email" placeholder="email" required />
                            </div>
                            <div className="conjuntoInput">
                                <img src="images/Imagen%201.png" className="icono" alt="Contraseña" />
                                <input value={password} onChange={e => setPassword(e.target.value)} type="password" id="passwd" name="passwd" placeholder="password" required />
                            </div>
                            <div className="botonForm">
                                <button type="button" value="Iniciar Sesión" id="inicio" onClick={loginToApp}>
                                    Iniciar Sesión
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login