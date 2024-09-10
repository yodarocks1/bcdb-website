self.addEventListener("install", event => {
    console.log("Service worker installed");
    event.waitUntil(
        caches.open("pwa-assets").then(cache => {
            cache.addAll([
                "/",
                "/resume",
                "/portfolio",
                "/portfolio/coding",
                "/portfolio/writing",
                "/portfolio/research",
                "/portfolio/audio",
                "/portfolio/other",
                "/static/style.css",
                "/static/main.js",
                "/static/profile.jpg",
                "https://kit.fontawesome.com/4a8c74f03b.js",
                "https://ka-f.fontawesome.com/releases/v6.1.1/js/free-v4-shims.min.js?token=4a8c74f03b",
                "https://ka-f.fontawesome.com/releases/v6.1.1/js/free.min.js?token=4a8c74f03b",
                "https://fonts.googleapis.com/css?family=Saira+Extra+Condensed:500,700",
                "https://fonts.gstatic.com/s/sairaextracondensed/v11/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrG2vh2wph.woff2",
                "https://fonts.gstatic.com/s/muli/v27/7Au-p_0qiz-afTf2LwLT.woff2",
                "https://fonts.googleapis.com/css?family=Muli:400,400i,800,800i",
                "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
                "/error/404",
                "/error/418",
                "/error/500",
                "/error/501"
            ]);
        })
    );
});
self.addEventListener("activate", event => {
    console.log("Service worker activated");
});
self.addEventListener("fetch", event => {
    event.respondWith(caches.match(event.request).then(response => {
        if (response) {
            return response;
        } else {
            console.log(`Fetching ${event.request.url}`);
            return fetch(event.request).then((response) => {
                if (response.ok) {
                    return response;
                } else {
                    return caches.match("/error/500").then(response => {
                        console.log(response);
                        return response;
                    });
                }
            });
        }
    }));
});

