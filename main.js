/* ═══════════════════════════════════════════════
   MATEUSZ ZAJĄC — Interactions & Animations
   ═══════════════════════════════════════════════ */

import { CONFIG } from './config.js';

// --- Inject email from config into all [data-email] elements ---
document.querySelectorAll('[data-email]').forEach((el) => {
  el.href = `mailto:${CONFIG.email}`;
  if (el.dataset.email === 'show') {
    el.textContent = CONFIG.email;
  }
});

// --- Scroll-triggered fade-in ---
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -60px 0px',
  threshold: 0.1,
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach((el) => {
  fadeObserver.observe(el);
});

// --- Sticky header ---
const header = document.getElementById('site-header');

const onScroll = () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  updateActiveNav();
};

window.addEventListener('scroll', onScroll, { passive: true });

// --- Active nav link highlight ---
const sections = ['work', 'principles', 'me'];
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === '';

  if (!isHomePage) {
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === window.location.pathname || (href === '/sessions.html' && window.location.pathname.includes('sessions'))) {
        link.classList.add('active');
      }
    });
    return;
  }

  const scrollPos = window.scrollY + window.innerHeight / 3;
  let activeId = '';

  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section && section.offsetTop <= scrollPos) {
      activeId = id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      const id = href.replace('#', '');
      if (id === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    } else if (href === window.location.pathname) {
      link.classList.add('active');
    }
  });
}

// --- Smooth scroll for nav links ---
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });

      // Close mobile nav if open
      mobileNav.classList.remove('open');
      mobileBtn.classList.remove('open');
    }
  });
});

// --- Mobile menu ---
const mobileBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

mobileBtn.addEventListener('click', () => {
  mobileBtn.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
