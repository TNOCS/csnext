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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "427f79d5936f5ab1599767961ee6ccbb"
  },
  {
    "url": "assets/css/0.styles.15f1dd12.css",
    "revision": "da3281bc93970046b0061964511294cf"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.4c31fafc.js",
    "revision": "ebd46dcbb9e59b6352aab82ddd752640"
  },
  {
    "url": "assets/js/11.682f0daf.js",
    "revision": "bfdad0bfad718a695c389faf3fc4058e"
  },
  {
    "url": "assets/js/12.bdd17ca4.js",
    "revision": "888f2c13b49602fec5787de1e08dedac"
  },
  {
    "url": "assets/js/13.aa34abff.js",
    "revision": "65158647e9af426a1ed225394608dc14"
  },
  {
    "url": "assets/js/14.5f49a94c.js",
    "revision": "cc6ee5d59a5eb5d48e0ea2d2297ca742"
  },
  {
    "url": "assets/js/15.7697a506.js",
    "revision": "a8ebc485293b60c161d9cca2a12d891e"
  },
  {
    "url": "assets/js/2.f5e5c9f7.js",
    "revision": "2f77d0218617076fc636691a97987b64"
  },
  {
    "url": "assets/js/3.f4fa957b.js",
    "revision": "c67576278fae890e9e8efc7480314458"
  },
  {
    "url": "assets/js/4.1d899c06.js",
    "revision": "c909ad47b5ec43020c2375bea0f55141"
  },
  {
    "url": "assets/js/5.04fcaf3d.js",
    "revision": "026645cbfbf7cae99343901956728123"
  },
  {
    "url": "assets/js/6.fea903cb.js",
    "revision": "73c9181a918971d24653419ea374d832"
  },
  {
    "url": "assets/js/7.1f7fba4c.js",
    "revision": "c94caf3c900e25403f824779be32d56b"
  },
  {
    "url": "assets/js/8.2ffb4e6c.js",
    "revision": "cdf782045e1d48b482a8e3243a6bcebf"
  },
  {
    "url": "assets/js/9.50a10445.js",
    "revision": "f9afa347b8903d88bc2b7d47659c56f7"
  },
  {
    "url": "assets/js/app.8daace19.js",
    "revision": "cb961ee7c3edc0e3787cf02864bc3c0e"
  },
  {
    "url": "cs-transparent.png",
    "revision": "eac984d4ba726d91b2c428bffd364465"
  },
  {
    "url": "development/index.html",
    "revision": "c38ce627db44596a74c0c4ebf073fcc5"
  },
  {
    "url": "examples/index.html",
    "revision": "ff03a37b74779212abeb2bb70cc0c2d1"
  },
  {
    "url": "guide/configuration.html",
    "revision": "6db97eaad6ba4712991bd779fe512b15"
  },
  {
    "url": "guide/dashboards.html",
    "revision": "0d5cb9fadbb9141d66636db9abb69ff3"
  },
  {
    "url": "guide/datasources.html",
    "revision": "e4eeef2b1ff8100f456ae2c4c049c105"
  },
  {
    "url": "guide/index.html",
    "revision": "9dfb127f3795a65c96b34923630505dc"
  },
  {
    "url": "guide/installation.html",
    "revision": "6022505db0f7703d47f0a61e460f5c1b"
  },
  {
    "url": "guide/layout.html",
    "revision": "c2b7049a22b2d86cc0045c37f2c4140b"
  },
  {
    "url": "guide/navigation.html",
    "revision": "23a3925d67762f321589adff3cae9a06"
  },
  {
    "url": "guide/sidebars.html",
    "revision": "902ca2a40579b32c4c3d42a4e7caa77b"
  },
  {
    "url": "guide/widgets.html",
    "revision": "685007c01ec7a7a22c163c9d937a5b66"
  },
  {
    "url": "index.html",
    "revision": "f3daed462105c001c5afe368a8793af5"
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
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
