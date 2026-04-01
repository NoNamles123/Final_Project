import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    const guestZone = document.getElementById('auth-guest');
    const userZone = document.getElementById('auth-user');
    const nameDisplay = document.getElementById('user-display-name');
    
    const mobileGuest = document.getElementById('mobile-auth-guest');
    const mobileUser = document.getElementById('mobile-auth-user');
    const mobileName = document.getElementById('mobile-user-name');

    if (user) {
        console.log("Юзер залогінений:", user.email);
        if (guestZone) guestZone.setAttribute('style', 'display: none !important');
        if (mobileGuest) mobileGuest.setAttribute('style', 'display: none !important');
        if (userZone) userZone.setAttribute('style', 'display: flex !important');
        if (mobileUser) mobileUser.setAttribute('style', 'display: flex !important');
        const username = user.displayName || user.email.split('@')[0];
        if (nameDisplay) nameDisplay.textContent = username;
        if (mobileName) mobileName.textContent = username;
        if (window.location.pathname.includes('Login.html') || window.location.pathname.includes('Register.html')) {
            window.location.href = "../index.html";
        }
    } else {
        console.log(" Юзер не залогінений");
        if (guestZone) guestZone.setAttribute('style', 'display: flex !important');
        if (mobileGuest) mobileGuest.setAttribute('style', 'display: flex !important');
        if (userZone) userZone.setAttribute('style', 'display: none !important');
        if (mobileUser) mobileUser.setAttribute('style', 'display: none !important');
    }
});

window.handleLogout = () => {
    signOut(auth).then(() => {
        const isSubDir = window.location.pathname.includes('/Html/');
        window.location.href = isSubDir ? "../index.html" : "index.html";
    });
};

document.getElementById('logout-btn')?.addEventListener('click', window.handleLogout);
document.getElementById('mobile-logout-btn')?.addEventListener('click', window.handleLogout);