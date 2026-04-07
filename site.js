(function () {
  const STORAGE_KEY = 'siteLocale';
  const SUPPORTED = ['en', 'es', 'fr', 'pt'];
  const MOBILE_BREAKPOINT = 900;
  const labels = {
    en: { about: 'About', mission: 'Mission', programs: 'Programs', impact: 'Impact', contact: 'Contact', donate: 'Donate', language: 'Language', menu: 'Menu', closeMenu: 'Close menu', privacy: 'Privacy Policy', terms: 'Terms of Use' },
    es: { about: 'Nosotros', mission: 'Misión', programs: 'Programas', impact: 'Impacto', contact: 'Contacto', donate: 'Donar', language: 'Idioma', menu: 'Menú', closeMenu: 'Cerrar menú', privacy: 'Política de privacidad', terms: 'Términos de uso' },
    fr: { about: 'À propos', mission: 'Mission', programs: 'Programmes', impact: 'Impact', contact: 'Contact', donate: 'Faire un don', language: 'Langue', menu: 'Menu', closeMenu: 'Fermer le menu', privacy: 'Politique de confidentialité', terms: 'Conditions d\'utilisation' },
    pt: { about: 'Sobre', mission: 'Missão', programs: 'Programas', impact: 'Impacto', contact: 'Contato', donate: 'Doar', language: 'Idioma', menu: 'Menu', closeMenu: 'Fechar menu', privacy: 'Política de privacidade', terms: 'Termos de uso' }
  };

  function getLocale() {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get('lang');
    if (SUPPORTED.includes(fromQuery)) return fromQuery;
    const fromStorage = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(fromStorage) ? fromStorage : 'en';
  }

  function setLocale(locale) {
    if (!SUPPORTED.includes(locale)) return;
    localStorage.setItem(STORAGE_KEY, locale);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', locale);
    window.history.replaceState({}, '', url.toString());
    applyGlobalLocale(locale);
    window.dispatchEvent(new CustomEvent('site:localechange', { detail: { locale: locale } }));
  }

  function updateNav(locale) {
    const pack = labels[locale] || labels.en;
    const linkMap = {
      'about.html': 'about',
      'mission.html': 'mission',
      'programs.html': 'programs',
      'impact.html': 'impact',
      'contact.html': 'contact',
      'donate.html': 'donate'
    };

    Object.entries(linkMap).forEach(([href, key]) => {
      document.querySelectorAll('a[href="' + href + '"]').forEach((link) => {
        link.textContent = pack[key];
      });
    });

    document.querySelectorAll('a[href="privacy.html"]').forEach((link) => {
      link.textContent = pack.privacy;
    });
    document.querySelectorAll('a[href="terms.html"]').forEach((link) => {
      link.textContent = pack.terms;
    });

    const labelNode = document.querySelector('[data-i18n-global="languageLabel"]');
    if (labelNode) {
      labelNode.textContent = pack.language;
    }

    const toggle = document.querySelector('.nav-toggle');
    if (toggle) {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-label', expanded ? pack.closeMenu : pack.menu);
    }
  }

  function closeMobileNav() {
    const navWrap = document.querySelector('.nav-wrap');
    const toggle = navWrap ? navWrap.querySelector('.nav-toggle') : null;
    if (!navWrap || !toggle) return;
    navWrap.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function ensureMobileMenu() {
    const navWrap = document.querySelector('.nav-wrap');
    const nav = document.querySelector('.site-header nav');
    if (!navWrap || !nav) return;

    nav.classList.add('site-nav');
    if (!nav.id) {
      nav.id = 'site-navigation';
    }

    let toggle = navWrap.querySelector('.nav-toggle');
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'nav-toggle';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', nav.id);
      toggle.setAttribute('aria-label', 'Menu');
      toggle.innerHTML = '<span class="nav-toggle-icon" aria-hidden="true"></span>';
      navWrap.insertBefore(toggle, nav);

      toggle.addEventListener('click', function () {
        const isOpen = navWrap.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        const locale = getLocale();
        const pack = labels[locale] || labels.en;
        toggle.setAttribute('aria-label', isOpen ? pack.closeMenu : pack.menu);
      });

      nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', function () {
          if (window.innerWidth <= MOBILE_BREAKPOINT) {
            closeMobileNav();
          }
        });
      });

      nav.querySelectorAll('select').forEach((select) => {
        select.addEventListener('change', function () {
          if (window.innerWidth <= MOBILE_BREAKPOINT) {
            closeMobileNav();
          }
        });
      });
    }

    if (window.innerWidth > MOBILE_BREAKPOINT) {
      closeMobileNav();
    }

    window.addEventListener('resize', function () {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        closeMobileNav();
      }
    });
  }

  function ensureLanguageSwitcher(locale) {
    const navList = document.querySelector('.nav-links');
    if (!navList || navList.querySelector('.nav-language-item')) return;

    const item = document.createElement('li');
    item.className = 'nav-language-item';
    item.innerHTML =
      '<label for="global-language-select" class="nav-language-label" data-i18n-global="languageLabel">Language</label>' +
      '<select id="global-language-select" class="nav-language-select" aria-label="Language selector">' +
      '<option value="en">English</option>' +
      '<option value="es">Español</option>' +
      '<option value="fr">Français</option>' +
      '<option value="pt">Português</option>' +
      '</select>';
    navList.appendChild(item);

    const select = item.querySelector('select');
    select.value = locale;
    select.addEventListener('change', function (event) {
      setLocale(event.target.value);
    });
  }

  function applyGlobalLocale(locale) {
    document.documentElement.lang = locale;
    updateNav(locale);
    const select = document.getElementById('global-language-select');
    if (select && select.value !== locale) {
      select.value = locale;
    }
  }

  const initialLocale = getLocale();
  ensureMobileMenu();
  ensureLanguageSwitcher(initialLocale);
  applyGlobalLocale(initialLocale);
  window.dispatchEvent(new CustomEvent('site:localechange', { detail: { locale: initialLocale } }));
  window.chanakSiteLocale = { getLocale: getLocale, setLocale: setLocale, supported: SUPPORTED };
})();
