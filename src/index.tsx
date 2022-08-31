import { createRoot } from 'react-dom/client';
import { store } from './domains/team/store';
import { App } from './app';
import React from 'react';

const root = createRoot(document.getElementById('root') as Element);

export const renderDom = () => {
  root.render(
    <div>
      <App store={store}/>
    </div>
  );
};


renderDom();
