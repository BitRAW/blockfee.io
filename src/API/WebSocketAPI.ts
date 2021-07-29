import type {Message, MessageType} from '../objects/Message';
import {apiBase} from './BitrawAPI';

type MessageCallbackFn = (msg: Message) => any;

type MessageCallback = {
  messageType?: MessageType,
  cb: MessageCallbackFn
};

const subscribers: MessageCallback[] = [];

const connectWs = () => {
  const ws = new WebSocket(`wss://${apiBase}/ws`);

  ws.addEventListener('message', (msg: MessageEvent<any>) => {
    try {
      const parsedMessage = JSON.parse(msg.data);
      subscribers
          .filter((mc) => !mc.messageType || mc.messageType === parsedMessage.type)
          .forEach((mc) => mc.cb(parsedMessage));
    } catch (e) {
      console.error('could not parse message', msg.data);
    }
  });

  ws.addEventListener('close', () => {
    setTimeout(connectWs, 10);
  });
};

connectWs();

export const subscribe = (cb: MessageCallbackFn, messageType?: MessageType) => {
  const subscriber = {cb, messageType};
  subscribers.push(subscriber);
  return () => {
    const index = subscribers.indexOf(subscriber);
    if (index >= 0) {
      subscribers.splice(index, 1);
    }
  };
};

