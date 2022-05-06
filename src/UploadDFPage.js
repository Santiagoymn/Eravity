import React, { useEffect, useState } from 'react';
import "./uploadDFPageStyle.css";
import "./generalStyle.css";
import Helmet from 'react-helmet';
import { db, auth } from './firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import HeaderNoLogueado from './HeaderNoLogueado';
import Footer from './Footer';
import HeaderLogueado from './HeaderLogueado';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { onAuthStateChanged } from 'firebase/auth';


function UploadDFPage() {

    const [name, setName] = useState("");
    const [universityName, setUniversityName] = useState("");
    const [years, setYears] = useState("");
    const [credits, setCredits] = useState("");
    const checkDegree = (e) => {
        e.preventDefault();
        if (validationNameDegree()) {
            if (validationYear()) {
                if (validationECTS()) {

                    const q = query(collection(db, "universities"), where("name", "==", universityName.toLowerCase()));
                    getDocs(q).then((querySnapshot) => {
                        if (!querySnapshot.empty) {
                            querySnapshot.forEach((universityObject) => {
                                const q2 = query(collection(db, "degrees"), where("name", "==", name.toLowerCase()), where("universityId", "==", universityObject.id));
                                getDocs(q2).then((querySnapshot2) => {
                                    if (querySnapshot2.empty) {
                                        addDoc(collection(db, "degrees"), {
                                            name: name.toLowerCase(),
                                            universityId: universityObject.id,
                                            years: years,
                                            credits: credits
                                        }).catch(error => alert(error.message))
                                        alert("The degree has been added. Thanks for supporting!");

                                    } else {
                                        alert("The degree already exists");
                                    }

                                }).catch(error => alert(error.message));
                                return true;
                            })
                        } else {
                            alert("The University doesn't exist");
                        }
                    }).catch(error => alert(error.message));
                } else {
                    alert("The ECTS must be a positive value");
                }
            } else {
                alert("The year must be a positive value")
            }
        } else {
            alert("A degree must be specified");
        }
    }


    function validationNameDegree() {
        if (name === "") {
            return false;
        } else {
            return true;
        }
    }

    function validationYear() {
        if (years > 0) {
            return true;
        } else {
            return false;
        }
    }

    function validationECTS() {
        if (credits > 0) {
            return true;
        } else {
            return false;
        }
    }
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
            <Helmet>
                <title>Update Educational Project</title>
            </Helmet>
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
            <div className="uploaddfpage__pageTitle textQualifying">
                <h2>Upload Degree Form</h2>
            </div>
            <form className='uploaddfpage__form'>
                <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="name" id="name" className="uploaddfpage__inputShortText" required />
                <input value={universityName} onChange={e => setUniversityName(e.target.value)} type="text" placeholder="university" id="university" className="uploaddfpage__inputShortText" required />

                <div className="uploaddfpage__firstLineInputs">
                    <input value={years} onChange={e => setYears(e.target.value)} type="number" placeholder="years" id="years" className="uploaddfpage__inputShortText" required />
                    <input value={credits} onChange={e => setCredits(e.target.value)} type="number" placeholder="ECTS" id="ects" className="uploaddfpage__inputShortText" required />
                </div>

                <div className="uploaddfpage__buttonAccept"><input type="submit" onClick={checkDegree} className="uploaddfpage__acceptBtn" value="Send" /></div>

            </form>
            <Footer></Footer>

        </div>
    )
}

export default UploadDFPage;