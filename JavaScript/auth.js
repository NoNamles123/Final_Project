const DEMO_USER_KEY = 'portfolio-demo-user';

const saveDemoUser = (name, email) => {
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify({ name, email }));
};

const registerForm = document.getElementById('register-form');
registerForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    saveDemoUser(username, email);
    alert('Demo account created. No personal data was sent or stored online.');
    window.location.href = '../index.html';
});

const loginForm = document.getElementById('login-form');
loginForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const login = document.getElementById('login-email').value.trim();
    const name = login.includes('@') ? login.split('@')[0] : login;
    saveDemoUser(name || 'Demo User', login.includes('@') ? login : '');
    alert('Demo sign-in complete. No credentials were sent or stored online.');
    window.location.href = '../index.html';
});

document.querySelectorAll('.soc-btn').forEach((button) => {
    button.addEventListener('click', () => {
        saveDemoUser('Demo User', '');
        alert('Social sign-in is shown for demonstration only.');
        window.location.href = '../index.html';
    });
});
