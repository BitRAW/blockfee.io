module.exports = {
  globDirectory: 'public/',
  globPatterns: [
    '**/*.{css,js,ico,html,svg,json}'
  ],
  swDest: 'public/sw.js',
  runtimeCaching: [{
    urlPattern: new RegExp('https://backend.bitraw.io'),
    handler: 'CacheFirst',
    options: {
      cacheName: 'api-calls',
      cacheableResponse: { statuses: [0, 200] },
      expiration: {
        maxEntries: 20,
      },
    },
  }],
};