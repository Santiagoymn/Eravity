import './App.css';
import React, { useState, useEffect } from 'react';
import userSlice from './features/userSlice';
import HeaderLogueado from './HeaderLogueado';
import HeaderNoLogueado from './HeaderNoLogueado';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';


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
          <Route path="/" element={<HomePage />}></Route>
          <Route path="Register" element={<Register />}></Route>
          <Route path="Login" element={<Login />}></Route>
          <Route element={<HeaderNoLogueado/>}></Route>
          <Route path="*" element={<div>ERROR 404</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );


}

export default App;
