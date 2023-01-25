import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'tw-elements';

const app = ReactDOM.createRoot(document.getElementById('root'));
app.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
