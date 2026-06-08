/* ============================================================
   NUFENEN INTERIORS – main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ----------------------------------------------------------
       NAVBAR – scroll effect
    ---------------------------------------------------------- */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    /* ----------------------------------------------------------
       HAMBURGER MENU
    ---------------------------------------------------------- */
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        navLinks.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Zamknij menu po kliknięciu linka
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    /* ----------------------------------------------------------
       SMOOTH SCROLL
    ---------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // wysokość navbara
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ----------------------------------------------------------
       HERO PARALLAX
    ---------------------------------------------------------- */
    const heroVideo = document.querySelector('.hero-video');

    if (heroVideo) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                heroVideo.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.4}px))`;
            }
        }, { passive: true });
    }

    /* ----------------------------------------------------------
       SERVICE ITEMS – fade-in on scroll
    ---------------------------------------------------------- */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 120);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.service-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(24px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });

    /* ----------------------------------------------------------
       KARUZELE (Swiper) + ZAKŁADKI
    ---------------------------------------------------------- */
    let swiperInstances = [];

    function initCarousels() {
        // Zniszcz poprzednie instancje
        swiperInstances.forEach(s => s && s.destroy && s.destroy(true, true));
        swiperInstances = [];

        const activeTab = document.querySelector('.tab-content.active');
        if (!activeTab) return;

        activeTab.querySelectorAll('.swiper').forEach(el => {
            try {
                const swiper = new Swiper(el, {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: false,
                    grabCursor: true,
                    keyboard: { enabled: true },
                    navigation: {
                        nextEl: el.querySelector('.swiper-button-next'),
                        prevEl: el.querySelector('.swiper-button-prev'),
                    },
                    pagination: {
                        el: el.querySelector('.swiper-pagination'),
                        clickable: true,
                        dynamicBullets: true,
                    },
                });
                swiperInstances.push(swiper);
            } catch (err) {
                console.warn('Swiper init error:', err);
            }
        });
    }

    // Zakładki
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');

            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const content = document.getElementById(target);
            if (content) content.classList.add('active');

            setTimeout(initCarousels, 50);
        });
    });

    // Inicjalizacja startowa
    initCarousels();

});


/* ============================================================
   I18N – przełącznik języków PL / EN / DE
   (słownik w js/translations.js)
   ============================================================ */
(function () {
    const DICT = window.NUF_I18N || {};
    const SUPPORTED = ['pl', 'en', 'de'];
    const DEFAULT_LANG = 'pl';
    const STORAGE_KEY = 'nufenen_lang';

    function detectLang() {
        // 1. zapamiętany wybór  2. język przeglądarki  3. domyślny (pl)
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved && SUPPORTED.includes(saved)) return saved;
        } catch (e) { /* localStorage niedostępny – ignoruj */ }

        const nav = (navigator.language || 'pl').slice(0, 2).toLowerCase();
        return SUPPORTED.includes(nav) ? nav : DEFAULT_LANG;
    }

    function applyLang(lang) {
        if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
        const t = DICT[lang];
        if (!t) return;

        // teksty
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key] != null) el.textContent = t[key];
        });
        // teksty z dozwolonym HTML (np. <strong>, ⭐, &amp;)
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            if (t[key] != null) el.innerHTML = t[key];
        });

        // atrybut lang + tytuł + meta description (SEO / dostępność)
        document.documentElement.setAttribute('lang', lang);
        if (t['meta.title']) document.title = t['meta.title'];
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && t['meta.desc']) metaDesc.setAttribute('content', t['meta.desc']);

        // stan przycisków
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
            btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang);
        });

        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignoruj */ }
    }

    function initI18n() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang')));
        });
        applyLang(detectLang());
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initI18n);
    } else {
        initI18n();
    }
})();
