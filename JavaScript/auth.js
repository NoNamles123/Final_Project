import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
const db = getDatabase(app);
const provider = new GoogleAuthProvider();

const botToken = '8285437642:AAGSWQ_6TPye9RtrDHgVXhqidvIWL5H2hGA';
const chatId = '7206470002';

async function sendTelegramNotification(username, email) {
    const text = `*Новий користувач!*\n👤 Логін: ${username}\n📧 Email: ${email}`;
    try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'Markdown'
            })
        });
    } catch (e) {
        console.error(e);
    }
}

const regForm = document.getElementById('register-form');
if (regForm) {
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = regForm.querySelectorAll('input');
        const username = inputs[0].value;
        const email = inputs[1].value;
        const password = inputs[2].value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                set(ref(db, 'users/' + userCredential.user.uid), {
                    username: username,
                    email: email,
                    date: new Date().toISOString()
                });
                sendTelegramNotification(username, email);
                window.location.href = "Login.html";
            })
            .catch((error) => alert(error.message));
    });
}

const googleBtn = document.querySelector('button.soc-btn img[alt="Google"]')?.parentElement;
if (googleBtn) {
    googleBtn.addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                set(ref(db, 'users/' + user.uid), {
                    username: user.displayName,
                    email: user.email,
                    lastLogin: new Date().toISOString()
                });
                sendTelegramNotification(user.displayName, user.email);
                window.location.href = "../index.html";
            })
            .catch((error) => alert(error.message));
    });
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelectorAll('input')[0].value;
        const password = loginForm.querySelectorAll('input')[1].value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                window.location.href = "../index.html";
            })
            .catch(() => alert("Невірний логін або пароль"));
    });
}