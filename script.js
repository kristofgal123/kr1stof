document.addEventListener('DOMContentLoaded', () => {
    // A login és dashboard logika is itt lesz, a futás környezetétől függően

    // --- HELPER FUNKCIÓK ---

    // A mai dátum lekérése, idő nélkül
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Függvény a dátumok kiszámítására a következő hétre
    function getNextWeekDates() {
        const nextWeekDates = [];
        const currentDay = today.getDay(); // 0 = Vasárnap, 1 = Hétfő, ... 6 = Szombat

        let diff;
        // Ha ma péntek (5) és a következő hétfőre akarunk ugrani: 5 + (8 - 5) = 8 nap
        // Ha ma vasárnap (0) és a következő hétfőre akarunk ugrani: 0 + 1 = 1 nap (de ha ma vasárnap van, a hétfő a következő hétfő)
        if (currentDay === 0) { // Vasárnap
            diff = 1; // Következő hétfő
        } else if (currentDay === 6) { // Szombat
            diff = 2; // Következő hétfő
        } else { // Hétfő - Péntek
            diff = 8 - currentDay; // Pl. Hétfő (1): 8-1=7 nap (következő hétfő)
        }
        
        let nextMonday = new Date(today);
        nextMonday.setDate(today.getDate() + diff);
        nextMonday.setHours(0, 0, 0, 0); // Biztos, ami biztos, hogy éjfél legyen


        for (let i = 0; i < 7; i++) {
            const date = new Date(nextMonday);
            date.setDate(nextMonday.getDate() + i);
            nextWeekDates.push(date.toISOString().slice(0, 10)); // YYYY-MM-DD formátum
        }
        return nextWeekDates;
    }

    const nextWeekDates = getNextWeekDates();

    // TELJES ADATKÉSZLET MINDKÉT CSAPATHOZ
    const allAppointments = [
        // Roli és Bandi feladatai
        {
            "id": "1",
            "team": "roli_bandi",
            "date": nextWeekDates[0], // Hétfő
            "time": "09:00",
            "address": "Fő utca 1.",
            "city": "Jászberény",
            "postal_code": "5100",
            "customer_name": "Kovács Kft.",
            "contact_phone": "+36 70 123 4567",
            "ac_power_kw": 3.5,
            "ac_type": "Split klíma",
            "decoration_info": "5m dekor"
        },
        {
            "id": "2",
            "team": "roli_bandi",
            "date": nextWeekDates[0], // Hétfő
            "time": "13:00",
            "address": "Szabadság tér 2.",
            "city": "Jászberény",
            "postal_code": "5100",
            "customer_name": "Horváth János",
            "contact_phone": "+36 30 222 3344",
            "ac_power_kw": 3.5,
            "ac_type": "Monosplit",
            "decoration_info": "Nem kell"
        },
        {
            "id": "3",
            "team": "roli_bandi",
            "date": nextWeekDates[2], // Szerda
            "time": "10:30",
            "address": "Kossuth tér 10.",
            "city": "Szolnok",
            "postal_code": "5000",
            "customer_name": "Nagy Család",
            "contact_phone": "+36 30 987 6543",
            "ac_power_kw": 5.0,
            "ac_type": "Multi Split",
            "decoration_info": "Nem kell"
        },
        {
            "id": "4",
            "team": "roli_bandi",
            "date": nextWeekDates[3], // Csütörtök
            "time": "09:00",
            "address": "Virág utca 7.",
            "city": "Jászberény",
            "postal_code": "5100",
            "customer_name": "Lakatos Éva",
            "contact_phone": "+36 70 111 2233",
            "ac_power_kw": 3.5,
            "ac_type": "Split klíma",
            "decoration_info": "Nem kell"
        },
        {
            "id": "5",
            "team": "roli_bandi",
            "date": nextWeekDates[4], // Péntek
            "time": "11:00",
            "address": "Petőfi Sándor utca 5. (Hosszú név)",
            "city": "Cegléd",
            "postal_code": "2700",
            "customer_name": "ABC Bolt Kft.",
            "contact_phone": "+36 20 111 2233",
            "ac_power_kw": 5.0,
            "ac_type": "Központi klíma",
            "decoration_info": "8m dekor"
        },
        {
            "id": "6",
            "team": "roli_bandi",
            "date": nextWeekDates[4], // Péntek
            "time": "15:00",
            "address": "Gorkij fasor 12.",
            "city": "Szolnok",
            "postal_code": "5000",
            "customer_name": "Zöld Építőipari Kft.",
            "contact_phone": "+36 30 777 8899",
            "ac_power_kw": 5.0,
            "ac_type": "Kazettás Klíma",
            "decoration_info": "10m dekor"
        },
        // Dani és Laci feladatai
        {
            "id": "7",
            "team": "dani_laci",
            "date": nextWeekDates[1], // Kedd
            "time": "10:00",
            "address": "Rózsa utca 8.",
            "city": "Budapest",
            "postal_code": "1061",
            "customer_name": "Kiss Andrea",
            "contact_phone": "+36 30 555 1122",
            "ac_power_kw": 3.5,
            "ac_type": "Környezetbarát Split",
            "decoration_info": "2.5m dekor"
        },
        {
            "id": "8",
            "team": "dani_laci",
            "date": nextWeekDates[1], // Kedd
            "time": "14:00",
            "address": "Napfény Park 3.",
            "city": "Budapest",
            "postal_code": "1134",
            "customer_name": "Fenyvesi Bálint",
            "contact_phone": "+36 20 666 7788",
            "ac_power_kw": 5.0,
            "ac_type": "Központi légkondícionáló",
            "decoration_info": "Nem kell"
        },
        {
            "id": "9",
            "team": "dani_laci",
            "date": nextWeekDates[3], // Csütörtök
            "time": "15:00",
            "address": "Jókai utca 2.",
            "city": "Eger",
            "postal_code": "3300",
            "customer_name": "Nagy Éva",
            "contact_phone": "+36 70 888 7766",
            "ac_power_kw": 3.5,
            "ac_type": "Monosplit",
            "decoration_info": "10m dekor"
        },
        {
            "id": "10",
            "team": "dani_laci",
            "date": nextWeekDates[5], // Szombat
            "time": "08:30",
            "address": "Vörösmarty utca 15.",
            "city": "Debrecen",
            "postal_code": "4024",
            "customer_name": "Tóth Gábor",
            "contact_phone": "+36 20 333 4455",
            "ac_power_kw": 5.0,
            "ac_type": "Inverteres Klíma",
            "decoration_info": "Nem kell"
        },
        {
            "id": "11",
            "team": "dani_laci",
            "date": nextWeekDates[6], // Vasárnap (következő hét utolsó napja)
            "time": "09:00",
            "address": "Kossuth Lajos utca 1.",
            "city": "Debrecen",
            "postal_code": "4024",
            "customer_name": "Vasvári Család",
            "contact_phone": "+36 30 123 9876",
            "ac_power_kw": 3.5,
            "ac_type": "Split Klíma",
            "decoration_info": "Nem kell"
        }
    ];


    // --- LOGIN OLDAL LOGIKA (index.html) ---
    if (document.getElementById('loginForm')) {
        const loginForm = document.getElementById('loginForm');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const loginMessage = document.getElementById('loginMessage');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Megakadályozza az oldal újratöltését

            const username = usernameInput.value;
            const password = passwordInput.value;

            // Egyszerű ellenőrzés
            if (username === 'admin' && password === 'admin') {
                loginMessage.classList.add('hidden');
                // Sikeres bejelentkezés, átirányítás a dashboardra
                window.location.href = 'dashboard.html';
            } else {
                loginMessage.textContent = 'Hibás felhasználónév vagy jelszó!';
                loginMessage.classList.remove('hidden');
            }
        });
    }

    // --- DASHBOARD OLDAL LOGIKA (dashboard.html) ---
    if (document.getElementById('appointmentsGrid')) {
        const appointmentsGrid = document.getElementById('appointmentsGrid');
        const loadingMessage = document.getElementById('loadingMessage');
        const errorMessage = document.getElementById('errorMessage');
        const noAppointmentsMessage = document.getElementById('noAppointmentsMessage');
        const teamSelect = document.getElementById('teamSelect');
        const currentTeamDisplay = document.getElementById('currentTeamDisplay');
        const logoutButton = document.getElementById('logoutButton');

        function renderAppointments(selectedTeam) {
            appointmentsGrid.innerHTML = ''; // Rács kiürítése
            loadingMessage.classList.add('hidden');
            errorMessage.classList.add('hidden');
            noAppointmentsMessage.classList.add('hidden');

            let filteredAppointments = [];
            if (selectedTeam === 'roli_bandi') {
                filteredAppointments = allAppointments.filter(app => app.team === 'roli_bandi');
                currentTeamDisplay.textContent = 'Jelenleg kiválasztva: Roli és Bandi';
            } else if (selectedTeam === 'dani_laci') {
                filteredAppointments = allAppointments.filter(app => app.team === 'dani_laci');
                currentTeamDisplay.textContent = 'Jelenleg kiválasztva: Dani és Laci';
            } else {
                // Fallback (nem kéne ide jutni)
                filteredAppointments = allAppointments.filter(app => app.team === 'roli_bandi');
                currentTeamDisplay.textContent = 'Jelenleg kiválasztva: Roli és Bandi';
                teamSelect.value = 'roli_bandi';
            }

            if (filteredAppointments.length === 0) {
                noAppointmentsMessage.classList.remove('hidden');
            } else {
                // Dátum és idő szerint rendezés
                filteredAppointments.sort((a, b) => {
                    const dateA = new Date(`${a.date}T${a.time}`);
                    const dateB = new Date(`${b.date}T${b.time}`);
                    return dateA - dateB;
                });

                filteredAppointments.forEach(app => {
                    const appDate = new Date(app.date);
                    appDate.setHours(0, 0, 0, 0); 

                    let status = '';
                    let statusClass = '';
                    if (appDate < today) {
                        status = 'Befejezett';
                        statusClass = 'status-completed';
                    } else {
                        status = 'Folyamatban';
                        statusClass = 'status-in-progress';
                    }

                    let decorationOutput = app.decoration_info;
                    if (decorationOutput.toLowerCase().includes("nincs") || decorationOutput.toLowerCase().includes("0m") || decorationOutput.toLowerCase().includes("0 méter") || decorationOutput === "0") {
                        decorationOutput = "Nem kell";
                    }

                    const card = document.createElement('div');
                    card.classList.add('appointment-card');
                    card.innerHTML = `
                        <div class="card-header">
                            <span class="card-date-time">${app.date} ${app.time}</span>
                            <span class="card-status ${statusClass}">${status}</span>
                        </div>
                        <div class="card-body">
                            <div class="card-item card-address">
                                <span class="card-label">Cím:</span>
                                <span class="card-value">${app.address}</span>
                                <div class="card-sub-value">${app.postal_code}, ${app.city}</div>
                            </div>
                            <div class="card-item">
                                <span class="card-label">Ügyfél neve:</span>
                                <span class="card-value">${app.customer_name}</span>
                            </div>
                            <div class="card-item card-phone">
                                <span class="card-label">Telefon:</span>
                                <a href="tel:${app.contact_phone}" class="card-value">${app.contact_phone}</a>
                            </div>
                            <div class="card-item">
                                <span class="card-label">Klím kW:</span>
                                <span class="card-value">${app.ac_power_kw} kW</span>
                            </div>
                            <div class="card-item">
                                <span class="card-label">Klím típus:</span>
                                <span class="card-value">${app.ac_type}</span>
                            </div>
                            <div class="card-item card-description">
                                <span class="card-label">Leírás:</span>
                                <span class="card-value">${decorationOutput}</span>
                            </div>
                        </div>
                    `;
                    appointmentsGrid.appendChild(card);
                });
            }
        }

        // Eseményfigyelő a csapatválasztóra
        teamSelect.addEventListener('change', (event) => {
            renderAppointments(event.target.value);
        });

        // Kezdeti renderelés (alapértelmezetten 'roli_bandi')
        teamSelect.value = 'roli_bandi';
        renderAppointments(teamSelect.value);

        // Kijelentkezés gomb
        logoutButton.addEventListener('click', () => {
            window.location.href = 'index.html'; // Vissza a login oldalra
        });
    }
});
