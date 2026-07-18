const DEMO_USER_KEY = 'portfolio-demo-user';

const setVisible = (element, visible) => {
    element?.classList.toggle('hidden', !visible);
    element?.classList.toggle('flex', visible);
};

const updateAccountMenu = () => {
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem(DEMO_USER_KEY));
    } catch {
        localStorage.removeItem(DEMO_USER_KEY);
    }

    setVisible(document.getElementById('auth-guest'), !user);
    setVisible(document.getElementById('auth-user'), Boolean(user));
    setVisible(document.getElementById('mobile-auth-guest'), !user);
    setVisible(document.getElementById('mobile-auth-user'), Boolean(user));

    const displayName = user?.name || 'Demo User';
    const desktopName = document.getElementById('user-display-name');
    const mobileName = document.getElementById('mobile-user-name');
    if (desktopName) desktopName.textContent = displayName;
    if (mobileName) mobileName.textContent = displayName;
};

const logout = () => {
    localStorage.removeItem(DEMO_USER_KEY);
    updateAccountMenu();
};

document.getElementById('logout-btn')?.addEventListener('click', logout);
document.getElementById('mobile-logout-btn')?.addEventListener('click', logout);
updateAccountMenu();
