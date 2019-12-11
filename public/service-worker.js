self.__precacheManifest = [
  {
    "url": "/_next/static/chunks/commons.e7945ee73e8abebbc3de.js",
    "revision": "1a958792060364bc3938"
  },
  {
    "url": "/_next/static/chunks/styles.cd24f167ece00fa47366.js",
    "revision": "b4561d400fe0b4f18110"
  },
  {
    "url": "/_next/static/css/styles.e0e0ed85.chunk.css",
    "revision": "b4561d400fe0b4f18110"
  },
  {
    "url": "/_next/static/runtime/main-98c4af738c618631a8b3.js",
    "revision": "af2b564201d53833d302"
  },
  {
    "url": "/_next/static/runtime/polyfills-a591b2980a0968e30eae.js",
    "revision": "144cce4cb848103d568c"
  },
  {
    "url": "/_next/static/runtime/webpack-9369c5c69dbf6d4912cb.js",
    "revision": "339869abd27a67efd9af"
  },
  {
    "url": "/_next/static\\VEqxcFg-3HFDmIMne31rD\\pages\\_app.js",
    "revision": "c06d6484ec8f82ed8e99"
  },
  {
    "url": "/_next/static\\VEqxcFg-3HFDmIMne31rD\\pages\\_error.js",
    "revision": "e87fa688ffacf63789b8"
  },
  {
    "url": "/_next/static\\VEqxcFg-3HFDmIMne31rD\\pages\\index.js",
    "revision": "b7431dbab16ef757f242"
  },
  {
    "url": "/_next/static\\VEqxcFg-3HFDmIMne31rD\\pages\\repositories.js",
    "revision": "8701b313c9a321a926d6"
  },
  {
    "url": "/_next/static\\VEqxcFg-3HFDmIMne31rD\\pages\\users.js",
    "revision": "b5c315756aa51a4b4724"
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
