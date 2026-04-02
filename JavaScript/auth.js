import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set, get, update, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCN1mdz3WBwPiKiNeCq6o1IaEFydqQb9UE",
    authDomain: "emails-dc972.firebaseapp.com",
    databaseURL: "https://emails-dc972-default-rtdb.europe-west1.firebasedatabase.app/",
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
    const text = `<b>Новий користувач!</b>\n<b>Логін:</b> ${username}\n<b>Email:</b> ${email}`;
    try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'HTML'
            })
        });
    } catch (e) {
        console.error("Telegram error:", e);
    }
}

let isSubmitting = false;

const regForm = document.getElementById('register-form');
if (regForm) {
    regForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const username = document.getElementById('reg-username').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        isSubmitting = true;
        const submitBtn = regForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            await set(ref(db, 'users/' + uid), {
                username: username,
                username_lowercase: username.toLowerCase(),
                email: email,
                date: new Date().toISOString()
            });

            await sendTelegramNotification(username, email);
            alert("Registration successful!");
            window.location.href = "Login.html";
        } catch (error) {
            isSubmitting = false;
            if (submitBtn) submitBtn.disabled = false;
            
            if (error.code === 'auth/email-already-in-use') {
                alert("This email is already registered.");
                window.location.href = "Login.html";
            } else {
                alert("Error: " + error.message);
            }
        }
    });
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const loginInput = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        
        let emailToAuth = loginInput;

        if (submitBtn) submitBtn.disabled = true;

        if (!loginInput.includes('@')) {
            try {
                const usersRef = ref(db, 'users');
                const userQuery = query(usersRef, orderByChild('username_lowercase'), equalTo(loginInput.toLowerCase()));
                const snapshot = await get(userQuery);

                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const userId = Object.keys(userData)[0];
                    emailToAuth = userData[userId].email;
                } else {
                    alert("No user found with this nickname");
                    if (submitBtn) submitBtn.disabled = false;
                    return;
                }
            } catch (error) {
                console.error(error);
                alert("Database error. Check console.");
                if (submitBtn) submitBtn.disabled = false;
                return;
            }
        }

        try {
            await signInWithEmailAndPassword(auth, emailToAuth, password);
            window.location.href = "../index.html";
        } catch (error) {
            alert("Incorrect login or password");
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}

const googleBtn = document.querySelector('button.soc-btn img[alt="Google"]')?.parentElement;
if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            await update(ref(db, 'users/' + user.uid), {
                username: user.displayName || "Google User",
                username_lowercase: (user.displayName || "Google User").toLowerCase(),
                email: user.email,
                lastLogin: new Date().toISOString()
            });

            await sendTelegramNotification(user.displayName || "Google User", user.email);
            window.location.href = "../index.html";
        } catch (error) {
            if (error.code !== 'auth/popup-closed-by-user') {
                alert("Google error: " + error.message);
            }
        }
    });
}