let events = []; // Array, um die Events zu speichern

// Funktion zum Laden der JSON-Daten
function loadEvents() {
    fetch('databank/events.json') // Stelle sicher, dass der Pfad zu deiner JSON-Datei korrekt ist
        .then(response => response.json())
        .then(data => {
            events = data; // Speichere die Events im globalen Array
            displayEvents(events); // Zeige alle Events beim Laden an
        })
        .catch(error => {
            console.error('Fehler beim Laden der Event-Daten:', error);
        });
}

// Funktion zum Anzeigen der Events
function displayEvents(eventList) {
    const container = document.querySelector('.grid.grid-colums-2'); // Container für die Events
    
    // Vorher alle bestehenden Event-Karten löschen
    container.innerHTML = '';

    // Durchlaufe jedes Event und erstelle HTML im gewünschten Format
    eventList.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('flex', 'space-between', 'grid-element-wide', 'padding-16', 'radius-16');
        
        // Setze das Hintergrundbild aus der JSON-Daten
        eventCard.style.backgroundImage = `url('${event.media.photoUrl}')`;
        eventCard.style.backgroundSize = 'cover'; // Hintergrundbild anpassen
        eventCard.style.backgroundPosition = 'center'; // Bild zentrieren

        eventCard.innerHTML = `
            <a href="events.html?eventId=${event.eventId}">
                <h2 class="color-white">${event.title}</h2>
                <p class="color-white">${event.location}</p>
            </a>
            <span class="material-symbols-outlined color-white">arrow_outward</span>
        `;

        // Füge die Event-Karte dem Container hinzu
        container.appendChild(eventCard);
    });
}

// Funktion für die Suche
function searchEvents() {
    const searchInput = document.querySelector('input[type="text"]'); // Das Suchfeld
    const searchTerm = searchInput.value.toLowerCase(); // Suchbegriff in Kleinbuchstaben umwandeln

    // Filtere die Events basierend auf dem Suchbegriff
    const filteredEvents = events.filter(event => {
        return (
            event.title.toLowerCase().includes(searchTerm) || // Suche im Titel
            event.location.toLowerCase().includes(searchTerm) // Suche im Ort
        );
    });

    displayEvents(filteredEvents); // Zeige die gefilterten Events an
}

// Event-Listener für das Suchfeld
document.querySelector('input[type="text"]').addEventListener('input', searchEvents);

// Lade die Events beim Start
loadEvents();
