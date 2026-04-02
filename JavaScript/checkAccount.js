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
const handleLogout = async () => {
    try {
        await signOut(auth);
        window.location.reload();
    } catch (error) {
        console.error("Logout error:", error);
    }
};

document.getElementById('logout-btn')?.addEventListener('click', handleLogout);
document.getElementById('mobile-logout-btn')?.addEventListener('click', handleLogout);

onAuthStateChanged(auth, (user) => {
    const guestBlock = document.getElementById('auth-guest');
    const userBlock = document.getElementById('auth-user');
    const userName = document.getElementById('user-display-name');
    const mobileGuest = document.getElementById('mobile-auth-guest');
    const mobileUser = document.getElementById('mobile-auth-user');
    const mobileUserName = document.getElementById('mobile-user-name');

    if (user) {
        const displayName = user.displayName || user.email.split('@')[0];
        guestBlock?.classList.add('hidden');
        guestBlock?.classList.remove('flex');
        userBlock?.classList.remove('hidden');
        userBlock?.classList.add('flex');
        if (userName) userName.textContent = displayName;
        mobileGuest?.classList.add('hidden');
        mobileGuest?.classList.remove('flex');
        mobileUser?.classList.remove('hidden');
        mobileUser?.classList.add('flex');
        if (mobileUserName) mobileUserName.textContent = displayName;
        
    } else {
        guestBlock?.classList.remove('hidden');
        guestBlock?.classList.add('flex');
        userBlock?.classList.add('hidden');
        userBlock?.classList.remove('flex');
        mobileGuest?.classList.remove('hidden');
        mobileGuest?.classList.add('flex');
        mobileUser?.classList.add('hidden');
        mobileUser?.classList.remove('flex');
    }
});