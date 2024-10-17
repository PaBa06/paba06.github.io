// Laden der JSON-Daten aus separaten Dateien
Promise.all([
    fetch('databank/posts.json').then(response => response.json()),
    fetch('databank/events.json').then(response => response.json())
])
    .then(([posts, events]) => {
        // Filtern der Beiträge, sodass nur Videos angezeigt werden
        const videoPosts = posts.filter(post => post.mediaType === "video");

        // Aktuelle Position des Videos
        let currentVideoIndex = 0;

        // Funktion zum Wechseln des Videos und Anpassen der Event-Daten
        function loadVideo(index) {
            const videoElement = document.getElementById("main-video");
            const descriptionElement = document.getElementById("video-description");
            const titleElement = document.getElementById("main-title");
            const locationElement = document.getElementById("location-title");
            const eventLinkElement = document.getElementById("event-link");
            const userLinkElement = document.getElementById("user-link");

            // Hole das aktuelle Video und Beschreibung
            const currentPost = videoPosts[index];
            videoElement.src = currentPost.mediaUrl;
            descriptionElement.textContent = currentPost.smallDescription;

            // Event-Daten anhand der eventId im aktuellen Post finden
            const currentEvent = events.find(event => event.eventId === currentPost.eventId);
            if (currentEvent) {
                titleElement.textContent = currentEvent.title; // Titel des Events
                locationElement.textContent = currentEvent.location; // Ort des Events

                // Aktualisiere den Link mit der Event-ID
                eventLinkElement.href = `events.html?eventId=${currentEvent.eventId}`;
                userLinkElement.href = `user.html?userId=${currentEvent.organizerId}`;
            }
        }

        // Beim Klicken auf den Hauptbereich zum nächsten Video wechseln
        document.getElementById("video-container").addEventListener("click", function () {
            currentVideoIndex = (currentVideoIndex + 1) % videoPosts.length; // Zum nächsten Video, zyklisch
            loadVideo(currentVideoIndex);
        });

        // Lade das erste Video beim Start
        loadVideo(currentVideoIndex);
    })
    .catch(error => {
        console.error('Fehler beim Laden der JSON-Dateien:', error);
    });
