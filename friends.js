let users = []; // Array, um die Benutzer zu speichern

// Funktion zum Laden der JSON-Daten
function loadUsers() {
    fetch('databank/users.json') // Stelle sicher, dass der Pfad zu deiner JSON-Datei korrekt ist
        .then(response => response.json())
        .then(data => {
            users = data; // Speichere die Benutzer im globalen Array
            displayUsers(users); // Zeige alle Benutzer beim Laden an
        })
        .catch(error => {
            console.error('Fehler beim Laden der Benutzer-Daten:', error);
        });
}

// Funktion zum Anzeigen der Benutzer
function displayUsers(userList) {
    const container = document.querySelector('.grid.grid-colums-1'); // Container für die Benutzer
    
    // Vorher alle bestehenden Benutzerkarten löschen
    container.innerHTML = '';

    // Durchlaufe jeden Benutzer und erstelle HTML im gewünschten Format
    userList.forEach(user => {
        const userCard = document.createElement('a');
        userCard.href = "user.html?userId=" + user.userId; // Ändere den Link zur Benutzer-Detailseite
        userCard.classList.add('flex', 'column', 'space-between', 'box', 'bg-img', 'padding-16', 'radius-16');

        userCard.innerHTML = `
            <span class="material-symbols-outlined color-white">arrow_outward</span>
            <div>
                <p class="color-white">EVENTS (${user.createdEvents})</p>
                <h2 class="color-white">${user.username}</h2>
            </div>
        `;

        // Setze das Hintergrundbild aus der Benutzer-JSON
        userCard.style.backgroundImage = `url('${user.profilePicture}')`;
        userCard.style.backgroundSize = 'cover'; // Hintergrundbild anpassen
        userCard.style.backgroundPosition = 'center'; // Bild zentrieren

        // Füge die Benutzerkarte dem Container hinzu
        container.appendChild(userCard);
    });
}

// Funktion für die Suche
function searchUsers() {
    const searchInput = document.querySelector('input[type="text"]'); // Das Suchfeld
    const searchTerm = searchInput.value.toLowerCase(); // Suchbegriff in Kleinbuchstaben umwandeln

    // Filtere die Benutzer basierend auf dem Suchbegriff
    const filteredUsers = users.filter(user => {
        return user.username.toLowerCase().includes(searchTerm); // Suche im Benutzernamen
    });

    displayUsers(filteredUsers); // Zeige die gefilterten Benutzer an
}

// Event-Listener für das Suchfeld
document.querySelector('input[type="text"]').addEventListener('input', searchUsers);

// Lade die Benutzer beim Start
loadUsers();
