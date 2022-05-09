import React, { Fragment, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import $ from 'jquery';
import { db, auth } from './firebase';
import { doc, getDoc } from "firebase/firestore";
import './degreeProfilePage.css';
import './assets/jquery.star-rating-svg';
import './assets/star-rating-svg.css';
import HeaderNoLogueado from './HeaderNoLogueado';
import Footer from './Footer';
import HeaderLogueado from './HeaderLogueado';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { checkIfLogged, loadUser } from './Utilities';
import HideInfo from './HideInfo';


function DegreeProfilePage() {
    const { id } = useParams();
    const [degree, setDegree] = useState([]);
    const [university, setUniversity] = useState([]);
    const [subjectY1Q1, setsubjectY1Q1] = useState([]);
    const [subjectY1Q2, setsubjectY1Q2] = useState([]);
    const [subjectY2Q1, setsubjectY2Q1] = useState([]);
    const [subjectY2Q2, setsubjectY2Q2] = useState([]);
    const [subjectY3Q1, setsubjectY3Q1] = useState([]);
    const [subjectY3Q2, setsubjectY3Q2] = useState([]);
    const [subjectY4Q1, setsubjectY4Q1] = useState([]);
    const [subjectY4Q2, setsubjectY4Q2] = useState([]);




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
                    
                    if(docSnap.data().course == "1" && docSnap.data().quarter == "1") {
                        setsubjectY1Q1(subjectY1Q1 => [...subjectY1Q1,
                            {
                                id: keys[i][0],
                                data: docSnap.data()
                            }])
                        

                    }
                    else if(docSnap.data().course == "1" && docSnap.data().quarter == "2") {
                        setsubjectY1Q2(subjectY1Q2 => [...subjectY1Q2,
                            {
                                id: keys[i][0],
                                data: docSnap.data()
                            }])

                    }
                    else if(docSnap.data().course == "2" && docSnap.data().quarter == "1") {
                        setsubjectY2Q1(subjectY2Q1 => [...subjectY2Q1,
                            {
                                id: keys[i][0],
                                data: docSnap.data()
                            }])

                    }
                    else if(docSnap.data().course == "2" && docSnap.data().quarter == "2") {
                        setsubjectY2Q2(subjectY2Q2 => [...subjectY2Q2,
                            {
                                id: keys[i][0],
                                data: docSnap.data()
                            }])

                    }
                    else if(docSnap.data().course == "3" && docSnap.data().quarter == "1") {
                        setsubjectY3Q1(subjectY3Q1 => [...subjectY3Q1,
                            {
                                id: keys[i][0],
                                data: docSnap.data()
                            }])

                    }
                    else if(docSnap.data().course == "3" && docSnap.data().quarter == "2") {
                        setsubjectY3Q2(subjectY3Q2 => [...subjectY3Q2,
                            {
                                id: keys[i][0],
                                data: docSnap.data()
                            }])


                    }
                    else if(docSnap.data().course == "4" && docSnap.data().quarter == "1") {
                        setsubjectY4Q1(subjectY4Q1 => [...subjectY4Q1,
                            {
                                id: keys[i][0],
                                data: docSnap.data()
                            }])

                    }
                    else if(docSnap.data().course == "4" && docSnap.data().quarter == "2") {
                        setsubjectY4Q2(subjectY4Q2 => [...subjectY4Q2,
                            {
                                id: keys[i][0],
                                data: docSnap.data()
                            }])
                    }
                                
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
        <Fragment>
            <div className='DegreeProfile__mainContainer'>
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
                {(() => {
                    if (user) {
                        return (
                            <Fragment>
                                <article className="DegreeProfile__year">
                                    <div className="DegreeProfile__headerYear">
                                        <div className="DegreeProfile__text">Year 1</div>
                                    </div>
                                    <div className="DegreeProfile__semesters">
                                        <div className="rTable DegreeProfile__tableSemester ">
                                            <div className="rTableHeading">
                                                <div className="rTableRow">
                                                    <div colspan="1" className="DegreeProfile__semester">First Semester</div>
                                                </div>
                                            </div>
                                            <div className="rTableBody">
                                                {subjectY1Q1.map(() => (subject) => (
                                                    <div className='rTableRow'>
                                                        <Link to={`/Subject/${subject.id}`}>
											                <div className="DegreeProfile__subjects">{subject.data.name}</div>
										                </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <table className="DegreeProfile__tableSemester">
                                            <thead>
                                                <tr>
                                                    <th colspan="1" className="DegreeProfile__semester">Second Semester</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subjectY1Q2.map(() =>(subject) => (
                                                    <tr onClick={redireccion(subject.id)}>
                                                        <td className="DegreeProfile__subjects">{subject.data.name}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="DegreeProfile__headerYear">
                                        <div className="DegreeProfile__text">Year 2</div>
                                    </div>
                                    <div className="DegreeProfile__semesters">
                                        <table className="DegreeProfile__tableSemester">
                                            <thead>
                                                <tr>
                                                    <th colspan="1" className="DegreeProfile__semester">First Semester</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subjectY2Q1.map(() =>(subject) => (
                                                    <tr onClick={redireccion(subject.id)}>
                                                        <td className="DegreeProfile__subjects">{subject.data.name}</td>
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
                                                {subjectY2Q2.map(() =>(subject) => (
                                                    <tr onClick={redireccion(subject.id)}>
                                                        <td className="DegreeProfile__subjects">{subject.data.name}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="DegreeProfile__headerYear">
                                        <div className="DegreeProfile__text">Year 3</div>
                                    </div>
                                    <div className="DegreeProfile__semesters">
                                        <table className="DegreeProfile__tableSemester">
                                            <thead>
                                                <tr>
                                                    <th colspan="1" className="DegreeProfile__semester">First Semester</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subjectY3Q1.map(() =>(subject) => (           
                                                    <tr onClick={redireccion(subject.id)}>
                                                        <td className="DegreeProfile__subjects">{subject.data.name}</td>
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
                                                {subjectY3Q2.map(() =>(subject) => (
                                                    <tr onClick={redireccion(subject.id)}>
                                                        <td className="DegreeProfile__subjects">{subject.data.name}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="DegreeProfile__headerYear">
                                        <div className="DegreeProfile__text">Year 4</div>
                                    </div>
                                    <div className="DegreeProfile__semesters">
                                        <table className="DegreeProfile__tableSemester">
                                            <thead>
                                                <tr>
                                                    <th colspan="1" className="DegreeProfile__semester">First Semester</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subjectY4Q1.map(() =>(subject) => (
                                                    <tr onClick={redireccion(subject.id)}>
                                                        <td className="DegreeProfile__subjects">{subject.data.name}</td>
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
                                                {subjectY4Q2.map(() =>(subject) => (
                                                    <tr onClick={redireccion(subject.id)}>
                                                        <td className="DegreeProfile__subjects">{subject.data.name}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                </article>
                            </Fragment>
                        )
                    } else {
                        return (
                            <HideInfo></HideInfo>
                        )


                    }
                })()}

            </div>
            <Footer></Footer>
        </Fragment>

    )


}


export default DegreeProfilePage;
