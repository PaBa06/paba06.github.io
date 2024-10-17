// Funktion zum Laden der JSON-Daten
async function loadData() {
    try {
        const usersResponse = await fetch('databank/users.json');
        const users = await usersResponse.json();

        const eventsResponse = await fetch('databank/events.json');
        const events = await eventsResponse.json();

        // Zufällige Benutzer auswählen (ersetzen)
        const randomUsers = getRandomElements(users, 4); // 4 Benutzer für die Benutzerliste

        // Benutzer in die HTML einfüllen
        const userList = document.querySelector('.horizontal-scroll');
        userList.innerHTML = ''; // Vorherige Benutzer löschen
        randomUsers.forEach(user => {
            const userItem = document.createElement('a');
            userItem.classList.add('box-64', 'bg-img', 'padding-16', 'radius-16');
            userItem.style.backgroundImage = `url(${user.profilePicture})`;
            userItem.href = "user.html?userId=" + user.userId;

            // Der Link umschließt jetzt das li-Element
            userItem.innerHTML = `
                <li class="flex column">
                    <!-- Nur das Profilbild wird angezeigt -->
                </li>
            `;
            userList.appendChild(userItem);
        });

        // Ereignisse in den Container einfüllen
        const eventContainer = document.querySelector('.grid.grid-colums-2');
        eventContainer.innerHTML = ''; // Vorherige Ereignisse löschen
        
        // Nur 2 Ereignisse generieren
        const selectedEvents = getRandomElements(events, 2);
        
        selectedEvents.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.classList.add('flex', 'column', 'flex-end', 'box', 'bg-img', 'padding-8', 'radius-16');
            eventItem.style.backgroundImage = `url(${event.media.photoUrl})`; // Annahme: Bild ist im Event-Objekt vorhanden
            eventItem.innerHTML = `
                <a href="events.html?eventId=${event.eventId}" class="flex space-between align-center">
                    <p class="color-white">${event.title}</p>
                    <span class="material-symbols-outlined color-white">arrow_outward</span>
                </a>
            `;
            eventContainer.appendChild(eventItem);
        });

    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
    }
}

// Funktion zur Auswahl einer bestimmten Anzahl zufälliger Elemente aus einem Array
function getRandomElements(array, count) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Lade die Daten, wenn das Dokument bereit ist
document.addEventListener('DOMContentLoaded', loadData);
