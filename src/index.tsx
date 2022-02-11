import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Quiz } from './pages/quiz';
import 'nes.css/css/nes.min.css';
import './index.css';

ReactDOM.render(
    <Router history={createBrowserHistory()}>
      <Quiz />
    </Router>,
  document.getElementById('root')
);
