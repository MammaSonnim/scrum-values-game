import './models/init';
import React, { lazy, Suspense, useEffect } from 'react';
import { Store } from 'redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Quiz, Lobby, Auth } from './domains';
import { Nav, Link } from './components';
import { getUserInfo } from './models/userInfo';
import { ErrorBoundary, Loader } from './components';
import styles from './styles.module.css';

const Rating = lazy(() => import('./domains/rating'));

export const App = ({ store }: { store: Store }) => {
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Provider store={store}>
          <ErrorBoundary>
            <header className={styles.header}>
              <Nav />
              <Link href='#'>ru/en</Link>
            </header>
            <Routes>
              <Route path='/' element={<Navigate to='/game' />} />
              <Route path='/game' element={<Quiz />} />
              <Route path='/login' element={<Auth />} />
              <Route path='/lobby' element={<Lobby />} />
              <Route
                path='/rating'
                element={
                  <Suspense fallback={<Loader />}>
                    <Rating />
                  </Suspense>
                }
              />
              <Route path='*' element={'404'} />
            </Routes>
          </ErrorBoundary>
        </Provider>
      </BrowserRouter>
    </div>
  );
};
