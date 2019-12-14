self.__precacheManifest = [
  {
    "url": "/_next/static/chunks/commons.74e48fbbcd9b31670787.js",
    "revision": "d57b811462fda5c58acb"
  },
  {
    "url": "/_next/static/chunks/styles.24ddec3ee69fb1ab5ec0.js",
    "revision": "dd52e3b8b1d169a2fd36"
  },
  {
    "url": "/_next/static/css/styles.e5307d3b.chunk.css",
    "revision": "dd52e3b8b1d169a2fd36"
  },
  {
    "url": "/_next/static/runtime/main-36914d9c5375bc6f17a6.js",
    "revision": "e97b99f1937a8f3f24bf"
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
    "url": "/_next/static\\47qIy657sXBxBuMB2_JTk\\pages\\_app.js",
    "revision": "bad5106f628de5248cc8"
  },
  {
    "url": "/_next/static\\47qIy657sXBxBuMB2_JTk\\pages\\_error.js",
    "revision": "61ed88f6f7c3f702751f"
  },
  {
    "url": "/_next/static\\47qIy657sXBxBuMB2_JTk\\pages\\index.js",
    "revision": "58f0fddef974dea4b178"
  },
  {
    "url": "/_next/static\\47qIy657sXBxBuMB2_JTk\\pages\\repositories.js",
    "revision": "07d86e27a16a50053bce"
  },
  {
    "url": "/_next/static\\47qIy657sXBxBuMB2_JTk\\pages\\users.js",
    "revision": "7edfc34f12ff5a74e23b"
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
