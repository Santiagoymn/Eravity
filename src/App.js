import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import UniversityProfilePage from './UniversityProfilePage';
import DegreeProfilePage from './DegreeProfilePage'
import UploadUniversityForm from './UploadUniversityForm';
import ContactForm from './ContactForm';
import UploadSubjectPage from './UploadSubjectPage';
import SubjectPage from './SubjectPage';

import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import UploadDFPage from './UploadDFPage';
import UserProfile from './UserProfile';
import AdminProfile from './AdminProfile';
import SubjectRevision from './SubjectRevision';
import UploadResource from './UploadResource';



function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<HomePage />}></Route>
          <Route path="*" element={<div>ERROR 404</div>} />
          <Route path="Register" element={<Register />}></Route>
          <Route path="Login" element={<Login />} ></Route>
          <Route path="UniversityProfile" element={<UniversityProfilePage />}></Route>
          <Route path="UniversityProfile/:id" element={<UniversityProfilePage />} ></Route>
          <Route path="DegreeProfile" element={<DegreeProfilePage />}></Route>
          <Route path="DegreeProfile/:id" element={<DegreeProfilePage />} ></Route>
          <Route path="Subject" element={<SubjectPage />}></Route>
          <Route path="Subject/:id" element={<SubjectPage />} ></Route>
          <Route path="UploadUniversityForm" element={<UploadUniversityForm />} ></Route>
          <Route path="UploadDegreeForm" element={<UploadDFPage />} ></Route>
          <Route path="UserProfile" element={<UserProfile />} ></Route>
          <Route path="AdminProfile" element={<AdminProfile />} ></Route>
          <Route path="SubjectRevision" element={<SubjectRevision />} ></Route>
          <Route path="ContactUs" element={<ContactForm />} ></Route>
          <Route path="UploadSubjectForm" element={<UploadSubjectPage />} ></Route>
          <Route path="UploadResource" element={<UploadResource />} ></Route>



        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
