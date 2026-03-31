import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set, get, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
        console.error("Error Telegram:", e);
    }
}

const regForm = document.getElementById('register-form');
if (regForm) {
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('reg-username').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;

        if (password !== confirmPassword) {
            alert("Password dont sync! Check password and try again ");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                set(ref(db, 'users/' + userCredential.user.uid), {
                    username: username,
                    email: email,
                    date: new Date().toISOString()
                });
                sendTelegramNotification(username, email);
                alert("Sucsesfull registration!");
                window.location.href = "Login.html";
            })
            .catch((error) => alert("Eror to register: " + error.message));
    });
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const loginInput = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        let emailToAuth = loginInput;

        if (!loginInput.includes('@')) {
            try {
                const usersRef = ref(db, 'users');
                const userQuery = query(usersRef, orderByChild('username'), equalTo(loginInput));
                const snapshot = await get(userQuery);

                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const userId = Object.keys(userData)[0];
                    emailToAuth = userData[userId].email;
                } else {
                    alert("We didn`t find user with that username");
                    return;
                }
            } catch (error) {
                console.error("Can`t find username: ", error);
                alert("Can`t find username");
                return;
            }
        }

        signInWithEmailAndPassword(auth, emailToAuth, password)
            .then(() => {
                window.location.href = "../index.html";
            })
            .catch((error) => {
                console.error("Error to enter", error.code);
                alert("Wrong login or password please try again");
            });
    });
}

const googleBtn = document.querySelector('button.soc-btn img[alt="Google"]')?.parentElement;
if (googleBtn) {
    googleBtn.addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                set(ref(db, 'users/' + user.uid), {
                    username: user.displayName || "Google User",
                    email: user.email,
                    lastLogin: new Date().toISOString()
                });
                sendTelegramNotification(user.displayName || "Google User", user.email);
                window.location.href = "../index.html";
            })
            .catch((error) => alert("Error Google: " + error.message));
    });
}