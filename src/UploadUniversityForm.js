import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { db } from './firebase';
import {collection, query, where, getDocs, addDoc} from "firebase/firestore";
import './uploadUniversityFormStyle.css';

function UploadUniversityForm() {
    const[name, setName] = useState("");
    const[city, setCity] = useState("");
    const[country,setCountry] = useState("");

    const checkUniversity = (e) => {
        e.preventDefault();
        if((name != "") && (city != "") && (country != "") ){
            const q = query(collection(db, "universities"), where("name", "==", name.toLowerCase()), where("city", "==", city.toLowerCase()), where("country", "==", country.toLowerCase()));
            getDocs(q).then((querySnapshot) => {
            if(querySnapshot.empty){
                addDoc(collection(db, "universities"), {
                    name: name.toLowerCase(),
                    city: city.toLowerCase(),
                    country: country.toLowerCase()
            }).catch(error => alert(error.message))
                alert("The university has been added. Thanks for supporting!");
            } else {
                alert("The university already exists");
            }
            })
        }else{
            alert("All fields are required");
        }
    }





  return (
      <div>
        <Helmet>
            <meta charset="UTF-8"/>
            <title>Upload University</title>
        </Helmet>
        <form className='uploaduniversity__form'>
            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="name" id="uploaduniversity__name" className="uploaduniversity__inputShortText" required/>

            <input value={city} onChange={e => setCity(e.target.value)} type="text" placeholder="city" id="uploaduniversity__city" className="uploaduniversity__inputShortText" required/>

            <input value={country} onChange={e => setCountry(e.target.value)} type="text" placeholder="country" id="uploaduniversity__country" className="uploaduniversity__inputShortText" required/>

            <div className="uploaduniversity__buttonAccept"><input type="submit" onClick={checkUniversity} className="uploaduniversity__acceptBtn" value="Send"/></div>

        </form>
    </div>
  )
}

export default UploadUniversityForm