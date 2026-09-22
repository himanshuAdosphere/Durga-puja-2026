/**
 * DASHA SHAKTI - INTERACTIVE APPLICATION CONTROLLER
 * 10 Hands. 10 Powers. One Bengal. | Durga Puja 2026
 */

let lenisInstance = null;

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  initLenisSmoothScroll();
  settleInitialScroll();
  initNavigation();
  initHeroPowersHub();
  initAboutExplorer();
  initChallengeCardActions();
  initChallengeCard3DTilt();
  initFormValidation();
  initFormParticles();
  initFinalCtaParallax();
  initTermsModal();
  initFloatingCTA();
  initScrollAnimations();
  initIdleEffectsPause();
});

/* ==========================================================================
   1. NAVIGATION & MOBILE MENU
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-menu-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-menu-links a');

  // Header state is updated from the shared scroll ticker (Lenis or native).
  syncScrollUi(window.scrollY);

  // Mobile drawer toggle
  if (navToggle && mobileDrawer) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.innerHTML = isOpen 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
      });
    });
  }
}

/* ==========================================================================
   2. HERO 10-SHAKTI KINETIC SHOWCASE HUB CONTROLLER
   ========================================================================== */
function initHeroPowersHub() {
  const hub = document.getElementById('hero-powers-hub');
  if (!hub || typeof DASHA_SHAKTI_DATA === 'undefined') return;

  const hands = hub.querySelectorAll('.hub-hand');
  const rayRotator = document.getElementById('hub-ray-rotator');
  const numLabel = document.getElementById('spotlight-num-label');
  const bengaliLabel = document.getElementById('spotlight-bengali-label');
  const weaponImg = document.getElementById('spotlight-weapon-svg');
  const powerName = document.getElementById('spotlight-power-name');
  const significance = document.getElementById('spotlight-significance');
  const liveRegion = document.getElementById('hub-live');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let currentIndex = 0;
  let autoCycleTimer = null;
  let isUserInteracting = false;

  function paintBindo(data) {
    if (numLabel) numLabel.textContent = data.num;
    if (bengaliLabel) bengaliLabel.textContent = `${data.bengali} · ${data.bengaliPower}`;
    if (weaponImg) {
      weaponImg.src = data.svg;
      weaponImg.alt = data.symbol;
      weaponImg.style.opacity = '1';
      weaponImg.style.transform = 'scale(1) rotate(0deg)';
    }
    if (powerName) {
      powerName.textContent = data.power;
      powerName.style.opacity = '1';
      powerName.style.transform = 'translateY(0)';
    }
    if (significance) {
      significance.textContent = data.subtext;
      significance.style.opacity = '1';
    }
    if (liveRegion) {
      liveRegion.textContent = `Shakti ${data.num}: ${data.symbol}, ${data.power}`;
    }
  }

  function setActivePower(index, animated = true) {
    currentIndex = (index + DASHA_SHAKTI_DATA.length) % DASHA_SHAKTI_DATA.length;
    const data = DASHA_SHAKTI_DATA[currentIndex];
    if (!data) return;

    hands.forEach((hand, i) => {
      const on = i === currentIndex;
      hand.classList.toggle('active', on);
      hand.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    if (rayRotator) {
      rayRotator.style.transform = `rotate(${currentIndex * 36}deg)`;
    }

    if (animated && !reduceMotion) {
      if (weaponImg) {
        weaponImg.style.opacity = '0';
        weaponImg.style.transform = 'scale(0.78) rotate(-12deg)';
      }
      if (powerName) {
        powerName.style.opacity = '0';
        powerName.style.transform = 'translateY(6px)';
      }
      if (significance) significance.style.opacity = '0';

      setTimeout(() => paintBindo(data), 140);
    } else {
      paintBindo(data);
    }
  }

  function startAutoCycle() {
    stopAutoCycle();
    if (reduceMotion) return;
    autoCycleTimer = setInterval(() => {
      if (!isUserInteracting) setActivePower(currentIndex + 1, true);
    }, 2800);
  }

  function stopAutoCycle() {
    if (autoCycleTimer) {
      clearInterval(autoCycleTimer);
      autoCycleTimer = null;
    }
  }

  hands.forEach((hand) => {
    const idx = parseInt(hand.getAttribute('data-shakti-index'), 10);

    hand.addEventListener('mouseenter', () => {
      isUserInteracting = true;
      setActivePower(idx, true);
    });

    hand.addEventListener('focus', () => {
      isUserInteracting = true;
      setActivePower(idx, true);
    });

    hand.addEventListener('click', () => {
      isUserInteracting = true;
      setActivePower(idx, true);
    });
  });

  hub.addEventListener('mouseleave', () => {
    setTimeout(() => {
      isUserInteracting = false;
    }, 1400);
  });

  setActivePower(0, false);
  startAutoCycle();
}

/* ==========================================================================
   3. ABOUT SECTION - INTERACTIVE 10-SYMBOL EXPLORER
   ========================================================================== */
let currentActiveSymbolId = 'trishul';

function initAboutExplorer() {
  const chipGrid = document.querySelector('.symbol-chip-grid');
  if (!chipGrid || typeof DASHA_SHAKTI_DATA === 'undefined') return;

  chipGrid.innerHTML = '';

  DASHA_SHAKTI_DATA.forEach((item, idx) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = `symbol-chip ${item.id === currentActiveSymbolId ? 'active' : ''}`;
    chip.setAttribute('data-symbol-id', item.id);
    chip.setAttribute('aria-label', `Select ${item.symbol} representing ${item.power}`);

    chip.innerHTML = `
      <img src="${item.svg}" alt="${item.symbol}" width="26" height="26">
      <span class="symbol-chip-name">${item.symbol}</span>
    `;

    chip.addEventListener('click', () => {
      selectAboutSymbol(item.id);
    });

    chip.addEventListener('mouseenter', () => {
      selectAboutSymbol(item.id);
    });

    chipGrid.appendChild(chip);
  });

  // Render initial symbol
  renderSymbolDetail(currentActiveSymbolId);
}

function selectAboutSymbol(symbolId) {
  if (currentActiveSymbolId === symbolId) return;
  currentActiveSymbolId = symbolId;

  // Update chips active state
  document.querySelectorAll('.symbol-chip').forEach(chip => {
    if (chip.getAttribute('data-symbol-id') === symbolId) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });

  renderSymbolDetail(symbolId);
}

function renderSymbolDetail(symbolId) {
  const data = DASHA_SHAKTI_DATA.find(d => d.id === symbolId);
  const detailDisplay = document.querySelector('.symbol-detail-display');
  if (!data || !detailDisplay) return;

  detailDisplay.style.opacity = '0.5';
  detailDisplay.style.transform = 'translateY(4px)';

  setTimeout(() => {
    detailDisplay.innerHTML = `
      <div class="detail-icon-stage">
        <img src="${data.svg}" alt="${data.symbol}" width="60" height="60">
      </div>
      <div class="detail-content-wrap">
        <div class="detail-badge-row">
          <span class="detail-num-badge">SHAKTI ${data.num}</span>
          <span class="detail-bengali-script">${data.bengali} &bull; ${data.bengaliPower}</span>
        </div>
        <h3 class="detail-symbol-title">${data.symbol} &rarr; ${data.power}</h3>
        <span class="detail-power-tag">${data.subtext}</span>
        <p class="detail-description">${data.description}</p>
      </div>
    `;

    detailDisplay.style.opacity = '1';
    detailDisplay.style.transform = 'translateY(0)';
  }, 120);
}


/* ==========================================================================
   5. CHALLENGE CARD BUTTON ACTIONS (PRE-SELECT CHALLENGE IN FORM)
   ========================================================================== */
function initChallengeCardActions() {
  const challengeBtns = document.querySelectorAll('[data-challenge-target]');
  const challengeSelect = document.getElementById('form-challenge');
  const formSection = document.getElementById('submit');

  challengeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetChallenge = btn.getAttribute('data-challenge-target');
      if (challengeSelect && targetChallenge) {
        challengeSelect.value = targetChallenge;
      }
      if (formSection) {
        e.preventDefault();
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // highlight the select briefly
        if (challengeSelect) {
          challengeSelect.focus();
          challengeSelect.style.borderColor = 'var(--saffron-orange)';
          setTimeout(() => {
            challengeSelect.style.borderColor = '';
          }, 1500);
        }
      }
    });
  });
}

