import './models/init';
import React, { useEffect } from 'react';
import { Store } from 'redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import 'nes.css/css/nes.min.css';
import './app.css';
import {
  Quiz,
  Team,
  Rating,
  Auth,
  AuthInfo,
} from './domains';
import { Nav } from './components';
import { getUserInfo } from './models/userInfo';

export const App = ({ store }: { store: Store }) => {
  const history = createBrowserHistory();

  useEffect(() => {
    getUserInfo();
  }, []);


  return (
    <div className='app'>
      <BrowserRouter>
        <Provider store={store}>
          <Nav/>
          <AuthInfo/>
          <Routes>
            <Route path='/game' element={<Quiz/>} />
            <Route path='/login' element={<Auth/> } />
            <Route path='/team' element={<Team store={store} history={history}/>} />
            <Route path='/rating' element={<Rating history={history}/>} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
};
