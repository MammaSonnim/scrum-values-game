import React, { lazy, Suspense, useEffect } from 'react';
import { Store } from 'redux';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './models/init';
import './i18n';
import { Quiz, Lobby, Auth, Main } from './domains';
import { Nav } from './components';
import { getUserInfo } from './models/userInfo';
import { ErrorBoundary, Loader, LanguageSwitcher } from './components';
import { FeatureToggleProvider } from './plugins';
import styles from './styles.module.css';
import './variables.css';

const Rating = lazy(() => import('./domains/rating'));

export const App = ({ store }: { store: Store }) => {
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className={styles.app}>
      <Provider store={store}>
        <ErrorBoundary>
          <FeatureToggleProvider>
            <header className={styles.header}>
              <Nav />
              <LanguageSwitcher />
            </header>
            <Routes>
              <Route path='/' element={<Main />} />
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
          </FeatureToggleProvider>
        </ErrorBoundary>
      </Provider>
    </div>
  );
};
