/* ============================================================
   CINEMACITY — OUR FOOD IS THE STORY
   ------------------------------------------------------------
   TO ADD FINAL PHOTOGRAPHY:
   Drop the files into /assets/images/ and add the key below.
   Any key left out keeps its art-directed placeholder, so you
   can swap images one at a time without touching the layout.
   ============================================================ */

const IMAGES = {
  // 'chair'       : 'assets/images/chair.jpg',
  // 'shot-01'     : 'assets/images/shot-01.jpg',
  // 'shot-02'     : 'assets/images/shot-02.jpg',
  // 'shot-03'     : 'assets/images/shot-03.jpg',
  // 'shot-04'     : 'assets/images/shot-04.jpg',
  // 'shot-05'     : 'assets/images/shot-05.jpg',
  // 'macro-it-01' : 'assets/images/macro-it-01.jpg',
  // 'macro-it-02' : 'assets/images/macro-it-02.jpg',
  // 'macro-it-03' : 'assets/images/macro-it-03.jpg',
  // 'macro-it-04' : 'assets/images/macro-it-04.jpg',
  // 'macro-it-05' : 'assets/images/macro-it-05.jpg',
  // 'macro-mx-01' : 'assets/images/macro-mx-01.jpg',
  // 'macro-mx-02' : 'assets/images/macro-mx-02.jpg',
  // 'macro-mx-03' : 'assets/images/macro-mx-03.jpg',
  // 'macro-mx-04' : 'assets/images/macro-mx-04.jpg',
  // 'macro-us-01' : 'assets/images/macro-us-01.jpg',
  // 'macro-us-02' : 'assets/images/macro-us-02.jpg',
  // 'macro-us-03' : 'assets/images/macro-us-03.jpg',
  // 'macro-us-04' : 'assets/images/macro-us-04.jpg'
};

(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── image swap ─────────────────────────────────────────── */
  document.querySelectorAll('[data-img]').forEach(function (fig) {
    const src = IMAGES[fig.dataset.img];
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.alt = fig.dataset.alt || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    fig.classList.add('has-img');
    fig.innerHTML = '';
    fig.appendChild(img);
  });

  /* ── reveal on enter ────────────────────────────────────── */
  const reveals = document.querySelectorAll('.r');
  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        const group = e.target.parentElement;
        const peers = group ? Array.prototype.filter.call(group.children, function (c) { return c.classList && c.classList.contains('r'); }) : [];
        const i = peers.indexOf(e.target);
        e.target.style.setProperty('--d', (i > 0 ? Math.min(i, 5) * 90 : 0) + 'ms');
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ── chapter tracking ───────────────────────────────────── */
  const sections = Array.prototype.slice.call(document.querySelectorAll('.chapter'));
  const links = Array.prototype.slice.call(document.querySelectorAll('.rail a'));
  const current = document.querySelector('.js-current');
  const prevBtn = document.querySelector('.js-prev');
  const nextBtn = document.querySelector('.js-next');
  const bar = document.querySelector('.progress__bar');
  let index = 0;

  function setIndex(i) {
    index = i;
    links.forEach(function (a, n) { a.classList.toggle('is-active', n === i); });
    if (current) current.textContent = String(i + 1).padStart(2, '0');
    document.body.classList.toggle('is-light', sections[i].classList.contains('chapter--light'));
    if (prevBtn) prevBtn.disabled = i === 0;
    if (nextBtn) nextBtn.disabled = i === sections.length - 1;
  }

  function track() {
    const mid = window.scrollY + window.innerHeight * 0.4;
    let i = 0;
    for (let n = 0; n < sections.length; n++) {
      if (sections[n].offsetTop <= mid) i = n;
    }
    if (i !== index) setIndex(i);

    if (bar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    }
  }

  let ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { track(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', track, { passive: true });

  function goTo(i) {
    const n = Math.max(0, Math.min(sections.length - 1, i));
    sections[n].scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(index - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(index + 1); });

  /* ── keyboard ───────────────────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    const t = e.target;
    if (t && (t.isContentEditable || /^(input|textarea|select)$/i.test(t.tagName))) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    switch (e.key) {
      case 'ArrowDown': case 'ArrowRight': case 'PageDown':
        e.preventDefault(); goTo(index + 1); break;
      case 'ArrowUp': case 'ArrowLeft': case 'PageUp':
        e.preventDefault(); goTo(index - 1); break;
      case 'Home':
        e.preventDefault(); goTo(0); break;
      case 'End':
        e.preventDefault(); goTo(sections.length - 1); break;
    }
  });

  setIndex(0);
  track();
})();
