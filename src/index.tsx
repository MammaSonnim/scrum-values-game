import { createRoot } from 'react-dom/client';
import { App } from './app';
import React from 'react';
import { store } from './domains/team/state';
import { TODO_ANY } from './types';

const root = createRoot(document.getElementById('root') as Element);

export const rerenderDom = () => {
  root.render(
    <div>
      <App teamState={store.getState().teamState}/>
    </div>
  );
};


rerenderDom();
store.subscribe(rerenderDom);
