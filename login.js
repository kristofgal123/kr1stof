document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');
    
    // Az elvárt jelszó mostantól "teszt123"
    if (passwordInput.value === 'teszt123') {
        window.location.href = 'dashboard.html';
    } else {
        errorMessage.textContent = 'Hibás jelszó!';
        errorMessage.classList.remove('hidden');
    }
});