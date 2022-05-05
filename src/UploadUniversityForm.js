import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { db } from './firebase';
import {collection, query, where, getDocs, addDoc} from "firebase/firestore";
import './uploadUniversityFormStyle.css';
import HeaderNoLogueado from './HeaderNoLogueado';
import Footer from './Footer';
import HeaderLogueado from './HeaderLogueado';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import {onAuthStateChanged} from 'firebase/auth';




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

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

  // check at page load if a user is authenticated
  useEffect(() => {
    checkIfLogged(dispatch);
    
  }, []);



  return (
      <div>
        <Helmet>
            <meta charset="UTF-8"/>
            <title>Upload University</title>
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

        <form className='uploaduniversity__form'>
            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="name" id="uploaduniversity__name" className="uploaduniversity__inputShortText" required/>

            <input value={city} onChange={e => setCity(e.target.value)} type="text" placeholder="city" id="uploaduniversity__city" className="uploaduniversity__inputShortText" required/>

            <input value={country} onChange={e => setCountry(e.target.value)} type="text" placeholder="country" id="uploaduniversity__country" className="uploaduniversity__inputShortText" required/>

            <div className="uploaduniversity__buttonAccept"><input type="submit" onClick={checkUniversity} className="uploaduniversity__acceptBtn" value="Send"/></div>

        </form>
        <Footer/>
    </div>
  )
}

export default UploadUniversityForm