import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import HeaderLogueado from './HeaderLogueado';
import HeaderNoLogueado from './HeaderNoLogueado';
import Footer from './Footer';


ReactDOM.render(
  <React.StrictMode>
    <HeaderNoLogueado/>
    <App />
    <Footer/>
  </React.StrictMode>,
  document.getElementById('root')
);

