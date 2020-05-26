import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import QuizContainer from './containers/quiz';
import store from './store';
import 'nes.css/css/nes.min.css';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <QuizContainer />
  </Provider>,
  document.getElementById('root')
);
