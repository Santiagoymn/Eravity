import React, { useEffect } from 'react';
import './userProfileStyle.css';
import fotoFondo from "./assets/images/gris-claro.jpg";
import HeaderLogueado from './HeaderLogueado';
import HeaderNoLogueado from './HeaderNoLogueado';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import Footer from './Footer';
import Helmet from 'react-helmet';




function UserProfile() {


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
    <Helmet>
        <title>User Profile</title>
    </Helmet>
        <div className="userProfile__perfil">

        <div className="userProfile__userInfo">
            <div className='userProfile__fotoUsuario'>
                <img src={fotoFondo} id="userProfile__fotoUsuarioFondo" alt="Imagen del usuario"/>
                <p id='userProfile__textCenter'>{user? user.displayName.split(" ")[0][0] + user.displayName.split(" ")[1][0]: "N"} </p>
            </div>
            
        </div>
        <p className="userProfile__nombreUsuario">{user? user.displayName: "Error"}</p>
            <div className="userProfile__infoUniversidad">
                <p className="userProfile__infoUni" id="userProfile__nombreUniversidad">Universidad de Las Palmas de Gran Canaria</p>
                <p className="userProfile__infoUni" id="userProfile__carreraUniversidad">Computer Science Engineering</p>
            </div>
            <div className="userProfile__infoEmail">
                <p className="userProfile__emailUsuario">email: {user? user.email: "Error"}</p>
            </div>
            </div>

        <Footer/>

    </div>
  )
}

export default UserProfile