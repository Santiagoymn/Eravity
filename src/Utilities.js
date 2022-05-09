import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';




function checkIfLogged(dispatch){
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
}

function logoutAPP() {
    signOut(auth).then(() => {
      useNavigate("/ContactUs");
    }).catch((error) => {
      // An error happened.
    });
}

async function loadUser(uid) {
  const docRef = doc(db, "users", uid)
  getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      setCredits(docSnap.data().creditos);
      console.log(docSnap.data().creditos);
    }
  })

}

export {checkIfLogged, logoutAPP, loadUser}