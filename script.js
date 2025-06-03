// === GLOBAL (MINDEN OLDALON FUT) ===

// Custom cursor
const cursor = document.querySelector('.custom-cursor');
if (cursor) {
    document.addEventListener('mousemove', e => {
        cursor.style.top = e.clientY + 'px';
        cursor.style.left = e.clientX + 'px';
    });
}

// Tiltások: jobb klikk és Ctrl+U (Alapvető, de nem feltörhetetlen védelmek a forráskód megtekintése ellen)
document.addEventListener('contextmenu', e => {
    e.preventDefault();
    console.log("Jobb klikk letiltva a forráskód megtekintésének nehezítésére.");
});

document.addEventListener('keydown', e => {
    // Ctrl+U (Forráskód megtekintése)
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        console.log("Ctrl+U letiltva a forráskód megtekintésének nehezítésére.");
    }
    // F12 (Fejlesztői eszközök)
    if (e.key === 'F12') {
        e.preventDefault();
        console.log("F12 letiltva a fejlesztői eszközök megnyitásának nehezítésére.");
    }
    // Ctrl+Shift+I (Fejlesztői eszközök - Chrome)
    if (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) {
        e.preventDefault();
        console.log("Ctrl+Shift+I letiltva a fejlesztői eszközök megnyitásának nehezítésére.");
    }
    // Ctrl+Shift+J (Konzol - Chrome)
    if (e.ctrlKey && e.shiftKey && (e.key === 'j' || e.key === 'J')) {
        e.preventDefault();
        console.log("Ctrl+Shift+J letiltva a fejlesztői eszközök megnyitásának nehezítésére.");
    }
    // Ctrl+Shift+C (Elem kiválasztása - Chrome)
    if (e.ctrlKey && e.shiftKey && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        console.log("Ctrl+Shift+C letiltva a fejlesztői eszközök megnyitásának nehezítésére.");
    }
});

// === NYEREMÉNYJÁTÉK OLDAL (giveaway.html) SPECIFIKUS LOGIKA ===

