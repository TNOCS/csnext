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
    "revision": "55ef915e7ba009a7736b9afab5feef4e"
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
    "url": "assets/JS/0.9e5d3f88.js",
    "revision": "2238671e0c5c959610fdd3271ab3b450"
  },
  {
    "url": "assets/JS/1.e2309af5.js",
    "revision": "abde4fee43097dd0d98a38e6aad92bcd"
  },
  {
    "url": "assets/JS/2.a6dad5f3.js",
    "revision": "b3aa2b320bab95df81b971ec622fd037"
  },
  {
    "url": "assets/JS/app.16ef6010.js",
    "revision": "e40618b82a845f9f6abad02261a0f2a3"
  },
  {
    "url": "cs-transparent.png",
    "revision": "eac984d4ba726d91b2c428bffd364465"
  },
  {
    "url": "examples/index.html",
    "revision": "980fe2d21eadd3756e464adc2375a23e"
  },
  {
    "url": "guide/index.html",
    "revision": "5e517bd6cb2eea6f5ae21eee2a9641fb"
  },
  {
    "url": "index.html",
    "revision": "edc10760140a57c8c7c883b47d307d22"
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
