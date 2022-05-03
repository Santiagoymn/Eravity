import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import UniversityProfilePage from './UniversityProfilePage';
import DegreeProfilePage from './DegreeProfilePage'
import HeaderLogueado from './HeaderLogueado';
import HeaderNoLogueado from './HeaderNoLogueado';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth, onAuthStateChanged } from './firebase';
import UploadUniversityForm from './UploadUniversityForm';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import UploadDFPage from './UploadDFPage';



function App() {


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
    <div className="App">

      <BrowserRouter>
        <Routes>

          <Route path="" element={<HomePage />}></Route>
          <Route path="/" element={<UniversityProfilePage />}></Route>
          <Route path="Home" element={<HomePage />}></Route>
          <Route path="*" element={<div>ERROR 404</div>} />
          <Route path="Register" element={<Register />}></Route>
          <Route path="Login" element={<Login />} ></Route>
          <Route path="UniversityProfile" element={<UniversityProfilePage />}></Route>
          <Route path="UniversityProfile/:id" element={<UniversityProfilePage />} ></Route>
          <Route path="DegreeProfile" element={<DegreeProfilePage />}></Route>
          <Route path="DegreeProfile/:id" element={<DegreeProfilePage />} ></Route>
          <Route path="UploadUniversityForm" element={<UploadUniversityForm />} ></Route>
          <Route path="UploadDegreeForm" element={<UploadDFPage />} ></Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
