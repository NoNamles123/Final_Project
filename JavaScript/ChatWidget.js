import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://dildo1488-70cee-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const userId = 'user_' + Math.random().toString(36).substr(2, 9);
const chatRef = ref(db, `chats/${userId}`);

const widgetHTML = `
    <div id="chat-widget-container" style="position: fixed; bottom: 24px; right: 24px; z-index: 99999; font-family: sans-serif;">
        <button id="chat-toggle" class="w-16 h-16 bg-[#6E38F7] rounded-full shadow-2xl flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 group border-none cursor-pointer">
            <span style="font-size: 30px;">💬</span>
        </button>

        <div id="chat-window" style="display: none; position: absolute; bottom: 80px; right: 0; width: 420px; height: 600px; background: white; border-radius: 24px; shadow: 0 20px 50px rgba(0,0,0,0.2); flex-direction: column; overflow: hidden; border: 1px solid #f1f1f1; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            
            <div style="background: #6E38F7; padding: 20px; color: white; display: flex; justify-between: space-between; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 10px; height: 10px; background: #4ade80; border-radius: 50%;"></div>
                    <div>
                        <p style="margin: 0; font-weight: bold; font-size: 18px;">Support Online</p>
                        <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.8;">Ми відповідаємо миттєво</p>
                    </div>
                </div>
                <button id="close-chat" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; padding: 5px;">✕</button>
            </div>

            <div id="chat-messages" style="flex: 1; padding: 20px; overflow-y: auto; background: #f9f9f9; display: flex; flex-direction: column; gap: 16px;">
                <div style="background: white; padding: 12px; border-radius: 15px 15px 15px 0; border: 1px solid #eee; color: #444; font-size: 14px; max-width: 85%;">
                    Привіт! Чим ми можемо вам допомогти? 😊
                </div>
            </div>

            <form id="chat-form" style="padding: 15px; background: white; border-top: 1px solid #eee; display: flex; gap: 10px;">
                <input type="text" id="chat-input" placeholder="Напишіть нам..." 
                    style="flex: 1; padding: 12px; background: #f0f0f0; border: none; border-radius: 12px; font-size: 14px; outline: none;">
                
                <button type="submit" 
                    style="background: #6E38F7; color: white; width: 45px; height: 45px; border: none; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 20px;">
                    ➔
                </button>
            </form>
        </div>
    </div>
`;

document.body.insertAdjacentHTML('beforeend', widgetHTML);

const toggleBtn = document.getElementById('chat-toggle');
const chatWin = document.getElementById('chat-window');
const closeBtn = document.getElementById('close-chat');

// 1. Пряме керування відображенням
toggleBtn.onclick = () => {
    if (chatWin.style.display === "none" || chatWin.style.display === "") {
        chatWin.style.display = "flex";
    } else {
        chatWin.style.display = "none";
    }
};

closeBtn.onclick = (e) => {
    e.stopPropagation();
    chatWin.style.display = "none";
};

// Решта логіки Firebase
const messagesContainer = document.getElementById('chat-messages');

onChildAdded(chatRef, (snapshot) => {
    const data = snapshot.val();
    if (data && data.text) {
        const isBot = (data.sender === 'bot' || data.sender === 'admin');
        const msgDiv = document.createElement('div');
        msgDiv.style.display = "flex";
        msgDiv.style.justifyContent = isBot ? "flex-start" : "flex-end";
        
        msgDiv.innerHTML = `
            <div style="background: ${isBot ? 'white' : '#6E38F7'}; 
                        color: ${isBot ? '#333' : 'white'}; 
                        padding: 10px 14px; 
                        border-radius: ${isBot ? '15px 15px 15px 0' : '15px 15px 0 15px'}; 
                        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                        max-width: 80%;
                        font-size: 14px;
                        line-height: 1.4;
                        border: ${isBot ? '1px solid #eee' : 'none'};">
                ${data.text}
            </div>
        `;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});

document.getElementById('chat-form').onsubmit = async (e) => {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const text = input.value.trim();

    if (text) {
        await push(chatRef, { text, sender: 'user', timestamp: Date.now() });
        fetch(`https://api.telegram.org/bot8285437642:AAGSWQ_6TPye9RtrDHgVXhqidvIWL5H2hGA/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: '7206470002',
                text: ` Повідомлення з віджету!\nID: ${userId}\nТекст: ${text}`
            })
        });
        input.value = '';
    }
};