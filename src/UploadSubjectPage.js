
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import "./UploadSubjectStyle.css";
import "./generalStyle.css";
import HeaderNoLogueado from './HeaderNoLogueado';
import HeaderLogueado from './HeaderLogueado';

import { db } from './firebase';
import { addDoc, collection, getDocs, query, setDoc, where, doc, updateDoc, Timestamp} from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import {onAuthStateChanged} from 'firebase/auth';
import $ from 'jquery';
import Footer from './Footer';
import imagen1 from "./assets/images/Imagen 1.png"
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import './UniversityProfilePage.css';
import './assets/jquery.star-rating-svg';
import './assets/star-rating-svg.css';


function UploadSubjectPage() {

    const[id, setId] = useState("");
    const[name, setSubjectName] = useState("");
    const[year, setYears] = useState("");
    const[ects, setCredits] = useState("");
    const[semester, setSemester] = useState("");
    const[degree, setDegree] = useState("");
    const[university, setUniversityName] = useState("");
    const[proyectYear, setProyectYear] = useState("");
    const[url, setUrl] = useState("");

    const[prerequisites, setPrerequisites] = useState("");
    const[contents, setContents] = useState("");

    const[urlProyect, setUrlProyect] = useState("");


    const checkDegree = (e) => {
        e.preventDefault();
        if(validationFields()){
            const q = query(collection(db, "universities"), where("name", "==", university.toLowerCase()));
            getDocs(q).then((querySnapshot) => {
                if(!querySnapshot.empty){
                    querySnapshot.forEach((universityObject) => {
                        const q2 = query(collection(db, "degrees"), where("name", "==", degree.toLowerCase()), where("universityId", "==", universityObject.id));
                        getDocs(q2).then((querySnapshot2) => {
                            if(!querySnapshot2.empty){
                                querySnapshot2.forEach((degreeObject) => { 
                                    alert(universityObject.id);
                                    const q3 = query(collection(db, "subjects"), where("name", "==", name.toLowerCase()), where("universityId", "==", universityObject.id), where("degreeId", "==", degreeObject.id));
                                    getDocs(q3).then((querySnapshot3) => {
                                        if (querySnapshot3.empty) {
                                            uploadProyect(universityObject.get("name"), degreeObject.get("name"), name.toLowerCase());
                                                addDoc(collection(db, "subjects"), {
                                                    degreeId: degreeObject.id,
                                                    subjectId: id,
                                                    name: name.toLowerCase(),
                                                    credits: ects,
                                                    course: year,
                                                    quarter: semester,
                                                    prerequisites: prerequisites.toLowerCase(),
                                                    content: contents.toLowerCase(),
                                                    proyectYear: proyectYear,
                                                    url: url,
                                                    languajes: languajesSelected(),
                                                    universityId: universityObject.id,
                                                    proyectRef: urlProyect,
                                                    timestamp: +new Date
                                                })
                                                .then(() => {
                                                    getDocs(collection(db, "users")).then((querySnapshot4) => {
                                                        querySnapshot4.forEach((userObject) => {
                                                            if(userObject.id == auth.currentUser.uid){
                                                                updateDoc(doc(db, 'users', auth.currentUser.uid), {
                                                                    creditos: Number(userObject.get("creditos")) + Number(ects) ,
                                                                })
                                                            }
                                                        })
                                                    })
                                                    .then(() =>{
                                                        getDocs(q3).then((querySnapshot5) => {
                                                            querySnapshot5.forEach((subjectObject) => {
                                                                    updateDoc(doc(db, 'degrees', degreeObject.id), {
                                                                    [`subjects.${subjectObject.id}`]: true,
                                                                })
                                                            })
                                                        })
                                                    })
                                                }).catch(error => alert(error.message))
                                                
                                                alert("The Subject has been added. Thanks for supporting!");
                                        }else{
                                            querySnapshot3.forEach((subjectObject) => {
                                                uploadProyectAdmin(universityObject.get("name"), degreeObject.get("name"), name.toLowerCase());
                                                addDoc(collection(db, "subjects_administrator"), {
                                                    degreeId: degreeObject.id,
                                                    subjectId: id,
                                                    name: name.toLowerCase(),
                                                    credits: ects,
                                                    course: year,
                                                    quarter: semester,
                                                    prerequisites: prerequisites.toLowerCase(),
                                                    content: contents.toLowerCase(),
                                                    proyectYear: proyectYear,
                                                    url: url,
                                                    languajes: languajesSelected(),
                                                    universityId: universityObject.id,
                                                    proyectRef: urlProyect,
                                                    originalSubjectId: subjectObject.id,
                                                    timestamp: +new Date,
                                                    uidRequest: user.uid
                                                }).catch(error => alert(error.message))
                                                alert("The subject already exists, the request has been sent to the administrator. Thanks for supporting!");
                                                return;


                                            })
                                            
                                        }
                                    })
                                }) 
                            }else{
                                alert("The Degree doesn't exist");
                            }
                        }).catch(error => alert(error.message));
                    })
                } else {
                    alert("The University doesn't exist");
                }
            }).catch(error => alert(error.message));  
        }                
    }


    function validationFields(){
        if(
        validationID() &&
        validationName() &&
        validationECTS() &&
        validationCourse() &&
        validationSemester() &&
        validationDegree() &&
        validationUniversity() &&
        validationPrerequisites() &&
        validationContents() &&
        validationProyectYear() &&
        validationUrl() &&
        validationLanguajes() &&
        validationProyect()
        ){
            return true;
        }
        return false;
    }

    let languajes = new Map([
        ['englishCB', 'english'],
        ['frenchCB', 'french'],
        ['dutchCB', 'dutch'],
        ['spanishCB', 'spanish'],
        ['germanCB', 'german'],
        ['otherCB', 'other']
      ]);

    function validationID(){
        if(id > 0){
            return true;
        }else{
            alert("The subject must have an integer identifier");
            return false
        }
    }

    function validationName(){
        if(name != ""){
            return true;
        }else{
            alert("The subject must have a name");
            return false
        }
        
    }

    function validationECTS(){
        if(ects > 0){
            return true;
        }else{
            alert("The subject must have a positive number of ECT");
            return false
        }
    }

    function validationCourse(){
        if(year > 0){
            return true;
        }else{
            alert("The subject must have a positive value for the course");
            return false
        }
    }

    function validationSemester(){
        if(semester > 0){
            return true;
        }else{
            alert("The subjectmust have a positive value for the semester");
            return false
        }
    }

    function validationDegree(){
        if(degree != ""){
            return true;
        }else{
            alert("The subject must have a degree name");
            return false
        }
    }

    function validationUniversity(){
        if(university != ""){
            return true;
        }else{
            alert("The subject must have a university name");
            return false
        }
    }

    function validationPrerequisites(){
        if(prerequisites != ""){
            return true;
        }else{
            alert("The subject must have a prerequisites");
            return false
        }
    }

    function validationContents(){
        if(contents != ""){
            return true;
        }else{
            alert("The subject must have a contents");
            return false
        }
    }

    function validationProyectYear(){
        if(proyectYear > 0){
            return true;
        }else{
            alert("The subject must have a positive value for the proyect year");
            return false
        }
    }

    function validationUrl(){
        if(url != ""){
            return true;
        }else{
            alert("The subject must have a url");
            return false
        }
    }

    function validationLanguajes(){
        for(let l of languajes.keys()){
            if (document.getElementById(l).checked){
                return true;
            }
        }
        alert("The subject must have a languaje");
        return false;
    }

    function validationProyect(){
        if(document.getElementById("file-upload").files[0] === undefined){
            alert("A teaching project must be attached");
            return false
        }else{
            return true
        }
    }

    function languajesSelected(){
        let slc = [];
        for(let l of languajes.keys()){
            if (document.getElementById(l).checked){
                slc.push(languajes.get(l))
            }
        }
        return slc;
    }

    function uploadProyect(universityObjectName, degreeObjectName, degreeName){
        const storage = getStorage();
        const storageRef = ref(storage, "ep/"+universityObjectName+"-"+degreeObjectName+"-"+degreeName);
        const file = document.getElementById("file-upload").files[0];
        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(storageRef).then((url) => {
                setUrlProyect(url);     
            })
        });
    }

    function uploadProyectAdmin(universityObjectName, degreeObjectName, degreeName){
        const storage = getStorage();
        const storageRef = ref(storage, "ep_admin/"+universityObjectName+"-"+degreeObjectName+"-"+degreeName);
        const file = document.getElementById("file-upload").files[0];
        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(storageRef).then((url) => {
                setUrlProyect(url);     
            })
        });
    }


    const user = useSelector(selectUser);
    const dispatch = useDispatch();


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
        <form className='UploadSubject__form'>
            <div className="UploadSubject__firstLineInputs">
                <input type="text" onChange={e => setId(e.target.value)} placeholder="id" id="id" className="UploadSubject__inputShortText" required/>
                <input type="text" onChange={e => setSubjectName(e.target.value)} placeholder="name" id="name" className="UploadSubject__inputShortText" required/>
            </div>
            <div className="UploadSubject__secondLineInputs">
                <input type="text" onChange={e => setCredits(e.target.value)} placeholder="ects" id="ects" className="UploadSubject__inputShortText" required/>
                <input type="text" onChange={e => setYears(e.target.value)} placeholder="course" id="year" className="UploadSubject__inputShortText" required/>
                <input type="text" onChange={e => setSemester(e.target.value)} placeholder="semester" id="semester" className="UploadSubject__inputShortText" required/>
            </div>
            <input type="text" onChange={e => setDegree(e.target.value)} placeholder="degree" id="degree" className="UploadSubject__inputShortText" required/>
            <input type="text" onChange={e => setUniversityName(e.target.value)} placeholder="university" id="university" className="UploadSubject__inputShortText" required/>
            <div className="text" id="labelLanguages">languages</div>
            <div className="UploadSubject__languagesCB">
                <div className="UploadSubject__languageDivCB"><input type="checkbox" id="englishCB" className="UploadSubject__languageCB"/><label className='UploadSubject__label' htmlFor="englishCB">english</label></div>
                <div className="UploadSubject__languageDivCB"><input type="checkbox" id="frenchCB" className="UploadSubject__languageCB"/><label className='UploadSubject__label' htmlFor="frenchCB">french</label></div>
                <div className="UploadSubject__languageDivCB"><input type="checkbox" id="dutchCB" className="UploadSubject__languageCB"/><label className='UploadSubject__label' htmlFor="dutchCB">dutch</label></div>
                <div className="UploadSubject__languageDivCB"><input type="checkbox" id="spanishCB" className="UploadSubject__languageCB"/><label className='UploadSubject__label' htmlFor="spanishCB">spanish</label></div>
                <div className="UploadSubject__languageDivCB"><input type="checkbox" id="germanCB" className="UploadSubject__languageCB"/><label className='UploadSubject__label' htmlFor="germanCB">german</label></div>
                <div className="UploadSubject__languageDivCB"><input type="checkbox" id="otherCB" className="UploadSubject__languageCB"/><label className='UploadSubject__label' htmlFor="otherCB">other</label></div>
            </div>
            <input type="text" onChange={e => setPrerequisites(e.target.value)} placeholder="prerequisites" id="prerequisites" className="UploadSubject__inputLargeText" required/>
            <input type="text" onChange={e => setContents(e.target.value)} placeholder="contents" id="contents" className="UploadSubject__inputLargeText" required/>
            
            <div className="UploadSubject__file-upload-container text">
                <label htmlFor="file-upload" className="UploadSubject__custom-file-upload">
                    Upload Educational Programm
                    <img className="UploadSubject__download-image" src={imagen1} alt="Download image"/>
                </label>

                <input id="file-upload" type="file"/>
             </div>

            <input type="text" onChange={e => setProyectYear(e.target.value)} placeholder="Proyect Year" id="proyectYear" className="UploadSubject__inputShortText" required/>
            <input type="text" onChange={e => setUrl(e.target.value)} placeholder="url" id="url" className="UploadSubject__inputShortText" required/>

            <div className="UploadSubject__qualifying">
                <div className="titleQualifying">Teaching staff</div>
                <div className="textQualifying">Do they help students? Do they provide good explanations?</div>
                <div className="my-rating-4" data-rating="0">
                </div>
            </div>
            <div className="UploadSubject__qualifying">
                <div className="titleQualifying">Contents</div>
                <div className="textQualifying">Do they adapt to the educational programme?</div>
                <div className="my-rating-4" data-rating="0">
                </div>
            </div>
            <div className="UploadSubject__qualifying">
                <div className="titleQualifying">Difficulty</div>
                <div className="textQualifying">Are the contents difficult?</div>
                <div className="my-rating-4" data-rating="0">
                </div>
            </div>
            <div className="UploadSubject__qualifying">
                <div className="titleQualifying">Interest</div>
                <div className="textQualifying">Are the contents interesting? Were they useful?</div>
                <div className="my-rating-4" data-rating="0">
                </div>
            </div>
            <div className="UploadSubject__qualifying">
                <div className="titleQualifying">Time commitment</div>
                <div className="my-rating-4" data-rating="0">
                </div>
            </div>
            <div className="UploadSubject__buttonAccept"><input type="submit" onClick={checkDegree} className="UploadSubject__acceptBtn" value="Accept"/></div>

        </form>
        <Footer></Footer>
            
    </div>
  )
}

export default UploadSubjectPage
