document.addEventListener('DOMContentLoaded', () => {
    const rtlBtn = document.getElementById('rtl-btn');
    const themeBtn = document.getElementById('theme-btn');

    // Sync button icons with current html state
    const isDark = document.documentElement.classList.contains('dark');
    if (themeBtn) {
        const span = themeBtn.querySelector('span');
        if (span) span.textContent = isDark ? 'light_mode' : 'dark_mode';
    }

    if (rtlBtn) {
        rtlBtn.addEventListener('click', () => {
            const currentDir = document.documentElement.dir;
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.dir = newDir;
            localStorage.setItem('dir', newDir);
        });
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDarkNow = document.documentElement.classList.toggle('dark');
            const span = themeBtn.querySelector('span');
            if (isDarkNow) {
                localStorage.setItem('theme', 'dark');
                if (span) span.textContent = 'light_mode';
            } else {
                localStorage.setItem('theme', 'light');
                if (span) span.textContent = 'dark_mode';
            }
        });
    }
});
