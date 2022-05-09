import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import './registerStyle.css';

function Register() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [university, setUniversity] = useState("");
	const [degree, setDegree] = useState("");
	let navigate = useNavigate();

	const register = (e) => {
		e.preventDefault();
		if (validationCorreo()) {
			if (password === repeatPassword) {
				if (validationPassword()) {
					createUserWithEmailAndPassword(auth, email, password)
						.then((userCredential) => {
							setDoc(doc(db, 'users', userCredential.user.uid), {
								university: university,
								degree: degree,
							}).then(() => {
								updateProfile(userCredential.user, {
									displayName: name + " " + surname,
								}).then(() => {
									sendEmailVerification(auth.currentUser);
								})
							}).then(() => {
								signOut(auth).then(() =>{
									alert("Thank you very much for registering, remember that you must validate your email to use the web services");
									navigate("/");
								});
								
							});
						}).catch(error => alert(error.message));
				} else {
					alert("The password does not meet the requirements: It must be between 8 and 16 characters and have at least one uppercase, one lowercase, one digit and one special character");
				}
			} else {
				alert("The passwords doesn't match");
			}
		} else {
			alert("It is not a valid email address");
		}

	}

	function validationCorreo() {
		const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if (regex.test(document.getElementById("idEmail").value)) {
			return true;
		} else {
			return false;
		}
	}

	function validationPassword() {
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%-_.*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
		if (regex.test(document.getElementById("idPassword").value)) {
			return true;
		} else {
			return false;
		}
	}

	return (
		<div>
			<Helmet>
				<title>Register Page</title>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<script src="https://kit.fontawesome.com/f9a9bc67cc.js" crossorigin="anonymous"></script>
				
			</Helmet>
			<div className='register__body'>
				<h1 id="register__title">Eravity</h1>
				<div className="register__main">
					<form className="register">

						<div className="register__column">
							<div className="register__field" id="register__top">
								<i className="register__icon fa-solid fa-envelope fa-2xl"></i>
								<input value={email} id="idEmail" onChange={e => { setEmail(e.target.value); validationCorreo() }} type="email" className="register__input" placeholder="email" required />
							</div>
							<div className="register__field">
								<i className="register__icon fas fa-user fa-2xl"></i>
								<input value={name} onChange={e => setName(e.target.value)} type="text" className="register__input" placeholder="name" required />
							</div>
							<div className="register__field">
								<i className="register__icon fas fa-user fa-2xl"></i>
								<input value={surname} onChange={e => setSurname(e.target.value)} type="text" className="register__input" placeholder="surname" required />
							</div>
							<div className="register__field" id="register__bottom">
								<i className="register__icon fa-solid fa-graduation-cap fa-2xl"></i>
								<input value={university} onChange={e => setUniversity(e.target.value)} type="text" className="register__input" placeholder="university" required />
							</div>
						</div>

						<div className="register__column2">
							<div className="register__field" id="top">
								<i className="register__icon fa-solid fa-book-open fa-2xl"></i>
								<input value={degree} onChange={e => setDegree(e.target.value)} type="text" className="register__input" placeholder="degree/master" required />
							</div>
							<div className="register__field">
								<i className="register__icon fas fa-lock fa-2xl"></i>
								<input value={password} id="idPassword" onChange={e => { setPassword(e.target.value); validationPassword(); }} type="password" className="register__input" placeholder="password" required />
							</div>
							<div className="register__field">
								<i className="register__icon fas fa-lock fa-2xl"></i>
								<input value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} type="password" className="register__input" placeholder="repeat password" required />
							</div>
							<div className="register__field" id="bottom">
								<button type="submit" onClick={register} className="button register__submit"><span className='register__span' >Sign up</span></button>
							</div>
						</div>

					</form>

					<div className="register__back2login">
						<h3 id="register__white">If you already have an account, please <a className='register__a' onClick={() => {navigate("/Login")}}>sign in.</a></h3>
					</div>

				</div>
			</div>
		</div>

	)
}

export default Register