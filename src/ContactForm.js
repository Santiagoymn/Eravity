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

	function validationCorreo(email) {
		const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if (regex.test(email)){
			return true;
		} else {
			return false;
		}
	}

	const checkForm = (e) => {
        e.preventDefault();
        if((name != "") && (surname != "") && (email != "") && (message != "")){
			if (validationCorreo(email)){
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
				
			}
			else{
				alert("The email introduced is not an email");
			}
        
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
	
            <main className="main-container">
	
                <form id="form">
			        <div className="row" id="rowPadding">
				        <div className="column" id="columnPadding">
					        <div className="subtitle">First name:</div>
					        <input value={name} type="text" onChange={e => setName(e.target.value)} className="textbox" name="Name" required/>
				        </div>
				        <div className="column">
					        <div className="subtitle">Last name:</div>
					        <input value={surname} type="text" onChange={e => setSurname(e.target.value)} className="textbox" name="Surname" required/>
				        </div>
			        </div>
			        <div className="row">
				        <div className="subtitle">Email:</div>
				        <input value={email} type="text" onChange={e => setEmail(e.target.value)} className="textbox" name="Email" required/>
			        </div>
			        <div className="row">
				        <div className="subtitle">Message:</div>
				        <input value={message} type="text" onChange={e => setMessage(e.target.value)} className="textbox" name="Message" required/>
			        </div>
			        <div className="row" id="SubmitBotton">
				        <input type="submit" onClick={checkForm} value="Send" id="botton"/>
			        </div>
		        </form>
        
            </main>
			<Footer/>
        </body>
    )
}
export default ContactForm;