import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import { auth, db } from './firebase';
import { doc, setDoc, docRef, getDoc, getDocs, collection } from "firebase/firestore";

import './degreeProfilePage.css';
import './assets/jquery.star-rating-svg';
import './assets/star-rating-svg.css';

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
                console.log(docSnap.data());
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


    return (
        <div>
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
                            <tr>
                                <td className="DegreeProfile__subjects">Subject 1</td>
                            </tr>
                            <tr>
                                <td className="DegreeProfile__subjects">Subject 2</td>
                            </tr>
                            <tr>
                                <td className="DegreeProfile__subjects">Subject 3</td>
                            </tr>
                            <tr>
                                <td className="DegreeProfile__subjects">Subject 4</td>
                            </tr>
                            <tr>
                                <td className="DegreeProfile__subjects">Subject 5</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>
        </div>
    )


}


export default DegreeProfilePage;
