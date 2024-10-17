// Funktion, um die eventId aus der URL zu lesen
function getEventIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('eventId');
}

// Funktion zum Laden der JSON-Daten
function loadEventData(eventId) {
    fetch('databank/events.json')
        .then(response => response.json())
        .then(events => {
            // Finde das Event mit der entsprechenden eventId
            const currentEvent = events.find(event => event.eventId === eventId);

            if (currentEvent) {
                // Wenn das Event gefunden wurde, fülle das HTML mit den Event-Daten
                document.getElementById("title").textContent = currentEvent.title;
                document.getElementById("location").textContent = currentEvent.location;
                document.getElementById("description-small").textContent = currentEvent.description.small;
                document.getElementById("description-large").textContent = currentEvent.description.large;
                document.getElementById("background-video").src = currentEvent.media.videoUrl;

                // customInfo
                const customLabel1 = currentEvent.customInfo.customField1.label;
                const customValue1 = currentEvent.customInfo.customField1.value;
                const customLabel2 = currentEvent.customInfo.customField2.label;
                const customValue2 = currentEvent.customInfo.customField2.value;
                const customLabel3 = currentEvent.customInfo.customField3.label;
                const customValue3 = currentEvent.customInfo.customField3.value;

                // Update Tabelle mit dynamischen Daten
                document.getElementById("custom-label-1").textContent = customLabel1;
                document.getElementById("custom-label-2").textContent = customLabel2;
                document.getElementById("custom-label-3").textContent = customLabel3;
                document.getElementById("custom-value-1").textContent = customValue1;
                document.getElementById("custom-value-2").textContent = customValue2;
                document.getElementById("custom-value-3").textContent = customValue3;

                const signUpButton = document.querySelector('.btn-big');
                signUpButton.addEventListener('click', () => {
                    window.location.href = currentEvent.media.signUpLink;
                });
            } else {
                // Wenn kein Event gefunden wurde, zeige einen Fallback-Text an
                document.querySelector('h1').textContent = 'Event konnte nicht geladen werden';
            }
        })
        .catch(error => {
            console.error('Fehler beim Laden der Event-Daten:', error);
        });
}

// Funktion, um das nächste Event zu laden
function loadNextEvent() {
    fetch('databank/events.json')
        .then(response => response.json())
        .then(events => {
            // Wähle ein zufälliges Event aus (oder eine andere Logik zum Wechseln)
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            window.location.href = `?eventId=${randomEvent.eventId}`;
        })
        .catch(error => {
            console.error('Fehler beim Laden der Event-Daten:', error);
        });
}

// EventId aus der URL extrahieren und Event-Daten laden
const eventId = getEventIdFromUrl();
if (eventId) {
    loadEventData(eventId);
} else {
    document.querySelector('h1').textContent = 'Event konnte nicht geladen werden';
}

// Füge einen Event-Listener für den Weiter-Klick hinzu
document.getElementById("video-container").addEventListener('click', loadNextEvent);
