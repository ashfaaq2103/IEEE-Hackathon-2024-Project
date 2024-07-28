const CACHE_NAME = 'test-v1';

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '/',
      '/index.html',
      '/contact.html',
      '/footer.html',
      '/header.html',
      '/events.html',
      '/goGreen.html',
      '/JS/common.js',
      '/JS/event.js',
      '/JS/goGreen.js',
      '/JS/load_header_and_footer.js',
      '/JS/loader.js',
      '/JS/maps.js',
      '/JS/pwa_service.js',
      '/JS/sdg_return.js',
      '/JS/server.js',
      '/CSS/button.css',
      '/CSS/background.css',
      '/CSS/card.css',
      '/CSS/carousel.css',
      '/CSS/contact.css',
      '/CSS/container_split.css',
      '/CSS/footer.css',
      '/CSS/event.css',
      '/CSS/header.css',
      '/CSS/individual_social.css',
      '/CSS/loader.css',
      '/CSS/map.css',
      '/CSS/pallette.css',
      '/CSS/product.css',
      '/CSS/style.css',
      '/CSS/typewritter.css',
      '/CSS/searchbar.css'

    ]);
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Get the resource from the cache.
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
      try {
        // If the resource was not in the cache, try the network.
        const fetchResponse = await fetch(event.request);

        // Save the resource in the cache and return it.
        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      } catch (e) {
        // The network failed.
        console.error('Fetch failed; returning offline page instead.', e);
        const offlinePage = await cache.match('/');
        return offlinePage;
      }
    }
  })());
});
