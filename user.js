// Funktion, um die userId aus der URL zu lesen
function getUserIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('userId');
}

// Funktion zum Laden der Benutzer-Daten
function loadUserData(userId) {
    fetch('databank/users.json')
        .then(response => response.json())
        .then(users => {
            // Finde den Benutzer mit der entsprechenden userId
            const currentUser = users.find(user => user.userId === userId);

            if (currentUser) {
                // Wenn der Benutzer gefunden wurde, fülle das HTML mit den Benutzer-Daten
                document.querySelector('h1').textContent = currentUser.username.toUpperCase();
                document.querySelector('h2').textContent = currentUser.username;
                document.querySelector('p').textContent = currentUser.about;

                // Profilbild setzen
                document.querySelector('img').src = currentUser.profilePicture;

                // Erstellte und besuchte Events anzeigen
                document.querySelector('table th:nth-child(1) h2').textContent = currentUser.createdEvents;
                document.querySelector('table th:nth-child(2) h2').textContent = currentUser.attendedEvents;

                // Hashtags setzen
                const hashtagContainer = document.querySelector('.flex.flex-wrap');
                hashtagContainer.innerHTML = ''; // Clear previous hashtags
                currentUser.hashtags.forEach(tag => {
                    const button = document.createElement('button');
                    button.classList.add('btn-hashtag');
                    button.textContent = `#${tag}`;
                    hashtagContainer.appendChild(button);
                });

                // Lade die Event-Daten basierend auf der gespeicherten Event-ID
                loadEventData(currentUser.ownEvents);
            } else {
                // Wenn kein Benutzer gefunden wurde, zeige eine Fehlermeldung an
                document.querySelector('h1').textContent = 'Benutzer konnte nicht geladen werden';
            }
        })
        .catch(error => {
            console.error('Fehler beim Laden der Benutzer-Daten:', error);
        });
}

// Funktion zum Laden der Event-Daten
function loadEventData(eventIds) {
    fetch('databank/events.json')
        .then(response => response.json())
        .then(events => {
            const eventContainer = document.querySelector('.grid.grid-colums-1');
            eventContainer.innerHTML = ''; // Clear previous events

            eventIds.forEach(eventId => {
                const currentEvent = events.find(event => event.eventId === eventId);

                if (currentEvent) {
                    // HTML-Elemente für das Event erstellen und füllen
                    const eventElement = document.createElement('div');
                    eventElement.classList.add('flex', 'space-between', 'grid-element-wide', 'bg-img', 'radius-16', 'padding-16');
                    
                    // Setze das Hintergrundbild auf die videoUrl des Events
                    eventElement.style.backgroundImage = `url('${currentEvent.media.photoUrl}')`;
                    eventElement.style.backgroundSize = 'cover'; // Optional: Hintergrund anpassen
                    eventElement.style.backgroundPosition = 'center'; // Optional: Hintergrundposition anpassen
                    
                    const eventLink = document.createElement('a');
                    eventLink.href = `events.html?eventId=${currentEvent.eventId}`;
                    eventLink.innerHTML = `<h2 class="color-white">${currentEvent.title}</h2><p class="color-white">${currentEvent.location}</p>`;
                    
                    const icon = document.createElement('span');
                    icon.classList.add('material-symbols-outlined', 'color-white');
                    icon.textContent = 'arrow_outward';

                    eventElement.appendChild(eventLink);
                    eventElement.appendChild(icon);
                    
                    eventContainer.appendChild(eventElement);
                }
            });
        })
        .catch(error => {
            console.error('Fehler beim Laden der Event-Daten:', error);
        });
}


// userId aus der URL extrahieren und Benutzer-Daten laden
const userId = getUserIdFromUrl();
if (userId) {
    loadUserData(userId);
} else {
    document.querySelector('h1').textContent = 'Benutzer konnte nicht geladen werden';
}
