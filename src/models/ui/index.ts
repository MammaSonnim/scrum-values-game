import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import { attachLogger } from 'effector-logger/attach';

export const Domain = createDomain('UI');

attachLogger(Domain);

export const UserInfoAppGate = createGate('UIGate');

export const $isAppInitialized = Domain.createStore<boolean>(false);
export const setAppIsInitialized = Domain.createEvent<boolean>('SET_APP_INITIALIZED');
