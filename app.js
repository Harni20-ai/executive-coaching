document.addEventListener('DOMContentLoaded', () => {
    // 1. RTL Toggle
    const rtlBtn = document.getElementById('rtl-btn');
    if (rtlBtn) {
        rtlBtn.addEventListener('click', () => {
            const currentDir = document.documentElement.dir;
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.dir = newDir;
            localStorage.setItem('dir', newDir);
        });
    }

    // 2. Dark Mode Toggle
    const themeBtn = document.getElementById('theme-btn');
    const updateThemeIcon = (isDark) => {
        if (!themeBtn) return;
        const span = themeBtn.querySelector('span');
        if (span) span.textContent = isDark ? 'light_mode' : 'dark_mode';
    };

    const isDarkInitial = document.documentElement.classList.contains('dark');
    updateThemeIcon(isDarkInitial);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDarkNow = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
            updateThemeIcon(isDarkNow);
        });
    }

    // 3. Public Mobile Menu Toggle (Responsiveness Issue 1: 360, 768 hamburger)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavPanel = document.getElementById('mobile-nav-panel');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');

    if (mobileMenuBtn && mobileNavPanel) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileNavPanel.classList.contains('menu-open');
            if (isOpen) {
                mobileNavPanel.classList.remove('menu-open');
                mobileNavPanel.classList.add('menu-closed');
                if (mobileMenuIcon) mobileMenuIcon.textContent = 'menu';
            } else {
                mobileNavPanel.classList.remove('menu-closed');
                mobileNavPanel.classList.add('menu-open');
                if (mobileMenuIcon) mobileMenuIcon.textContent = 'close';
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileNavPanel.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                if (mobileNavPanel.classList.contains('menu-open')) {
                    mobileNavPanel.classList.remove('menu-open');
                    mobileNavPanel.classList.add('menu-closed');
                    if (mobileMenuIcon) mobileMenuIcon.textContent = 'menu';
                }
            }
        });
    }

    // 4. Mobile Home Submenu Accordion
    const mobileHomeToggle = document.getElementById('mobile-home-toggle');
    const mobileHomeSubmenu = document.getElementById('mobile-home-submenu');
    const mobileHomeArrow = document.getElementById('mobile-home-arrow');
    if (mobileHomeToggle && mobileHomeSubmenu) {
        mobileHomeToggle.addEventListener('click', () => {
            const isHidden = mobileHomeSubmenu.classList.toggle('hidden');
            if (mobileHomeArrow) {
                mobileHomeArrow.textContent = isHidden ? 'expand_more' : 'expand_less';
            }
        });
    }

    // 5. Dashboard Mobile Drawer Toggle (Responsiveness Issue 4: 360, 768 dashboard hamburger)
    const dashboardMenuBtn = document.getElementById('dashboard-menu-btn');
    const dashboardSidebar = document.getElementById('dashboard-sidebar');
    const dashboardBackdrop = document.getElementById('dashboard-backdrop');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');

    function openDashboardDrawer() {
        if (!dashboardSidebar) return;
        dashboardSidebar.classList.remove('drawer-closed');
        dashboardSidebar.classList.add('drawer-open');
        if (dashboardBackdrop) {
            dashboardBackdrop.classList.remove('hidden');
            setTimeout(() => dashboardBackdrop.classList.remove('opacity-0'), 10);
        }
    }

    function closeDashboardDrawer() {
        if (!dashboardSidebar) return;
        dashboardSidebar.classList.remove('drawer-open');
        dashboardSidebar.classList.add('drawer-closed');
        if (dashboardBackdrop) {
            dashboardBackdrop.classList.add('opacity-0');
            setTimeout(() => dashboardBackdrop.classList.add('hidden'), 300);
        }
    }

    if (dashboardMenuBtn) {
        dashboardMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openDashboardDrawer();
        });
    }
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeDashboardDrawer);
    }
    if (dashboardBackdrop) {
        dashboardBackdrop.addEventListener('click', closeDashboardDrawer);
    }

    // Close mobile drawer when clicking any dashboard nav button
    document.querySelectorAll('#dashboard-sidebar .sidebar-link').forEach(btn => {
        btn.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                closeDashboardDrawer();
            }
        });
    });

    // 6. Active State Highlighter Logic (Issue 2)
    // Synchronize active classes on desktop and mobile based on current pathname
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Highlight desktop nav links
    const desktopLinks = document.querySelectorAll('header nav a.nav-link');
    desktopLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('nav-active');
            link.classList.remove('text-on-surface-variant', 'text-slate-600');
        }
    });

    // Highlight Home dropdown trigger if on index.html or home_2
    const homeBtn = document.getElementById('home-dropdown-btn');
    if (homeBtn && (currentPath === 'index.html' || currentPath === '' || currentPath === 'home_2_-_leadership_transformation.html')) {
        homeBtn.classList.add('nav-active');
        homeBtn.classList.remove('text-on-surface-variant');
    }

    // Highlight dropdown menu items
    const dropdownItems = document.querySelectorAll('.nav-dropdown-item');
    dropdownItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            item.classList.add('active');
        }
    });

    // Highlight mobile menu links
    const mobileLinks = document.querySelectorAll('#mobile-nav-panel a');
    mobileLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('nav-active');
            link.classList.remove('text-on-surface-variant');
        }
    });
});

// Global tab switching function for Dashboard
window.switchTab = function(targetId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById('tab-' + targetId);
    if (target) {
        target.classList.remove('hidden');
    }

    // Update both desktop and mobile sidebar buttons
    document.querySelectorAll('.sidebar-link').forEach(btn => {
        const matches = btn.getAttribute('data-target') === targetId;
        if (matches) {
            btn.classList.add('active-tab');
            btn.classList.remove('text-on-surface-variant');
        } else {
            btn.classList.remove('active-tab');
            btn.classList.add('text-on-surface-variant');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.toggleRTL = function() {
    const html = document.documentElement;
    const current = html.getAttribute('dir');
    const newDir = current === 'rtl' ? 'ltr' : 'rtl';
    html.setAttribute('dir', newDir);
    localStorage.setItem('dir', newDir);
};

window.openBookingModal = function() {
    window.switchTab('sessions');
    alert('Booking interface initialized. Select your preferred coach and time slot.');
};
