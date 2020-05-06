self.__precacheManifest = [
  {
    "url": "/_next/static/7Fh5mIpdjJU4sChz5WbrA/_buildManifest.js",
    "revision": "e9071f95e9c8e7a5f12ac408b8e1254d"
  },
  {
    "url": "/_next/static/7Fh5mIpdjJU4sChz5WbrA/_ssgManifest.js",
    "revision": "abee47769bf307639ace4945f9cfd4ff"
  },
  {
    "url": "/_next/static/7Fh5mIpdjJU4sChz5WbrA/pages/_app.js",
    "revision": "42706e6970c774dce7d9"
  },
  {
    "url": "/_next/static/7Fh5mIpdjJU4sChz5WbrA/pages/_error.js",
    "revision": "ba8b463d6b6c16389681"
  },
  {
    "url": "/_next/static/7Fh5mIpdjJU4sChz5WbrA/pages/index.js",
    "revision": "ab906635a367ea1d8e89"
  },
  {
    "url": "/_next/static/7Fh5mIpdjJU4sChz5WbrA/pages/lists.js",
    "revision": "13182a494410dcc9f256"
  },
  {
    "url": "/_next/static/7Fh5mIpdjJU4sChz5WbrA/pages/repositories.js",
    "revision": "1c5ff48fb5b7a9750f09"
  },
  {
    "url": "/_next/static/7Fh5mIpdjJU4sChz5WbrA/pages/users.js",
    "revision": "123756692906a4d8be96"
  },
  {
    "url": "/_next/static/chunks/377b51b6cf9f4f0736ddca9ac130edf9c81f22f2.4bfa2483bba077b545b9.js",
    "revision": "273840fb7bc69c96a0ac"
  },
  {
    "url": "/_next/static/chunks/438aef96bb029f062e1f374cf5c6f6135b4308f8.3e7b54cc53400b65c3af.js",
    "revision": "9141e2bf134d1d0350b1"
  },
  {
    "url": "/_next/static/chunks/63f1d6763a030d98c10d62001f198f0eaad52514.20e4f0aee9c72e964c9b.js",
    "revision": "d350c281be2d1344e14d"
  },
  {
    "url": "/_next/static/chunks/63f1d6763a030d98c10d62001f198f0eaad52514.20e4f0aee9c72e964c9b.js.LICENSE.txt",
    "revision": "6fce53c7c7713ebf61712cc2929746fa"
  },
  {
    "url": "/_next/static/chunks/8804ed50.a92bf8af966800c0ed3d.js",
    "revision": "823118053491badf2370"
  },
  {
    "url": "/_next/static/chunks/a9a7754c.e338dfe451c41aee8f10.js",
    "revision": "9ced5aa1dbb5a0acb4c6"
  },
  {
    "url": "/_next/static/chunks/cb1608f2.b80b1001e26c5039d8cb.js",
    "revision": "e2448fab7d86fed742b2"
  },
  {
    "url": "/_next/static/chunks/commons.a5c54dcbb95a5c770266.js",
    "revision": "8e02858ebf80acd7afb4"
  },
  {
    "url": "/_next/static/chunks/framework.619a4f70c1d4d3a29cbc.js",
    "revision": "a3d0f19c5e3f180141b2"
  },
  {
    "url": "/_next/static/chunks/framework.619a4f70c1d4d3a29cbc.js.LICENSE.txt",
    "revision": "c7c771c7a9ea0b2f7e6b82ef94cc9f76"
  },
  {
    "url": "/_next/static/chunks/styles.e70994b67c8fa5b33037.js",
    "revision": "1407db2b09ba161e0101"
  },
  {
    "url": "/_next/static/css/8804ed50.01c72897.chunk.css",
    "revision": "823118053491badf2370"
  },
  {
    "url": "/_next/static/css/styles.3cc70bc4.chunk.css",
    "revision": "1407db2b09ba161e0101"
  },
  {
    "url": "/_next/static/runtime/main-c537d7fa476da6f52f58.js",
    "revision": "9f73d1f0d948c8e1608a"
  },
  {
    "url": "/_next/static/runtime/polyfills-29e3ec304c32fe4b9c51.js",
    "revision": "25dcdbfcfeba52e79354"
  },
  {
    "url": "/_next/static/runtime/webpack-6ef28db84b4c42ad34e9.js",
    "revision": "debb0246d97b5d82f0fe"
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
