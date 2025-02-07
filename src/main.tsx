import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import { ROUTES } from './shared/routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: ROUTES.map((route) => ({
      path: route.path,
      Component: route.component,
    })),
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root'),
);
