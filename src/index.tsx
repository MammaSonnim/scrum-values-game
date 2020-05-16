import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import QuizContainer from './containers/quiz';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <QuizContainer />
  </Provider>,
  document.getElementById('root')
);
