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
	const [Url, setUrl] = useState('');
	const [credits, setCredits] = useState();
	const [isAdmin, setIsAdmin] = useState();


	const loadSubject = async () => {
		const docRef = doc(db, "subjects", id)
		getDoc(docRef).then((docSnap) => {
			if (docSnap.exists()) {
				setSubject(docSnap.data());
				loadDegree(docSnap.data().degreeId);
				loadUniversity(docSnap.data().universityId);
				downloadFile(docSnap.data().teachingProject);
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
								<main class="subject-info-container text">

									<div class="field">
										<p class="title">id:</p>
										<p>{subject.subjectId}</p>
									</div>

									<div class="field">
										<p class="title">name:</p>
										<p>{subject.name}</p>
									</div>
									<div class="field">
										<div class="field">
											<p class="title">ECTS:</p>
											<p>{subject.credits}</p>
										</div>
										<div class="field">
											<p class="title">year:</p>
											<p>{subject.projectYear}</p>
										</div>
										<div class="field">
											<p class="title">semester:</p>
											<p>{subject.quarter}</p>
										</div>
									</div>
									<div class="field">
										<p class="title">degree:</p>
										<p>{degree}</p>
									</div>
									<div class="field">
										<p class="title">university:</p>
										<p>{university}</p>
									</div>

									<div class="title">languages</div>
									<div class="languagesCB">
										<div class="languageDivCB"><input type="checkbox" id="englishCB" class="languageCB" disabled /><label
											for="englishCB">english</label></div>
										<div class="languageDivCB"><input type="checkbox" id="frenchCB" class="languageCB" checked disabled /><label
											for="frenchCB">french</label></div>
										<div class="languageDivCB"><input type="checkbox" id="dutchCB" class="languageCB" disabled /><label
											for="dutchCB">dutch</label></div>
										<div class="languageDivCB"><input type="checkbox" id="spanishCB" class="languageCB" checked disabled /><label
											for="spanishCB">spanish</label></div>
										<div class="languageDivCB"><input type="checkbox" id="germanCB" class="languageCB" disabled /><label
											for="germanCB">german</label></div>
										<div class="languageDivCB"><input type="checkbox" id="otherCB" class="languageCB" disabled /><label
											for="otherCB">other</label></div>
									</div>

									<p class="title">prerequisites:</p>
									<textarea disabled value={subject.prerequisites} ></textarea>

									<p class="title">contents:</p>
									<textarea disabled value={subject.content}></textarea>

									<a target="_blank" href={subject.url}>url where the information was obtained</a>

								</main>
								<div class="qualifying-container">
									<div class="qualifying">
										<div class="titleQualifying">Teaching staff</div>
										<div class="textQualifying">Do they help students? Do they provide good explanations?</div>
										<div class="my-rating-4" data-rating="0">
										</div>
									</div>
									<div class="qualifying">
										<div class="titleQualifying">Contents</div>
										<div class="textQualifying">Do they adapt to the educational programme?</div>
										<div class="my-rating-4" data-rating="0">
										</div>
									</div>
									<div class="qualifying">
										<div class="titleQualifying">Difficulty</div>
										<div class="textQualifying">Are the contents difficult?</div>
										<div class="my-rating-4" data-rating="0">
										</div>
									</div>
									<div class="qualifying">
										<div class="titleQualifying">Interest</div>
										<div class="textQualifying">Are the contents interesting? Were they useful?</div>
										<div class="my-rating-4" data-rating="0">
										</div>
									</div>
									<div class="qualifying">
										<div class="titleQualifying">Time commitment</div>
										<div class="my-rating-4" data-rating="0">
										</div>
									</div>
									<div class="file-upload-container text">
										<label for="file-upload" class="custom-file-upload">
											Download Educational Programm
										</label>

										<a href={Url} target="_blank" id="file-upload">
											<img class="download-image" src={arrowCirle} alt="download" />
										</a>

									</div>

									<div class="buttonAccept"><input type="submit" class="acceptBtn" value="Accept" /></div>

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
