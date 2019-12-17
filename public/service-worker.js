self.__precacheManifest = [
  {
    "url": "/_next/static/chunks/commons.76903864591ff6fff690.js",
    "revision": "846d73e3e98020559773"
  },
  {
    "url": "/_next/static/chunks/styles.5899c4789551c4e8e90f.js",
    "revision": "5da1e0826f2f40dfa0de"
  },
  {
    "url": "/_next/static/css/commons.032e71d6.chunk.css",
    "revision": "846d73e3e98020559773"
  },
  {
    "url": "/_next/static/css/styles.fee6c861.chunk.css",
    "revision": "5da1e0826f2f40dfa0de"
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
    "url": "/_next/static\\XwLeam8igS33D9OsIhYG_\\pages\\_app.js",
    "revision": "7540ba135d1377d5122e"
  },
  {
    "url": "/_next/static\\XwLeam8igS33D9OsIhYG_\\pages\\_error.js",
    "revision": "c91bef80d77bb50186d4"
  },
  {
    "url": "/_next/static\\XwLeam8igS33D9OsIhYG_\\pages\\index.js",
    "revision": "7140cfab5e2481faa229"
  },
  {
    "url": "/_next/static\\XwLeam8igS33D9OsIhYG_\\pages\\repositories.js",
    "revision": "70e7f8d64753343c360a"
  },
  {
    "url": "/_next/static\\XwLeam8igS33D9OsIhYG_\\pages\\users.js",
    "revision": "4163c516dcd3ba824c59"
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
