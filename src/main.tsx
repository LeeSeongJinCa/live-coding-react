import './index.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import App from './App';
import { ROUTES } from './shared/routes';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {ROUTES.map((route) => (
          <Route key={route.path} path={route.path} Component={route.component} />
        ))}
      </Route>
    </Routes>
  </BrowserRouter>,
);
