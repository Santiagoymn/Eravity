import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import HeaderLogueado from './HeaderLogueado';
import HeaderNoLogueado from './HeaderNoLogueado';

ReactDOM.render(
  <React.StrictMode>
    <HeaderNoLogueado/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

