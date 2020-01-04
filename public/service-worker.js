self.__precacheManifest = [
  {
    "url": "/_next/static/chunks/commons.ce47f9a9498f1ae46ce4.js",
    "revision": "a33ee8aeb8e29313429d"
  },
  {
    "url": "/_next/static/chunks/styles.b314d5a56ab2e9ea3b68.js",
    "revision": "3a2c0960d9ff4d41b739"
  },
  {
    "url": "/_next/static/css/styles.3c3ae841.chunk.css",
    "revision": "3a2c0960d9ff4d41b739"
  },
  {
    "url": "/_next/static/runtime/main-7dade8777a133b1f5386.js",
    "revision": "3d27ebea42a4a9020fb0"
  },
  {
    "url": "/_next/static/runtime/polyfills-f5af81b00d12d923ec0f.js",
    "revision": "c133b2cadab912d169ad"
  },
  {
    "url": "/_next/static/runtime/webpack-4b444dab214c6491079c.js",
    "revision": "71726f334912f74c262a"
  },
  {
    "url": "/_next/static\\TSGq44xXy-Nhjfaln6B5K\\pages\\_app.js",
    "revision": "ce3076b576bb9ff6e013"
  },
  {
    "url": "/_next/static\\TSGq44xXy-Nhjfaln6B5K\\pages\\_error.js",
    "revision": "32c1148b2741295451ff"
  },
  {
    "url": "/_next/static\\TSGq44xXy-Nhjfaln6B5K\\pages\\index.js",
    "revision": "984037f8634f0587c38c"
  },
  {
    "url": "/_next/static\\TSGq44xXy-Nhjfaln6B5K\\pages\\repositories.js",
    "revision": "8203df2995a66077eb63"
  },
  {
    "url": "/_next/static\\TSGq44xXy-Nhjfaln6B5K\\pages\\users.js",
    "revision": "cc90a91f7b22d4b18143"
  }
];

/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  
);

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^https?.*/, new workbox.strategies.NetworkFirst({ "cacheName":"OfflineCache", plugins: [new workbox.expiration.Plugin({ maxEntries: 200, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/sheetsu.com\/apis\/v1.0bu\//, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"api-cache", plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ], headers: { 'x-test': 'true' } })] }), 'GET');
workbox.routing.registerRoute(/.*\.(?:png|jpg|jpeg|svg|gif)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/(results | question)/, new workbox.strategies.NetworkFirst({ plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ], headers: { 'x-test': 'true' } })] }), 'GET');
