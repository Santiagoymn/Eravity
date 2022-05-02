import Helmet from "react-helmet";
import React, { useEffect, useState } from 'react'
import './universityProfilePageStyle.css'
import { collection, getDocs, query, orderBy, getDoc } from "firebase/firestore";
import { db } from "./firebase";

function UniversityProfilePage() {

    const[searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const[degrees, setDegrees] = useState([]);
    var degreesOrdered = [];

    // Loading Database (example)
	/* const degrees = [
		{name: 'Informatica'},
		{name: 'Biologia'},
		{name: 'Matematica'},
		{name: 'Lettere'},
		{name: 'Musica'},
	];*/
	//degrees.sort((a, b) => a.name.localeCompare(b.name));
	
	const formulario = document.querySelector('#searchterm');
	const result = document.querySelector('#degrees-list');
		
	const filtrar = ()=>{
		result.innerHTML = '';
		const text = formulario.value.toLowerCase();

		for(let degree of degrees){
			let name = degree.name.toLowerCase();
			if(name.indexOf(text) !== -1){
                degreesOrdered.push(name);
			}
		}

        setSearchResults(degreesOrdered);
			
		if(result.innerHTML === ''){
			result.innerHTML += '<div id="degree-not-found-msg"><p>Degree not found, please <a href="#">fill</a> this form to add the degree needed</p></div>';
		}
	}

    useEffect(() => {
        getDocs(query(collection(db, "universities"), orderBy("name"))).then((querySnapshot) => {
            setDegrees(querySnapshot.docs.map(doc => ({
                data: doc.data()
            })));
        }).then(() => {
            setSearchResults(degrees);
            
        });
    
    }, [])
		
	formulario.addEventListener('keyup', filtrar);
		
	filtrar();

    return(
        <div>
            <Helmet>
                <meta charset="UTF-8" />
                <title>Eravity</title>
            </Helmet>
            <div class="universidades">
                <div class="textoEncimaImagen">
                    <p class="textoUniversidad">University</p>
                    <p class="textoPais">Country</p>
                </div>

                <div class="field" id="searchform">
                    <input type="text" id="searchterm" placeholder="Search..." class="inputBuscador" />
                    <button type="button" id="search"></button>
                </div>
            </div>
            
            <div class="university-totals">
                <div class="total-info">
                    <p class="total-txt">Total degrees&nbsp;</p>
                    <p>100</p>
                </div>
                <div class="total-info">
                    <p class="total-txt">Total projects upload&nbsp;</p>
                    <p>198</p>
                </div>
                <div class="total-info">
                    <p class="total-txt">Total subjects&nbsp;</p>
                    <p>202</p>
                </div>
            </div>
            <hr/>
            <div id="degrees-list"></div>
        </div>
    );

}

export default UniversityProfilePage