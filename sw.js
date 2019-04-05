const CACHE ='ns'
const FILES = ['/advancedProgrammingLab/CW2/ArrayExamples.html', '/advancedProgrammingLab/CW3/inspector.html', 
'/advancedProgrammingLab/CW4/index.html', '/advancedProgrammingLab/CW5/selectFile.html', '/advancedProgrammingLab/CW6/performanceTest.html'
,'/advancedProgrammingLab/CW7/documentObjectModel.html', '/advancedProgrammingLab/HW1/HW1courseData.html', 
'/advancedProgrammingLab/HW2/index.html',
'/advancedProgrammingLab/HW3/animations.html']

function installCB(e) {
  e.waitUntil(
    caches.open(CACHE)
    .then(cache => cache.addAll(FILES))
    .catch(console.log)
  )
}
self.addEventListener('install', installCB)

function save(req, resp) {
  return caches.open(CACHE)
  .then(cache => {
    cache.put(req, resp.clone());
    return resp;
  })
  .catch(console.log)
}
function fetchCB(e) { //fetch first
  let req = e.request
  console.log('ns', req.url);
  e.respondWith(
    fetch(req).then(r2 => save(req, r2))
    .catch(() => { return caches.match(req).then(r1 => r1) })
  )
}
self.addEventListener('fetch', fetchCB)