const withCSS = require("@zeit/next-css");
const withOffline = require("next-offline");
const { withPlugins } = require("next-compose-plugins");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const nextConfig = {
  workboxOpts: {
    clientsClaim: true,
    skipWaiting: true,
    swDest: path.join(__dirname, "public/service-worker.js"),

    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "OfflineCache",
          expiration: {
            maxEntries: 200
          }
        }
      },
      {
        urlPattern: new RegExp("^https://sheetsu.com/apis/v1.0bu/"),
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "api-cache",
          cacheableResponse: {
            statuses: [0, 200],
            headers: {
              "x-test": "true"
            }
          }
        }
      },
      {
        urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
        handler: "CacheFirst"
      },
      {
        urlPattern: /(results | question)/,
        handler: "NetworkFirst",
        options: {
          cacheableResponse: {
            statuses: [0, 200],
            headers: {
              "x-test": "true"
            }
          }
        }
      }
    ]
  },

  webpack(config, { isServer }) {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };

    if (!isServer) {
      config.module.rules
        .find(({ test }) => test.test("style.css"))
        .use.push({
          loader: "css-purify-webpack-loader",
          options: {
            includes: ["./pages/*.js", "./components/*.js"]
          }
        });
    }

    const PUBLIC_PATH = "..";

    config.plugins.push(
      new WebpackPwaManifest({
        filename: "static/manifest.json",
        name: "Luuna | GitHub Match",
        short_name: "GitHub Match",
        description: "Web App to find GitHub repositories and users.",
        background_color: "#FFF",
        theme_color: "#B2CCFF",
        display: "standalone",
        orientation: "portrait",
        fingerprints: false,
        inject: false,
        start_url: "/",
        ios: {
          "apple-mobile-web-app-title": "GitHub Match",
          "apple-mobile-web-app-status-bar-style": "#B2CCFF"
        },
        icons: [
          {
            src: path.resolve("public/assets/logo.png"),
            sizes: [36, 48, 72, 96, 144, 192, 512],
            destination: "/static"
          },
          {
            src: path.resolve("public/assets/logo.png"),
            sizes: [120, 152, 167, 180, 1024],
            destination: "/static",
            ios: true
          },
          {
            src: path.resolve("public/assets/logo.png"),
            size: 1024,
            destination: "/static",
            ios: "startup"
          }
        ],
        includeDirectory: true,
        publicPath: PUBLIC_PATH
      })
    );
    return config;
  }
};

/* module.exports = withCSS(nextConfig);
module.exports = withOffline(nextConfig) */

module.exports = withPlugins([[withCSS], [withOffline]], nextConfig);
