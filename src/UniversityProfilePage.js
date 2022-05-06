import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import { db, auth } from './firebase';
import { collection, getDocs, query, orderBy, getDoc, doc } from "firebase/firestore";
import HeaderNoLogueado from './HeaderNoLogueado';
import Footer from './Footer';
import HeaderLogueado from './HeaderLogueado';
import lupa from './assets/images/lupa.png';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { onAuthStateChanged } from 'firebase/auth';



import './UniversityProfilePage.css';
import './assets/jquery.star-rating-svg';
import './assets/star-rating-svg.css';
import HideInfo from './HideInfo';

function UniversityProfilePage() {
	const { id } = useParams();

	const [university, setUniversity] = useState([]);
	const [degrees, setDegrees] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	var degreesOrdered = [];

	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	const filtrar = () => {
		degreesOrdered = [];
		const text = searchInput.toLowerCase();
		for (let degree of degrees) {
			if (degree.data.name.toLowerCase().indexOf(text) !== -1) {
				degreesOrdered.push(degree);
			}
		}
		setSearchResults(degreesOrdered);
	}

	const loadUniversity = async () => {
		const docRef = doc(db, "universities", id)
		getDoc(docRef).then((docSnap) => {
			if (docSnap.exists()) {
				setUniversity(docSnap.data());
				loadDegrees(docSnap.data().degrees);
			}
		})

	}



	const loadDegrees = (arr) => {
		var keys = Object.keys(arr).map((key) => [key]);
		for (let i = 0; i < keys.length; i++) {
			const docRef = doc(db, "degrees", keys[i][0]);
			getDoc(docRef).then((docSnap) => {
				setSearchResults(degrees);
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
				{ loadUser(user.uid) }
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

			<main className="university-info-container">
				<div className="UniversityProfile__universidades">
					<div className="UniversityProfile__textoEncimaImagen">
						<p className="UniversityProfile__textoUniversidad">{university.name}</p>
						<p className="UniversityProfile__textoPais">{university.country}</p>
					</div>
					<div className="UniversityProfile__field" id="searchform">
						<input type="text" value={searchInput} onClick={filtrar} onChange={e => { setSearchInput(e.target.value); filtrar() }} id="searchterm" placeholder="Search..." className="inputBuscador" />
						<button type="button" id="search"><img src={lupa} className="UniversityProfile__lupaBuscador" alt="Lupa buscador" /></button>
					</div>
				</div>
				<div className="university-totals">
					<div className="total-info">
						<p className="total-txt">Total degrees&nbsp;</p>
						<p>100</p>
					</div>
					<div className="total-info">
						<p className="total-txt">Total projects upload&nbsp;</p>
						<p>198</p>
					</div>
					<div className="total-info">
						<p className="total-txt">Total subjects&nbsp;</p>
						<p>202</p>
					</div>
				</div>
				<hr />
				<div className="my-rating-4" data-rating="0">
				</div>

				{(() => {
					if (!user) {
						return (
							<HideInfo></HideInfo>

						)
					} else {
						return (
							<Fragment>

								{degrees.map((degree) => (
									<div class="uni-degree">
										<Link to={`/DegreeProfile/${degree.id}`}>
											<p>{degree.data.name}</p>
										</Link>
									</div>
								))}
								<div id="degree-not-found-msg" >
									<p>University not found, please <a href="#">fill</a> this form to add the university needed</p>
								</div>
							</Fragment>

						)
					}
				})()}
			</main>
			<Footer></Footer>
		</div>

	)


}


export default UniversityProfilePage;
