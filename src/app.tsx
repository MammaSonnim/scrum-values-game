import './models/init';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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

export const App = () => {
  const history = createBrowserHistory();

  useEffect(() => {
    getUserInfo();
  }, []);


  return (
    <div className='app'>
      <BrowserRouter>
        <Nav/>
        <AuthInfo/>
        <Switch>
          <Route path='/game' strict>
            <Quiz/>
          </Route>
          <Route path='/login' strict>
            <Auth/>
          </Route>
          <Route path='/team' strict>
            <Team history={history}/>
          </Route>
          <Route path='/rating' strict>
            <Rating history={history}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
