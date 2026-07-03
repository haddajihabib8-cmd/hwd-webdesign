document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const header = document.querySelector('.site-header');
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && header) {
    navToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.service-card, .process-step, .audience-card, .value-item, .kontakt-copy, .kontakt-form'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-visible'), (i % 6) * 70);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Contact form (client-side only, no backend) ---------- */
  const form = document.getElementById('kontaktForm');
  const status = document.getElementById('formStatus');

  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const nachricht = form.nachricht.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !nachricht) {
        status.textContent = 'Bitte füllen Sie Name und Nachricht aus.';
        status.classList.add('is-error');
        return;
      }

      if (!emailPattern.test(email)) {
        status.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
        status.classList.add('is-error');
        return;
      }

      status.classList.remove('is-error');
      status.textContent = 'Danke! Ihre Anfrage wurde erfasst — wir melden uns zeitnah zurück.';
      form.reset();
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (header) {
      header.style.borderBottomColor = y > 8 ? 'var(--border-strong)' : 'var(--border)';
    }
    lastScroll = y;
  }, { passive: true });

});
