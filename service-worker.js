import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';

import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {ExpirationPlugin} from 'workbox-expiration';
import {CacheFirst} from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('skip waiting called');
    self.skipWaiting();
  }
});

// Cache Api calls with a Cache First strategy
registerRoute(
    ({url}) => url.origin === 'https://backend.bitraw.io',
    new CacheFirst({
      cacheName: 'api-calls',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxEntries: 30,
        }),
      ],
    }),
);
