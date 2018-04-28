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
    "revision": "668d0144b44eba366ff2564097cfa66e"
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
    "url": "assets/js/0.c187393c.js",
    "revision": "8a15eca1d6ae8407e641bdfc41e4643c"
  },
  {
    "url": "assets/js/1.455983c9.js",
    "revision": "21a33572e853a0d6767b564ccf8de169"
  },
  {
    "url": "assets/js/2.a05160af.js",
    "revision": "20a6ba3e2f2e535efe472738fb8cd702"
  },
  {
    "url": "assets/js/app.a443aa03.js",
    "revision": "8db7bf36f39e4d1381faf765b6a9fb2b"
  },
  {
    "url": "examples/index.html",
    "revision": "701dd730995d2e7005457aa5e671d371"
  },
  {
    "url": "guide/index.html",
    "revision": "4467549ab8ecff3e8b833494990aaab0"
  },
  {
    "url": "index.html",
    "revision": "30b22f1432e07ef0789278af817421f4"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
