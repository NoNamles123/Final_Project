import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  const loginBtn = document.getElementById('login-btn'); 
  const regBtn = document.getElementById('register-btn');
  const logoutBtn = document.getElementById('logout-btn'); 
  const userProfile = document.getElementById('user-profile'); 

  if (user) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (regBtn) regBtn.style.display = 'none';
    
    if (logoutBtn) logoutBtn.style.display = 'block';
    if (userProfile) {
        userProfile.style.display = 'block';
        userProfile.textContent = user.displayName || user.email;
    }
  } else {
    if (loginBtn) loginBtn.style.display = 'block';
    if (regBtn) regBtn.style.display = 'block';
    
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (userProfile) userProfile.style.display = 'none';
  }
});

const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
            window.location.reload();
        });
    });
}