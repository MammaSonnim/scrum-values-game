import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux-store';
import { App } from './app';

const root = createRoot(document.getElementById('root') as Element);

export const renderDom = () => {
  root.render(
    <BrowserRouter>
      <App store={store} />
    </BrowserRouter>
  );
};

renderDom();
