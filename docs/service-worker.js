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
    "revision": "79c4d7bfc283473240772e0009a3ad13"
  },
  {
    "url": "assets/css/3.styles.0b24920e.css",
    "revision": "f6a8a025fbad004e2eae71de71a745da"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/JS/0.e7af34b8.js",
    "revision": "5524d8ef8f5cf9bd7d47026ce2e9b8c7"
  },
  {
    "url": "assets/JS/1.455983c9.js",
    "revision": "21a33572e853a0d6767b564ccf8de169"
  },
  {
    "url": "assets/JS/2.a05160af.js",
    "revision": "20a6ba3e2f2e535efe472738fb8cd702"
  },
  {
    "url": "assets/JS/app.3fae434f.js",
    "revision": "01b86ca12c91f817b6765a9ec7295ff4"
  },
  {
    "url": "examples/index.html",
    "revision": "3cca81301ee5aecb252ad3db6cb62ad5"
  },
  {
    "url": "guide/index.html",
    "revision": "03be90731c64670e59a50e501c47bb99"
  },
  {
    "url": "index.html",
    "revision": "72c1442da73259e9328d0ffab01984ca"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
