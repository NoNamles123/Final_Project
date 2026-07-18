document.addEventListener('DOMContentLoaded', function () {
    const burgerBtn = document.querySelector('#burger-btn');
    const mobileMenu = document.querySelector('#mobile-menu');

    if (!burgerBtn || !mobileMenu) return;

    burgerBtn.addEventListener('click', function (e) {
        e.preventDefault();

        const isOpen = mobileMenu.classList.toggle('-translate-x-full');

        if (!mobileMenu.classList.contains('-translate-x-full')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        const lines = burgerBtn.querySelectorAll('span');
        if (lines.length === 3) {
            lines[0].classList.toggle('rotate-45');
            lines[0].classList.toggle('translate-y-2');
            lines[1].classList.toggle('opacity-0');
            lines[2].classList.toggle('-rotate-45');
            lines[2].classList.toggle('-translate-y-2');
        }
    });
});