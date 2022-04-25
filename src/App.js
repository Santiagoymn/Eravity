import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import UniversityProfilePage from './UniversityProfilePage';
import DegreeProfilePage from './DegreeProfilePage'
import userSlice from './features/userSlice';
import HeaderLogueado from './HeaderLogueado';
import HeaderNoLogueado from './HeaderNoLogueado';
import UploadUniversityForm from './UploadUniversityForm';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



function App() {
  console.log(userSlice.actions);
  if (userSlice.actions != null) {

    <HeaderLogueado></HeaderLogueado>

  } else {
    <HeaderNoLogueado></HeaderNoLogueado>
  }
  return (
    <div className="App">

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="Register" element={<Register />}></Route>
          <Route path="Login" element={<Login />} ></Route>
          <Route path="UniversityProfile" element={<UniversityProfilePage />}></Route>
          <Route path="UniversityProfile/:id" element={<UniversityProfilePage />} ></Route>
          <Route path="DegreeProfile" element={<DegreeProfilePage />}></Route>
          <Route path="DegreeProfile/:id" element={<DegreeProfilePage />} ></Route>
          <Route path="*" element={<div>ERROR 404</div>} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
