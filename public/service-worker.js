self.__precacheManifest = [
  {
    "url": "/_next/static/chunks/commons.feb56bb6b6947992d0f4.js",
    "revision": "f0039bbd2d2bee3aebbe"
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
    "url": "/_next/static\\0_DYlHieeZqvhdzlriNgs\\pages\\_app.js",
    "revision": "82713f600b636983b217"
  },
  {
    "url": "/_next/static\\0_DYlHieeZqvhdzlriNgs\\pages\\_error.js",
    "revision": "b243c4c2ff789b488ee7"
  },
  {
    "url": "/_next/static\\0_DYlHieeZqvhdzlriNgs\\pages\\index.js",
    "revision": "c765003a1d290012a62a"
  },
  {
    "url": "/_next/static\\0_DYlHieeZqvhdzlriNgs\\pages\\repositories.js",
    "revision": "b340f448b0a9b0b96f3e"
  },
  {
    "url": "/_next/static\\0_DYlHieeZqvhdzlriNgs\\pages\\users.js",
    "revision": "ec43b0350478b8fb6b26"
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
workbox.routing.registerRoute(/^https:\/\/api.github.com\//, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"api-cache", plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ], headers: { 'x-test': 'true' } })] }), 'GET');
workbox.routing.registerRoute(/.*\.(?:png|jpg|jpeg|svg|gif)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/(results | question)/, new workbox.strategies.NetworkFirst({ plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ], headers: { 'x-test': 'true' } })] }), 'GET');
