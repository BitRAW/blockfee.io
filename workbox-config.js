module.exports = {
  globDirectory: 'public/',
  globPatterns: [
    '**/*.{css,js,ico,html,svg,json}',
  ],
  swSrc: 'public/build/service-worker.js',
  swDest: 'public/sw.js',
};
