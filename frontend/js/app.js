import { loginUser, verifyToken, logout } from './api.js';
import { showMessage, clearMessage, initTheme } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearMessage();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const result = await loginUser(email, password);
            showMessage(`Login successful! JWT token stored.`, 'success');
            console.log('JWT Token:', result.access_token);
            
            // Optionally verify the token immediately
            setTimeout(async () => {
                try {
                    const userInfo = await verifyToken();
                    showMessage(`Welcome ${userInfo.full_name}! Token verified.`, 'success');
                } catch (error) {
                    showMessage('Token verification failed', 'error');
                }
            }, 1000);
        } catch (error) {
            showMessage(error.message, 'error');
        }
    });
});
