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
    "revision": "2b217429968908a80170f5c06bf29d0c"
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
    "url": "assets/js/app.039c907f.js",
    "revision": "23cf79524c5fb3fb7d6eecfbbd2f3e75"
  },
  {
    "url": "cs-transparent.png",
    "revision": "eac984d4ba726d91b2c428bffd364465"
  },
  {
    "url": "development/index.html",
    "revision": "b5d00f42626f122a9de5ea1426adaa43"
  },
  {
    "url": "examples/index.html",
    "revision": "b17563249961315c5b3c063c738cb470"
  },
  {
    "url": "guide/configuration.html",
    "revision": "20cb3ca2be307c6a01abbb5b75fec07a"
  },
  {
    "url": "guide/dashboards.html",
    "revision": "2219da652831f26493890ffe1046c90b"
  },
  {
    "url": "guide/datasources.html",
    "revision": "78498e105805c0903856e11abcf2e4a9"
  },
  {
    "url": "guide/index.html",
    "revision": "effcbe18345729f887a15dfc92b443c1"
  },
  {
    "url": "guide/installation.html",
    "revision": "4cfa41f3e66e69de6926d97225d4627c"
  },
  {
    "url": "guide/layout.html",
    "revision": "f417e25d2f2eeb031ad93614e502d7ec"
  },
  {
    "url": "guide/navigation.html",
    "revision": "2e4f1e5616eb10409415930e53074eb5"
  },
  {
    "url": "guide/sidebars.html",
    "revision": "50c69a1bccccbbfcc867b11fd86cf6b6"
  },
  {
    "url": "guide/widgets.html",
    "revision": "95c0475069497229e6aed38c5e251e3e"
  },
  {
    "url": "index.html",
    "revision": "65a2f26303f1d36bd4d8698a73d654ac"
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
