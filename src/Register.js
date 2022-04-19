import { dblClick } from '@testing-library/user-event/dist/click';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc, setDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { auth, db } from './firebase';
import './registerStyle.css'

function Register() {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[repeatPassword, setRepeatPassword] = useState("");
    const[name, setName] = useState("");
    const[surname, setSurname] = useState("");
    const[university, setUniversity] = useState("");
    const[degree, setDegree] = useState("");

    const register = (e) => {
        e.preventDefault();
        if(password === repeatPassword){
            createUserWithEmailAndPassword(auth, email, password)
            //corregir name - updateprofile
            .then((userCredential) => {
                addDoc(collection(db, 'users'),{
                    uid: userCredential.user.uid,
                    name: name + " " + surname,
                    university: university,
                    degree: degree,
                });
        }).catch(error => alert(error.message));
        }else {
            alert("The passwords doesn't match");
        }

    }

  return (
      <div>
    <Helmet>
        <title>Register Page</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<script src="https://kit.fontawesome.com/f9a9bc67cc.js" crossorigin="anonymous"></script>
		<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Droid+Sans" />
        <link rel="stylesheet" type="text/css" href="../css/register.css" />
    </Helmet>
    <div>
		<div id="title" align="center">
			<h1 id="black">Eravity</h1>
		</div>
		<div className="main">
			<form className="register">
			
				<div className="column">
					<div className="register__field" id="top">
						<i className="login__icon fa-solid fa-envelope fa-2xl"></i>
						<input value={email} onChange={e => setEmail(e.target.value)} type="email" className="login__input" placeholder="email" required/>
					</div>
					<div className="register__field">
						<i className="login__icon fas fa-user fa-2xl"></i>
						<input value={name} onChange={e => setName(e.target.value)} type="text" className="login__input" placeholder="name" required/>
					</div>
					<div className="register__field">
						<i className="login__icon fas fa-user fa-2xl"></i>
						<input value={surname} onChange={e => setSurname(e.target.value)} type="text" className="login__input" placeholder="surname" required/>
					</div>
					<div className="register__field" id="bottom">
						<i className="login__icon fa-solid fa-graduation-cap fa-2xl"></i>
						<input value={university} onChange={e => setUniversity(e.target.value)} type="text" className="login__input" placeholder="university" required/>
					</div>
				</div>
				
				<div className="column">
					<div className="register__field" id="top">
						<i className="login__icon fa-solid fa-book-open fa-2xl"></i>
						<input value={degree} onChange={e => setDegree(e.target.value)} type="text" className="login__input" placeholder="degree/master" required/>
					</div>
					<div className="register__field">
						<i className="login__icon fas fa-lock fa-2xl"></i>
						<input value={password} onChange={e => setPassword(e.target.value)} type="password" className="login__input" placeholder="password" required/>
					</div>
					<div className="register__field">
						<i className="login__icon fas fa-lock fa-2xl"></i>
						<input value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} type="password" className="login__input" placeholder="repeat password" required/>
					</div>
					<div className="register__field" id="bottom">
						<button type="submit" onClick={register} className="button register__submit"><span>Sign up</span></button>
					</div>
				</div>
				
			</form>
					
			<div className="back2login">
				<h3 id="white">If you already have an account, please <a href="../html/login.html">sign in.</a></h3>
			</div>
			
		</div>
	</div>

    </div>
  )
}

export default Register