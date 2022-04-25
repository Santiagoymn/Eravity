import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import userSlice from './features/userSlice';
import HeaderLogueado from './HeaderLogueado';
import HeaderNoLogueado from './HeaderNoLogueado';


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        if(userSlice.actions.login){
          <HeaderLogueado></HeaderLogueado>
        } else {
          <HeaderNoLogueado></HeaderNoLogueado>
        }
        <Routes>
          <Route path="Register" element={<Register />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="" element={<HomePage />}></Route>
          <Route path="Home" element={<HomePage />}></Route>
          <Route path="*" element={<div>ERROR 404</div>} />
        </Routes>

      </BrowserRouter>

    </div>
  );


}

export default App;
