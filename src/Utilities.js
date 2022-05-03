import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import {onAuthStateChanged} from 'firebase/auth';




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
      navigate("/");
    }).catch((error) => {
      // An error happened.
    });
}





export {checkIfLogged, logoutAPP}