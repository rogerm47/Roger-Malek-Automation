document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Ustawienie początkowego motywu
    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.textContent = '☀️'; // Ikona słońca w trybie ciemnym
        } else {
            themeToggle.textContent = '🌙'; // Ikona księżyca w trybie jasnym
        }
    } else {
        // Jeśli brak zapisanego motywu, użyj preferencji systemowych
        if (prefersDarkScheme.matches) {
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            document.body.setAttribute('data-theme', 'light');
            themeToggle.textContent = '🌙';
        }
    }

    // Nasłuchiwanie kliknięcia na przełącznik
    themeToggle.addEventListener('click', () => {
        let theme = document.body.getAttribute('data-theme');
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        }
    });

    // Nasłuchiwanie zmian preferencji systemowych (opcjonalne, ale dobre UX)
    prefersDarkScheme.addEventListener('change', (e) => {
        // Zaktualizuj tylko jeśli użytkownik nie ustawił motywu ręcznie
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.setAttribute('data-theme', 'dark');
                themeToggle.textContent = '☀️';
            } else {
                document.body.setAttribute('data-theme', 'light');
                themeToggle.textContent = '🌙';
            }
        }
    });

    // Aktualizacja roku w stopce
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});