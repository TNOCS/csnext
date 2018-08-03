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
    "revision": "6a992e11ed05169d72c3084363e3c4de"
  },
  {
    "url": "assets/css/0.styles.e2188309.css",
    "revision": "4d03c245f69011dad544f03967e9ff88"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.4936338e.js",
    "revision": "dd8678d5d0ddaf2d4a69e48d75488f81"
  },
  {
    "url": "assets/js/11.92711559.js",
    "revision": "de6607f679f26d796a8aec5e031cbe26"
  },
  {
    "url": "assets/js/12.4889d93f.js",
    "revision": "790666d337095328868522b2bb8ce31d"
  },
  {
    "url": "assets/js/13.84e724a4.js",
    "revision": "47643528e2cd22f87afcad0e294e8022"
  },
  {
    "url": "assets/js/14.c11039d6.js",
    "revision": "df3b15f9d127ef3d1288dd069139f479"
  },
  {
    "url": "assets/js/15.440de0cc.js",
    "revision": "052003bae3d5fff3ab91a0695157b8dd"
  },
  {
    "url": "assets/js/2.285762ea.js",
    "revision": "93afbd4e91ed17280e84a6930dc81b17"
  },
  {
    "url": "assets/js/3.76ce291f.js",
    "revision": "f3032b1a6c569fcdc3405712b1e0d656"
  },
  {
    "url": "assets/js/4.4441a52b.js",
    "revision": "811a7e8a5711b458f43c36e03f6a9add"
  },
  {
    "url": "assets/js/5.529ec0b7.js",
    "revision": "ab08163854c1727116d3b077be14ceb7"
  },
  {
    "url": "assets/js/6.af3c5567.js",
    "revision": "e09224b43ea04d0303b8b1fa31a99330"
  },
  {
    "url": "assets/js/7.aaf2a4e8.js",
    "revision": "4b733b642168c36ac2edf7108bcdba5e"
  },
  {
    "url": "assets/js/8.fa3e660a.js",
    "revision": "311c770e751f75dc8cf848d86b80a3c1"
  },
  {
    "url": "assets/js/9.697c0784.js",
    "revision": "3712d872e7df88ee4eb873abd86247d6"
  },
  {
    "url": "assets/js/app.2d3b2967.js",
    "revision": "965505014f27bf3e8788dc32b1b4e6d7"
  },
  {
    "url": "cs-transparent.png",
    "revision": "eac984d4ba726d91b2c428bffd364465"
  },
  {
    "url": "development/index.html",
    "revision": "582d8e49f1f27d11386955c7f0845d76"
  },
  {
    "url": "examples/index.html",
    "revision": "c46dd75dca86b04b1cda85f95effeaf4"
  },
  {
    "url": "guide/configuration.html",
    "revision": "62cbe29f989e2f5fbd83e4bcb1fc0ce6"
  },
  {
    "url": "guide/dashboards.html",
    "revision": "036b6c43fc110219d8a6b23cfb123d98"
  },
  {
    "url": "guide/datasources.html",
    "revision": "8c6a661ed72f462b7d9c34970a600d6d"
  },
  {
    "url": "guide/index.html",
    "revision": "8b287375196103f6d8ae01b9e3c01997"
  },
  {
    "url": "guide/installation.html",
    "revision": "5569235dab4500b0a6d5e2b4c8c4428a"
  },
  {
    "url": "guide/layout.html",
    "revision": "caefc136593c29ae8ca3f1ec373d8f45"
  },
  {
    "url": "guide/navigation.html",
    "revision": "62a50f5890828e11645d34e39c7dd9b1"
  },
  {
    "url": "guide/sidebars.html",
    "revision": "0964ee0d4597dd339f75fc3c061d9725"
  },
  {
    "url": "guide/widgets.html",
    "revision": "28e0b5a1301e2da3394d18d769d71d6f"
  },
  {
    "url": "index.html",
    "revision": "b3083c039a8f979158b4c874fddac524"
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
