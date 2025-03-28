document.getElementById('modeSelect').addEventListener('change', function () {
    let mode = this.value;
    let teamOptions = document.getElementById('teamOptions');

    if (mode === 'team') {
        teamOptions.classList.remove('hidden');
    } else {
        teamOptions.classList.add('hidden');
    }
});

document.getElementById('generate').addEventListener('click', function () {
    let mode = document.getElementById('modeSelect').value;
    let names = document.getElementById('nameList').value.split('\n').map(name => name.trim()).filter(name => name);
    let resultDiv = document.getElementById('result');

    if (names.length === 0) {
        resultDiv.innerHTML = "⚠ Adj meg legalább egy nevet!";
        return;
    }

    if (mode === 'name') {
        let randomIndex = Math.floor(Math.random() * names.length);
        resultDiv.innerHTML = `🎉 Kiválasztott név: <strong>${names[randomIndex]}</strong>`;
    } else if (mode === 'team') {
        let teamCount = parseInt(document.getElementById('teamCount').value);
        if (names.length < teamCount) {
            resultDiv.innerHTML = "⚠ Több nevet adj meg, mint ahány csapatot választottál!";
            return;
        }

        let shuffledNames = names.sort(() => Math.random() - 0.5); // Nevek megkeverése
        let teams = Array.from({ length: teamCount }, () => []);

        shuffledNames.forEach((name, index) => {
            teams[index % teamCount].push(name);
        });

        // Nevek egymás alá írása csapatokban
        resultDiv.innerHTML = `<strong>📝 Teamek:</strong><br>` + 
            teams.map((team, index) => `<p>🔹 <strong>Team ${index + 1}:</strong><br>${team.join('<br>')}</p>`).join('');
    }
});
