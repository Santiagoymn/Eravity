import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import { db } from './firebase';
import { doc, getDoc } from "firebase/firestore";

import lupa from './assets/images/lupa.png';

import './UniversityProfilePage.css';
import './homePageStyle.css';
import './assets/jquery.star-rating-svg';
import './assets/star-rating-svg.css';

function UniversityProfilePage() {
	const {id} = useParams();
	const[university, setUniversity] = useState([]);
	const[degrees, setDegrees] = useState([]);

	const loadUniversity = async() => {

		const docRef = doc(db, "universities", id)
			getDoc(docRef).then((docSnap) => {
				if (docSnap.exists()) {
					setUniversity(docSnap.data());
					loadDegrees(docSnap.data().degrees);	
				} 
				else {
					console.log("No such document!");
				}
			})

	}

	const loadDegrees =(arr) => {
		var keys = Object.keys(arr).map((key) => [key]);

        for(let i=0; i<keys.length; i++){

            const docRef = doc(db, "degrees", keys[i][0]);
            getDoc(docRef).then((docSnap) => {
                console.log(docSnap.data());
                if (docSnap.exists()) {
                    setDegrees(degrees => [...degrees, docSnap.data()])
                } 
                else {
                    console.log("No such document!");
                }

            })
        }
			
	}

	useEffect(() => {
		loadUniversity();
	}, [])


	useEffect(() => {
		$(".my-rating-4").starRating({
			totalStars: 5,
			starShape: 'rounded',
			starSize: 40,
			emptyColor: 'lightgray',
			hoverColor: '#6096BA',
			activeColor: 'green',
			useGradient: false
		})
	}, [])	
		
	return(
		
	<main class="university-info-container">
		<div class="HomePage__universidades">
			<div class="HomePage__textoEncimaImagen">
				<p class="HomePage__textoUniversidad">{university.name}</p>
				<p class="HomePage__textoPais">{university.country}</p>
			</div>
			<div class="HomePage__field" id="searchform">
				<input type="text" id="searchterm" placeholder="Search..." class="inputBuscador"/>
				<button type="button" id="search"><img src={lupa} class="HomePage__lupaBuscador" alt="Lupa buscador"/></button>
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
		<div class="my-rating-4" data-rating="0">
		</div>

		{degrees.map((degree) => (
			<div class="uni-degree">
				<p>{degree.name}</p>
			</div>
		))}
		
		{degrees.length == 0 &&
			<div id="degree-not-found-msg">
				<p>Degree not found, please <a href="#">fill</a> this form to add the degree needed</p>
			</div>
		}
		
	</main>)


}


export default UniversityProfilePage;
