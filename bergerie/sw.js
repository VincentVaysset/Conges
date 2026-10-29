const CACHE='bergerie-v7';
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(['./','./index.html','./manifest.webmanifest','./icon.svg']);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.map(function(k){if(k!==CACHE)return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var u=new URL(e.request.url);
  if(u.origin!==location.origin)return;
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(function(r){try{var cp=r.clone();caches.open(CACHE).then(function(c){c.put('./index.html',cp);});}catch(err){}return r;}).catch(function(){return caches.match('./index.html');}));
    return;
  }
  e.respondWith(caches.match(e.request).then(function(hit){return hit||fetch(e.request).then(function(r){try{if(r.ok){var cp=r.clone();caches.open(CACHE).then(function(c){c.put(e.request,cp);});}}catch(err){}return r;});}));
});
