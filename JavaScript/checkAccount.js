import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCN1mdz3WBwPiKiNeCq6o1IaEFydqQb9UE",
    authDomain: "emails-dc972.firebaseapp.com",
    databaseURL: "https://emails-dc972-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "emails-dc972",
    storageBucket: "emails-dc972.firebasestorage.app",
    messagingSenderId: "779863028604",
    appId: "1:779863028604:web:5dce06dc9343585dec6af9"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    const guestBlocks = [document.getElementById('auth-guest'), document.getElementById('mobile-auth-guest')];
    const userBlocks = [document.getElementById('auth-user'), document.getElementById('mobile-auth-user')];
    const nameDisplays = [document.getElementById('user-display-name'), document.getElementById('mobile-user-name')];

    if (user) {
        console.log("✅ Користувач увійшов:", user.email);
        
        guestBlocks.forEach(block => block?.classList.add('hidden'));
        userBlocks.forEach(block => block?.classList.remove('hidden'));
        
        const name = user.displayName || user.email.split('@')[0];
        nameDisplays.forEach(display => {
            if (display) display.textContent = name;
        });
    } else {
        console.log(" Користувач не залогінений");
        
        guestBlocks.forEach(block => block?.classList.remove('hidden'));
        userBlocks.forEach(block => block?.classList.add('hidden'));
    }
});

const handleLogout = (e) => {
    if (e) e.preventDefault();
    signOut(auth).then(() => {
        console.log("Вихід успішний");
        const isSubDir = window.location.pathname.includes('/Html/');
        window.location.href = isSubDir ? "../index.html" : "index.html";
    }).catch((error) => {
        console.error("Помилка при виході:", error);
    });
};

document.getElementById('logout-btn')?.addEventListener('click', handleLogout);
document.getElementById('mobile-logout-btn')?.addEventListener('click', handleLogout);