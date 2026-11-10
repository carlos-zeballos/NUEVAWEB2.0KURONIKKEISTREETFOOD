import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import HomePage from './pages/HomePage.jsx';
const root = document.getElementById('root');
const app = (
  <StrictMode>
    <HomePage />
  </StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
