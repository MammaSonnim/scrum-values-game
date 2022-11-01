import { AuthAppGate } from '.';
import './login';
import './logout';

// GATES
AuthAppGate.open.watch((payload) => {
  return payload;
});

AuthAppGate.close.watch((payload) => {
  return payload;
});
