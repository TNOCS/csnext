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
    "revision": "e2ab497320d10564eb5596e7893b877d"
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
    "url": "assets/js/app.5c67a300.js",
    "revision": "88d601df7e3a67c2a20e796297b9486a"
  },
  {
    "url": "cs-transparent.png",
    "revision": "eac984d4ba726d91b2c428bffd364465"
  },
  {
    "url": "development/index.html",
    "revision": "40da8462599aa0bece834bf8c08363f4"
  },
  {
    "url": "examples/index.html",
    "revision": "7be4af1a1efd68932500ce8fb2b0c94b"
  },
  {
    "url": "guide/configuration.html",
    "revision": "b983941c48c203d57083915e9ce5d39d"
  },
  {
    "url": "guide/dashboards.html",
    "revision": "35253ec116adb6d71f94ceb6293d1c5b"
  },
  {
    "url": "guide/datasources.html",
    "revision": "2d29c02d8c0aeb626f74e40d0ee92333"
  },
  {
    "url": "guide/index.html",
    "revision": "594059d40d854b52e4b3d0ccdf6d14ac"
  },
  {
    "url": "guide/installation.html",
    "revision": "83bbf7923a7d56ea06c6c8873b114281"
  },
  {
    "url": "guide/layout.html",
    "revision": "80ee24e4a2af25385e8a1a1272232689"
  },
  {
    "url": "guide/navigation.html",
    "revision": "07d068e87d0074d1325e12934461529c"
  },
  {
    "url": "guide/sidebars.html",
    "revision": "422d6cca8c41a469882ebea0167219b5"
  },
  {
    "url": "guide/widgets.html",
    "revision": "c07d8dea15518a852b065508c1d405c7"
  },
  {
    "url": "index.html",
    "revision": "8dcf0d9d154898d64bf7c3fd2d5475ee"
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
