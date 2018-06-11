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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "8ce7cce8a36f643fd66227fbf8126a4e"
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
    "url": "assets/js/0.47617e7e.js",
    "revision": "8a15eca1d6ae8407e641bdfc41e4643c"
  },
  {
    "url": "assets/js/1.1ab3724b.js",
    "revision": "21a33572e853a0d6767b564ccf8de169"
  },
  {
    "url": "assets/js/2.16acc0a8.js",
    "revision": "77010a78bf1a218f669e501ed72f5698"
  },
  {
    "url": "assets/js/app.cd2770a2.js",
    "revision": "e72b09909d72fad258f34a52c89fc151"
  },
  {
    "url": "cs-transparent.png",
    "revision": "eac984d4ba726d91b2c428bffd364465"
  },
  {
    "url": "examples/index.html",
    "revision": "a37331602d8a044b9a4780c23041bc9d"
  },
  {
    "url": "guide/index.html",
    "revision": "0c2899177367bf905696181311a4deed"
  },
  {
    "url": "index.html",
    "revision": "196b5c5e58c0a997969f515aad9c7e9b"
  },
  {
    "url": "samples/basic/simple.html",
    "revision": "035acef601c15bebb88a9088ebcbfa8f"
  },
  {
    "url": "samples/images/logo.png",
    "revision": "eac984d4ba726d91b2c428bffd364465"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
