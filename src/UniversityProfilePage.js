import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import { db } from './firebase';
import { doc, getDoc } from "firebase/firestore";
import HeaderNoLogueado from './HeaderNoLogueado';
import Footer from './Footer';
import HeaderLogueado from './HeaderLogueado';
import { Link } from "react-router-dom";


import lupa from './assets/images/lupa.png';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import {onAuthStateChanged} from 'firebase/auth';


import './UniversityProfilePage.css';
import './assets/jquery.star-rating-svg';
import './assets/star-rating-svg.css';

function UniversityProfilePage() {
	const { id } = useParams();
	const [university, setUniversity] = useState([]);
	const [degrees, setDegrees] = useState([]);

	const loadUniversity = async () => {

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

	const loadDegrees = (arr) => {
		var keys = Object.keys(arr).map((key) => [key]);

		for (let i = 0; i < keys.length; i++) {

			const docRef = doc(db, "degrees", keys[i][0]);
			getDoc(docRef).then((docSnap) => {
				if (docSnap.exists()) {
					setDegrees(degrees => [...degrees,
					{
						id: keys[i][0],
						data: docSnap.data()
					}])
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

	const user = useSelector(selectUser);
    const dispatch = useDispatch();
	console.log(degrees);

  // check at page load if a user is authenticated
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

	return (
		<div>
	{(() => {
		if (user) {
			return (
				<HeaderLogueado></HeaderLogueado>
			)
		} else {
			return (
				<HeaderNoLogueado></HeaderNoLogueado>
			)
		}
	})()}

<main class="university-info-container">
	<div class="UniversityProfile__universidades">
		<div class="UniversityProfile__textoEncimaImagen">
			<p class="UniversityProfile__textoUniversidad">{university.name}</p>
			<p class="UniversityProfile__textoPais">{university.country}</p>
		</div>
		<div class="UniversityProfile__field" id="searchform">
			<input type="text" id="searchterm" placeholder="Search..." class="inputBuscador" />
			<button type="button" id="search"><img src={lupa} class="UniversityProfile__lupaBuscador" alt="Lupa buscador" /></button>
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
	<hr />
	<div class="my-rating-4" data-rating="0">
	</div>

	{degrees.map((degree) => (
		<div class="uni-degree">
			<Link to={`/DegreeProfile/${degree.id}`}>
				<p>{degree.data.name}</p>
            </Link>
		</div>
	))}

	{degrees.length == 0 &&
		<div id="degree-not-found-msg">
			<p>Degree not found, please <a href="#">fill</a> this form to add the degree needed</p>
		</div>
	}

</main>
<Footer></Footer>
</div>

			)


}


export default UniversityProfilePage;
