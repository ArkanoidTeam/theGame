const CACHE_NAME = 'my-site-cache-v1'
const URLS = [
  '/',
  '/App.tsx',
  '/index.css',
  '/main.tsx',
  '/built/style.css',
  '/built/bundle.js',
  '/api/',
  '/app/',
  '/assets/',
  '/components/',
  '/hoc/',
  '/hooks/',
  '/pages/',
  '/routes/',
  '/store/',
  '/theme/',
  '/types/',
  '/utils/',
  '/index.html',
]

this.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(URLS)
      })
      .catch(err => {
        console.log(err)
        throw err
      })
  )
  console.log('install')
})

this.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(name => caches.delete(name)))
    })
  )
  console.log('activate')
})

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response
      }

      const fetchRequest = event.request.clone()
      return fetch(fetchRequest).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache)
        })
        return response
      })
    })
  )
})
