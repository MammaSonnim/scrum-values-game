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
            <button
              onClick={async () => {
                const result = await requestDev.post('rating', {
                  teamName: 'Hej from test App',
                  scores: 19,
                });

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                console.log('🐸 result.body:', result.body);
              }}
            >
              Piu
            </button>
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
