import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://dildo1488-70cee-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app);
const userId = 'user_' + Math.random().toString(36).substr(2, 9);
const chatRef = ref(db, `chats/${userId}`);

const widgetHTML = `
    <div id="chat-widget-container" class="fixed bottom-6 right-6 z-[99999] font-sans">
        <button id="chat-toggle" class="w-16 h-16 bg-[#6E38F7] rounded-full shadow-2xl flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 group border-none cursor-pointer">
            <span class="text-3xl transition-transform group-hover:rotate-12">💬</span>
        </button>

        <div id="chat-window" 
             style="display: none;" 
             class="fixed bottom-0 right-0 w-full h-[100dvh] md:absolute md:bottom-24 md:right-0 md:w-[420px] md:h-[600px] md:max-h-[80vh] bg-white md:rounded-[32px] shadow-2xl flex flex-col overflow-hidden z-[100000] border border-gray-100 transition-all duration-300">
            
            <div class="bg-[#6E38F7] p-6 text-white flex justify-between items-center shadow-lg">
                <div class="flex items-center gap-3 text-left">
                    <div class="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]"></div>
                    <div>
                        <p class="m-0 font-bold text-lg leading-none">Support Online</p>
                        <p class="m-0 text-[10px] opacity-80 mt-1 uppercase tracking-wider font-semibold text-white">Ми відповідаємо миттєво</p>
                    </div>
                </div>
                <button id="close-chat" class="bg-none border-none text-white text-2xl cursor-pointer p-2 hover:opacity-70 transition-opacity">✕</button>
            </div>

            <div id="chat-messages" class="flex-1 p-5 overflow-y-auto space-y-4 bg-[#F8F9FF] text-sm scroll-smooth flex flex-col">
                <div class="bg-white border border-gray-100 p-3.5 rounded-2xl rounded-tl-none shadow-sm text-gray-700 max-w-[85%] self-start leading-relaxed">
                    Привіт! Чим ми можемо вам допомогти? 😊
                </div>
            </div>

            <form id="chat-form" class="p-5 bg-white border-t border-gray-100 flex gap-2 items-center">
                <input type="text" id="chat-input" placeholder="Напишіть нам..." 
                    class="flex-1 p-4 bg-gray-100 rounded-2xl border-none focus:ring-2 focus:ring-[#6E38F7] text-base outline-none text-slate-900 placeholder:text-gray-400">
                
                <button type="submit" 
                    class="bg-[#6E38F7] text-white w-12 h-12 rounded-2xl hover:opacity-90 active:scale-90 transition-all flex items-center justify-center shadow-md border-none cursor-pointer text-xl">
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

toggleBtn.onclick = () => {
    if (chatWin.style.display === "none") {
        chatWin.style.display = "flex";
        if (window.innerWidth < 768) document.body.style.overflow = 'hidden';
    } else {
        chatWin.style.display = "none";
        document.body.style.overflow = '';
    }
};

closeBtn.onclick = (e) => {
    e.stopPropagation();
    chatWin.style.display = "none";
    document.body.style.overflow = '';
};

const messagesContainer = document.getElementById('chat-messages');

onChildAdded(chatRef, (snapshot) => {
    const data = snapshot.val();
    if (data && data.text) {
        const isBot = (data.sender === 'bot' || data.sender === 'admin');
        const msgHtml = `
            <div class="flex ${isBot ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div class="${isBot ? 'bg-white text-gray-800 border border-gray-100' : 'bg-[#6E38F7] text-white'} p-3.5 rounded-2xl ${isBot ? 'rounded-tl-none' : 'rounded-tr-none'} shadow-sm max-w-[85%] break-words leading-relaxed text-left">
                    ${data.text}
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', msgHtml);
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
                text: `💬 Нове повідомлення!\nID: ${userId}\nТекст: ${text}`
            })
        });
        input.value = '';
    }
};