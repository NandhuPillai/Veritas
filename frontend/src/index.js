import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Navbar from './components/Navbar/Navbar.js';
import InfoCenter from './pages/InfoCenter';
import AIpage from './pages/AIpage';
import GamePage from './pages/GamePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "info",
    element: <InfoCenter />,
  },
  {
    path: "game",
    element: <GamePage />,
  },
  {
    path: "ai",
    element: <AIpage />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
