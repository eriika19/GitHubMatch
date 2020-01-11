self.__precacheManifest = [
  {
    "url": "/_next/static/chunks/commons.55d63dbf6fe444bbb633.js",
    "revision": "6d9e38814889c9116456"
  },
  {
    "url": "/_next/static/chunks/styles.b314d5a56ab2e9ea3b68.js",
    "revision": "86c3752a6306c50bed3c"
  },
  {
    "url": "/_next/static/css/styles.bda91d18.chunk.css",
    "revision": "86c3752a6306c50bed3c"
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
    "url": "/_next/static\\9ojob2D5Xha59ck_84lPn\\pages\\_app.js",
    "revision": "ed99f2374af475689f81"
  },
  {
    "url": "/_next/static\\9ojob2D5Xha59ck_84lPn\\pages\\_error.js",
    "revision": "8575c4559ab93215b631"
  },
  {
    "url": "/_next/static\\9ojob2D5Xha59ck_84lPn\\pages\\index.js",
    "revision": "472450faa3d612e61ea0"
  },
  {
    "url": "/_next/static\\9ojob2D5Xha59ck_84lPn\\pages\\lists.js",
    "revision": "a46f9718683f2c08a892"
  },
  {
    "url": "/_next/static\\9ojob2D5Xha59ck_84lPn\\pages\\repositories.js",
    "revision": "16be944d719bcb32dac2"
  },
  {
    "url": "/_next/static\\9ojob2D5Xha59ck_84lPn\\pages\\users.js",
    "revision": "02de2b7ab3b6a88b538f"
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
