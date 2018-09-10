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
    "revision": "e6ce5a79e89fa78cc166f2c39ae851f8"
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
    "url": "assets/js/10.0c624703.js",
    "revision": "4dc811f707a470b9850b32e93b0fef27"
  },
  {
    "url": "assets/js/11.07ce769f.js",
    "revision": "58d1692c21f2d8584f9ee1e9f80da47f"
  },
  {
    "url": "assets/js/12.2be90bd9.js",
    "revision": "7b5bef61e9d17e42a43efbea82e860dd"
  },
  {
    "url": "assets/js/13.66182a92.js",
    "revision": "194de5b9d5fb0ec788e69eb99fa825b9"
  },
  {
    "url": "assets/js/14.bf7d61e0.js",
    "revision": "7ca6072a766c8a7daf49d79eb9d37995"
  },
  {
    "url": "assets/js/15.796291f2.js",
    "revision": "b55bb9d6e354c7713481acc406fc3ee3"
  },
  {
    "url": "assets/js/2.285762ea.js",
    "revision": "93afbd4e91ed17280e84a6930dc81b17"
  },
  {
    "url": "assets/js/3.c33e6c8d.js",
    "revision": "00e732d58a5d06782bef3319d42f22ab"
  },
  {
    "url": "assets/js/4.aa6d258c.js",
    "revision": "669721a604c06bd52736cb2259bb3268"
  },
  {
    "url": "assets/js/5.860db65c.js",
    "revision": "2754ace901cac96ea5c1ca8fcc110c56"
  },
  {
    "url": "assets/js/6.11baaf44.js",
    "revision": "107e09ce05f95a5ca98a8cbb3f1ee20d"
  },
  {
    "url": "assets/js/7.36539e61.js",
    "revision": "4718baef9004d4d952e82a6cc027b799"
  },
  {
    "url": "assets/js/8.98a4b201.js",
    "revision": "b04e78bd1261f0a5f86b69889c568414"
  },
  {
    "url": "assets/js/9.ff66d2f9.js",
    "revision": "3c7aee0be790b7fd57cf6443415a8d31"
  },
  {
    "url": "assets/js/app.69e23b3e.js",
    "revision": "15bd4443046b802f38b7eba1fcea459e"
  },
  {
    "url": "cs-transparent.png",
    "revision": "eac984d4ba726d91b2c428bffd364465"
  },
  {
    "url": "development/index.html",
    "revision": "ecce2faa6366c13de6cf0a5360ab40a1"
  },
  {
    "url": "examples/index.html",
    "revision": "961ec454f7fca89eaf8196a4f329969e"
  },
  {
    "url": "guide/configuration.html",
    "revision": "8810a031c598409247a7574ec9ddf6dd"
  },
  {
    "url": "guide/dashboards.html",
    "revision": "a5c85443ba00ea67ae548ee75c235f57"
  },
  {
    "url": "guide/datasources.html",
    "revision": "7f2290e51ae39da23baf2d80502779d3"
  },
  {
    "url": "guide/index.html",
    "revision": "2ca20614da26c24d9c08bbcb6906d127"
  },
  {
    "url": "guide/installation.html",
    "revision": "f00df71b6f31f235eb25bba63e3ba207"
  },
  {
    "url": "guide/layout.html",
    "revision": "1868f4af04ea0e406157df400ccbee9a"
  },
  {
    "url": "guide/navigation.html",
    "revision": "1e98e0bb12c6b508bdb19b259c4658f6"
  },
  {
    "url": "guide/sidebars.html",
    "revision": "33bf73e4dd2004333281adb9c7009709"
  },
  {
    "url": "guide/widgets.html",
    "revision": "684a82dc958a2b28e44f474713c02e83"
  },
  {
    "url": "index.html",
    "revision": "a1c1fdc5e081946a61d83d6d65d9493e"
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
