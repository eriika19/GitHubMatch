self.__precacheManifest = [
  {
    "url": "/_next/static/chunks/commons.74e48fbbcd9b31670787.js",
    "revision": "d57b811462fda5c58acb"
  },
  {
    "url": "/_next/static/chunks/styles.24ddec3ee69fb1ab5ec0.js",
    "revision": "d283f88c4ee7c467f98d"
  },
  {
    "url": "/_next/static/css/styles.8edc0f24.chunk.css",
    "revision": "d283f88c4ee7c467f98d"
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
    "url": "/_next/static\\cROHWvELxBg87ofEpbBwH\\pages\\_app.js",
    "revision": "8d37791a37a516f5fac8"
  },
  {
    "url": "/_next/static\\cROHWvELxBg87ofEpbBwH\\pages\\_error.js",
    "revision": "397e3f0bf1b7af34a290"
  },
  {
    "url": "/_next/static\\cROHWvELxBg87ofEpbBwH\\pages\\index.js",
    "revision": "fb2eb1d28c6721462a2b"
  },
  {
    "url": "/_next/static\\cROHWvELxBg87ofEpbBwH\\pages\\repositories.js",
    "revision": "f7911af59f21ba23070f"
  },
  {
    "url": "/_next/static\\cROHWvELxBg87ofEpbBwH\\pages\\users.js",
    "revision": "89943af333e01d7c3a03"
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
