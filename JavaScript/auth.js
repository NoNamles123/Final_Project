import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Твій точний конфіг, який ти скинув
const firebaseConfig = {
    apiKey: "AIzaSyCN1mdz3WBwPiKiNeCq6o1IaEFydqQb9UE",
    authDomain: "emails-dc972.firebaseapp.com",
    databaseURL: "https://emails-dc972-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "emails-dc972",
    storageBucket: "emails-dc972.firebasestorage.app",
    messagingSenderId: "779863028604",
    appId: "1:779863028604:web:5dce06dc9343585dec6af9",
    measurementId: "G-9352HQ6QFP"
};

// Ініціалізація (виправлено для CDN)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Перевірка стану юзера
onAuthStateChanged(auth, (user) => {
    const guestZone = document.getElementById('auth-guest');
    const userZone = document.getElementById('auth-user');
    const nameDisplay = document.getElementById('user-display-name');

    // Для мобільного меню (якщо є)
    const mobileGuest = document.getElementById('mobile-auth-guest');
    const mobileUser = document.getElementById('mobile-auth-user');
    const mobileName = document.getElementById('mobile-user-name');

    if (user) {
        console.log("✅ Успішний вхід:", user.email);
        
        // Ховаємо кнопки входу
        if (guestZone) guestZone.classList.add('hidden');
        if (mobileGuest) mobileGuest.classList.add('hidden');
        
        // Показуємо профіль
        if (userZone) userZone.classList.remove('hidden');
        if (mobileUser) mobileUser.classList.remove('hidden');
        
        // Ставимо ім'я
        const username = user.displayName || user.email.split('@')[0];
        if (nameDisplay) nameDisplay.textContent = username;
        if (mobileName) mobileName.textContent = username;
    } else {
        console.log("👤 Юзер не залогінений");
        
        if (guestZone) guestZone.classList.remove('hidden');
        if (mobileGuest) mobileGuest.classList.remove('hidden');
        if (userZone) userZone.classList.add('hidden');
        if (mobileUser) mobileUser.classList.add('hidden');
    }
});

// Вихід
window.handleLogout = () => {
    signOut(auth).then(() => {
        location.reload();
    }).catch(err => console.error("Logout error:", err));
};

document.getElementById('logout-btn')?.addEventListener('click', window.handleLogout);
document.getElementById('mobile-logout-btn')?.addEventListener('click', window.handleLogout);