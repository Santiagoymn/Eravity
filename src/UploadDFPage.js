import React, { useState } from 'react';
import "./uploadDFPageStyle.css";
import "./generalStyles.css";
import Helmet from 'react-helmet';
import { db } from './firebase';
import { addDoc, collection, getDoc, getDocs, query, where } from 'firebase/firestore';

function UploadDFPage() {

    const[name, setName] = useState("");
    const[universityName, setUniversityName] = useState("");
    const[years, setYears] = useState("");
    const[credits, setCredits] = useState("");
    const checkDegree = (e) => {
        e.preventDefault();
        if(validationNameDegree()){
            if(validationYear()){
                if(validationECTS()){
                    const q = query(collection(db, "degrees"), where("name", "==", name.toLowerCase()), where("university", "==", universityName.toLowerCase()));
                    getDocs(q).then((querySnapshot) => {
                        if(querySnapshot.empty){
                            const q2 = query(collection(db, "universities"), where("name", "==", universityName.toLowerCase()));
                            getDocs(q2).then((querySnapshot2) => {
                                if(!querySnapshot2.empty){
                                    querySnapshot2.forEach((universityObject) => {
                                        addDoc(collection(db, "degrees"), {
                                            name: name.toLowerCase(),
                                            universityId: universityObject.id,
                                            years: years,
                                            credits: credits
                                        }).catch(error => alert(error.message))
                                        alert("The degree has been added. Thanks for supporting!");
                                        return true;
                                    })
                                } else {
                                    alert("The University doesn't exist");
                                }
                                
                            }).catch(error => alert(error.message));
                        } else {
                            alert("The degree already exists");
                        }
                    }).catch(error => alert(error.message));
                }else{
                    alert("The ECTS must be a positive value");
                }
            }else{
                alert("The year must be a positive value")
            }
        }else{
            alert("A degree must be specified");
        }
    }
        

    function validationNameDegree(){
        if(name == ""){
            return false;
        }else{
            return true;
        }
    }

    function validationYear(){
        if(years > 0){
            return true;
        }else{
            return false;
        }
    }

    function validationECTS(){
        if(credits > 0){
            return true;
        }else{
            return false;
        }
    }





    
  return (
    <div>
        <Helmet>
            <title>Update Educational Project</title>
        </Helmet>
        <div className="uploaddfpage__pageTitle textQualifying">
            <h2>Upload Degree Form</h2>
        </div>
        <form className='uploaddfpage__form'>
            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="name" id="name" className="uploaddfpage__inputShortText" required/>
            <input value={universityName} onChange={e => setUniversityName(e.target.value)} type="text" placeholder="university" id="university" className="uploaddfpage__inputShortText" required/>

            <div className="uploaddfpage__firstLineInputs">
                <input value={years} onChange={e => setYears(e.target.value)} type="number" placeholder="years" id="years" className="uploaddfpage__inputShortText" required/>
                <input value={credits} onChange={e => setCredits(e.target.value)} type="number" placeholder="ECTS" id="ects" className="uploaddfpage__inputShortText" required/>
            </div>

            <div className="uploaddfpage__buttonAccept"><input type="submit"  onClick={checkDegree} className="uploaddfpage__acceptBtn" value="Send"/></div>

        </form>

    </div>
  )
}

export default UploadDFPage