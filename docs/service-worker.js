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
    "revision": "8d876884dd2b4107b6c9aa857635ba98"
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
    "url": "assets/JS/10.0c624703.js",
    "revision": "4dc811f707a470b9850b32e93b0fef27"
  },
  {
    "url": "assets/JS/11.07ce769f.js",
    "revision": "58d1692c21f2d8584f9ee1e9f80da47f"
  },
  {
    "url": "assets/JS/12.2be90bd9.js",
    "revision": "7b5bef61e9d17e42a43efbea82e860dd"
  },
  {
    "url": "assets/JS/13.66182a92.js",
    "revision": "194de5b9d5fb0ec788e69eb99fa825b9"
  },
  {
    "url": "assets/JS/14.bf7d61e0.js",
    "revision": "7ca6072a766c8a7daf49d79eb9d37995"
  },
  {
    "url": "assets/JS/15.796291f2.js",
    "revision": "b55bb9d6e354c7713481acc406fc3ee3"
  },
  {
    "url": "assets/JS/2.285762ea.js",
    "revision": "93afbd4e91ed17280e84a6930dc81b17"
  },
  {
    "url": "assets/JS/3.c33e6c8d.js",
    "revision": "00e732d58a5d06782bef3319d42f22ab"
  },
  {
    "url": "assets/JS/4.aa6d258c.js",
    "revision": "669721a604c06bd52736cb2259bb3268"
  },
  {
    "url": "assets/JS/5.860db65c.js",
    "revision": "2754ace901cac96ea5c1ca8fcc110c56"
  },
  {
    "url": "assets/JS/6.11baaf44.js",
    "revision": "107e09ce05f95a5ca98a8cbb3f1ee20d"
  },
  {
    "url": "assets/JS/7.36539e61.js",
    "revision": "4718baef9004d4d952e82a6cc027b799"
  },
  {
    "url": "assets/JS/8.98a4b201.js",
    "revision": "b04e78bd1261f0a5f86b69889c568414"
  },
  {
    "url": "assets/JS/9.ff66d2f9.js",
    "revision": "3c7aee0be790b7fd57cf6443415a8d31"
  },
  {
    "url": "assets/JS/app.5e4689cb.js",
    "revision": "1265b836f08b32f8bccfaba1571ae474"
  },
  {
    "url": "cs-transparent.png",
    "revision": "eac984d4ba726d91b2c428bffd364465"
  },
  {
    "url": "development/index.html",
    "revision": "277ea8e2b8876c647f9a255b16136bac"
  },
  {
    "url": "examples/index.html",
    "revision": "95817a38e1268a1f8e3967a3130b37e5"
  },
  {
    "url": "guide/configuration.html",
    "revision": "670c8ecd3f5e8d9cedc37001b34228b3"
  },
  {
    "url": "guide/dashboards.html",
    "revision": "3a69bbe8b76b0ff2eaea7274275145e9"
  },
  {
    "url": "guide/datasources.html",
    "revision": "ee4ee7452ff9e86737ba862c61f8abf8"
  },
  {
    "url": "guide/index.html",
    "revision": "b7de652f96a359d04527c76452a74e7f"
  },
  {
    "url": "guide/installation.html",
    "revision": "e63d3fcfc718bc749782f896eca04dcd"
  },
  {
    "url": "guide/layout.html",
    "revision": "3dee957287c13c9d06a812a61a2de6e5"
  },
  {
    "url": "guide/navigation.html",
    "revision": "dace666231a76ef4f9260efd8790ad9a"
  },
  {
    "url": "guide/sidebars.html",
    "revision": "33eccf68f143b36a5873d5b2c5bccd79"
  },
  {
    "url": "guide/widgets.html",
    "revision": "fce55c48a5cde8b604779da51bf18aa6"
  },
  {
    "url": "index.html",
    "revision": "869bd8f5256ba76ebaaefa65f46181fb"
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
