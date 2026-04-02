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
    const guestBlocks = [document.getElementById('auth-guest'), document.getElementById('mobile-auth-guest')];
    const userBlocks = [document.getElementById('auth-user'), document.getElementById('mobile-auth-user')];
    const userNames = [document.getElementById('user-display-name'), document.getElementById('mobile-user-name')];

    if (user) {
        guestBlocks.forEach(b => b?.classList.add('hidden'));
        userBlocks.forEach(b => b?.classList.remove('hidden'));

        const name = user.displayName || user.email.split('@')[0];
        userNames.forEach(n => { if (n) n.textContent = name; });
    } else {
        guestBlocks.forEach(b => b?.classList.remove('hidden'));
        userBlocks.forEach(b => b?.classList.add('hidden'));
    }
});

const handleLogout = () => {
    signOut(auth).then(() => {
        const isSubDir = window.location.pathname.includes('/Html/');
        window.location.href = isSubDir ? "../index.html" : "index.html";
    });
};

document.getElementById('logout-btn')?.addEventListener('click', handleLogout);