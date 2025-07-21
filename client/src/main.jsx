// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Your main application component
import './App.css'; // Your global CSS, including Tailwind directives

// Import BrowserRouter from react-router-dom for client-side routing
import { BrowserRouter } from 'react-router-dom';
// Import AuthProvider from your newly created AuthContext.jsx
import { AuthProvider } from './context/AuthContext.jsx';

// Get the root DOM element where your React app will be mounted
const rootElement = document.getElementById('root');

// Create a React root
ReactDOM.createRoot(rootElement).render(
  // React.StrictMode is a tool for highlighting potential problems in an application.
  // It activates additional checks and warnings for its descendants.
  <React.StrictMode>
    {/* BrowserRouter enables client-side routing using the browser's History API.
        It makes your application's UI in sync with the URL. */}
    <BrowserRouter>
      {/* AuthProvider wraps the entire application.
          This makes the authentication state (user, token, loading) and
          authentication functions (login, register, logout)
          available to ALL components within the <App /> component tree. */}
      <AuthProvider>
        {/* Your main application component, where all your pages and other components reside. */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
