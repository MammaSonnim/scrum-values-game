import { createRoot } from 'react-dom/client';
import { store } from './domains/team/store';
import { App } from './app';
import React from 'react';

const root = createRoot(document.getElementById('root') as Element);

export const rerenderDom = () => {
  root.render(
    <div>
      <App store={store}/>
    </div>
  );
};


rerenderDom();
store.subscribe(rerenderDom);
