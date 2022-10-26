import './models/init';
import React, { lazy, Suspense, useEffect } from 'react';
import { Store } from 'redux';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import 'nes.css/css/nes.min.css';
import './app.css';
import { Quiz, Team, Auth, AuthInfo } from './domains';
import { Nav } from './components';
import { getUserInfo } from './models/userInfo';
import { ErrorBoundary, Loader } from './components';
import { requestDev } from './utils/request';
import { ApiResponseWithItemsT } from './types';

const Rating = lazy(() => import('./domains/rating'));

export const App = ({ store }: { store: Store }) => {
  const history = createBrowserHistory();

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className='app'>
      <HashRouter>
        <Provider store={store}>
          <ErrorBoundary>
            <Nav />
            <AuthInfo />
            <Routes>
              <Route path='/' element={<Navigate to='/game' />} />
              <Route path='/game' element={<Quiz />} />
              <Route path='/login' element={<Auth />} />
              <Route path='/team' element={<Team history={history} />} />
              <Route
                path='/rating'
                element={
                  <Suspense fallback={<Loader />}>
                    <Rating history={history} />
                  </Suspense>
                }
              />
              <Route path='*' element={'404'} />
            </Routes>
          </ErrorBoundary>
        </Provider>
      </HashRouter>
    </div>
  );
};
