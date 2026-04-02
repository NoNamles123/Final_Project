import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set, get, update, query, orderByChild, equalTo, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
const userId = 'user_' + Math.random().toString(36).substr(2, 9);
const chatRef = ref(db, `chats/${userId}`);
const messagesContainer = document.getElementById('chat-messages');
messagesContainer.innerHTML = '';

onChildAdded(chatRef, (snapshot) => {
    const data = snapshot.val();
    if (data && data.text) {
        appendMessage(data.text, data.sender);
    }
});

function appendMessage(text, side) {
    const wrapper = document.createElement('div');
    const isBot = (side === 'bot' || side === 'admin');
    wrapper.className = `flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`;
    
    const msg = document.createElement('div');
    msg.className = isBot 
        ? 'bg-white text-gray-700 p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-[80%] text-sm'
        : 'bg-[#6E38F7] text-white p-3 rounded-2xl rounded-tr-none shadow-md max-w-[80%] text-sm';
    
    msg.innerText = text;
    wrapper.appendChild(msg);
    messagesContainer.appendChild(wrapper);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const text = input.value.trim();

    if (text) {
        await push(chatRef, {
            text: text,
            sender: 'user',
            timestamp: Date.now()
        });

        const botToken = '8285437642:AAGSWQ_6TPye9RtrDHgVXhqidvIWL5H2hGA';
        const myId = '7206470002';
        
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: myId,
                text: `Новий клієнт!\nID: ${userId}\nТекст: ${text}`
            })
        });

        input.value = '';
    }
});

window.onbeforeunload = function() {
    return "Ви впевнені? Історія чату буде видалена при оновленні сторінки.";
};