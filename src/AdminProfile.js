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
import './adminProfileStyle.css'
import Footer from './Footer';

function AdminProfile() {


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
        <title>Admin Profile</title>
    </Helmet>
    <main className="admin__menu-container">
	
                <div id="admin__options">
			            <div className="admin__command"><Link to="/" class ="TextLink"><p className='admin__p'>University Application</p></Link></div>
			            <div className="admin__command"><Link to="/" class ="TextLink"><p className='admin__p'>Degree Application</p></Link></div>
			            <div className="admin__command"><Link to="/SubjectRevision" class ="TextLink"><p className='admin__p'>Subject Application</p></Link></div>
			            <div className="admin__command"><Link to="/" class ="TextLink"><p className='admin__p'>Contact Forms</p></Link></div>
		            </div>
                <div className="userProfile__containerLogout"><input type="submit" onClick={logout} value="Logout" className="userProfile__buttonLogout" /></div>

        
    </main>
    <Footer></Footer>




    </div>
  )
}

export default AdminProfile