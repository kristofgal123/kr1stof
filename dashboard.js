document.addEventListener('DOMContentLoaded', () => {
    const appointmentsTableBody = document.getElementById('appointmentsTableBody');
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');
    const noAppointmentsMessage = document.getElementById('noAppointmentsMessage');
    const teamSelect = document.getElementById('teamSelect');
    const currentTeamDisplay = document.getElementById('currentTeamDisplay');

    // A mai dátum lekérése, idő nélkül
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Függvény a dátumok kiszámítására a következő hétre
    function getNextWeekDates() {
        const nextWeekDates = [];
        const currentDay = today.getDay(); // 0 = Vasárnap, 1 = Hétfő, ... 6 = Szombat

        let diff;
        // Ha ma van péntek (5) és a következő hétfőre akarunk ugrani: 5 + (8 - 5) = 8 nap
        // Ha ma van vasárnap (0) és a következő hétfőre akarunk ugrani: 0 + 1 = 1 nap (de ha ma vasárnap van, a hétfő a következő hétfő)
        if (currentDay === 0) { // Vasárnap
            diff = 1;
        } else if (currentDay === 6) { // Szombat
            diff = 2; // Hétfőre
        } else { // Hétfő - Péntek
            diff = 8 - currentDay; // Pl. Hétfő (1): 8-1=7 nap (következő hétfő)
        }
        
        let nextMonday = new Date(today);
        nextMonday.setDate(today.getDate() + diff);
        nextMonday.setHours(0, 0, 0, 0);


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
            "team": "roli_bandi", // Robi átírva Rolira
            "date": nextWeekDates[0], // Hétfő
            "time": "09:00",
            "address": "Fő utca 1.",
            "city": "Jászberény",
            "postal_code": "5100",
            "customer_name": "Kovács Kft.", // Csapatnév eltávolítva
            "contact_phone": "+36 70 123 4567",
            "ac_power_kw": 3.5,
            "ac_type": "Split klíma",
            "decoration_info": "5m dekor"
        },
        {
            "id": "2",
            "team": "roli_bandi", // Robi átírva Rolira
            "date": nextWeekDates[0], // Hétfő
            "time": "13:00",
            "address": "Szabadság tér 2.",
            "city": "Jászberény",
            "postal_code": "5100",
            "customer_name": "Horváth János", // Csapatnév eltávolítva
            "contact_phone": "+36 30 222 3344",
            "ac_power_kw": 3.5,
            "ac_type": "Monosplit",
            "decoration_info": "3m dekor"
        },
        {
            "id": "3",
            "team": "roli_bandi", // Robi átírva Rolira
            "date": nextWeekDates[2], // Szerda
            "time": "10:30",
            "address": "Kossuth tér 10.",
            "city": "Szolnok",
            "postal_code": "5000",
            "customer_name": "Nagy Család", // Csapatnév eltávolítva
            "contact_phone": "+36 30 987 6543",
            "ac_power_kw": 5.0,
            "ac_type": "Multi Split",
            "decoration_info": "Nem kell dekor "
        },
        {
            "id": "4",
            "team": "roli_bandi", // Robi átírva Rolira
            "date": nextWeekDates[3], // Csütörtök
            "time": "09:00",
            "address": "Virág utca 7.",
            "city": "Jászberény",
            "postal_code": "5100",
            "customer_name": "Lakatos Éva", // Csapatnév eltávolítva
            "contact_phone": "+36 70 111 2233",
            "ac_power_kw": 3.5,
            "ac_type": "Split klíma",
            "decoration_info": "Nem kell dekor "
        },
        {
            "id": "5",
            "team": "roli_bandi", // Robi átírva Rolira
            "date": nextWeekDates[4], // Péntek
            "time": "11:00",
            "address": "Petőfi Sándor utca 5. (Hosszú név)",
            "city": "Cegléd",
            "postal_code": "2700",
            "customer_name": "ABC Bolt Kft.", // Csapatnév eltávolítva
            "contact_phone": "+36 20 111 2233",
            "ac_power_kw": 5.0,
            "ac_type": "Központi klíma",
            "decoration_info": "8m dekor"
        },
        {
            "id": "6",
            "team": "roli_bandi", // Robi átírva Rolira
            "date": nextWeekDates[4], // Péntek
            "time": "15:00",
            "address": "Gorkij fasor 12.",
            "city": "Szolnok",
            "postal_code": "5000",
            "customer_name": "Zöld Építőipari Kft.", // Csapatnév eltávolítva
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
            "customer_name": "Kiss Andrea", // Csapatnév eltávolítva
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
            "customer_name": "Fenyvesi Bálint", // Csapatnév eltávolítva
            "contact_phone": "+36 20 666 7788",
            "ac_power_kw": 5.0,
            "ac_type": "Központi légkondícionáló",
            "decoration_info": "Nem kell dekor"
        },
        {
            "id": "9",
            "team": "dani_laci",
            "date": nextWeekDates[3], // Csütörtök
            "time": "15:00",
            "address": "Jókai utca 2.",
            "city": "Eger",
            "postal_code": "3300",
            "customer_name": "Nagy Éva", // Csapatnév eltávolítva
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
            "customer_name": "Tóth Gábor", // Csapatnév eltávolítva
            "contact_phone": "+36 20 333 4455",
            "ac_power_kw": 5.0,
            "ac_type": "Inverteres Klíma",
            "decoration_info": "kevés dekor"
        },
        {
            "id": "11",
            "team": "dani_laci",
            "date": nextWeekDates[6], // Vasárnap (következő hét utolsó napja)
            "time": "09:00",
            "address": "Kossuth Lajos utca 1.",
            "city": "Debrecen",
            "postal_code": "4024",
            "customer_name": "Vasvári Család", // Csapatnév eltávolítva
            "contact_phone": "+36 30 123 9876",
            "ac_power_kw": 3.5,
            "ac_type": "Split Klíma",
            "decoration_info": "Nem kell dekor "
        }
    ];

    function renderAppointments(selectedTeam) {
        appointmentsTableBody.innerHTML = ''; // Táblázat kiürítése
        loadingMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');
        noAppointmentsMessage.classList.add('hidden');

        let filteredAppointments = [];
        if (selectedTeam === 'roli_bandi') { // Robi átírva Rolira
            filteredAppointments = allAppointments.filter(app => app.team === 'roli_bandi');
            currentTeamDisplay.textContent = 'Jelenleg kiválasztva: Roli és Bandi'; // Robi átírva Rolira
        } else if (selectedTeam === 'dani_laci') {
            filteredAppointments = allAppointments.filter(app => app.team === 'dani_laci');
            currentTeamDisplay.textContent = 'Jelenleg kiválasztva: Dani és Laci';
        } else {
            // Fallback, ha valamiért nincs a listában a selectedTeam (nem kéne előfordulnia)
            filteredAppointments = allAppointments.filter(app => app.team === 'roli_bandi'); // Robi átírva Rolira
            currentTeamDisplay.textContent = 'Jelenleg kiválasztva: Roli és Bandi'; // Robi átírva Rolira
            teamSelect.value = 'roli_bandi'; // Robi átírva Rolira
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
                const row = document.createElement('tr');
                
                // Dátum alapú státusz meghatározása
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

                // Dekoráció információ összeállítása
                let decorationOutput = app.decoration_info;
                // Normalize to "Nem kell" if it's 0m, 0 méter, Nincs, stb.
                if (decorationOutput.toLowerCase().includes("nincs") || decorationOutput.toLowerCase().includes("0m") || decorationOutput.toLowerCase().includes("0 méter") || decorationOutput === "0") {
                    decorationOutput = "Nem kell";
                }
                
                row.innerHTML = `
                    <td data-label="Dátum" class="highlight-text">${app.date}</td>
                    <td data-label="Idő" class="highlight-text">${app.time}</td>
                    <td data-label="Cím" class="highlight-text">
                        ${app.city}, ${app.address}
                        <div class="text-secondary text-xs">${app.postal_code}</div>
                    </td>
                    <td data-label="Ügyfél neve">${app.customer_name}</td>
                    <td data-label="Telefon" class="highlight-phone"><a href="tel:${app.contact_phone}">${app.contact_phone}</a></td>
                    <td data-label="Klím kW" class="highlight-text">${app.ac_power_kw} kW</td>
                    <td data-label="Státusz">
                        <span class="status-badge ${statusClass}">${status}</span>
                    </td>
                    <td data-label="Leírás" class="text-secondary text-sm">${decorationOutput}</td>
                `;
                appointmentsTableBody.appendChild(row);
            });
        }
    }

    // Eseményfigyelő a csapatválasztóra
    teamSelect.addEventListener('change', (event) => {
        renderAppointments(event.target.value);
    });

    // Kezdeti renderelés (alapértelmezetten 'roli_bandi' legyen kiválasztva)
    // Beállítjuk a selectet is erre az értékre, ha esetleg nem ez az alapértelmezett HTML-ben
    teamSelect.value = 'roli_bandi'; // Robi átírva Rolira
    renderAppointments(teamSelect.value);
});

document.getElementById('logoutButton').addEventListener('click', () => {
    // Vissza a "belépési" oldalra
    window.location.href = 'index.html';
});