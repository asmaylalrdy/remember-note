const CACHE_NAME = 'rady-note-v1';
const ASSETS = [
  '/',
  '/index.html',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap'
  // أضف هنا أي ملفات CSS أو صور أخرى تستخدمها محلياً
];

// تثبيت الـ Service Worker وحفظ الملفات في الكاش
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// تفعيل الـ Service Worker وحذف الكاش القديم
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// استرجاع الملفات من الكاش عند انقطاع الإنترنت
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// إدارة التنبيهات في الخلفية (Background Notifications)
self.addEventListener('showNotification', (event) => {
  const options = {
    body: event.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/3701/3701596.png',
    vibrate: [200, 100, 200],
    badge: 'https://cdn-icons-png.flaticon.com/512/3701/3701596.png'
  };
  event.waitUntil(
    self.registration.showNotification('Rady Note 🚀', options)
  );
});
