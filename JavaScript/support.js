const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const messages = document.getElementById('chat-messages');

const addMessage = (text, isReply = false) => {
    const wrapper = document.createElement('div');
    wrapper.className = `flex ${isReply ? 'justify-start' : 'justify-end'} mb-4`;

    const message = document.createElement('div');
    message.className = isReply
        ? 'bg-white text-gray-700 p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-[80%] text-sm'
        : 'bg-[#6E38F7] text-white p-3 rounded-2xl rounded-tr-none shadow-md max-w-[80%] text-sm';
    message.textContent = text;
    wrapper.appendChild(message);
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
};

form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMessage(text);
    input.value = '';
    window.setTimeout(() => {
        addMessage('Thanks for your message. This is a portfolio demo, so nothing was sent online.', true);
    }, 500);
});