/* ==========================================================================
   6. SUBMISSION FORM VALIDATION & SUCCESS MODAL
   ========================================================================== */
function initFormValidation() {
  const form = document.getElementById('shakti-submission-form');
  const successOverlay = document.getElementById('submission-success-modal');
  const shareBtn = document.getElementById('share-challenge-btn');
  const resetFormBtn = document.getElementById('submit-another-btn');

  if (!form) return;

  const fields = {
    name: document.getElementById('form-name'),
    mobile: document.getElementById('form-mobile'),
    email: document.getElementById('form-email'),
    district: document.getElementById('form-district'),
    challenge: document.getElementById('form-challenge'),
    reel: document.getElementById('form-reel'),
    terms: document.getElementById('form-terms')
  };

  function validateField(field, condition) {
    const group = field.closest('.form-group') || field.closest('.form-checkbox-row');
    if (!condition) {
      if (group) group.classList.add('has-error');
      field.classList.add('error');
      return false;
    } else {
      if (group) group.classList.remove('has-error');
      field.classList.remove('error');
      return true;
    }
  }

  // Live validation on blur
  if (fields.name) {
    fields.name.addEventListener('blur', () => {
      validateField(fields.name, fields.name.value.trim().length >= 2);
    });
  }

  if (fields.mobile) {
    fields.mobile.addEventListener('blur', () => {
      const clean = fields.mobile.value.replace(/[^0-9]/g, '');
      validateField(fields.mobile, clean.length >= 10);
    });
  }

  if (fields.district) {
    fields.district.addEventListener('blur', () => {
      validateField(fields.district, fields.district.value.trim().length >= 2);
    });
  }

  if (fields.challenge) {
    fields.challenge.addEventListener('change', () => {
      validateField(fields.challenge, fields.challenge.value !== '');
    });
  }

  if (fields.reel) {
    fields.reel.addEventListener('blur', () => {
      validateField(fields.reel, fields.reel.value.trim().startsWith('http'));
    });
  }

  if (fields.terms) {
    fields.terms.addEventListener('change', () => {
      validateField(fields.terms, fields.terms.checked);
    });
  }

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    if (fields.name) {
      if (!validateField(fields.name, fields.name.value.trim().length >= 2)) isValid = false;
    }
    if (fields.mobile) {
      const cleanMobile = fields.mobile.value.replace(/[^0-9]/g, '');
      if (!validateField(fields.mobile, cleanMobile.length >= 10)) isValid = false;
    }
    if (fields.district) {
      if (!validateField(fields.district, fields.district.value.trim().length >= 2)) isValid = false;
    }
    if (fields.challenge) {
      if (!validateField(fields.challenge, fields.challenge.value !== '')) isValid = false;
    }
    if (fields.reel) {
      if (!validateField(fields.reel, fields.reel.value.trim().startsWith('http'))) isValid = false;
    }
    if (fields.terms) {
      if (!validateField(fields.terms, fields.terms.checked)) isValid = false;
    }

    if (!isValid) {
      // Focus on first invalid field
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    // Submit Simulation
    const submitBtn = form.querySelector('.form-submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Submitting Your Shakti...</span>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      if (successOverlay) {
        successOverlay.classList.add('active');
        successOverlay.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 800);
  });

  // "Share the Challenge" Action
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'DASHA SHAKTI — Durga Puja 2026',
        text: 'I just submitted my entry for Dasha Shakti: 10 Hands. 10 Powers. One Bengal! Join the celebration and submit your reel.',
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          console.log('Share dismissed or aborted', err);
        }
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`).then(() => {
          const originalText = shareBtn.textContent;
          shareBtn.textContent = 'Link Copied to Clipboard!';
          setTimeout(() => {
            shareBtn.textContent = originalText;
          }, 2500);
        });
      }
    });
  }

  // "Submit Another Entry" Action
  if (resetFormBtn && successOverlay) {
    resetFormBtn.addEventListener('click', () => {
      form.reset();
      successOverlay.classList.remove('active');
    });
  }
}

/* ==========================================================================
   7. TERMS & CONDITIONS MODAL
   ========================================================================== */
function initTermsModal() {
  const modalBackdrop = document.getElementById('terms-modal');
  const openButtons = document.querySelectorAll('.js-open-terms');
  const closeButton = document.getElementById('close-terms-btn');

  if (!modalBackdrop) return;

  function openModal() {
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   8. PERSISTENT FLOATING CTA
   ========================================================================== */
function initFloatingCTA() {
  syncScrollUi(window.scrollY);
}

/* ==========================================================================
   9. SCROLL REVEALS & KINETIC ENTRANCES
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .fade-reveal');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -20px 0px',
      threshold: 0.06
    });

    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('revealed');
      } else {
        observer.observe(el);
      }
    });
  } else {
    // Fallback: immediately reveal if no IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

/* ==========================================================================
   10. BUTTER-SMOOTH MOMENTUM SCROLL (LENIS ENGINE)
   ========================================================================== */
function initLenisSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      syncScrollUi(window.scrollY);
    }, { passive: true });
    return;
  }

  if (typeof Lenis !== 'undefined') {
    try {
      lenisInstance = new Lenis({
        duration: 1.08,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.5,
        infinite: false,
        autoRaf: true
      });

      lenisInstance.on('scroll', (e) => {
        syncScrollUi(e.scroll);
      });

      document.addEventListener('visibilitychange', () => {
        if (!lenisInstance) return;
        if (document.hidden) lenisInstance.stop();
        else lenisInstance.start();
      });
    } catch (err) {
      console.warn('Lenis initialization fallback:', err);
      lenisInstance = null;
    }
  }

  if (!lenisInstance) {
    window.addEventListener('scroll', () => {
      syncScrollUi(window.scrollY);
    }, { passive: true });
  }

  // Smooth anchor navigation handling with Lenis
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href === '#!' || href === '#hero') {
        e.preventDefault();
        scrollPageToTop();
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerH = document.querySelector('.site-header')?.offsetHeight || 84;
        if (lenisInstance) {
          lenisInstance.scrollTo(target, { offset: -headerH, duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

function scrollPageToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.05 });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (location.hash) {
    history.replaceState(null, '', location.pathname + location.search);
  }
}

function settleInitialScroll() {
  const hash = window.location.hash;
  const goTop = !hash || hash === '#' || hash === '#hero';

  const apply = () => {
    if (goTop) {
      if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      if (hash === '#hero' || hash === '#') {
        history.replaceState(null, '', location.pathname + location.search);
      }
      return;
    }
    const target = document.querySelector(hash);
    if (!target) return;
    const headerH = document.querySelector('.site-header')?.offsetHeight || 84;
    if (lenisInstance) {
      lenisInstance.scrollTo(target, { offset: -headerH, immediate: true });
    }
  };

  apply();
  window.addEventListener('load', apply, { once: true });
}

function syncScrollUi(scrollY) {
  const y = typeof scrollY === 'number' ? scrollY : window.scrollY;
  const header = document.querySelector('.site-header');
  if (header) header.classList.toggle('scrolled', y > 30);

  const floatingBtn = document.querySelector('.floating-cta-desktop');
  if (floatingBtn) {
    const submitSection = document.getElementById('submit');
    let isInsideSubmit = false;
    if (submitSection) {
      const rect = submitSection.getBoundingClientRect();
      isInsideSubmit = rect.top <= window.innerHeight && rect.bottom >= 0;
    }
    floatingBtn.classList.toggle('visible', y > 450 && !isInsideSubmit);
  }

  updateScrollProgress(y);
  updateStepsThread();
}

function initIdleEffectsPause() {
  const sections = document.querySelectorAll(
    '.hero-section, .steps-section, .prizes-section, .final-cta-section, .challenges-section'
  );
  if (!sections.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('fx-idle', !entry.isIntersecting);
    });
  }, { rootMargin: '100px 0px', threshold: 0 });

  sections.forEach((section) => observer.observe(section));
}

/* ==========================================================================
   11. TOP LASER SCROLL PROGRESS BAR
   ========================================================================== */
function updateScrollProgress(scroll, limit) {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;
  const max = limit || (document.documentElement.scrollHeight - window.innerHeight);
  const progress = max > 0 ? Math.min(100, Math.max(0, (scroll / max) * 100)) : 0;
  bar.style.width = `${progress.toFixed(2)}%`;
}

/* ==========================================================================
   12. SCROLL-DRIVEN GOLDEN SACRED THREAD TIMELINE (SVG PATH DRAW)
   ========================================================================== */
function updateStepsThread() {
  const stepsSection = document.getElementById('how-to-participate');
  if (!stepsSection) return;

  const rect = stepsSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const startOffset = windowHeight * 0.75;
  const endOffset = windowHeight * 0.25;
  const totalTravel = startOffset - endOffset + rect.height * 0.4;
  const currentTravel = startOffset - rect.top;

  let progress = currentTravel / totalTravel;
  progress = Math.max(0, Math.min(1, progress));

  const bubbles = stepsSection.querySelectorAll('.step-num-bubble');
  const thresholds = [0.08, 0.35, 0.65, 0.9];
  bubbles.forEach((bubble, idx) => {
    if (progress >= thresholds[idx]) {
      bubble.classList.add('active-thread');
    } else {
      bubble.classList.remove('active-thread');
    }
  });
}

/* ==========================================================================
   13. GYROSCOPIC 3D TILT & SPECULAR SHEEN (CHALLENGE CARDS)
   ========================================================================== */
function initChallengeCard3DTilt() {
  const cards = document.querySelectorAll('.challenge-card');
  if (cards.length === 0) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 992) {
    return;
  }

  cards.forEach(card => {
    let bounds;
    let frame = 0;
    function updateBounds() {
      bounds = card.getBoundingClientRect();
    }

    card.addEventListener('mouseenter', updateBounds);

    card.addEventListener('mousemove', (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!bounds) updateBounds();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        const pctX = mouseX / bounds.width;
        const pctY = mouseY / bounds.height;
        const rotateX = ((pctY - 0.5) * -12).toFixed(2);
        const rotateY = ((pctX - 0.5) * 14).toFixed(2);
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        card.style.setProperty('--mouse-x', `${(pctX * 100).toFixed(1)}%`);
        card.style.setProperty('--mouse-y', `${(pctY * 100).toFixed(1)}%`);
      });
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==========================================================================
   15. FESTIVE AARTI GOLDEN EMBER PARTICLES (SUBMISSION SECTION)
   ========================================================================== */
function initFormParticles() {
  const canvas = document.getElementById('form-particle-canvas');
  if (!canvas) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let isVisible = false;
  let animationFrameId = null;

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = rect.height;
  }

  resize();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  const particleCount = 18;
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * (width || 800),
      y: Math.random() * (height || 600),
      size: Math.random() * 2.2 + 1,
      speedY: Math.random() * 0.55 + 0.28,
      speedX: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.22,
      flickerSpeed: Math.random() * 0.018 + 0.012,
      phase: Math.random() * Math.PI * 2
    });
  }

  function render(time) {
    if (!isVisible || document.hidden) {
      animationFrameId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += Math.sin(time * 0.0012 + p.phase) * 0.45 + p.speedX;
      p.alpha += Math.sin(time * p.flickerSpeed) * 0.012;
      const alpha = Math.max(0.12, Math.min(0.8, p.alpha));

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 120, 23, ${alpha})`;
      ctx.fill();
    });

    animationFrameId = requestAnimationFrame(render);
  }

  // IntersectionObserver to only run canvas animation when section is in viewport
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(render);
          }
        } else {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      });
    }, { threshold: 0.05 });

    observer.observe(canvas.parentElement);
  } else {
    isVisible = true;
    requestAnimationFrame(render);
  }
}

/* ==========================================================================
   16. FINAL CTA MULTI-PLANE FLOATING WEAPON PARALLAX
   ========================================================================== */
function initFinalCtaParallax() {
  const ctaSection = document.querySelector('.cta-section');
  const icons = document.querySelectorAll('.cta-floating-symbols .floating-icon');
  if (!ctaSection || icons.length === 0) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 992) {
    return;
  }

  ctaSection.addEventListener('mousemove', (e) => {
    const rect = ctaSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    icons.forEach((icon, idx) => {
      const factor = (idx % 3 + 1) * 14;
      icon.style.transform = `translate(${x * factor}px, ${y * factor}px) rotate(${x * 12}deg)`;
    });
  });

  ctaSection.addEventListener('mouseleave', () => {
    icons.forEach(icon => {
      icon.style.transform = '';
    });
  });
}
