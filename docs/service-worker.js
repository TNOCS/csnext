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
    "revision": "53e0a2d0def2536ca8908b7aa4ab1f99"
  },
  {
    "url": "assets/css/3.styles.1d25f1e4.css",
    "revision": "1c501111eb6130b8efc03cb9d8f7f5ce"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/JS/0.75dd6616.js",
    "revision": "2238671e0c5c959610fdd3271ab3b450"
  },
  {
    "url": "assets/JS/1.310328e1.js",
    "revision": "abde4fee43097dd0d98a38e6aad92bcd"
  },
  {
    "url": "assets/JS/2.ae0ccdc8.js",
    "revision": "b3aa2b320bab95df81b971ec622fd037"
  },
  {
    "url": "assets/JS/app.57970fe6.js",
    "revision": "c0067da6b74bfc617093fbaa609a5c92"
  },
  {
    "url": "cs-transparent.png",
    "revision": "eac984d4ba726d91b2c428bffd364465"
  },
  {
    "url": "examples/index.html",
    "revision": "b55b3ed798aa9c423d027c1a68c0a06f"
  },
  {
    "url": "guide/index.html",
    "revision": "5365ac5e943d976cf83cc4045e2513c4"
  },
  {
    "url": "index.html",
    "revision": "7596433164c1c9ccd19e99666a6684f6"
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
