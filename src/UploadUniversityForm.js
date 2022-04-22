import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { db } from './firebase';
import {collection, query, where, getDocs, addDoc, getDoc} from "firebase/firestore";
import styles from './uploadUniversityFormStyle.module.css';

function UploadUniversityForm() {
    const[name, setName] = useState("");
    const[city, setCity] = useState("");
    const[country,setCountry] = useState("");

    const checkUniversity = (e) => {
        e.preventDefault();
        if((name != "") && (city != "") && (country != "") ){
            const q = query(collection(db, "universities"), where("name", "==", name), where("city", "==", city), where("country", "==", country));
            getDocs(q).then((querySnapshot) => {
            if(querySnapshot.empty){
                addDoc(collection(db, "universities"), {
                    name: name,
                    city: city,
                    country: country
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
        <form>
            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="name" id="name" className={styles.inputShortText} required/>

            <input value={city} onChange={e => setCity(e.target.value)} type="text" placeholder="city" id="city" className={styles.inputShortText} required/>

            <input value={country} onChange={e => setCountry(e.target.value)} type="text" placeholder="country" id="country" className={styles.inputShortText} required/>

            <div className={styles.buttonAccept}><input type="submit" onClick={checkUniversity} className={styles.acceptBtn} value="Send"/></div>

        </form>
    </div>
  )
}

export default UploadUniversityForm