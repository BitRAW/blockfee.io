import {derived, Writable, writable} from 'svelte/store';
import type {Alert} from './objects/Alert';

type AlertMap = Record<symbol, Alert>;

export const alertMap = writable<AlertMap>({});

export const alerts = derived<Writable<AlertMap>, Array<Alert>>(alertMap,
    (values) => Object.getOwnPropertySymbols(values).map((k) => values[k]));

export const addAlert = (alert: Alert, delay = 4000) => {
  const id = Symbol();

  alertMap.update((currentAlerts) => ({...currentAlerts, [id]: alert}));

  const removeAlert = () => {
    alertMap.update((currentAlerts) => {
      delete currentAlerts[id];
      return currentAlerts;
    });
  };

  setTimeout(removeAlert, delay);

  return removeAlert;
};
