document.addEventListener('DOMContentLoaded', () => {
    const rtlBtn = document.getElementById('rtl-btn');
    const themeBtn = document.getElementById('theme-btn');

    // RTL Persistence
    const savedDir = localStorage.getItem('dir') || 'ltr';
    document.documentElement.dir = savedDir;

    if (rtlBtn) {
        rtlBtn.addEventListener('click', () => {
            const currentDir = document.documentElement.dir;
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.dir = newDir;
            localStorage.setItem('dir', newDir);
        });
    }

    // Theme Persistence
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        if (themeBtn) {
            const span = themeBtn.querySelector('span');
            if(span) span.textContent = 'light_mode';
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            const span = themeBtn.querySelector('span');
            if (isDark) {
                localStorage.setItem('theme', 'dark');
                if(span) span.textContent = 'light_mode';
            } else {
                localStorage.setItem('theme', 'light');
                if(span) span.textContent = 'dark_mode';
            }
        });
    }
});
