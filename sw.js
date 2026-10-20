const CACHE = "katzenstadt-49db0031ec89";
const FILES = ["./","./assets/browserAll-C5OJ07AB.js","./assets/BufferResource-BMii-7dZ.js","./assets/Cache-DDo62lBW.js","./assets/CanvasPool-DecUtJxW.js","./assets/canvasUtils-CxYPZET9.js","./assets/content-N6_U43IX.js","./assets/Filter-Cuc6AtmF.js","./assets/GCManagedHash-BZeqvyQ1.js","./assets/getTextureBatchBindGroup-DBCrgHVb.js","./assets/GraphicsContext-B9jLpIRb.js","./assets/index-Lho1ogI7.js","./assets/init-DZDOcr8X.js","./assets/RenderTargetSystem-0BZhCLve.js","./assets/vendor-CPcvosyw.js","./assets/wave-Syu2miOU.png","./assets/webworkerAll-b_1p-59N.js","./icon-180.png","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./index.html","./manifest.webmanifest"];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(FILES))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) {
    return;
  }
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const hit = await cache.match(request, { ignoreSearch: true });
      if (hit !== undefined) {
        return hit;
      }
      const page = request.mode === 'navigate' ? await cache.match('./') : undefined;
      return page ?? fetch(request);
    })(),
  );
});
