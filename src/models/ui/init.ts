import {
  setAppIsInitialized,
  $isAppInitialized,
} from './index';

$isAppInitialized.on(setAppIsInitialized, (prevState, payload) => {
  return payload;
});
