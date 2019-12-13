self.__precacheManifest = [
  {
    "url": "/_next/static/chunks/commons.ec62b0cb84cfd418c85a.js",
    "revision": "44dce71066a5de318f58"
  },
  {
    "url": "/_next/static/chunks/styles.24ddec3ee69fb1ab5ec0.js",
    "revision": "68debc16c05b74a2dfd6"
  },
  {
    "url": "/_next/static/css/styles.8ed541d7.chunk.css",
    "revision": "68debc16c05b74a2dfd6"
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
    "url": "/_next/static\\qHCMniH5SoAp50fLQDybs\\pages\\_app.js",
    "revision": "b2d18e254a3a50d5e440"
  },
  {
    "url": "/_next/static\\qHCMniH5SoAp50fLQDybs\\pages\\_error.js",
    "revision": "1842314a3d7d2fd6f28c"
  },
  {
    "url": "/_next/static\\qHCMniH5SoAp50fLQDybs\\pages\\index.js",
    "revision": "6af2f4b6bceadcd4f093"
  },
  {
    "url": "/_next/static\\qHCMniH5SoAp50fLQDybs\\pages\\repositories.js",
    "revision": "58572fe88affd3b4c943"
  },
  {
    "url": "/_next/static\\qHCMniH5SoAp50fLQDybs\\pages\\users.js",
    "revision": "f2bd309f7c18dbc2e5f7"
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
