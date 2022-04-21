import { signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { useDispatch } from 'react-redux';
import { auth, db } from './firebase';
import './loginStyle.css';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userAuth) => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName,
                })
                );
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
                <div class="container">
                    <div class="rightPart">
                        <div class="title1">Join us!</div>
                        <div class="title2">The easiest way to go on Erasmus</div>
                    </div>
                    <div class="leftPart">
                        <div class="titlePage">Eravity</div>
                        <form>
                            <div class="conjuntoInput">
                                <img src="images/Imagen%202.png" class="icono" alt="Usuario" />
                                <input type="text" id="email" name="email" placeholder="email" required />
                            </div>
                            <div class="conjuntoInput">
                                <img src="images/Imagen%201.png" class="icono" alt="Contraseña" />
                                <input type="password" id="passwd" name="passwd" placeholder="password" required />
                            </div>
                            <div class="botonForm">
                                <button type="button" value="Iniciar Sesión" id="inicio" onclick="InicioSesion">
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