// A nyereményjáték oldali elemeket csak akkor keressük, ha a lap betöltődik.
// Ez megakadályozza a hibákat, ha az elemek nem léteznek a főoldalon.
document.addEventListener('DOMContentLoaded', () => {
    // Ezeket a részeket feltételezem, hogy a 'giveaway.html' oldalon használod.
    // Ha nem, akkor a `if (registerBtn)` ellenőrzés a főoldalon hamis lesz, és nem fut le.
    const registerBtn = document.getElementById('registerBtn');
    const spinWheelBtn = document.getElementById('spinWheelBtn');
    const registeredUsersList = document.getElementById('registeredUsersList');
    const userCountSpan = document.getElementById('userCount');
    const spinningBox = document.getElementById('spinningBox');
    const currentPrizeName = document.getElementById('currentPrizeName');
    const currentPrizeDescription = document.getElementById('currentPrizeDescription');

    // A funkciók csak akkor futnak, ha az elemek léteznek (giveaway.html esetén)
    if (registerBtn) { // Ellenőrzés, hogy az element létezik-e (azaz giveaway.html-en vagyunk)
        let registeredUsers = [];
        let currentPrize = { name: "Nincs beállítva", description: "Várja a rendszergazda beállítását." };
        let spinInProgress = false;

        function saveRegisteredUsers() {
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        }

        function loadRegisteredUsers() {
            const storedUsers = localStorage.getItem('registeredUsers');
            if (storedUsers) {
                registeredUsers = JSON.parse(storedUsers);
            }
            updateRegisteredUsersList();
        }

        function savePrizeState() {
            localStorage.setItem('currentPrize', JSON.stringify(currentPrize));
        }

        function loadPrizeState() {
            const storedPrize = localStorage.getItem('currentPrize');
            if (storedPrize) {
                currentPrize = JSON.parse(storedPrize);
            }
            updateCurrentPrizeDisplay();
        }

        function updateCurrentPrizeDisplay() {
            if (currentPrizeName) currentPrizeName.textContent = currentPrize.name;
            if (currentPrizeDescription) currentPrizeDescription.textContent = currentPrize.description;
        }

        function updateRegisteredUsersList() {
            if (registeredUsersList) {
                registeredUsersList.innerHTML = '';
                registeredUsers.forEach(user => {
                    const li = document.createElement('li');
                    li.textContent = user;
                    registeredUsersList.appendChild(li);
                });
            }
            if (userCountSpan) {
                userCountSpan.textContent = registeredUsers.length;
            }
        }

        function renderSpinningBox() {
            if (!spinningBox) return;

            spinningBox.innerHTML = ''; // Töröljük a korábbi tartalmat

            if (registeredUsers.length > 0) {
                // Keverjük meg a felhasználókat minden renderelés előtt
                const shuffledUsers = [...registeredUsers].sort(() => 0.5 - Math.random());

                // Alapvető megjelenítés, minden felhasználó egy "szelet"
                shuffledUsers.forEach(user => {
                    const userElement = document.createElement('div');
                    userElement.className = 'spinning-box-item';
                    userElement.textContent = user;
                    spinningBox.appendChild(userElement);
                });

                // Duplikáljuk az elemeket a gördülékenyebb animáció érdekében
                const originalItems = Array.from(spinningBox.children);
                for (let i = 0; i < 5; i++) { // Többször másoljuk, hogy legyen elég tartalom
                    originalItems.forEach(item => {
                        spinningBox.appendChild(item.cloneNode(true));
                    });
                }
            } else {
                const emptyMessage = document.createElement('div');
                emptyMessage.className = 'spinning-box-item empty-message';
                emptyMessage.textContent = "Nincs regisztrált felhasználó. Regisztrálj!";
                spinningBox.appendChild(emptyMessage);
            }
        }


        function spinWheel() {
            if (registeredUsers.length === 0) {
                alert("Nincsenek regisztrált felhasználók a sorsoláshoz!");
                return;
            }
            if (spinInProgress) {
                alert("A sorsolás már folyamatban van!");
                return;
            }

            spinInProgress = true;
            spinWheelBtn.disabled = true; // Gomb letiltása

            const numberOfUsers = registeredUsers.length;
            const itemHeight = spinningBox.querySelector('.spinning-box-item') ? spinningBox.querySelector('.spinning-box-item').offsetHeight : 50; // Alapértelmezett magasság
            const totalHeight = spinningBox.scrollHeight; // A teljes görgethető magasság

            // Válasszunk ki egy véletlen nyertest
            const winnerIndex = Math.floor(Math.random() * numberOfUsers);
            const winnerName = registeredUsers[winnerIndex];

            // Számítsuk ki a célpozíciót. Sok fordulat + a nyertes pozíciója
            // Cél: a nyertes legyen középen
            const spins = 5; // Hány teljes kört tegyen meg minimum
            const targetOffset = (winnerIndex * itemHeight) + (totalHeight / 2) - (itemHeight / 2); // Középre igazítás

            // A végső eltolás. Negatív érték, mert felfelé görgetünk.
            const finalTransform = -(spins * totalHeight + targetOffset);

            spinningBox.style.transition = 'transform 5s ease-out';
            spinningBox.style.transform = `translateY(${finalTransform}px)`;

            setTimeout(() => {
                // A nyertes kihirdetése és a regisztrációk törlése
                alert(`Gratulálunk! A nyertes: ${winnerName}!`);
                registeredUsers = []; // Töröljük a tömböt
                saveRegisteredUsers();
                updateRegisteredUsersList();

                // A "spinning box" visszaállítása alapállapotba
                spinningBox.style.transition = 'none';
                spinningBox.style.transform = 'translateY(0)';
                renderSpinningBox(); // Újrarajzoljuk az üres állapottal

                spinInProgress = false;
                spinWheelBtn.disabled = false; // Gomb engedélyezése
                updateGiveawayButtons();
            }, 5000); // Animáció hossza
        }

        registerBtn.addEventListener('click', () => {
            const userName = prompt("Kérjük, adja meg a nevét a regisztrációhoz:");
            if (userName && userName.trim() !== '') {
                // Ellenőrizzük, hogy a felhasználónév nem üres és csak érvényes karaktereket tartalmaz.
                // Ez egy egyszerű regex, ami csak betűket, számokat és szóközt engedélyez.
                // Bonyolultabb ellenőrzéshez több regex kellhet.
                if (!/^[a-zA-Z0-9\söüóőúéáűíÖÜÓŐÚÉÁŰÍ]+$/.test(userName.trim())) {
                    alert("A név érvénytelen karaktereket tartalmaz. Kérjük, csak betűket, számokat és szóközt használjon.");
                    return;
                }
                if (!registeredUsers.includes(userName.trim())) {
                    registeredUsers.push(userName.trim());
                    saveRegisteredUsers();
                    updateRegisteredUsersList();
                    renderSpinningBox(); // Frissítjük a dobozt is
                    updateGiveawayButtons();
                    alert(`Sikeresen regisztráltál, ${userName}!`);
                } else {
                    alert("Ez a felhasználónév már regisztrálva van!");
                }
            } else if (userName !== null) {
                alert("A felhasználónév nem lehet üres!");
            }
        });

        spinWheelBtn.addEventListener('click', spinWheel);

        // Nyeremény beállítása (ez csak admin felületről kellene, most demo)
        const setPrizeBtn = document.getElementById('setPrizeBtn');
        const resetGiveawayBtn = document.getElementById('resetGiveawayBtn');

        function updateGiveawayButtons() {
            if (spinWheelBtn) {
                spinWheelBtn.disabled = registeredUsers.length === 0;
            }
        }

        if (setPrizeBtn) {
            setPrizeBtn.addEventListener('click', () => {
                const prizeName = prompt("Add meg a nyeremény nevét:");
                const prizeDescription = prompt("Add meg a nyeremény leírását:");
                if (prizeName && prizeName.trim() !== '' && prizeDescription && prizeDescription.trim() !== '') {
                    currentPrize.name = prizeName.trim();
                    currentPrize.description = prizeDescription.trim();
                    savePrizeState();
                    updateCurrentPrizeDisplay();
                    alert("Nyeremény beállítva!");
                } else if (prizeName !== null || prizeDescription !== null) {
                    alert("Név és leírás is szükséges a nyeremény beállításához!");
                }
            });
        }

        if (resetGiveawayBtn) {
            resetGiveawayBtn.addEventListener('click', () => {
                if (!confirm("Biztosan alaphelyzetbe szeretnéd állítani a nyereményjátékot? Minden regisztráció törlődik!")) {
                    return;
                }
                registeredUsers = []; // Töröljük a tömböt
                saveRegisteredUsers();
                updateRegisteredUsersList();

                // A "spinning box" visszaállítása alapállapotba
                spinningBox.style.transition = 'none';
                spinningBox.style.transform = 'translateY(0)';
                renderSpinningBox(); // Újrarajzoljuk az üres állapottal

                updateGiveawayButtons();
                alert("A nyereményjáték alaphelyzetbe állítva, a regisztráció újra nyitva!");
            });
        }

        // Kezdeti állapot
        loadRegisteredUsers();
        loadPrizeState(); // Betöltjük a nyeremény állapotát
        renderSpinningBox(); // Kezdetben is rendereljük
        updateGiveawayButtons();
    }

    // --- Kaszinó kártyák kattinthatósága (új logika) ---
    const casinoCards = document.querySelectorAll('.casino-card');

    casinoCards.forEach(card => {
        card.addEventListener('click', (event) => {
            // Check if the click target itself is the "Regisztráció" button or a child of it.
            // If it is, let the button handle the navigation (do nothing here).
            const visitBtn = card.querySelector('.visit-btn');
            if (visitBtn && (event.target === visitBtn || visitBtn.contains(event.target))) {
                return; // Let the button's default action happen
            }

            // Otherwise, navigate using the button's href
            if (visitBtn && visitBtn.href) {
                window.open(visitBtn.href, '_blank');
            }
        });
    });
});