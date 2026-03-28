const faqData = {
    'setup': {
        title: 'How do I set up the VPN?',
        text: `<p>Setting up your VPN is easy. Follow these steps:</p>
               <ul class="list-disc ml-6 space-y-2 text-gray-500">
                   <li>Download the client for your OS (Windows, Android, or iOS).</li>
                   <li>Log in using your registered credentials.</li>
                   <li>Select a server location and hit "Connect".</li>
               </ul>`
    },
    'not-working': {
        title: "Why isn't my VPN working?",
        text: `<p>There could be several reasons why your VPN isn't working:</p>
               <ul class="list-disc ml-6 space-y-2 text-gray-500">
                   <li>Make sure your internet connection is stable.</li>
                   <li>Check that your subscription is active and hasn't expired.</li>
                   <li>Ensure the VPN app is updated to the latest version.</li>
                   <li>Sometimes firewall or antivirus settings can block the VPN.</li>
               </ul>`
    },
    'devices': {
        title: 'Can I use the VPN on multiple devices?',
        text: `<p>Absolutely! Depending on your plan, you can connect up to 5 devices simultaneously. This includes your laptop, smartphone, and even your tablet.</p>`
    },
    'speed': {
        title: 'Does using a VPN slow down my connection?',
        text: `<p>While all VPNs can slightly reduce speed due to encryption, our high-speed servers on Parrot OS are optimized to minimize latency. Most users won't notice any difference.</p>`
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const faqButtons = document.querySelectorAll('.faq-btn');
    const titleDisplay = document.getElementById('faq-title');
    const textDisplay = document.getElementById('faq-text');

    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const key = button.getAttribute('data-faq');
            textDisplay.style.opacity = '0';
            setTimeout(() => {
                titleDisplay.innerText = faqData[key].title;
                textDisplay.innerHTML = faqData[key].text;
                textDisplay.style.opacity = '1';
            }, 150);
            faqButtons.forEach(btn => {
                btn.classList.remove('active-faq', 'bg-gray-100');
                btn.querySelector('.faq-icon').innerText = '+';
                btn.querySelector('.faq-button-text').classList.remove('text-main-color');
            });
            button.classList.add('active-faq', 'bg-gray-100');
            button.querySelector('.faq-icon').innerText = '−';
            button.querySelector('.faq-button-text').classList.add('text-main-color');
        });
    });
});