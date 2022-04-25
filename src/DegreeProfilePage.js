import React, {Component, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import { auth, db } from './firebase';
import { doc, setDoc, docRef, getDoc, getDocs, collection } from "firebase/firestore";

import './degreeProfilePage.css';
import './generalStyle.css';
import './assets/jquery.star-rating-svg';
import './assets/star-rating-svg.css';

function DegreeProfilePage() {
	const {id} = useParams();
	const[degree, setDegree] = useState([]);
    const[university, setUniversity] = useState([]);
	const[subjects, setSubjects] = useState([]);

	

	const loadDegree = async() => {

		const docRef = doc(db, "degrees", id)
			getDoc(docRef).then((docSnap) => {
				if (docSnap.exists()) {
					setDegree(docSnap.data());
                    loadUniveristy(docSnap.data().universityId);
					loadSubjects(docSnap.data().subjects);	
				} 
				else {
					console.log("No such document!");
				}
			})

	}

    const loadUniveristy = (o) => {
        const docRef = doc(db, "universities", o);
            getDoc(docRef).then((docSnap) => {

                if (docSnap.exists()) {
                    setUniversity(docSnap.data().name)
                } 
                else {
                    console.log("No such document!");
                }

            })
    }

	const loadSubjects =(o) => {
		var keys = Object.keys(o).map((key) => [key]);
        
        for(let i=0; i<keys.length; i++){
            
            const docRef = doc(db, "subjects", keys[i][0]);
            getDoc(docRef).then((docSnap) => {
                console.log(docSnap.data().name + "DATOS");
                if (docSnap.exists()) {
                    setSubjects(subjects => [...subjects, docSnap.data()])
                    console.log(subjects);
                } 
                else {
                    console.log("No such document!");
                }

            })
        }
			
	}	


	useEffect(() => {
		loadDegree();
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
		<div>
            <div class="universityDegree">
                <div class="universityName"> {university} </div>
                <div class="degreeName"> {degree.name} </div>
            </div>
            <article class="year">
                <div class="headerYear">
                    <div class="text">Year 1</div>
                </div>
                <div class="semesters">
                    <table class="tableSemester">
                        <thead>
                            <tr>
                                <th colspan="1" class="semester">First Semester</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((subject) => (
                                <tr>
                                    <td class="subjects">{subject.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table class="tableSemester">
                        <thead>
                        <tr>
                            <th colspan="1" class="semester">Second Semester</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="subjects">Subject 1</td>
                        </tr>
                        <tr>
                            <td class="subjects">Subject 2</td>
                        </tr>
                        <tr>
                            <td class="subjects">Subject 3</td>
                        </tr>
                        <tr>
                            <td class="subjects">Subject 4</td>
                        </tr>
                        <tr>
                            <td class="subjects">Subject 5</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </article>
        </div>
    )


}


export default DegreeProfilePage;
