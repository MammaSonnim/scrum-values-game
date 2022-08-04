import './models/init';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import 'nes.css/css/nes.min.css';
import './app.css';
import {
  Quiz,
  Team,
  Rating,
  Auth,
  AuthInfo
} from './domains';
import { Nav } from './components';
import { getUserInfo } from './models/user-info';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const App = ({ teamState }) => {
  const history = createBrowserHistory();

  useEffect(() => {
    getUserInfo();
  }, []);


  return (
    <div className='app'>
      <BrowserRouter>
        <Nav/>
        <AuthInfo/>
        <Routes>
          <Route path='/game' element={<Quiz/>} />
          <Route path='/login' element={<Auth/> } />
          <Route path='/team' element={<Team history={history} teamState={teamState}/>} />
          <Route path='/rating' element={<Rating history={history}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
