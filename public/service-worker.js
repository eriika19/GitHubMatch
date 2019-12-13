self.__precacheManifest = [
  {
    "url": "/_next/static/chunks/commons.3b63f2b70d9e592c75e1.js",
    "revision": "deca1f203c1ffd9349b6"
  },
  {
    "url": "/_next/static/chunks/styles.24ddec3ee69fb1ab5ec0.js",
    "revision": "244638a08365851ca24b"
  },
  {
    "url": "/_next/static/css/styles.8bb69a5b.chunk.css",
    "revision": "244638a08365851ca24b"
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
    "url": "/_next/static\\-MN1vOHl4YXpzJtEsIxGJ\\pages\\_app.js",
    "revision": "5f004acfe05c4bdf5a76"
  },
  {
    "url": "/_next/static\\-MN1vOHl4YXpzJtEsIxGJ\\pages\\_error.js",
    "revision": "a8d1def38178b92d21fd"
  },
  {
    "url": "/_next/static\\-MN1vOHl4YXpzJtEsIxGJ\\pages\\index.js",
    "revision": "363d03e5016d41b6fb53"
  },
  {
    "url": "/_next/static\\-MN1vOHl4YXpzJtEsIxGJ\\pages\\repositories.js",
    "revision": "2293feea416739eb56e3"
  },
  {
    "url": "/_next/static\\-MN1vOHl4YXpzJtEsIxGJ\\pages\\users.js",
    "revision": "f6f94840a924698627aa"
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
