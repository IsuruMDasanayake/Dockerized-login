import { loginUser } from './api.js';
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
            showMessage(`Login successful! Token: ${result.access_token}`, 'success');
            console.log(result);
        } catch (error) {
            showMessage(error.message, 'error');
        }
    });
});
