import React, { useEffect, useState } from 'react';
import './userProfileStyle.css';
import fotoFondo from "./assets/images/gris-claro.jpg";
import HeaderLogueado from './HeaderLogueado';
import HeaderNoLogueado from './HeaderNoLogueado';
import { db, auth } from './firebase';
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";

import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import Footer from './Footer';
import Helmet from 'react-helmet';
import { doc, getDoc} from "firebase/firestore";
import AdminProfile from './AdminProfile';
import { useNavigate } from 'react-router-dom';
import { logoutAPP } from './Utilities';





function UserProfile() {


    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const[university, setUniversity] = useState("");
    const[degree, setDegree] = useState("");
    const[admin, setAdmin] = useState();

    const loadUniversityDegree = async () => {

      const docRef = doc(db, "users", user.uid)
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUniversity(docSnap.data().university);
          setDegree(docSnap.data().degree);
          setAdmin(docSnap.data().admin);
        }
        else {
          console.log("No such document!");
        }
      })
  
    }
    
    

    

  // check at page load if a user is authenticated
  useEffect(() => {
    checkIfLogged(dispatch);
    
  }, []);

  let navigate = useNavigate();

  useEffect(()=> {
    loadUniversityDegree();

  }, []);

  return (
    <div>
    {(() => {
		  if (user) {
        if (admin) {
          return (
            navigate("/AdminProfile")
          )
        }
			  return (
				  <HeaderLogueado></HeaderLogueado>
			  )
		  } else {
			  return (
				<HeaderNoLogueado></HeaderNoLogueado>
			  )
		  }
	  })()}

    
    <Helmet>
        <title>User Profile</title>
    </Helmet>
    
        <div className="userProfile__perfil">

          <div className="userProfile__userInfo">
            <div className='userProfile__fotoUsuario'>
              <img src={fotoFondo} id="userProfile__fotoUsuarioFondo" alt="Imagen del usuario" />
              <p id='userProfile__textCenter'>{user ? user.displayName.split(" ")[0][0] + user.displayName.split(" ")[1][0] : "N"} </p>
            </div>

          </div>
          <p className="userProfile__nombreUsuario">{user ? user.displayName : "Error"}</p>
          <div className="userProfile__infoUniversidad">
            <p className="userProfile__infoUni" id="userProfile__nombreUniversidad">{university}</p>
            <p className="userProfile__infoUni" id="userProfile__carreraUniversidad">{degree}</p>
          </div>
          <div className="userProfile__infoEmail">
            <p className="userProfile__emailUsuario">email: {user ? user.email : "Error"}</p>
          </div>
        </div><div className="userProfile__containerLogout"><input type="submit" onClick={logoutAPP} value="Logout" className="userProfile__buttonLogout" /></div>
  

        <Footer/>

    </div>
  )
}

export default UserProfile