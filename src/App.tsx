import { Outlet } from 'react-router-dom';

import { ROUTES } from './shared/routes';

function App() {
  return (
    <div className="App">
      <ul>
        <li key="/">
          <a href="/">Home</a>
        </li>
        {ROUTES.map((route) => (
          <li key={route.path}>
            <a href={route.path}>{route.name}</a>
          </li>
        ))}
      </ul>

      <Outlet />
    </div>
  );
}

export default App;
