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
    "revision": "c51e8c09ea12db0422db26aa6d9d323b"
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
    "url": "assets/js/2.835976c4.js",
    "revision": "20a6ba3e2f2e535efe472738fb8cd702"
  },
  {
    "url": "assets/js/app.5940a11b.js",
    "revision": "cd549f7ceb927e37caa4b987ddfa4a8d"
  },
  {
    "url": "examples/index.html",
    "revision": "5dc0961a62b6dcf3e49aafb97bd57304"
  },
  {
    "url": "guide/index.html",
    "revision": "693fa90f5c4923d7213d0d0b18cc0436"
  },
  {
    "url": "index.html",
    "revision": "f4517f6b717d13c990a64a9ae89c27d3"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
