const widgetHTML = `
    <div id="chat-widget-container" class="fixed bottom-6 right-6 z-99999 font-sans">
        <button id="chat-toggle" aria-label="Open support chat" class="w-16 h-16 bg-main-color rounded-full shadow-2xl flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 border-none cursor-pointer text-2xl">&#128172;</button>
        <div id="chat-window" style="display:none" class="fixed bottom-0 right-0 w-full h-[100dvh] md:absolute md:bottom-24 md:w-[420px] md:h-[600px] md:max-h-[80vh] bg-white md:rounded-[32px] shadow-2xl flex-col overflow-hidden z-100000 border border-gray-100">
            <div class="bg-main-color p-6 text-white flex justify-between items-center shadow-lg">
                <div><p class="m-0 font-bold text-lg">Support Demo</p><p class="m-0 text-[10px] opacity-80 mt-1 uppercase tracking-wider text-white">Portfolio preview</p></div>
                <button id="close-chat" aria-label="Close support chat" class="bg-none border-none text-white text-2xl cursor-pointer p-2">&times;</button>
            </div>
            <div id="chat-messages" class="flex-1 p-5 overflow-y-auto space-y-4 bg-[#F8F9FF] text-sm flex flex-col">
                <div class="bg-white border border-gray-100 p-3.5 rounded-2xl rounded-tl-none shadow-sm text-gray-700 max-w-[85%] self-start">Hi! This chat is an interactive portfolio demo. No messages are sent online.</div>
            </div>
            <form id="chat-form" class="p-5 bg-white border-t border-gray-100 flex gap-2 items-center">
                <input type="text" id="chat-input" aria-label="Chat message" placeholder="Type your message..." class="flex-1 p-4 bg-gray-100 rounded-2xl border-none focus:ring-2 focus:ring-main-color text-base outline-none text-slate-900">
                <button type="submit" aria-label="Send message" class="bg-main-color text-white w-12 h-12 rounded-2xl border-none cursor-pointer text-xl">&#10148;</button>
            </form>
        </div>
    </div>`;

document.body.insertAdjacentHTML('beforeend', widgetHTML);

const chatWindow = document.getElementById('chat-window');
const setChatOpen = (open) => {
    chatWindow.style.display = open ? 'flex' : 'none';
    if (window.innerWidth < 768) document.body.style.overflow = open ? 'hidden' : '';
};

document.getElementById('chat-toggle').addEventListener('click', () => setChatOpen(true));
document.getElementById('close-chat').addEventListener('click', () => setChatOpen(false));
document.getElementById('chat-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    const message = document.createElement('div');
    message.className = 'bg-main-color text-white p-3.5 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] self-end break-words';
    message.textContent = text;
    document.getElementById('chat-messages').appendChild(message);
    input.value = '';
});
