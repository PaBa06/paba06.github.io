// Funktion, um die userId aus der URL zu lesen
function getUserIdFromUrl() {
    return "bac9d0b2-5ceb-4aa4-b89c-48b7dc8bc6ff";
}

// Funktion zum Laden der Benutzer-Daten
function loadUserData(userId) {
    fetch('databank/users.json')
        .then(response => response.json())
        .then(users => {
            // Finde den Benutzer mit der entsprechenden userId
            const currentUser = users.find(user => user.userId === userId);

            if (currentUser) {
                // Profilbild setzen
                document.getElementById("profil-img").src = currentUser.profilePicture;

                // Fülle das HTML mit den Benutzer-Daten
                document.getElementById("username").textContent = currentUser.username.toUpperCase();
                document.getElementById("event-count").textContent = currentUser.createdEvents;
                document.getElementById("attended-count").textContent = currentUser.attendedEvents;
                document.getElementById("about").textContent = currentUser.about;

                // Hashtags setzen
                const hashtagContainer = document.getElementById("container-hashtag");
                hashtagContainer.innerHTML = "";
                currentUser.hashtags.forEach(tag => {
                    const button = document.createElement("button");
                    button.classList.add("btn-hashtag");
                    button.textContent = `${tag}`;
                    hashtagContainer.appendChild(button);
                });

                // Events laden
                loadEvents(currentUser.ownEvents);

                // Gespeicherte Events laden
                loadSavedEvents(currentUser.savedEvents);
                
                // Follower setzen
                const followerList = document.getElementById("follower-list");
                followerList.innerHTML = "";
                currentUser.followers.forEach(follower => {
                    const user = users.find(userIDs => userIDs.userId === follower);
                    const a = document.createElement("a");
                    a.href = "user.html?userId=" + follower;
                    a.classList.add(
                        "flex", 
                        "column", 
                        "space-between", 
                        "box", 
                        "bg-img", 
                        "padding-16", 
                        "radius-16"
                    );

                    // Setze das Profilbild
                    a.style.backgroundImage = `url(${user.profilePicture})`
                    a.innerHTML = `
                    <span class="material-symbols-outlined color-white">arrow_outward</span>
                    <div>
                        <p class="color-white">EVENTS (${user.ownEvents.length})</p>
                        <h2 class="color-white">${user.username}</h2>
                    </div>`;
                    followerList.appendChild(a);
                });
            } else {
                // Wenn kein Benutzer gefunden wurde, zeige eine Fehlermeldung an
                document.querySelector('h1').textContent = 'Benutzer konnte nicht geladen werden';
            }
        })
        .catch(error => {
            console.error('Fehler beim Laden der Benutzer-Daten:', error);
        });
}

// Funktion zum Laden der Events-Daten
function loadEvents(eventIds) {
    fetch('databank/events.json') // Pfad zur events.json
        .then(response => response.json())
        .then(events => {
            const eventContainer = document.getElementById("container-events");
            eventContainer.innerHTML = ""; // Vorherigen Inhalt löschen

            eventIds.forEach(eventId => {
                const event = events.find(e => e.eventId === eventId);
                if (event) {
                    // Event-Daten hinzufügen mit der gewünschten HTML-Struktur
                    const eventDiv = document.createElement("div");
                    eventDiv.classList.add("flex", "space-between", "grid-element-wide", "bg-img", "radius-16", "padding-16");
                    
                    // Setze das Hintergrundbild für das Event
                    eventDiv.style.backgroundImage = `url(${event.media.photoUrl})`;
                    eventDiv.style.backgroundSize = "cover"; // Optional
                    eventDiv.style.backgroundPosition = "center"; // Optional

                    // Füge den Inhalt hinzu
                    eventDiv.innerHTML = `
                        <a href="events.html?eventId=${event.eventId}">
                            <h2 class="color-white">${event.title}</h2>
                            <p class="color-white">${event.location}</p>
                        </a>
                        <span class="material-symbols-outlined color-white">arrow_outward</span>
                    `;
                    eventContainer.appendChild(eventDiv);
                }
            });
        })
        .catch(error => {
            console.error('Fehler beim Laden der Event-Daten:', error);
        });
}

// Funktion zum Laden der gespeicherten Events-Daten
function loadSavedEvents(savedEventIds) {
    fetch('databank/events.json') // Pfad zur events.json
        .then(response => response.json())
        .then(events => {
            const savedEventContainer = document.getElementById("saved-events");
            savedEventContainer.innerHTML = ""; // Vorherigen Inhalt löschen

            savedEventIds.forEach(eventId => {
                const event = events.find(e => e.eventId === eventId);
                if (event) {
                    // Gespeichertes Event-Daten hinzufügen mit der gewünschten HTML-Struktur
                    const savedEventDiv = document.createElement("div");
                    savedEventDiv.classList.add("flex", "space-between", "grid-element-wide", "bg-img", "radius-16", "padding-16");
                    
                    // Setze das Hintergrundbild für das gespeicherte Event
                    savedEventDiv.style.backgroundImage = `url(${event.media.photoUrl})`;
                    savedEventDiv.style.backgroundSize = "cover"; // Optional
                    savedEventDiv.style.backgroundPosition = "center"; // Optional

                    // Füge den Inhalt hinzu
                    savedEventDiv.innerHTML = `
                        <a href="events.html?eventId=${event.eventId}">
                            <h2 class="color-white">${event.title}</h2>
                            <p class="color-white">${event.location}</p>
                        </a>
                        <span class="material-symbols-outlined color-white">arrow_outward</span>
                    `;
                    savedEventContainer.appendChild(savedEventDiv);
                }
            });
        })
        .catch(error => {
            console.error('Fehler beim Laden der gespeicherten Event-Daten:', error);
        });
}

// userId aus der URL extrahieren und Benutzer-Daten laden
const userId = getUserIdFromUrl();
if (userId) {
    loadUserData(userId);
} else {
    document.querySelector('h1').textContent = 'Benutzer konnte nicht geladen werden';
}
