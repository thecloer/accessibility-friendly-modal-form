import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import ModalFormPage from './ModalFormPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalFormPage />
  </StrictMode>
);
