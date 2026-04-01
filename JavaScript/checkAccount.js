const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const loginInput = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        let emailToAuth = loginInput;

        if (!loginInput.includes('@')) {
            try {
                const usersRef = ref(db, 'users');
                const userQuery = query(usersRef, orderByChild('username'), equalTo(loginInput));
                const snapshot = await get(userQuery);

                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const userId = Object.keys(userData)[0];
                    emailToAuth = userData[userId].email;
                } else {
                    alert("Користувача з таким нікнеймом не знайдено");
                    return;
                }
            } catch (error) {
                console.error("Помилка пошуку в базі:", error);
                alert("Помилка бази даних. Перевірте Rules у Firebase Console.");
                return;
            }
        }

        signInWithEmailAndPassword(auth, emailToAuth, password)
            .then(() => {
                window.location.href = "../index.html";
            })
            .catch((error) => {
                console.error("Firebase Auth Error:", error.code, error.message);
                
                if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                    alert("Невірний логін або пароль");
                } else {
                    alert("Помилка входу: " + error.message);
                }
            });
    });
}