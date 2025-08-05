// Service Worker for Excellence Academy Ghana
// Provides offline functionality and caching

const CACHE_NAME = 'excellence-academy-v1.0.0';
const STATIC_CACHE = 'excellence-academy-static-v1.0.0';
const DYNAMIC_CACHE = 'excellence-academy-dynamic-v1.0.0';

// Files to cache for offline functionality
const STATIC_FILES = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/css/responsive.css',
    '/js/main.js',
    '/js/forms.js',
    '/manifest.json',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Install event - cache static files
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Static files cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Error caching static files', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated successfully');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve cached files or fetch from network
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip WhatsApp links
    if (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com') {
        return;
    }
    
    // Handle different types of requests
    if (STATIC_FILES.includes(request.url) || request.url.includes('index.html')) {
        // Cache first strategy for static files
        event.respondWith(cacheFirst(request));
    } else if (request.url.includes('images.unsplash.com') || request.url.includes('via.placeholder.com')) {
        // Cache first strategy for images
        event.respondWith(cacheFirst(request));
    } else if (request.url.includes('fonts.googleapis.com') || request.url.includes('fonts.gstatic.com')) {
        // Cache first strategy for fonts
        event.respondWith(cacheFirst(request));
    } else {
        // Network first strategy for other requests
        event.respondWith(networkFirst(request));
    }
});

// Cache first strategy
async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Cache first strategy failed:', error);
        
        // Return offline fallback if available
        if (request.destination === 'document') {
            return caches.match('/index.html');
        }
        
        // Return a basic offline response
        return new Response('Offline - Please check your internet connection', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain' }
        });
    }
}

// Network first strategy
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Network first strategy failed:', error);
        
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline fallback
        if (request.destination === 'document') {
            return caches.match('/index.html');
        }
        
        return new Response('Offline - Content not available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain' }
        });
    }
}

// Background sync for form submissions
self.addEventListener('sync', event => {
    console.log('Service Worker: Background sync triggered', event.tag);
    
    if (event.tag === 'contact-form-sync') {
        event.waitUntil(syncContactForms());
    } else if (event.tag === 'registration-form-sync') {
        event.waitUntil(syncRegistrationForms());
    }
});

// Sync contact forms when back online
async function syncContactForms() {
    try {
        const db = await openDB();
        const forms = await getStoredForms(db, 'contact-forms');
        
        for (const form of forms) {
            try {
                // In a real implementation, you would send this to your server
                console.log('Syncing contact form:', form);
                
                // Remove from storage after successful sync
                await removeStoredForm(db, 'contact-forms', form.id);
            } catch (error) {
                console.error('Failed to sync contact form:', error);
            }
        }
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Sync registration forms when back online
async function syncRegistrationForms() {
    try {
        const db = await openDB();
        const forms = await getStoredForms(db, 'registration-forms');
        
        for (const form of forms) {
            try {
                // In a real implementation, you would send this to your server
                console.log('Syncing registration form:', form);
                
                // Remove from storage after successful sync
                await removeStoredForm(db, 'registration-forms', form.id);
            } catch (error) {
                console.error('Failed to sync registration form:', error);
            }
        }
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// IndexedDB helpers (simplified)
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ExcellenceAcademyDB', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            if (!db.objectStoreNames.contains('contact-forms')) {
                db.createObjectStore('contact-forms', { keyPath: 'id', autoIncrement: true });
            }
            
            if (!db.objectStoreNames.contains('registration-forms')) {
                db.createObjectStore('registration-forms', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
}

function getStoredForms(db, storeName) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
    });
}

function removeStoredForm(db, storeName, id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(id);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
    });
}

// Push notification handling
self.addEventListener('push', event => {
    console.log('Service Worker: Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'New update from Excellence Academy',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"%3E%3Ccircle cx="48" cy="48" r="48" fill="%23CE1126"/%3E%3Crect x="27" y="24" width="42" height="30" rx="3" fill="%23FCD116"/%3E%3Crect x="24" y="27" width="42" height="30" rx="3" fill="white"/%3E%3Cpolygon points="48,18 33,30 63,30" fill="%23006B3F"/%3E%3Crect x="45" y="18" width="6" height="9" fill="%23006B3F"/%3E%3Cpolygon points="48,63 42,72 54,72" fill="%23FCD116"/%3E%3C/svg%3E',
        badge: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"%3E%3Ccircle cx="48" cy="48" r="48" fill="%23CE1126"/%3E%3Ctext x="48" y="58" text-anchor="middle" fill="white" font-size="32" font-weight="bold"%3EEA%3C/text%3E%3C/svg%3E',
        vibrate: [200, 100, 200],
        tag: 'excellence-academy-notification',
        requireInteraction: true,
        actions: [
            {
                action: 'view',
                title: 'View',
                icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Cpath fill="white" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/%3E%3C/svg%3E'
            },
            {
                action: 'dismiss',
                title: 'Dismiss',
                icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Cpath fill="white" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/%3E%3C/svg%3E'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Excellence Academy Ghana', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    console.log('Service Worker: Notification clicked', event.action);
    
    event.notification.close();
    
    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
    // 'dismiss' action or no action - just close the notification
});

// Handle notification close
self.addEventListener('notificationclose', event => {
    console.log('Service Worker: Notification closed');
});

console.log('Service Worker: Loaded successfully');
