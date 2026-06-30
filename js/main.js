// =====================================================================
//  VLK website — scroll reveal + autoplay-on-visible + bibtex copy
// =====================================================================

(function () {
  'use strict';

  // ----- 1. Scroll reveal --------------------------------------------
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // ----- 2. Autoplay videos when in view; pause when out --------------
  const autoplayCandidates = document.querySelectorAll(
    '.mode-card video, .task-grid video, .stage-media video, .sim-card video'
  );
  autoplayCandidates.forEach((v) => {
    v.muted = true;
    v.playsInline = true;
    v.loop = true;
    if (!v.preload) v.preload = 'metadata';
  });
  if ('IntersectionObserver' in window && autoplayCandidates.length) {
    const playObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const v = e.target;
        if (e.intersectionRatio > 0.25) {
          const p = v.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        } else {
          v.pause();
        }
      });
    }, { threshold: [0, 0.25, 0.5, 0.75] });
    autoplayCandidates.forEach((v) => playObserver.observe(v));
  }

  // ----- 3. Smooth scroll with nav-height offset ----------------------
  // The nav is floating over the hero only; once user scrolls past hero,
  // the nav is gone. So only offset the smooth-scroll for hero-internal jumps.
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (ev) => {
      const id = a.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      ev.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 8;
      window.scrollTo({ top, behavior: 'smooth' });
      history.pushState(null, '', id);
    });
  });

  // ----- 4a. Mobile nav toggle ----------------------------------------
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Auto-close after tapping a link
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ----- 4. Sticky nav: toggle .nav-on-hero while hero is in view -----
  const nav = document.querySelector('.nav');
  const hero = document.querySelector('.hero');
  if (nav && hero && 'IntersectionObserver' in window) {
    const heroObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        // Hero "in view" = its bottom is below the top of the viewport.
        // Use a small negative root margin so the swap happens near the boundary.
        if (e.isIntersecting) nav.classList.add('nav-on-hero');
        else nav.classList.remove('nav-on-hero');
      });
    }, { threshold: 0, rootMargin: '-80px 0px 0px 0px' });
    heroObs.observe(hero);
    // Initial state: assume we start on hero
    nav.classList.add('nav-on-hero');
  }

  // ----- 5. BibTeX copy button ----------------------------------------
  document.querySelectorAll('.bibtex-copy').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const sel = btn.getAttribute('data-copy-target');
      const target = sel ? document.querySelector(sel) : null;
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target.textContent.trim());
        btn.classList.add('copied');
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.textContent = orig;
        }, 1600);
      } catch (e) {
        // Fallback: select the text so user can hit cmd-c.
        const range = document.createRange();
        range.selectNodeContents(target);
        const sel2 = window.getSelection();
        sel2.removeAllRanges();
        sel2.addRange(range);
      }
    });
  });
})();
