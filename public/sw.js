const STATIC_CACHE = 'static-v2' // Увеличил версию
const API_CACHE = 'api-v1'
const IMAGES_CACHE = 'images-v1' // 👈 НОВЫЙ кэш для изображений

// Список файлов для предварительного кэширования
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/icon/logo_512.png',
  '/icon/logo_72.png',
  // Добавьте сюда ваши CSS и JS файлы
  // '/static/css/main.css',
  // '/static/js/main.js',
  // '/manifest.json'
]

// Расширения файлов, которые считаем изображениями
const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp|svg|ico|avif|bmp)$/i

// Установка — кэшируем статику
self.addEventListener('install', (event) => {
  console.log('[SW] Установка, кэшируем статику...')
  event.waitUntil(
    caches.open(STATIC_CACHE).then(async (cache) => {
      // Кэшируем каждый файл по отдельности, чтобы один неудачный не сломал всё
      for (const asset of STATIC_ASSETS) {
        try {
          const response = await fetch(asset)
          if (response.ok) {
            await cache.put(asset, response)
            console.log(`[SW] Закэшировано: ${asset}`)
          }
        } catch (error) {
          console.warn(`[SW] Не удалось закэшировать ${asset}:`, error)
        }
      }
    })
  )
  self.skipWaiting()
})

// Активация — удаляем старые кэши
self.addEventListener('activate', (event) => {
  console.log('[SW] Активация, чистим старые кэши...')
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (
            key !== STATIC_CACHE &&
            key !== API_CACHE &&
            key !== IMAGES_CACHE
          ) {
            console.log(`[SW] Удаляем старый кэш: ${key}`)
            return caches.delete(key)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// ГЛАВНЫЙ ОБРАБОТЧИК ЗАПРОСОВ
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // ========== 1. ИЗОБРАЖЕНИЯ ==========
  // Кэшируем все изображения отдельно
  if (IMAGE_EXTENSIONS.test(url.pathname)) {
    event.respondWith(
      caches.open(IMAGES_CACHE).then(async (cache) => {
        // Сначала пробуем получить из кэша
        const cachedResponse = await cache.match(event.request)
        if (cachedResponse) {
          console.log(`[SW] Изображение из кэша: ${url.pathname}`)
          return cachedResponse
        }

        // Если нет в кэше, загружаем из сети
        try {
          const networkResponse = await fetch(event.request)
          if (networkResponse.ok) {
            await cache.put(event.request, networkResponse.clone())
            console.log(`[SW] Изображение закэшировано: ${url.pathname}`)
          }
          return networkResponse
        } catch (error) {
          console.warn(
            `[SW] Ошибка загрузки изображения: ${url.pathname}`,
            error
          )
          // Возвращаем заглушку (прозрачный пиксель)
          return getPlaceholderImage()
        }
      })
    )
    return
  }

  // ========== 2. API-ЗАПРОСЫ ==========
  if (
    url.hostname === '194.87.111.106' &&
    url.pathname.startsWith('/api/v1/')
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.status === 200) {
            const clone = response.clone()
            caches.open(API_CACHE).then((cache) => {
              cache.put(event.request, clone)
            })
            console.log(`[SW] API закэширован: ${url.pathname}`)
          }
          return response
        })
        .catch(async () => {
          // В офлайне возвращаем из кэша
          const cached = await caches.match(event.request)
          if (cached) {
            console.log(`[SW] API из кэша: ${url.pathname}`)
            return cached
          }
          // Если нет в кэше, возвращаем заглушку
          return new Response(
            JSON.stringify({
              error: 'offline',
              message: 'Нет соединения с интернетом',
            }),
            {
              status: 503,
              headers: { 'Content-Type': 'application/json' },
            }
          )
        })
    )
    return
  }

  // ========== 3. HTML-СТРАНИЦЫ ==========
  if (url.pathname === '/' || url.pathname === '/index.html') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Обновляем кэш при успешной загрузке
          if (response.ok) {
            const clone = response.clone()
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(event.request, clone)
            })
          }
          return response
        })
        .catch(async () => {
          // В офлайне показываем закэшированную версию
          const cached = await caches.match('/index.html')
          if (cached) {
            console.log('[SW] HTML из кэша')
            return cached
          }
          // Если нет кэша, показываем офлайн-страницу
          return new Response(
            `
            <!DOCTYPE html>
            <html>
            <head><title>Офлайн</title><meta charset="utf-8"></head>
            <body style="text-align:center; padding:50px; font-family:sans-serif;">
              <h1>🔌 Нет соединения</h1>
              <p>Проверьте подключение к интернету</p>
              <button onclick="location.reload()">Повторить</button>
            </body>
            </html>
          `,
            {
              status: 200,
              headers: { 'Content-Type': 'text/html' },
            }
          )
        })
    )
    return
  }

  // ========== 4. СТАТИЧЕСКИЕ РЕСУРСЫ (JS, CSS) ==========
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        // Сначала пробуем кэш
        const cachedResponse = await cache.match(event.request)
        if (cachedResponse) {
          console.log(`[SW] Статика из кэша: ${url.pathname}`)
          return cachedResponse
        }

        // Затем сеть
        try {
          const networkResponse = await fetch(event.request)
          if (networkResponse.ok) {
            await cache.put(event.request, networkResponse.clone())
            console.log(`[SW] Статика закэширована: ${url.pathname}`)
          }
          return networkResponse
        } catch (error) {
          console.warn(`[SW] Статика не загружена: ${url.pathname}`, error)
          // Возвращаем заглушку
          return new Response('/* Resource not available offline */', {
            status: 200,
            headers: { 'Content-Type': 'text/javascript' },
          })
        }
      })
    )
    return
  }

  // ========== 5. ВСЁ ОСТАЛЬНОЕ (сторонние ресурсы) ==========
  event.respondWith(
    fetch(event.request).catch(() => {
      console.log(`[SW] Сторонний ресурс недоступен: ${url.hostname}`)
      return new Response(null, { status: 204 })
    })
  )
})

