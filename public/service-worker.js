const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "app.js",
  "/indexen.html",
  "/indexen",
  "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.min.css",
  "https://code.jquery.com/jquery-3.4.1.min.js",
  "assets/images/pokercardback.png",
  "assets/images/pokercards/1_of_clubs.png",
  "assets/images/pokercards/2_of_clubs.png",
  "assets/images/pokercards/3_of_clubs.png",
  "assets/images/pokercards/4_of_clubs.png",
  "assets/images/pokercards/5_of_clubs.png",
  "assets/images/pokercards/6_of_clubs.png",
  "assets/images/pokercards/7_of_clubs.png",
  "assets/images/pokercards/8_of_clubs.png",
  "assets/images/pokercards/9_of_clubs.png",
  "assets/images/pokercards/10_of_clubs.png",
  "assets/images/pokercards/11_of_clubs.png",
  "assets/images/pokercards/12_of_clubs.png",
  "assets/images/pokercards/13_of_clubs.png",
  "assets/images/pokercards/1_of_spades.png",
  "assets/images/pokercards/2_of_spades.png",
  "assets/images/pokercards/3_of_spades.png",
  "assets/images/pokercards/4_of_spades.png",
  "assets/images/pokercards/5_of_spades.png",
  "assets/images/pokercards/6_of_spades.png",
  "assets/images/pokercards/7_of_spades.png",
  "assets/images/pokercards/8_of_spades.png",
  "assets/images/pokercards/9_of_spades.png",
  "assets/images/pokercards/10_of_spades.png",
  "assets/images/pokercards/11_of_spades.png",
  "assets/images/pokercards/12_of_spades.png",
  "assets/images/pokercards/13_of_spades.png",
  "assets/images/pokercards/1_of_hearts.png",
  "assets/images/pokercards/2_of_hearts.png",
  "assets/images/pokercards/3_of_hearts.png",
  "assets/images/pokercards/4_of_hearts.png",
  "assets/images/pokercards/5_of_hearts.png",
  "assets/images/pokercards/6_of_hearts.png",
  "assets/images/pokercards/7_of_hearts.png",
  "assets/images/pokercards/8_of_hearts.png",
  "assets/images/pokercards/9_of_hearts.png",
  "assets/images/pokercards/10_of_hearts.png",
  "assets/images/pokercards/11_of_hearts.png",
  "assets/images/pokercards/12_of_hearts.png",
  "assets/images/pokercards/13_of_hearts.png",
  "assets/images/pokercards/1_of_diamonds.png",
  "assets/images/pokercards/2_of_diamonds.png",
  "assets/images/pokercards/3_of_diamonds.png",
  "assets/images/pokercards/4_of_diamonds.png",
  "assets/images/pokercards/5_of_diamonds.png",
  "assets/images/pokercards/6_of_diamonds.png",
  "assets/images/pokercards/7_of_diamonds.png",
  "assets/images/pokercards/8_of_diamonds.png",
  "assets/images/pokercards/9_of_diamonds.png",
  "assets/images/pokercards/10_of_diamonds.png",
  "assets/images/pokercards/11_of_diamonds.png",
  "assets/images/pokercards/12_of_diamonds.png",
  "assets/images/pokercards/13_of_diamonds.png",
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

// install
self.addEventListener("install", function (evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Your files were pre-cached successfully!");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

// activate
self.addEventListener("activate", function (evt) {
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// fetch
self.addEventListener("fetch", function (evt) {
  evt.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(evt.request).then(response => {
        return response || fetch(evt.request);
      });
    })
  );
});
