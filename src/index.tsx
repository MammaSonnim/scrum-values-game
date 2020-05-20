import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import QuizContainer from './containers/quiz';
import store from './store';
import './index.css';
import 'nes.css/css/nes.min.css';

ReactDOM.render(
  <Provider store={store}>
    <QuizContainer />
  </Provider>,
  document.getElementById('root')
);
