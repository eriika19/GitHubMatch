self.__precacheManifest = [
  {
    "url": "/_next/static/chunks/commons.bc1dfd5682a534262f7f.js",
    "revision": "c40da9d3e40638586693"
  },
  {
    "url": "/_next/static/chunks/styles.b314d5a56ab2e9ea3b68.js",
    "revision": "a26fc33482a84553b759"
  },
  {
    "url": "/_next/static/css/styles.aac1b206.chunk.css",
    "revision": "a26fc33482a84553b759"
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
    "url": "/_next/static\\FyfAeP2MYslW2pahdkJsK\\pages\\_app.js",
    "revision": "943ca3e0d6d51e56031d"
  },
  {
    "url": "/_next/static\\FyfAeP2MYslW2pahdkJsK\\pages\\_error.js",
    "revision": "388b569b9a6be33a0bdd"
  },
  {
    "url": "/_next/static\\FyfAeP2MYslW2pahdkJsK\\pages\\index.js",
    "revision": "256ba90dee7d77a9e196"
  },
  {
    "url": "/_next/static\\FyfAeP2MYslW2pahdkJsK\\pages\\repositories.js",
    "revision": "b327e32c3b7d40db982b"
  },
  {
    "url": "/_next/static\\FyfAeP2MYslW2pahdkJsK\\pages\\users.js",
    "revision": "ed585ba636503633e232"
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
