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
      '/JS/common.js',
      '/JS/createTables.js',
      '/JS/load_header_and_footer.js',
      '/JS/loader.js',
      '/JS/login.js',
      '/JS/server.js',
      '/CSS/button.css',
      '/CSS/card.css',
      '/CSS/contact.css',
      '/CSS/container_split.css',
      '/CSS/footer.css',
      '/CSS/header.css',
      '/CSS/individual_social.css',
      '/CSS/loader.css',
      '/CSS/login.css',
      '/CSS/pallette.css',
      '/CSS/password_box.css',
      '/CSS/style.css'
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
