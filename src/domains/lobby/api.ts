import { EventNameT } from './types';

const subscribers = {
  message_received: [] as SubscriberMessageT[],
  status_changed: [] as SubscriberStatusT[],
};

let ws: WebSocket;

const notifyAboutStatus = () => {
  subscribers['status_changed'].forEach((subscriber: SubscriberStatusT) =>
    subscriber(ws?.readyState)
  );
};

/** Notity that channel is opened */
const onOpenHandler = () => {
  notifyAboutStatus();

  console.log('🤖 WS is opened!');
};

/** Notity that some error occured */
const onErrorHandler = () => {
  notifyAboutStatus();

  console.error('🤖 Something happened with connection');
};

/** Recreates channel when connection with server is lost for some external reason */
const onExternalCloseHandler = () => {
  console.log('🤖 WS is closed for external reason!');

  notifyAboutStatus();

  setTimeout(() => {
    createChannel();
  }, 5000);
};

/** Send data from server to subscribers */
const onMessageHandler = (e: MessageEvent) => {
  const { data } = e;

  subscribers['message_received'].forEach((subscriber: SubscriberMessageT) =>
    subscriber(data)
  );
};

export const closeChannel = () => {
  console.log('🤖 WS Close previous channel and clean up');

  ws?.close();

  ws?.removeEventListener('open', onOpenHandler);
  ws?.removeEventListener('close', onExternalCloseHandler);
  ws?.removeEventListener('message', onMessageHandler);
  ws?.removeEventListener('error', onErrorHandler);

  notifyAboutStatus();

  Object.keys(subscribers).forEach((subscriberKey) => {
    subscribers[subscriberKey as EventNameT] = [];
  });
};

export const createChannel = () => {
  console.log('🤖 WS Init creation:');

  closeChannel();

  ws = new WebSocket('ws://localhost:3003');

  ws.addEventListener('open', onOpenHandler);
  ws.addEventListener('close', onExternalCloseHandler);
  ws.addEventListener('message', onMessageHandler);
  ws.addEventListener('error', onErrorHandler);

  notifyAboutStatus();
};

export const lobbiApi = {
  start: () => {
    createChannel();
  },
  stop: () => {
    closeChannel();
  },
  subscribe: (
    eventName: EventNameT,
    callback: SubscriberMessageT | SubscriberStatusT
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    subscribers[eventName].push(callback);
  },
  unsubscribe: (
    eventName: EventNameT,
    callback: SubscriberMessageT | SubscriberStatusT
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(
      (subscriber: SubscriberMessageT | SubscriberStatusT) =>
        subscriber !== callback
    );
  },
  sendMessage: (message: string) => {
    ws?.send(message);
  },
};

type SubscriberMessageT = (message: string) => void;
type SubscriberStatusT = (status: number) => void;
