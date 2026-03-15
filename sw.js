var CACHE_NAME = 'gurkha-gains-v7';
var urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

var fontUrls = [
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap',
  'https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg69CK48gW7PXoo9Wlhyw.woff2',
  'https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwA.woff2',
  'https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.woff2'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache).then(function() {
        return Promise.allSettled(
          fontUrls.map(url =>
            fetch(url, { mode: 'cors' })
              .then(response => { if (response.ok) return cache.put(url, response); })
              .catch(() => {})
          )
        );
      });
    })
  );
  self.skip
