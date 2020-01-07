const { join } = require("path");
const { resolve: urlResolve } = require("url");
const express = require("express");
const next = require("next");
const Keyv = require("keyv");
const normalizeUrl = require("normalize-url");
const cacheableResponse = require("cacheable-response");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const app = next({ dev: dev, dir: "." });

const handle = app.getRequestHandler();

const cacheStore = new Keyv({ namespace: "ssr-cache" });

const _getSSRCacheKey = req => {
  const url = urlResolve("http://localhost", req.url);
  const { origin } = new URL(url);
  const baseKey = normalizeUrl(url, {
    removeQueryParameters: [
      "embed",
      "filter",
      "force",
      "proxy",
      "ref",
      /^utm_\w+/i
    ]
  });
  return baseKey.replace(origin, "").replace("/?", "");
};

const cacheManager = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1 hour
  get: async ({ req, res, pagePath, queryParams }) => {
    try {
      return {
        data: await app.renderToHTML(req, res, pagePath, queryParams)
      };
    } catch (e) {
      return { data: "error: " + e };
    }
  },
  send: ({ data, res }) => {
    res.send(data);
  },
  cache: cacheStore,
  getKey: _getSSRCacheKey,
  compress: true
});

function clearCompleteCache(res, req) {
  cacheStore.clear();
  res.status(200);
  res.send({
    path: req.hostname + req.baseUrl,
    purged: true,
    clearedCompleteCache: true
  });
  res.end();
}

function clearCacheForRequestUrl(req, res) {
  let key = _getSSRCacheKey(req);
  console.log("key: ", key);
  cacheStore.delete(key);
  res.status(200);
  res.send({
    path: req.hostname + req.baseUrl + req.path,
    key: key,
    purged: true,
    clearedCompleteCache: false
  });
  res.end();
}

app
  .prepare()
  .then(() => {
    const server = express();

    // Do not use caching for _next files
    server.get("/_next/*", (req, res) => {
      handle(req, res);
    });

    // handle GET request to /service-worker.js
    server.get("/service-worker.js", (req, res) => {
      // Don't cache service worker is a best practice.
      res.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
      );
      res.set("Content-Type", "application/javascript");
      const filePath = join(__dirname, "public/service-worker.js");
      app.serveStatic(req, res, filePath);
    });

    server.get("*", (req, res) => {
      if (dev || req.query.noCache) {
        res.setHeader("X-Cache-Status", "DISABLED");
        handle(req, res);
      } else {
        cacheManager({ req, res, pagePath: req.path });
      }
    });

    server.purge("*", (req, res) => {
      if (req.query.clearCache) {
        clearCompleteCache(res, req);
      } else {
        clearCacheForRequestUrl(req, res);
      }
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });