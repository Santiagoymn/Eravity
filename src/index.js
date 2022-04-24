import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import HeaderLogueado from './HeaderLogueado';
import HeaderNoLogueado from './HeaderNoLogueado';
import Footer from './Footer';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>

      <App />

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

