import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import { db, auth } from './firebase';
import { doc, getDoc } from "firebase/firestore";
import HeaderNoLogueado from './HeaderNoLogueado';
import Footer from './Footer';
import HeaderLogueado from './HeaderLogueado';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import arrowCirle from './assets/images/arrow-circle-down.svg';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { onAuthStateChanged } from 'firebase/auth';


import './SubjectPage.css';
import './assets/jquery.star-rating-svg';
import './assets/star-rating-svg.css';
import NotEnoughCredits from './NotEnoughCredits';

function SubjectPage() {
	const { id } = useParams();
	const [subject, setSubject] = useState('');
	const [university, setUniversity] = useState('');
	const [degree, setDegree] = useState('');
	const [url, setUrl] = useState('');
	const [credits, setCredits] = useState();
	const [isAdmin, setIsAdmin] = useState();


	const loadSubject = async () => {
		const docRef = doc(db, "subjects", id)
		getDoc(docRef).then((docSnap) => {
			if (docSnap.exists()) {
				setSubject(docSnap.data());
				loadDegree(docSnap.data().degreeId);
				loadUniversity(docSnap.data().universityId);
				setUrl(docSnap.data().proyectRef);
			}
			else {
				console.log("No such document!");
			}
		})

	}

	const loadDegree = (arr) => {

		const docRef = doc(db, "degrees", arr);
		getDoc(docRef).then((docSnap) => {
			if (docSnap.exists()) {
				setDegree(docSnap.data().name);
			}
			else {
				console.log("No such document!");
			}

		})
	}

	const loadUniversity = (arr) => {

		const docRef = doc(db, "universities", arr);
		getDoc(docRef).then((docSnap) => {
			if (docSnap.exists()) {
				setUniversity(docSnap.data().name);
			}
			else {
				console.log("No such document!");
			}

		})
	}

	const loadUser = async (uid) => {
		const docRef = doc(db, "users", uid)
		getDoc(docRef).then((docSnap) => {
			if (docSnap.exists()) {
				setCredits(docSnap.data().creditos);
				setIsAdmin(docSnap.data().admin);
			}
		})

	}

	const downloadFile = (fileRef) => {
		const storage = getStorage();
		const teachingProject = ref(storage, fileRef);
		getDownloadURL(teachingProject).then((url => {
			console.log(url);
			setUrl(url);
		}))
	}

	useEffect(() => {
		loadSubject();

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
					{ loadUser(user.uid) }
					console.log(user);
					{ logout() }
					console.log(user);
					if (credits < 60 && !isAdmin) {

						return (
							<Fragment>
								<HeaderLogueado></HeaderLogueado>
								<div className='NotEnoughContainer'>
									<NotEnoughCredits></NotEnoughCredits>
								</div>

							</Fragment>

						)
					} else {
						return (
							<Fragment>
								<HeaderLogueado></HeaderLogueado>
								<main className="subjectProfile__info-container text">

									<div className="subjectProfile__field">
										<p className="subjectProfile__title">id:</p>
										<p>{subject.subjectId}</p>
									</div>

									<div className="subjectProfile__field">
										<p className="subjectProfile__title">name:</p>
										<p>{subject.name}</p>
									</div>
									<div className="subjectProfile__field">
										<div className="subjectProfile__field">
											<p className="subjectProfile__title">ECTS:</p>
											<p>{subject.credits}</p>
										</div>
										<div className="subjectProfile__field">
											<p className="subjectProfile__title">year:</p>
											<p>{subject.proyectYear}</p>
										</div>
										<div className="subjectProfile__field">
											<p className="subjectProfile__title">semester:</p>
											<p>{subject.quarter}</p>
										</div>
									</div>
									<div className="subjectProfile__field">
										<p className="subjectProfile__title">degree:</p>
										<p>{degree}</p>
									</div>
									<div className="subjectProfile__field">
										<p className="subjectProfile__title">university:</p>
										<p>{university}</p>
									</div>

									<div className="subjectProfile__title">languages</div>
									<div className="subjectProfile__languagesCB">
										<div className="subjectProfile__languageDivCB"><input type="checkbox" id="englishCB" className="languageCB" disabled /><label
											for="englishCB">english</label></div>
										<div className="subjectProfile__languageDivCB"><input type="checkbox" id="frenchCB" className="languageCB" checked disabled /><label
											for="frenchCB">french</label></div>
										<div className="subjectProfile__languageDivCB"><input type="checkbox" id="dutchCB" className="languageCB" disabled /><label
											for="dutchCB">dutch</label></div>
										<div className="subjectProfile__languageDivCB"><input type="checkbox" id="spanishCB" className="languageCB" checked disabled /><label
											for="spanishCB">spanish</label></div>
										<div className="subjectProfile__languageDivCB"><input type="checkbox" id="germanCB" className="languageCB" disabled /><label
											for="germanCB">german</label></div>
										<div className="subjectProfile__languageDivCB"><input type="checkbox" id="otherCB" className="languageCB" disabled /><label
											for="otherCB">other</label></div>
									</div>

									<p className="subjectProfile__title">prerequisites:</p>
									<textarea className='subjectProfile__textarea' disabled value={subject.prerequisites} ></textarea>

									<p className="subjectProfile__title">contents:</p>
									<textarea className='subjectProfile__textarea' disabled value={subject.content}></textarea>

									<a target="_blank" href={subject.url}>Url where the information was obtained</a>

								</main>
								<div className="subjectProfile__qualifying-container">
									<div className="subjectProfile__qualifying">
										<div className="titleQualifying">Teaching staff</div>
										<div className="textQualifying">Do they help students? Do they provide good explanations?</div>
										<div className="my-rating-4" data-rating="0">
										</div>
									</div>
									<div className="subjectProfile__qualifying">
										<div className="titleQualifying">Contents</div>
										<div className="textQualifying">Do they adapt to the educational programme?</div>
										<div className="my-rating-4" data-rating="0">
										</div>
									</div>
									<div className="subjectProfile__qualifying">
										<div className="titleQualifying">Difficulty</div>
										<div className="textQualifying">Are the contents difficult?</div>
										<div className="my-rating-4" data-rating="0">
										</div>
									</div>
									<div className="subjectProfile__qualifying">
										<div className="titleQualifying">Interest</div>
										<div className="textQualifying">Are the contents interesting? Were they useful?</div>
										<div className="my-rating-4" data-rating="0">
										</div>
									</div>
									<div className="subjectProfile__qualifying">
										<div className="titleQualifying">Time commitment</div>
										<div className="my-rating-4" data-rating="0">
										</div>
									</div>
									<div className="subject__file-upload-container text">
										<label htmlFor="subject__file-upload" className="subject__custom-file-upload">
											Download Educational Programm
										</label>

										<a className='subject__a' href={url} target="_blank" id="subject__file-upload"> 
			 								<img className="subject__download-image" src={arrowCirle} alt="download"/> 
										</a>

									</div>

									<div className="subjectProfile__buttonAccept"><input type="submit" className="subjectProfile__acceptBtn" value="Accept" /></div>

								</div>
							</Fragment>
						)
					}

				} else {
					return (
						<HeaderNoLogueado></HeaderNoLogueado>
					)
				}
			})()}




			<Footer></Footer>
		</div>

	)


}


export default SubjectPage;
