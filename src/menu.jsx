import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import MenuApp from './pages/MenuApp.jsx';
const root = document.getElementById('root');
const app = (
  <StrictMode>
    <MenuApp />
  </StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
