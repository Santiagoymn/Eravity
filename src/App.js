import './App.css';
import React,{useState,useEffect} from 'react';
import Login from './Login';
import Register from './Register';


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="Register" element={<Register />}></Route>
          <Route path="Login" element={<Login />}></Route>
          <Route path="*" element={<div>ERROR 404</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );


}

export default App;
