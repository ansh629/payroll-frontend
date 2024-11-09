import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Include any global CSS you may want to use
import App from './App';  // Main App component
import reportWebVitals from './reportWebVitals';

// Rendering the root App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: For measuring performance (you can remove this if you don't need it)
reportWebVitals();
