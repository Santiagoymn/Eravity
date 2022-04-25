import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import UniversityProfilePage from './UniversityProfilePage';
import DegreeProfilePage from './DegreeProfilePage'


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HeaderNoLogueado from './HeaderNoLogueado';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route element={<HeaderNoLogueado />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="*" element={<div>ERROR 404</div>} />
          <Route path="Register" element={<Register />}></Route>
          <Route path="Login" element={<Login />} ></Route>
          <Route path="UniversityProfile" element={<UniversityProfilePage />}></Route>
          <Route path="UniversityProfile/:id" element={<UniversityProfilePage />} ></Route>
          <Route path="DegreeProfile" element={<DegreeProfilePage />}></Route>
          <Route path="DegreeProfile/:id" element={<DegreeProfilePage />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
