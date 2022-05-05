import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import { db, auth } from './firebase';
import { doc, getDoc} from "firebase/firestore";

import './degreeProfilePage.css';
import './assets/jquery.star-rating-svg';
import './assets/star-rating-svg.css';
import HeaderNoLogueado from './HeaderNoLogueado';
import Footer from './Footer';
import HeaderLogueado from './HeaderLogueado';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import {onAuthStateChanged} from 'firebase/auth';


function DegreeProfilePage() {
    const { id } = useParams();
    const [degree, setDegree] = useState([]);
    const [university, setUniversity] = useState([]);
    const [subjects, setSubjects] = useState([]);



    const loadDegree = async () => {

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

    const loadSubjects = (o) => {
        var keys = Object.keys(o).map((key) => [key]);

        for (let i = 0; i < keys.length; i++) {
            const docRef = doc(db, "subjects", keys[i][0]);
            getDoc(docRef).then((docSnap) => {
                if (docSnap.exists()) {
                    setSubjects(subjects => [...subjects, docSnap.data()])
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

            <div className="DegreeProfile__uniContainer">
                <div className="DegreeProfile__universityDegree">
                    <div className="DegreeProfile__universityName"> {university} </div>
                    <div className="DegreeProfile__degreeName"> {degree.name} </div>
                </div>
            </div>

            <article className="DegreeProfile__year">
                <div className="DegreeProfile__headerYear">
                    <div className="DegreeProfile__text">Year 1</div>
                </div>
                <div className="DegreeProfile__semesters">
                    <table className="DegreeProfile__tableSemester">
                        <thead>
                            <tr>
                                <th colspan="1" className="DegreeProfile__semester">First Semester</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((subject) => (
                                <tr>
                                    <td className="DegreeProfile__subjects">{subject.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table className="DegreeProfile__tableSemester">
                        <thead>
                            <tr>
                                <th colspan="1" className="DegreeProfile__semester">Second Semester</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((subject) => (
                                <tr>
                                    <td className="DegreeProfile__subjects">{subject.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </article>
            <Footer></Footer>
        </div>
    )


}


export default DegreeProfilePage;
