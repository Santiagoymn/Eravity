import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, logout, selectUser } from './features/userSlice';
import { auth, db } from './firebase';
import HeaderLogueado from './HeaderLogueado'
import HeaderNoLogueado from './HeaderNoLogueado'
import './uploadResourceStyle.css'
import Footer from './Footer';
import { logoutAPP } from './Utilities';

function UploadResource() {


  const[admin, setAdmin] = useState(false);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const ifAdmin = async () => {

    const docRef = doc(db, "users", user.uid)
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        setAdmin(docSnap.data().admin);
      }
      else {
        console.log("No such document!");
      }
    })
  
  }
  const logout = () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      // An error happened.
    });
  }



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
        ifAdmin();
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
        <title>Resource upload selection</title>
    </Helmet>
    <main className="upres__menu-container">
	
                <div id="upres__options">
			            <div className="upres__command"><Link to="/UploadUniversityForm" class ="TextLink"><p className='upres__p'>Upload University</p></Link></div>
			            <div className="upres__command"><Link to="/UploadDegreeForm" class ="TextLink"><p className='upres__p'>Upload Degree</p></Link></div>
			            <div className="upres__command"><Link to="/UploadSubjectForm" class ="TextLink"><p className='upres__p'>Upload Subject</p></Link></div>
			            <div className="upres__command"><Link to="/ContactUs" class ="TextLink"><p className='upres__p'>Send contact form</p></Link></div>
		            </div>
                <div className="upres__containerLogout"><input type="submit" onClick={logoutAPP} value="Logout" class="upres__buttonLogout" className="upres__buttonLogout" /></div>

        
    </main>
    <Footer></Footer>




    </div>
  )
}

export default UploadResource