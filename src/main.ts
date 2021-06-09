import {addAlert} from './alert';
import App from './App.svelte';
import {Workbox} from 'workbox-window';

declare let process: any;

const app = new App({
  target: document.body,
  props: {
  },
});

if (process.env.isProd && 'serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');

  wb.addEventListener('waiting', () => {
    addAlert({
      message: 'New version available',
      action: {label: 'update', callback: () => {
        wb.addEventListener('controlling', () => {
          window.location.reload();
        });
        wb.messageSkipWaiting();
      }},
    });
  });

  wb.register();
}

export default app;
