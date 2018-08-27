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
    "revision": "00a87d35da2ce03bf7cb115c85758483"
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
    "url": "assets/js/10.5ef1aea8.js",
    "revision": "dd8678d5d0ddaf2d4a69e48d75488f81"
  },
  {
    "url": "assets/js/11.c40db640.js",
    "revision": "de6607f679f26d796a8aec5e031cbe26"
  },
  {
    "url": "assets/js/12.392622ad.js",
    "revision": "790666d337095328868522b2bb8ce31d"
  },
  {
    "url": "assets/js/13.3d1fccdf.js",
    "revision": "47643528e2cd22f87afcad0e294e8022"
  },
  {
    "url": "assets/js/14.b8a74b4f.js",
    "revision": "df3b15f9d127ef3d1288dd069139f479"
  },
  {
    "url": "assets/js/15.d3fae04c.js",
    "revision": "052003bae3d5fff3ab91a0695157b8dd"
  },
  {
    "url": "assets/js/2.285762ea.js",
    "revision": "93afbd4e91ed17280e84a6930dc81b17"
  },
  {
    "url": "assets/js/3.0b395616.js",
    "revision": "f3032b1a6c569fcdc3405712b1e0d656"
  },
  {
    "url": "assets/js/4.13ad53d3.js",
    "revision": "811a7e8a5711b458f43c36e03f6a9add"
  },
  {
    "url": "assets/js/5.6ba6b52b.js",
    "revision": "ab08163854c1727116d3b077be14ceb7"
  },
  {
    "url": "assets/js/6.33ce5823.js",
    "revision": "e09224b43ea04d0303b8b1fa31a99330"
  },
  {
    "url": "assets/js/7.047b4071.js",
    "revision": "4b733b642168c36ac2edf7108bcdba5e"
  },
  {
    "url": "assets/js/8.96db6c77.js",
    "revision": "311c770e751f75dc8cf848d86b80a3c1"
  },
  {
    "url": "assets/js/9.f45806ad.js",
    "revision": "3712d872e7df88ee4eb873abd86247d6"
  },
  {
    "url": "assets/js/app.47870ca2.js",
    "revision": "27d1a9f45efd3b7b6b904800f16b7d08"
  },
  {
    "url": "cs-transparent.png",
    "revision": "eac984d4ba726d91b2c428bffd364465"
  },
  {
    "url": "development/index.html",
    "revision": "743dbb6456590d042e0a68929f1cb7b8"
  },
  {
    "url": "examples/index.html",
    "revision": "f54db483c7c4725cb33e66bdf4a9029a"
  },
  {
    "url": "guide/configuration.html",
    "revision": "ad14e0b1f5ca3074f024f160c442f22e"
  },
  {
    "url": "guide/dashboards.html",
    "revision": "0106b64156ce2f9087bc9010b37807c8"
  },
  {
    "url": "guide/datasources.html",
    "revision": "1d9aa4773491b9b467b8390782b8effb"
  },
  {
    "url": "guide/index.html",
    "revision": "5e6d80c6e7d4fde77ae257494a91cf88"
  },
  {
    "url": "guide/installation.html",
    "revision": "90c80b3f6e97a88835fb4055e5f658b7"
  },
  {
    "url": "guide/layout.html",
    "revision": "2f791204b60b29d736dd7a17d2c30ec7"
  },
  {
    "url": "guide/navigation.html",
    "revision": "fcbfa7de6f51ba399a1fdeec2da6a041"
  },
  {
    "url": "guide/sidebars.html",
    "revision": "d4b4bb1359d4bac2635e24ed0b68c414"
  },
  {
    "url": "guide/widgets.html",
    "revision": "d482ea87e11d83256da03ac8d4a43fec"
  },
  {
    "url": "index.html",
    "revision": "4e6c6189b08a9176e90558d1ef276c95"
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
