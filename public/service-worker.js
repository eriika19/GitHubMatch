self.__precacheManifest = [
  {
    "url": "/_next/static/chunks/commons.7164758fe283708a8f0d.js",
    "revision": "e4a3f8d3f08f2ca2a8b4"
  },
  {
    "url": "/_next/static/chunks/styles.b314d5a56ab2e9ea3b68.js",
    "revision": "5bd24622c53748b1bacf"
  },
  {
    "url": "/_next/static/css/styles.1773f116.chunk.css",
    "revision": "5bd24622c53748b1bacf"
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
    "url": "/_next/static\\LqzOeYcEtMXBEtxRLL1HP\\pages\\_app.js",
    "revision": "6e51ba5854085c52c98f"
  },
  {
    "url": "/_next/static\\LqzOeYcEtMXBEtxRLL1HP\\pages\\_error.js",
    "revision": "8bc81063d15672ede2e2"
  },
  {
    "url": "/_next/static\\LqzOeYcEtMXBEtxRLL1HP\\pages\\index.js",
    "revision": "30d21e176fbc03d474e4"
  },
  {
    "url": "/_next/static\\LqzOeYcEtMXBEtxRLL1HP\\pages\\repositories.js",
    "revision": "9b1c112d167239a811be"
  },
  {
    "url": "/_next/static\\LqzOeYcEtMXBEtxRLL1HP\\pages\\users.js",
    "revision": "20240c3faf6b9593e062"
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
