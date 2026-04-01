import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCN1mdz3WBwPiKiNeCq6o1IaEFydqQb9UE",
    authDomain: "emails-dc972.firebaseapp.com",
    databaseURL: "https://emails-dc972-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "emails-dc972",
    storageBucket: "emails-dc972.firebasestorage.app",
    messagingSenderId: "779863028604",
    appId: "1:779863028604:web:5dce06dc9343585dec6af9"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    const guestZone = document.getElementById('auth-guest');
    const userZone = document.getElementById('auth-user');
    const nameDisplay = document.getElementById('user-display-name');

    if (user) {
        console.log("Logged in as:", user.email);
        if (guestZone) guestZone.style.display = 'none';
        if (userZone) userZone.style.display = 'flex';
        if (nameDisplay) nameDisplay.textContent = user.displayName || user.email.split('@')[0];
        
        if (window.location.pathname.includes('Login.html')) {
            window.location.href = "../index.html";
        }
    } else {
        if (guestZone) guestZone.style.display = 'flex';
        if (userZone) userZone.style.display = 'none';
    }
});

window.logout = () => {
    signOut(auth).then(() => { location.reload(); });
};