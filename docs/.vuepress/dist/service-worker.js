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
    "revision": "f8d1f3e01b64c96d1aee7e6d104890bf"
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
    "url": "assets/js/0.a5526e8c.js",
    "revision": "5524d8ef8f5cf9bd7d47026ce2e9b8c7"
  },
  {
    "url": "assets/js/1.c4159fb5.js",
    "revision": "21a33572e853a0d6767b564ccf8de169"
  },
  {
    "url": "assets/js/2.fda99943.js",
    "revision": "20a6ba3e2f2e535efe472738fb8cd702"
  },
  {
    "url": "assets/js/app.214e8839.js",
    "revision": "92559a65d7c477ef3fa433d89f2e9d8f"
  },
  {
    "url": "examples/index.html",
    "revision": "812d8d370e7f3d044087ee0c93701b84"
  },
  {
    "url": "guide/index.html",
    "revision": "94df37e9086ce90ef73d5c6053987a5f"
  },
  {
    "url": "index.html",
    "revision": "8bb0a4722edd2e45595233c17970259d"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
