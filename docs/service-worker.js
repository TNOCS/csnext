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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "6da12a9072d53e60808722f969cf6046"
  },
  {
    "url": "assets/css/3.styles.3710225f.css",
    "revision": "1c501111eb6130b8efc03cb9d8f7f5ce"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/0.eb2f8fbd.js",
    "revision": "8a15eca1d6ae8407e641bdfc41e4643c"
  },
  {
    "url": "assets/js/1.9248e8ba.js",
    "revision": "21a33572e853a0d6767b564ccf8de169"
  },
  {
    "url": "assets/js/2.2b885f0e.js",
    "revision": "77010a78bf1a218f669e501ed72f5698"
  },
  {
    "url": "assets/js/app.cb4bebdf.js",
    "revision": "28e26806943f747553b6d531489a5b83"
  },
  {
    "url": "cs-transparent.png",
    "revision": "eac984d4ba726d91b2c428bffd364465"
  },
  {
    "url": "examples/index.html",
    "revision": "17ec6a02096451fc641f46b6423c12e6"
  },
  {
    "url": "guide/index.html",
    "revision": "408223d49d7750fbc9816cc146b6f2b8"
  },
  {
    "url": "index.html",
    "revision": "8a0547940fe8f11bbd29630d24d25d83"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
