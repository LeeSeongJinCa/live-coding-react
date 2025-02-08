import './index.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import App from './App';
import { ROUTES } from './shared/routes';

async function enableMocking() {
  if (import.meta.env.VITE_API_MOCK !== 'true') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    onUnhandledRequest: 'bypass',
    quiet: true,
  });
}

enableMocking().then(() => {
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
});
