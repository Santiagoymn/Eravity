import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import { db } from './firebase';
import { doc, getDoc } from "firebase/firestore";
import HeaderNoLogueado from './HeaderNoLogueado';
import Footer from './Footer';
import HeaderLogueado from './HeaderLogueado';
import { Link } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import arrowCirle from './assets/images/arrow-circle-down.svg';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import {onAuthStateChanged} from 'firebase/auth';


import './SubjectPage.css';
import './assets/jquery.star-rating-svg';
import './assets/star-rating-svg.css';

function SubjectPage() {
	const { id } = useParams();
	const [subject, setSubject] = useState ('');
	const [university, setUniversity] = useState('');
	const [degree, setDegree] = useState('');
	const [Url, setUrl] = useState('');
	

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

	const downloadFile = (fileRef) =>{
		const storage = getStorage();
		const teachingProject = ref(storage, fileRef);
		getDownloadURL(teachingProject).then((url =>{
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
			return (
				<HeaderLogueado></HeaderLogueado>
			)
		} else {
			return (
				<HeaderNoLogueado></HeaderNoLogueado>
			)
		}
	})()}

<main class="subjectProfile__info-container text">

	<div class="subjectProfile__field">
		<p class="subjectProfile__title">id:</p>
		<p>{subject.subjectId}</p>
	</div>

	<div class="subjectProfile__field">
		<p class="subjectProfile__title">name:</p>
		<p>{subject.name}</p>
	</div>
	<div class="subjectProfile__field">
		<div class="subjectProfile__field">
			<p class="title">ECTS:</p>
			<p>{subject.credits}</p>
		</div>
		<div class="subjectProfile__field">
			<p class="subjectProfile__title">year:</p>
			<p>{subject.projectYear}</p>
		</div>
		<div class="subjectProfile__field">
			<p class="subjectProfile__title">semester:</p>
			<p>{subject.quarter}</p>
		</div>
	</div>
	<div class="subjectProfile__field">
		<p class="subjectProfile__title">degree:</p>
		<p>{degree}</p>
	</div>
	<div class="subjectProfile__field">
		<p class="subjectProfile__title">university:</p>
		<p>{university}</p>
	</div>

	<div class="subjectProfile__title">languages</div>
	<div class="subjectProfile__languagesCB">
		<div class="subjectProfile__languageDivCB"><input type="checkbox" id="englishCB" class="subjectProfile__languageCB" disabled/><label
				for="englishCB">english</label></div>
		<div class="subjectProfile__languageDivCB"><input type="checkbox" id="frenchCB" class="subjectProfile__languageCB" checked disabled/><label
				for="frenchCB">french</label></div>
		<div class="subjectProfile__languageDivCB"><input type="checkbox" id="dutchCB" class="subjectProfile__languageCB" disabled/><label
				for="dutchCB">dutch</label></div>
		<div class="subjectProfile__languageDivCB"><input type="checkbox" id="spanishCB" class="subjectProfile__languageCB" checked disabled/><label
				for="spanishCB">spanish</label></div>
		<div class="subjectProfile__languageDivCB"><input type="checkbox" id="germanCB" class="subjectProfile__languageCB" disabled/><label
				for="germanCB">german</label></div>
		<div class="subjectProfile__languageDivCB"><input type="checkbox" id="otherCB" class="subjectProfile__languageCB" disabled/><label
				for="otherCB">other</label></div>
	</div>

	<p class="subjectProfile__title">prerequisites:</p>
	<textarea disabled value={subject.prerequisites} ></textarea>

	<p class="subjectProfile__title">contents:</p>
	<textarea disabled value={subject.content}></textarea>

	<a target="_blank" href={subject.url}>url where the information was obtained</a>

</main>
<div class="subjectProfile__qualifying-container">
	<div class="subjectProfile__qualifying">
		<div class="subjectProfile__titleQualifying">Teaching staff</div>
		<div class="subjectProfile__textQualifying">Do they help students? Do they provide good explanations?</div>
		<div class="my-rating-4" data-rating="0">
		</div>
	</div>
	<div class="subjectProfile__qualifying">
		<div class="subjectProfile__titleQualifying">Contents</div>
		<div class="subjectProfile__textQualifying">Do they adapt to the educational programme?</div>
		<div class="my-rating-4" data-rating="0">
		</div>
	</div>
	<div class="subjectProfile__qualifying">
		<div class="subjectProfile__titleQualifying">Difficulty</div>
		<div class="subjectProfile__textQualifying">Are the contents difficult?</div>
		<div class="my-rating-4" data-rating="0">
		</div>
	</div>
	<div class="subjectProfile__qualifying">
		<div class="subjectProfile__titleQualifying">Interest</div>
		<div class="subjectProfile__textQualifying">Are the contents interesting? Were they useful?</div>
		<div class="my-rating-4" data-rating="0">
		</div>
	</div>
	<div class="subjectProfile__qualifying">
		<div class="subjectProfile__titleQualifying">Time commitment</div>
		<div class="my-rating-4" data-rating="0">
		</div>
	</div>
	<div class="subjectProfile__file-upload-container text">
		<label for="file-upload" class="subjectProfile__custom-file-upload">
			Download Educational Programm
		</label>

		<a href={Url} target="_blank" id="file-upload"> 
			 <img class="subjectProfile__download-image" src={arrowCirle} alt="download"/> 
		</a>

	</div>
	
	<div class="buttonAccept"><input type="submit" class="subjectProfile__acceptBtn" value="Accept"/></div>
	
</div>

<Footer></Footer>
</div>

			)


}


export default SubjectPage;
