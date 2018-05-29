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
    "revision": "325265d6d1ee3fdadf371dfdd667f91b"
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
    "url": "assets/js/0.8cf35ea2.js",
    "revision": "8a15eca1d6ae8407e641bdfc41e4643c"
  },
  {
    "url": "assets/js/1.6c894b7d.js",
    "revision": "21a33572e853a0d6767b564ccf8de169"
  },
  {
    "url": "assets/js/2.dc51c3ca.js",
    "revision": "77010a78bf1a218f669e501ed72f5698"
  },
  {
    "url": "assets/js/app.d7bac812.js",
    "revision": "e46fc1a73e16960541f964bc1eeb652d"
  },
  {
    "url": "cs-transparent.png",
    "revision": "eac984d4ba726d91b2c428bffd364465"
  },
  {
    "url": "examples/index.html",
    "revision": "7e2f4905e73a3fb51c9f75fdb946953a"
  },
  {
    "url": "guide/index.html",
    "revision": "8b0585675786850dde4b50706a91ff84"
  },
  {
    "url": "index.html",
    "revision": "c96c089f073679f2467de91307cb6292"
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
