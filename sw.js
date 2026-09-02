/* PIN Practice service worker.
 *
 * Two jobs: make the app work with no network (the point of installing it
 * on a kid's tablet), and satisfy the installability criteria that gate
 * Chrome's install prompt.
 *
 * Strategy is deliberately split. The HTML document is network-first, so a
 * deploy reaches people on their next online load instead of being pinned
 * to whatever was cached the first time. Everything else same-origin is
 * cache-first, since those files only change when the cache name below
 * changes. Cross-origin requests (the Google Fonts stylesheet and its font
 * files) are left entirely alone - the browser's own HTTP cache handles
 * them, and the page has a real font stack to fall back on offline.
 *
 * Bump CACHE_NAME whenever the precache list changes.
 */
var CACHE_NAME = "pin-practice-v2";
var PRECACHE = [
  "./",
  "./index.html",
  "./icon.svg",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png",
  "./manifest.webmanifest"
];

self.addEventListener("install", function (event)
{
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) { return cache.addAll(PRECACHE); })
      .then(function () { return self.skipWaiting(); })
      .catch(function () { /* a failed precache must not block install */ })
  );
});

self.addEventListener("activate", function (event)
{
  event.waitUntil(
    caches.keys().then(function (keys)
    {
      return Promise.all(keys.map(function (key)
      {
        return key === CACHE_NAME ? null : caches.delete(key);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event)
{
  var request = event.request;

  if (request.method !== "GET")
  {
    return;
  }

  var url;
  try
  {
    url = new URL(request.url);
  }
  catch (e)
  {
    return;
  }

  // Fonts and anything else off-origin: not ours to manage.
  if (url.origin !== self.location.origin)
  {
    return;
  }

  // The page itself: fresh when online, cached when not.
  if (request.mode === "navigate")
  {
    event.respondWith(
      fetch(request).then(function (response)
      {
        // Only a real page replaces the cached one - without the ok
        // check a 404 or an error page would be stored as index.html and
        // then served offline forever after.
        if (response && response.ok)
        {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache)
          {
            cache.put("./index.html", copy);
          });
        }
        return response;
      }).catch(function ()
      {
        return caches.match("./index.html").then(function (hit)
        {
          return hit || caches.match("./");
        });
      })
    );
    return;
  }

  // Everything else same-origin: cache first, refill on a miss.
  event.respondWith(
    caches.match(request).then(function (hit)
    {
      if (hit)
      {
        return hit;
      }
      return fetch(request).then(function (response)
      {
        if (response && response.ok && response.type === "basic")
        {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache)
          {
            cache.put(request, copy);
          });
        }
        return response;
      });
    })
  );
});
