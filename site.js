(function () {
  const STORAGE_KEY = 'siteLocale';
  const SUPPORTED = ['en', 'es', 'fr', 'pt'];
  const labels = {
    en: { about: 'About', mission: 'Mission', programs: 'Programs', impact: 'Impact', contact: 'Contact', donate: 'Donate', language: 'Language' },
    es: { about: 'Nosotros', mission: 'Misión', programs: 'Programas', impact: 'Impacto', contact: 'Contacto', donate: 'Donar', language: 'Idioma' },
    fr: { about: 'À propos', mission: 'Mission', programs: 'Programmes', impact: 'Impact', contact: 'Contact', donate: 'Faire un don', language: 'Langue' },
    pt: { about: 'Sobre', mission: 'Missão', programs: 'Programas', impact: 'Impacto', contact: 'Contato', donate: 'Doar', language: 'Idioma' }
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

    const labelNode = document.querySelector('[data-i18n-global="languageLabel"]');
    if (labelNode) {
      labelNode.textContent = pack.language;
    }
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
  ensureLanguageSwitcher(initialLocale);
  applyGlobalLocale(initialLocale);
  window.dispatchEvent(new CustomEvent('site:localechange', { detail: { locale: initialLocale } }));
  window.chanakSiteLocale = { getLocale: getLocale, setLocale: setLocale, supported: SUPPORTED };
})();
