import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import $ from 'jquery';
import { db } from './firebase';
import { collection, doc, getDoc, query,getDocs, orderBy, deleteDoc, updateDoc } from "firebase/firestore";
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


import './subjectRevisionStyle.css';
import './assets/jquery.star-rating-svg';
import './assets/star-rating-svg.css';
import { checkIfLogged } from './Utilities';

function SubjectRevision() {
	const [subject, setSubject] = useState ('');
	const [university, setUniversity] = useState('');
	const [degree, setDegree] = useState('');
	const [Url, setUrl] = useState('');
	const[docId, setDocId] = useState("");
	
	let navigate = useNavigate();
	

	const loadSubject = async () => {

		const subjectRef = collection(db, "subjects_administrator")
		const q = query(subjectRef, orderBy("timestamp", "desc")); 

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			console.log(doc.data().content)
			if (doc.exists()) {
				setDocId(doc.id);

				setSubject(doc.data());
				loadDegree(doc.data().degreeId);
				loadUniversity(doc.data().universityId);
				setUrl(doc.data().projectRef);
			}
			else {
				console.log("No such document!");
			}
			
			})

			if(querySnapshot.empty){
				alert("No More Applications");
				navigate("/AdminProfile");

			}
			
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

	const rejectSubject = () => {
		console.log("aquí")
		deleteDoc(doc(db, "subjects_administrator", docId)).then(() => {
			alert("Request Denied");
			window.location.reload();
		})

		
	}

	const acceptSubject = () => {
		updateDoc(doc(db, 'subjects', subject.originalSubjectId), {
			degreeId: subject.degreeId,
			subjectId: subject.subjectId,
			name: subject.name,
			credits: subject.credits,
			course: subject.course,
			quarter: subject.quarter,
			prerequisites: subject.prerequisites,
			content: subject.content,
			proyectYear: subject.proyectYear,
			url: subject.url,
			languajes: subject.languajes,
			universityId: subject.universityId,
			proyectRef: subject.proyectRef,
			timestamp: subject.timestamp
		}).then(() => {
			deleteDoc(doc(db, "subjects_administrator", docId)).then(() => {
				alert("Request Accepted");
			}).then(() => {
				getDoc(doc(db, 'users', subject.uidRequest)).then((userObject) => {
					updateDoc(doc(db, 'users', subject.uidRequest), {
						creditos: Number(userObject.get("creditos")) + Number(subject.credits)

					})
					
				}).then(() => {
					window.location.reload();
			})
			})
		})
		
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
    checkIfLogged(dispatch);
    
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

<main className="subject-info-container text">
			

	<div className="subject__field">
		<p className="subject__title">id:</p>
		<p>{subject.subjectId}</p>
	</div>

	<div className="subject__field">
		<p className="subject__title">name:</p>
		<p className="subject__info">{subject.name}</p>
	</div>
	<div className="subject__field">
		<div className="subject__field">
			<p className="subject__title">ECTS:</p>
			<p>{subject.credits}</p>
		</div>
		<div className="subject__field">
			<p className="subject__title">year:</p>
			<p>{subject.projectYear}</p>
		</div>
		<div className="subject__field">
			<p className="subject__title">semester:</p>
			<p>{subject.quarter}</p>
		</div>
	</div>
	<div className="subject__field">
		<p className="subject__title">degree:</p>
		<p className="subject__info">{degree}</p>
	</div>
	<div className="subject__field">
		<p className="subject__title">university:</p>
		<p className="subject__info">{university}</p>
	</div>

	<div className="subject__title">languages</div>
	<div className="subject__languagesCB">
		<div className="languageDivCB"><input type="checkbox" id="englishCB" className="subject__inputCheckbox" disabled/>
		<label htmlFor="englishCB">english</label></div>
		<div className="languageDivCB"><input type="checkbox" id="frenchCB" className="subject__inputCheckbox" checked disabled/>
		<label htmlFor="frenchCB">french</label></div>
		<div className="languageDivCB"><input type="checkbox" id="dutchCB" className="subject__inputCheckbox" disabled/> 
		<label htmlFor="dutchCB">dutch</label></div>
		<div className="languageDivCB"><input type="checkbox" id="spanishCB" className="subject__inputCheckbox" checked disabled/>
		<label htmlFor="spanishCB">spanish</label></div>
		<div className="languageDivCB"><input type="checkbox" id="germanCB" className="subject__inputCheckbox" disabled/>
		<label htmlFor="germanCB">german</label></div>
		<div className="languageDivCB"><input type="checkbox" id="otherCB" className="subject__inputCheckbox" disabled/>
		<label htmlFor="otherCB">other</label></div>
	</div>

	<p className="subject__title">prerequisites:</p>
	<textarea className='subject__textarea' disabled value={subject.prerequisites} ></textarea>

	<p className="subject__title">contents:</p>
	<textarea className='subject__textarea' disabled value={subject.content}></textarea>

	<a className='subject__a' target="_blank" href={subject.url}>url where the information was obtained</a>

</main>
<div className="subject__qualifying-container">
	<div className="subject__qualifying">
		<div className="titleQualifying">Teaching staff</div>
		<div className="textQualifying">Do they help students? Do they provide good explanations?</div>
		<div className="my-rating-4" data-rating="0">
		</div>
	</div>
	<div className="subject__qualifying">
		<div className="titleQualifying">Contents</div>
		<div className="textQualifying">Do they adapt to the educational programme?</div>
		<div className="my-rating-4" data-rating="0">
		</div>
	</div>
	<div className="subject__qualifying">
		<div className="titleQualifying">Difficulty</div>
		<div className="textQualifying">Are the contents difficult?</div>
		<div className="my-rating-4" data-rating="0">
		</div>
	</div>
	<div className="subject__qualifying">
		<div className="titleQualifying">Interest</div>
		<div className="textQualifying">Are the contents interesting? Were they useful?</div>
		<div className="my-rating-4" data-rating="0">
		</div>
	</div>
	<div className="subject__qualifying">
		<div className="titleQualifying">Time commitment</div>
		<div className="my-rating-4" data-rating="0">
		</div>
	</div>
	<div className="subject__file-upload-container text">
		<label htmlFor="subject__file-upload" className="subject__custom-file-upload">
			Download Educational Programm
		</label>

		<a className='subject__a' href={Url} target="_blank" id="subject__file-upload"> 
			 <img className="subject__download-image" src={arrowCirle} alt="download"/> 
		</a>

	</div>
	<div className='subject__buttons'>
		<div className="subject__buttonReject"><input type="submit" className="subject__Btn" value="Reject" onClick={rejectSubject}/></div>
		<div className="subject__buttonAccept"><input type="submit" className="subject__Btn" value="Accept" onClick={acceptSubject}/></div>
	</div>
	
</div>

<Footer></Footer>
</div>

			)


}


export default SubjectRevision;