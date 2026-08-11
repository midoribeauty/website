// Shared site interactions — Midori Beauty
// Extracted during Refactor Phase 3: Shared Scripts & Head.
// Handles behavior shared by normal site pages: footer year, mobile menu,
// back-to-top button, and scroll reveal animation.

(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = document.querySelector('.mobile-menu');
  const mobilePanel = document.getElementById('mobilePanel');

  if (menuButton && mobilePanel) {
    const closeMenu = () => {
      mobilePanel.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    };

    menuButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = mobilePanel.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    mobilePanel.addEventListener('click', (event) => event.stopPropagation());
    mobilePanel.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('click', closeMenu);
    document.addEventListener(
      'touchstart',
      (event) => {
        if (!mobilePanel.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
      },
      { passive: true },
    );
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const topButton = document.querySelector('.back-to-top');
  if (topButton) {
    window.addEventListener('scroll', () => {
      topButton.classList.toggle('is-visible', window.scrollY > 700);
    });
    topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const revealSelector = document.body?.dataset?.revealSelector;
  if (!revealSelector) return;

  const revealItems = document.querySelectorAll(revealSelector);
  revealItems.forEach((el, index) => {
    el.classList.add('reveal');
    if (index % 3 === 1) el.classList.add('reveal-delay-1');
    if (index % 3 === 2) el.classList.add('reveal-delay-2');
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -40px 0px' },
    );

    revealItems.forEach((el) => revealObserver.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }
})();
