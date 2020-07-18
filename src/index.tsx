import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import QuizContainer from './containers/quiz';
import store from './store';
import 'nes.css/css/nes.min.css';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <QuizContainer />
    </Router>
  </Provider>,
  document.getElementById('root')
);
