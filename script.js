document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const dirToggleBtn = document.getElementById('dir-toggle');
    const rootElement = document.documentElement;

    // Theme Toggle Logic
    // Check local storage for preference, else use system preference
    const currentTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    rootElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const newTheme = rootElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        rootElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    // Direction Toggle Logic (RTL/LTR)
    // The requirement states: "Display only the active mode in the RTL/LTR toggle — show 'LTR' when in LTR mode and 'RTL' when in RTL mode"
    // Wait, usually a toggle shows what you will change TO, but the spec says "show 'LTR' when in LTR mode".
    // I will display the current active mode as text.
    const currentDir = localStorage.getItem('dir') || 'ltr';
    rootElement.setAttribute('dir', currentDir);
    updateDirText(currentDir);

    dirToggleBtn.addEventListener('click', () => {
        const newDir = rootElement.getAttribute('dir') === 'ltr' ? 'rtl' : 'ltr';
        rootElement.setAttribute('dir', newDir);
        localStorage.setItem('dir', newDir);
        updateDirText(newDir);
    });

    function updateDirText(dir) {
        dirToggleBtn.textContent = dir.toUpperCase();
    }
});

    // --- App Layout JS ---
    
    // Mobile Sidebar Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const appSidebar = document.querySelector('.app-sidebar');
    if (mobileMenuBtn && appSidebar) {
        mobileMenuBtn.addEventListener('click', () => {
            appSidebar.classList.toggle('open');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024 && !appSidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                appSidebar.classList.remove('open');
            }
        });
    }

    // Intersection Observer for Fade-Up Animations
    const fadeElements = document.querySelectorAll('.fade-up');
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: observer.unobserve(entry.target); if you only want it to fade in once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(el => observer.observe(el));
    }

    // ScrollSpy for App Sidebar Nav
    const appSections = document.querySelectorAll('.app-section');
    const navLinks = document.querySelectorAll('.app-sidebar-nav a');

    if (appSections.length > 0 && navLinks.length > 0) {
        // We use Intersection Observer to detect which section is taking up most of the viewport
        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    // Remove active from all
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active to current
                    const activeLink = document.querySelector(`.app-sidebar-nav a[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, {
            // Trigger when section is roughly in the middle of the screen
            rootMargin: '-30% 0px -60% 0px'
        });

        appSections.forEach(section => spyObserver.observe(section));
    }


document.addEventListener("DOMContentLoaded", () => {
    // --- Active Nav Link Highlighting ---
    const currentPath = window.location.pathname;
    const topNavLinks = document.querySelectorAll(".nav-links a");
    const currentPage = currentPath.split("/").pop() || "index.html";
    
    topNavLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        // Remove existing active classes just in case
        link.classList.remove("active");
        
        if (linkPath === currentPage) {
            link.classList.add("active");
            
            // If it is inside a dropdown menu, highlight the parent dropdown toggle as well
            const parentDropdown = link.closest(".nav-item-dropdown");
            if (parentDropdown) {
                const parentToggle = parentDropdown.querySelector("a");
                if (parentToggle) parentToggle.classList.add("active");
            }
        }
    });
});
