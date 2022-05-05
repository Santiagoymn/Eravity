import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import { db } from './firebase';
import { doc, getDoc } from "firebase/firestore";
import HeaderLogueado from './HeaderLogueado';
import Footer from './Footer';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import {onAuthStateChanged} from 'firebase/auth';


import './contactForm.css';

function ContactForm() {
    return(
        <body>
	
            <main class="main-container">
	
                <form id="form">
			        <div class="row" id="rowPadding">
				        <div class="column" id="columnPadding">
					        <h1 class="subtitle">First name:</h1>
					        <input type="text" class="textbox" name="Name"/>
				        </div>
				        <div class="column">
					        <h1 class="subtitle">Last name:</h1>
					        <input type="text" class="textbox" name="Surname"/>
				        </div>
			        </div>
			        <div class="row">
				        <h1 class="subtitle">Email:</h1>
				        <input type="text" class="textbox" name="Email"/>
			        </div>
			        <div class="row">
				        <h1 class="subtitle">Message:</h1>
				        <input type="text" class="textbox" name="Message"/>
			        </div>
			        <div class="row" id="SubmitBotton">
				        <input type="submit" value="Send" id="botton"/>
			        </div>
		        </form>
        
            </main>
	
        </body>
    )
}