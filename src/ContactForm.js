import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { db } from './firebase';
import {collection, query, where, doc, getDocs, addDoc} from "firebase/firestore";

import HeaderLogueado from './HeaderLogueado';
import Footer from './Footer';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import {onAuthStateChanged} from 'firebase/auth';


import './contactForm.css';

function ContactForm() {
	const[name, setName] = useState("");
    const[surname, setSurname] = useState("");
    const[email,setEmail] = useState("");
	const[message,setMessage] = useState("");

	const checkForm = (e) => {
        e.preventDefault();
        if((name != "") && (surname != "") && (email != "") && (message != "")){
            const q = query(collection(db, "contact_forms"), where("name", "==", name), where("surname", "==", surname), where("email", "==", email), where("message", "==", message));
            getDocs(q).then((querySnapshot) => {
            if(querySnapshot.empty){
                addDoc(collection(db, "contact_forms"), {
                    name: name,
                    surname: surname,
                    email: email,
					message: message
            }).catch(error => alert(error.message))
                alert("The message is been correctly sent, you will recive an administrator's answer as soon as possible. Thanks for your communication!");
            } else {
                alert("Unfortunately, there was a system error. Try again later please.");
            }
            })
        }else{
            alert("All fields are required!");
        }
    }

    return(
        <body>

			<Helmet>
            	<meta charset="UTF-8"/>
            	<title>Contact Form</title>
        	</Helmet>

			{(() => {return(<HeaderLogueado></HeaderLogueado>)})()}
	
            <main class="main-container">
	
                <form id="form">
			        <div class="row" id="rowPadding">
				        <div class="column" id="columnPadding">
					        <h1 class="subtitle">First name:</h1>
					        <input value={name} type="text" onChange={e => setName(e.target.value)} class="textbox" name="Name" required/>
				        </div>
				        <div class="column">
					        <h1 class="subtitle">Last name:</h1>
					        <input value={surname} type="text" onChange={e => setSurname(e.target.value)} class="textbox" name="Surname" required/>
				        </div>
			        </div>
			        <div class="row">
				        <h1 class="subtitle">Email:</h1>
				        <input value={email} type="text" onChange={e => setEmail(e.target.value)} class="textbox" name="Email" required/>
			        </div>
			        <div class="row">
				        <h1 class="subtitle">Message:</h1>
				        <input value={message} type="text" onChange={e => setMessage(e.target.value)} class="textbox" name="Message" required/>
			        </div>
			        <div class="row" id="SubmitBotton">
				        <input type="submit" onClick={checkForm} value="Send" id="botton"/>
			        </div>
		        </form>
        
            </main>
			<Footer/>
        </body>
    )
}