// ========== ОБРАБОТКА PUSH-УВЕДОМЛЕНИЙ ==========
self.addEventListener('push', (event) => {
  console.log('[SW] Получено push-сообщение:', event)

  let title = 'Новое уведомление'
  let options = {
    body: 'У вас новое сообщение',
    icon: '/icon/logo_512.png',
    badge: '/icon/logo_72.png',
    vibrate: [200, 100, 200],
    tag: 'main-notification',
    renotify: false,
    requireInteraction: false,
    silent: false,
    data: { url: '/', timestamp: Date.now() },
    actions: [
      { action: 'open', title: 'Открыть' },
      { action: 'dismiss', title: 'Закрыть' },
    ],
  }

  if (event.data) {
    try {
      const payload = event.data.json()
      console.log('[SW] Payload:', payload)

      if (payload.title || payload.body) {
        title = payload.title || title
        options.body = payload.body || options.body
        options.icon = payload.icon || options.icon
        options.badge = payload.badge || options.badge
        options.tag = payload.tag || options.tag
        options.data = { ...options.data, ...payload.data }
        if (payload.requireInteraction !== undefined)
          options.requireInteraction = payload.requireInteraction
        if (payload.actions) options.actions = payload.actions
        // eslint-disable-next-line no-dupe-else-if
      } else if (payload.title && payload.options) {
        title = payload.title
        options = { ...options, ...payload.options }
      } else if (typeof payload === 'string') {
        options.body = payload
      }
    } catch (e) {
      if (event.data) options.body = event.data.text()
    }
  }

  event.waitUntil(
    (async () => {
      try {
        if (Notification.permission === 'granted') {
          await self.registration.showNotification(title, options)
          console.log('[SW] Уведомление успешно показано')
        } else {
          console.log('[SW] Нет разрешения для уведомления')
        }
      } catch (error) {
        console.error('[SW] Ошибка при показе уведомления:', error)
      }
    })()
  )
})

// Обработка клика по уведомлению
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Клик по уведомлению:', event)
  event.notification.close()

  const notificationData = event.notification.data || {}
  const urlToOpen = notificationData.url || '/'

  if (event.action === 'dismiss') {
    return
  }

  event.waitUntil(
    (async () => {
      const clientsList = await clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      })
      for (const client of clientsList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus()
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen)
      }
    })()
  )
})

// Вспомогательная функция: заглушка для изображений
function getPlaceholderImage() {
  // Прозрачный пиксель 1x1 в формате PNG
  const pixelData =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
  const binaryString = atob(pixelData)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return new Response(bytes, {
    status: 200,
    headers: { 'Content-Type': 'image/png' },
  })
}
