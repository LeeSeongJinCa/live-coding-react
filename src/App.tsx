import { Outlet } from 'react-router';

import { ROUTES } from './shared/routes';

function App() {
  return (
    <div
      className="App"
      style={{
        display: 'flex',
        columnGap: 12,
      }}
    >
      <nav
        style={{
          width: 240,
        }}
      >
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
      </nav>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
