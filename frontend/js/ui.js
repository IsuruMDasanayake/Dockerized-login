export function showMessage(message, type = 'info') {
    const messageEl = document.getElementById('message');
    if (messageEl) {
        messageEl.textContent = message;

        if (type === 'error') {
            messageEl.className = 'text-center font-medium text-red-600 dark:text-red-500';
        } else if (type === 'success') {
            messageEl.className = 'text-center font-medium text-green-600 dark:text-green-500';
        } else {
            messageEl.className = 'text-center font-medium text-gray-600 dark:text-gray-400';
        }
    }
}

export function clearMessage() {
    const messageEl = document.getElementById('message');
    if (messageEl) {
        messageEl.textContent = '';
        messageEl.className = 'text-center font-medium';
    }
}

export function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {

        themeToggleBtn.addEventListener('click', () => {

            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
            } else {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
            }
        });
    }

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}
