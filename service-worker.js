importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn@4.3.0/workbox/workbox-sw.min.js');

workbox.setConfig({
  modulePathPrefix: 'https://cdn.jsdelivr.net/npm/workbox-cdn@4.2.0/workbox/'
});

if (workbox) {
  workbox.core.setCacheNameDetails({
    prefix: 'my-app',
    suffix: 'v1',
    precache: 'custom-precache-name',
    runtime: 'custom-runtime-name'
  });


  workbox.precaching.precacheAndRoute([
    'lib/Han/dist/han.min.css?v=3.3',
    'lib/jquery/index.js?v=2.1.3',
    'lib/fastclick/lib/fastclick.min.js?v=1.0.6',
    'lib/jquery_lazyload/jquery.lazyload.js?v=1.9.7',
    'lib/velocity/velocity.min.js?v=1.2.1',
    'lib/velocity/velocity.ui.min.js?v=1.2.1',
    'js/src/utils.js?v=5.1.4',
    'js/src/motion.js?v=5.1.4',
    'js/src/bootstrap.js?v=5.1.4',
    {
      url: '/index.html',
      revision: '999999'
  },
  ],{
    directoryIndex: null
  })
  // han-cdn
  workbox.routing.registerRoute(
    'https://cdnjs.cloudflare.com/ajax/libs/Han/3.3.0/han.min.css',
    new workbox.strategies.StaleWhileRevalidate({
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        })
      ]
    }),
  );

  // font-cdn
  workbox.routing.registerRoute(
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
    new workbox.strategies.StaleWhileRevalidate({
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        })
      ]
    }),
  );

  // Caching Images
  workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|webp|svg|woff|woff2)/,
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );

  // Cache CSS and JavaScript Files
  workbox.routing.registerRoute(
    /\.(?:js|css)/,
    new workbox.strategies.CacheFirst({
      cacheName: 'static-resources',
    })
  );


  // Use a stale-while-revalidate strategy for all other requests
  workbox.routing.setDefaultHandler(
    new workbox.strategies.StaleWhileRevalidate()
  );

  // NetworkOnly
  workbox.routing.registerRoute(
    '/(baidu.com|hm.gif)/',
    new workbox.strategies.NetworkOnly()
  );

  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

} else {
  console.log('importScritp(service-worker)')
}