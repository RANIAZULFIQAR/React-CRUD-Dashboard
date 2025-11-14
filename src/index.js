import React from 'react';
// 🛑 CHANGE THIS LINE: Use the full path 'react-dom/client'
import ReactDOM from 'react-dom/client'; 
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);