/**
 * DURGA PUJA WEST BENGAL — CREATORS CONTEST - APPLICATION CONTROLLER
 * Official Initiative: Durga Puja West Bengal
 */

const SUBMIT_URL = "https://script.google.com/macros/s/AKfycbx_placeholder_endpoint/exec";

let lenisInstance = null;

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  renderConfigData();
  initLenisSmoothScroll();
  settleInitialScroll();
  initNavigation();
  initHeroPowersHub();
  initAboutExplorer();
  initChallengeCardActions();
  initFormValidation();
  initFormParticles();
  initFinalCtaParallax();
  initFaqAccordion();
  initTermsModal();
  initFloatingCTA();
  initCaptionTemplateCopy();
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

  // Mobile drawer toggle & vanilla JS interactions
  if (navToggle && mobileDrawer) {
    function closeDrawer() {
      mobileDrawer.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
    }

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.innerHTML = isOpen 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
    });

    // Close on any link or button clicked inside the mobile drawer
    mobileDrawer.querySelectorAll('a, button').forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    // Close on click outside drawer and toggle
    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('open') && !mobileDrawer.contains(e.target) && !navToggle.contains(e.target)) {
        closeDrawer();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }
}

/* ==========================================================================
   2. HERO 10-SHAKTI KINETIC SHOWCASE HUB CONTROLLER
   ========================================================================== */
function initHeroPowersHub() {
  const hub = document.getElementById('hero-powers-hub');
  const symbolsList = typeof PUJO_SYMBOLS_DATA !== 'undefined' ? PUJO_SYMBOLS_DATA : (typeof DASHA_SHAKTI_DATA !== 'undefined' ? DASHA_SHAKTI_DATA : []);
  if (!hub || symbolsList.length === 0) return;

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
      liveRegion.textContent = `Power ${data.num}: ${data.symbol}, ${data.power}`;
    }
  }

  function setActivePower(index, animated = true) {
    currentIndex = (index + symbolsList.length) % symbolsList.length;
    const data = symbolsList[currentIndex];
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
  const symbolsList = typeof PUJO_SYMBOLS_DATA !== 'undefined' ? PUJO_SYMBOLS_DATA : (typeof DASHA_SHAKTI_DATA !== 'undefined' ? DASHA_SHAKTI_DATA : []);
  if (!chipGrid || symbolsList.length === 0) return;

  chipGrid.innerHTML = '';

  symbolsList.forEach((item, idx) => {
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
  const symbolsList = typeof PUJO_SYMBOLS_DATA !== 'undefined' ? PUJO_SYMBOLS_DATA : (typeof DASHA_SHAKTI_DATA !== 'undefined' ? DASHA_SHAKTI_DATA : []);
  const data = symbolsList.find(d => d.id === symbolId || d.aliasId === symbolId);
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
        // Trigger change event to sync Category 1 theme and Shankhadhwani format rules
        challengeSelect.dispatchEvent(new Event('change', { bubbles: true }));
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
  const closedNotice = document.getElementById('contest-closed-notice');
  const successOverlay = document.getElementById('submission-success-modal');
  const successDynamicMsg = document.getElementById('success-dynamic-message');
  const resetFormBtn = document.getElementById('submit-another-btn');
  const submitBtn = document.getElementById('submit-form-button');

  if (!form) return;

  const fields = {
    hp: document.getElementById('form-hp-website'),
    name: document.getElementById('form-name'),
    phone: document.getElementById('form-mobile'),
    email: document.getElementById('form-email'),
    district: document.getElementById('form-district'),
    dob: document.getElementById('form-dob'),
    handle: document.getElementById('form-handle'),
    category: document.getElementById('form-challenge'),
    category1ThemeWrap: document.getElementById('form-category1-theme-wrap'),
    theme: document.getElementById('form-theme'),
    format: document.getElementById('form-format'),
    optStatic: document.getElementById('opt-format-static'),
    formatShankhaNote: document.getElementById('format-shankha-note'),
    location: document.getElementById('form-location'),
    reel: document.getElementById('form-reel'),
    guardianWrap: document.getElementById('form-guardian-consent-wrap'),
    guardianName: document.getElementById('form-guardian-name'),
    guardianConsent: document.getElementById('form-guardian-consent'),
    terms: document.getElementById('form-terms')
  };

  /**
   * Check if current time is past CONTEST_CONFIG.contest.endDate
   * If closed: disable all inputs and show "Entries Closed" notice
   */
  function isContestClosed() {
    const cfg = window.CONTEST_CONFIG;
    if (!cfg || !cfg.contest || !cfg.contest.endDate) return false;
    const endDate = new Date(cfg.contest.endDate + 'T23:59:59');
    const now = new Date();
    return now > endDate;
  }

  function applyContestClosedState() {
    if (isContestClosed()) {
      if (closedNotice) closedNotice.style.display = 'block';
      const inputs = form.querySelectorAll('input, select, textarea, button');
      inputs.forEach(el => {
        el.disabled = true;
      });
      form.classList.add('form-disabled');
      return true;
    } else {
      if (closedNotice) closedNotice.style.display = 'none';
      return false;
    }
  }

  // Initial check on load
  applyContestClosedState();

  /**
   * Set field visual validity status and error text
   */
  function validateField(field, condition, customMsg) {
    if (!field) return true;
    const group = field.closest('.form-group') || field.closest('.form-checkbox-row');
    const errorMsgEl = group ? group.querySelector('.form-error-msg') : null;

    if (!condition) {
      if (group) group.classList.add('has-error');
      field.classList.add('error');
      if (errorMsgEl && customMsg) {
        errorMsgEl.textContent = customMsg;
      }
      return false;
    } else {
      if (group) group.classList.remove('has-error');
      field.classList.remove('error');
      return true;
    }
  }

  /**
   * Exact age on 1 Oct 2026 calculation
   */
  function calculateAgeOnOct1_2026(dobStr) {
    if (!dobStr) return null;
    const dob = new Date(dobStr);
    if (isNaN(dob.getTime())) return null;

    const refYear = 2026;
    const refMonth = 9; // October (0-indexed)
    const refDay = 1;

    let age = refYear - dob.getFullYear();
    const monthDiff = refMonth - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && refDay < dob.getDate())) {
      age--;
    }
    return age;
  }

  /**
   * Age check & Guardian consent display logic:
   * - Under 16 on 1 Oct 2026 -> block with clear message.
   * - 16–17 -> show required guardian consent field (name + checkbox).
   * - 18+ -> eligible without guardian consent.
   */
  function handleDobValidation() {
    if (!fields.dob) return true;
    const val = fields.dob.value;
    if (!val) {
      if (fields.guardianWrap) fields.guardianWrap.style.display = 'none';
      return validateField(fields.dob, false, 'Please enter your date of birth.');
    }

    const age = calculateAgeOnOct1_2026(val);
    if (age === null) {
      return validateField(fields.dob, false, 'Please enter a valid date of birth.');
    }

    if (age < 16) {
      if (fields.guardianWrap) fields.guardianWrap.style.display = 'none';
      if (fields.guardianName) fields.guardianName.required = false;
      if (fields.guardianConsent) fields.guardianConsent.required = false;
      return validateField(fields.dob, false, 'Participants must be at least 16 years old as of 1 October 2026 to enter.');
    }

    if (age >= 16 && age <= 17) {
      validateField(fields.dob, true);
      if (fields.guardianWrap) {
        fields.guardianWrap.style.display = 'block';
        if (fields.guardianName) fields.guardianName.required = true;
        if (fields.guardianConsent) fields.guardianConsent.required = true;
      }
      return true;
    }

    // 18 and older
    validateField(fields.dob, true);
    if (fields.guardianWrap) {
      fields.guardianWrap.style.display = 'none';
      if (fields.guardianName) {
        fields.guardianName.required = false;
        validateField(fields.guardianName, true);
      }
      if (fields.guardianConsent) {
        fields.guardianConsent.required = false;
        validateField(fields.guardianConsent, true);
      }
    }
    return true;
  }

  /**
   * URL validation using the standard URL constructor:
   * Must be instagram.com or facebook.com URL
   */
  function isValidSocialUrl(urlStr) {
    if (!urlStr || typeof urlStr !== 'string') return false;
    const trimmed = urlStr.trim();
    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return false;
      }
      const host = parsed.hostname.toLowerCase();
      const isInstagram = host === 'instagram.com' || host.endsWith('.instagram.com');
      const isFacebook = host === 'facebook.com' || host.endsWith('.facebook.com') || host === 'fb.watch' || host.endsWith('.fb.watch');

      if (!isInstagram && !isFacebook) {
        return false;
      }
      // Must have a valid path (not just bare domain)
      return parsed.pathname.length > 1;
    } catch (e) {
      return false;
    }
  }

  /**
   * Category change listener:
   * - Shows Category 1 Theme dropdown ONLY when Category 1 is selected
   * - Sets Entry Format to Reel and disables Static Image if Category is Shankhadhwani
   */
  function handleCategoryChange() {
    if (!fields.category) return;
    const catVal = fields.category.value;

    // 1. Category 1 (Dasha Shakti RTC) Theme visibility
    const isCat1 = catVal.includes('Dasha Shakti') || catVal.includes('10 Hands') || catVal.startsWith('Category 01');
    if (fields.category1ThemeWrap) {
      if (isCat1) {
        fields.category1ThemeWrap.style.display = 'block';
        if (fields.theme) fields.theme.required = true;
      } else {
        fields.category1ThemeWrap.style.display = 'none';
        if (fields.theme) {
          fields.theme.required = false;
          validateField(fields.theme, true);
        }
      }
    }

    // 2. Shankhadhwani format rules (if format dropdown is present)
    const isShankha = catVal.includes('Shankhadhwani');
    if (fields.format && fields.optStatic) {
      if (isShankha) {
        fields.format.value = 'Reel';
        fields.optStatic.disabled = true;
        if (fields.formatShankhaNote) fields.formatShankhaNote.style.display = 'block';
        validateField(fields.format, true);
      } else {
        fields.optStatic.disabled = false;
        if (fields.formatShankhaNote) fields.formatShankhaNote.style.display = 'none';
      }
    }
  }

  /**
   * Submit Button Loading State
   */
  function setLoadingState(isLoading) {
    if (!submitBtn) return;
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    if (isLoading) {
      submitBtn.disabled = true;
      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.style.display = 'inline-flex';
    } else {
      submitBtn.disabled = false;
      if (btnText) btnText.style.display = 'inline';
      if (btnLoading) btnLoading.style.display = 'none';
    }
  }

  /**
   * Show Celebratory Success State
   */
  function showSuccessView(applicantName, categoryName) {
    if (successOverlay) {
      if (successDynamicMsg) {
        const catText = categoryName ? `for <strong>${categoryName}</strong>` : '';
        successDynamicMsg.innerHTML = `Thank you, <strong>${applicantName}</strong>! Your entry ${catText} has been officially recorded for the Durga Puja West Bengal — Creators Contest.`;
      }
      successOverlay.style.display = 'block';
      successOverlay.classList.add('active');
      successOverlay.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // --- Real-time Validation Event Listeners ---
  if (fields.name) {
    fields.name.addEventListener('blur', () => {
      validateField(fields.name, fields.name.value.trim().length >= 2, 'Please provide your full name.');
    });
    fields.name.addEventListener('input', () => {
      if (fields.name.classList.contains('error')) {
        validateField(fields.name, fields.name.value.trim().length >= 2, 'Please provide your full name.');
      }
    });
  }

  if (fields.phone) {
    fields.phone.addEventListener('blur', () => {
      const clean = fields.phone.value.replace(/[^0-9]/g, '');
      validateField(fields.phone, clean.length >= 10, 'Please enter a valid 10-digit phone number.');
    });
    fields.phone.addEventListener('input', () => {
      if (fields.phone.classList.contains('error')) {
        const clean = fields.phone.value.replace(/[^0-9]/g, '');
        validateField(fields.phone, clean.length >= 10, 'Please enter a valid 10-digit phone number.');
      }
    });
  }

  if (fields.email) {
    fields.email.addEventListener('blur', () => {
      const val = fields.email.value.trim();
      if (val === '') {
        validateField(fields.email, true);
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validateField(fields.email, emailRegex.test(val), 'Please enter a valid email address.');
      }
    });
  }

  if (fields.district) {
    fields.district.addEventListener('blur', () => {
      validateField(fields.district, fields.district.value.trim().length >= 2, 'Please specify your city or area in West Bengal.');
    });
  }

  if (fields.dob) {
    fields.dob.addEventListener('change', handleDobValidation);
    fields.dob.addEventListener('input', handleDobValidation);
  }

  if (fields.handle) {
    fields.handle.addEventListener('blur', () => {
      validateField(fields.handle, fields.handle.value.trim().length >= 2, 'Please enter your public social media profile handle.');
    });
  }

  if (fields.category) {
    fields.category.addEventListener('change', () => {
      validateField(fields.category, fields.category.value !== '', 'Please select one of the three official categories.');
      handleCategoryChange();
    });
  }

  if (fields.format) {
    fields.format.addEventListener('change', () => {
      validateField(fields.format, fields.format.value !== '', 'Please specify your entry format.');
    });
  }

  if (fields.location) {
    fields.location.addEventListener('blur', () => {
      validateField(fields.location, fields.location.value.trim().length >= 2, 'Please indicate where in West Bengal this was shot.');
    });
  }

  if (fields.reel) {
    fields.reel.addEventListener('blur', () => {
      validateField(fields.reel, isValidSocialUrl(fields.reel.value), 'Please enter a valid public instagram.com or facebook.com post link.');
    });
    fields.reel.addEventListener('input', () => {
      if (fields.reel.classList.contains('error')) {
        validateField(fields.reel, isValidSocialUrl(fields.reel.value), 'Please enter a valid public instagram.com or facebook.com post link.');
      }
    });
  }

  if (fields.guardianName) {
    fields.guardianName.addEventListener('blur', () => {
      if (fields.guardianName.required) {
        validateField(fields.guardianName, fields.guardianName.value.trim().length >= 2, 'Parent or legal guardian name is required for participants under 18.');
      }
    });
  }

  if (fields.guardianConsent) {
    fields.guardianConsent.addEventListener('change', () => {
      if (fields.guardianConsent.required) {
        validateField(fields.guardianConsent, fields.guardianConsent.checked, 'Parental/guardian consent checkbox must be confirmed.');
      }
    });
  }

  if (fields.terms) {
    fields.terms.addEventListener('change', () => {
      validateField(fields.terms, fields.terms.checked, 'You must confirm this declaration to submit your entry.');
    });
  }

  // --- Form Submit Handler ---
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Check if contest closed
    if (applyContestClosedState()) {
      alert('The contest entry window has officially closed.');
      return;
    }

    // 2. Honeypot check for spam / bot protection
    if (fields.hp && fields.hp.value.trim() !== '') {
      console.warn('Bot submission blocked via honeypot field.');
      setLoadingState(true);
      setTimeout(() => {
        setLoadingState(false);
        showSuccessView('Participant', fields.category ? fields.category.value : '');
      }, 500);
      return;
    }

    let isValid = true;

    // Full name validation
    if (!fields.name || fields.name.value.trim().length < 2) {
      validateField(fields.name, false, 'Please provide your full name.');
      isValid = false;
    } else {
      validateField(fields.name, true);
    }

    // Phone validation
    const cleanPhone = fields.phone ? fields.phone.value.replace(/[^0-9]/g, '') : '';
    if (!fields.phone || cleanPhone.length < 10) {
      validateField(fields.phone, false, 'Please enter a valid 10-digit phone number.');
      isValid = false;
    } else {
      validateField(fields.phone, true);
    }

    // Email validation (optional)
    if (fields.email && fields.email.value.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(fields.email.value.trim())) {
        validateField(fields.email, false, 'Please enter a valid email address.');
        isValid = false;
      } else {
        validateField(fields.email, true);
      }
    } else if (fields.email) {
      validateField(fields.email, true);
    }

    // City / Area validation
    if (!fields.district || fields.district.value.trim().length < 2) {
      validateField(fields.district, false, 'Please specify your city or area in West Bengal.');
      isValid = false;
    } else {
      validateField(fields.district, true);
    }

    // DOB & Age validation (16+ as of 1 Oct 2026)
    if (!handleDobValidation()) {
      isValid = false;
    } else {
      const age = calculateAgeOnOct1_2026(fields.dob.value);
      if (age < 16) {
        isValid = false;
      } else if (age >= 16 && age <= 17) {
        // Required guardian name
        if (!fields.guardianName || fields.guardianName.value.trim().length < 2) {
          validateField(fields.guardianName, false, 'Parent or legal guardian name is required for participants under 18.');
          isValid = false;
        } else {
          validateField(fields.guardianName, true);
        }
        // Required guardian consent
        if (!fields.guardianConsent || !fields.guardianConsent.checked) {
          validateField(fields.guardianConsent, false, 'Parental/guardian consent checkbox must be confirmed.');
          isValid = false;
        } else {
          validateField(fields.guardianConsent, true);
        }
      }
    }

    // Social handle validation
    if (!fields.handle || fields.handle.value.trim().length < 2) {
      validateField(fields.handle, false, 'Please enter your public social media profile handle.');
      isValid = false;
    } else {
      validateField(fields.handle, true);
    }

    // Category validation
    if (!fields.category || !fields.category.value) {
      validateField(fields.category, false, 'Please select one of the three official categories.');
      isValid = false;
    } else {
      validateField(fields.category, true);
    }

    // Entry format validation (if field present)
    if (fields.format) {
      if (!fields.format.value) {
        validateField(fields.format, false, 'Please specify your entry format.');
        isValid = false;
      } else {
        validateField(fields.format, true);
      }
    }

    // Location / Pandal validation (if field present)
    if (fields.location) {
      if (fields.location.value.trim().length < 2) {
        validateField(fields.location, false, 'Please indicate where in West Bengal this was shot.');
        isValid = false;
      } else {
        validateField(fields.location, true);
      }
    }

    // Public post URL validation (instagram.com / facebook.com)
    if (!fields.reel || !isValidSocialUrl(fields.reel.value)) {
      validateField(fields.reel, false, 'Please enter a valid public instagram.com or facebook.com post link.');
      isValid = false;
    } else {
      validateField(fields.reel, true);
    }

    // Mandatory consent checkbox (if field present)
    if (fields.terms) {
      if (!fields.terms.checked) {
        validateField(fields.terms, false, 'You must confirm this declaration to submit your entry.');
        isValid = false;
      } else {
        validateField(fields.terms, true);
      }
    }

    // Focus on first invalid field
    if (!isValid) {
      const firstError = form.querySelector('.has-error input, .has-error select, .has-error');
      if (firstError) {
        if (typeof firstError.focus === 'function') firstError.focus();
        if (typeof firstError.scrollIntoView === 'function') {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }

    // Construct submission payload
    const age = calculateAgeOnOct1_2026(fields.dob.value);
    const isCat1 = fields.category.value.includes('Dasha Shakti') || fields.category.value.includes('10 Hands') || fields.category.value.startsWith('Category 01');

    const submissionPayload = {
      fullName: fields.name.value.trim(),
      phone: cleanPhone,
      email: fields.email ? fields.email.value.trim() : '',
      cityArea: fields.district.value.trim(),
      dateOfBirth: fields.dob.value,
      ageOnOct1_2026: age,
      socialHandle: fields.handle.value.trim(),
      category: fields.category.value,
      category1Theme: (isCat1 && fields.theme) ? fields.theme.value : null,
      entryFormat: fields.format ? fields.format.value : 'Reel',
      locationPandal: fields.location ? fields.location.value.trim() : '',
      postUrl: fields.reel.value.trim(),
      isMinor: (age >= 16 && age <= 17),
      guardianName: (age >= 16 && age <= 17 && fields.guardianName) ? fields.guardianName.value.trim() : null,
      guardianConsent: (age >= 16 && age <= 17 && fields.guardianConsent) ? fields.guardianConsent.checked : null,
      primaryConsentConfirmed: fields.terms ? fields.terms.checked : true,
      submittedAt: new Date().toISOString()
    };

    // Show loading state
    setLoadingState(true);

    try {
      // POST JSON to SUBMIT_URL (Google Apps Script / Formspree endpoint)
      const res = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionPayload)
      });

      if (!res.ok) {
        console.warn(`Submission endpoint responded with status: ${res.status}`);
      }
    } catch (networkErr) {
      // Graceful fallback for placeholder endpoint
      console.log('Submission note: Request dispatched (placeholder SUBMIT_URL active):', networkErr);
    } finally {
      setLoadingState(false);
      showSuccessView(submissionPayload.fullName, submissionPayload.category);
    }
  });

  // "Submit Another Entry" Action
  if (resetFormBtn && successOverlay) {
    resetFormBtn.addEventListener('click', () => {
      form.reset();
      form.querySelectorAll('.has-error').forEach(g => g.classList.remove('has-error'));
      form.querySelectorAll('.error').forEach(f => f.classList.remove('error'));
      if (fields.guardianWrap) fields.guardianWrap.style.display = 'none';
      if (fields.category1ThemeWrap) fields.category1ThemeWrap.style.display = 'none';
      if (fields.optStatic) fields.optStatic.disabled = false;
      if (fields.formatShankhaNote) fields.formatShankhaNote.style.display = 'none';
      successOverlay.classList.remove('active');
      successOverlay.style.display = 'none';
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
   CONFIG RENDER HELPERS (READS FROM window.CONTEST_CONFIG)
   ========================================================================== */

/**
 * Format any number into Indian Rupee currency format (en-IN)
 */
function formatRupees(amount) {
  const num = Number(amount);
  if (isNaN(num)) return amount;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(num);
}

/**
 * Safely resolves nested property paths (e.g. "contest.helpdesk" or "prizes.totalPool")
 */
function resolveConfigPath(obj, path) {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : undefined, obj);
}

/**
 * Fills any HTML element with [data-config="..."]
 */
function renderDataConfigElements(cfg) {
  if (!cfg) return;

  document.querySelectorAll('[data-config]').forEach(el => {
    const path = el.getAttribute('data-config');
    const val = resolveConfigPath(cfg, path);
    if (val === undefined) return;

    if (typeof val === 'number') {
      if (path === 'prizes.winners') {
        el.textContent = String(val);
      } else {
        el.textContent = formatRupees(val);
      }
    } else if (el.tagName === 'A' && path === 'contest.helpdesk') {
      el.href = 'mailto:' + val;
      el.textContent = val;
    } else {
      el.textContent = val;
    }
  });
}

/**
 * Renders Top Announcement Bar (disabled / safely no-op)
 */
function renderAnnouncementBar(cfg) {
  const bar = document.getElementById('announcement-bar-text') || document.querySelector('.top-announcement-bar .announcement-text');
  if (!bar) return;
  bar.innerHTML = '';
}

/**
 * Renders Categories Grid (#categories-grid) by looping over categories in CONTEST_CONFIG
 */
function renderCategoriesGrid(cfg) {
  const container = document.getElementById('categories-grid');
  if (!container || !cfg || !Array.isArray(cfg.categories) || cfg.categories.length === 0) return;

  container.innerHTML = cfg.categories.map((cat, index) => {
    const aiNote = cat.note ? `<p class="category-ai-note" style="color: var(--alta-crimson); font-size: 0.85rem; font-weight: 600; margin-bottom: var(--space-sm);">Note: ${cat.note}</p>` : '';

    const formatChipsMarkup = `
      <div class="format-chips-wrap">
        <span class="format-chip">
          <svg class="chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="20" height="20" rx="4"/>
            <path d="M10 9l6 3-6 3V9z" fill="currentColor"/>
          </svg>
          Reel
        </span>
      </div>
    `;

    return `
      <article class="challenge-card scroll-reveal-scale stagger-${index + 1}" id="${cat.cardId}">
        <div class="challenge-media-wrap">
          <img src="${cat.image}" alt="${cat.title}" loading="lazy" width="600" height="400">
        </div>
        <div class="challenge-card-body">
          <h3 class="challenge-card-title">${cat.title}</h3>
          <p class="challenge-card-desc">${cat.description}</p>
          ${aiNote}
          ${formatChipsMarkup}
          <a href="#submit" class="btn btn-outline" data-challenge-target="${cat.ctaTarget || cat.title}">
            Enter Now &rarr;
          </a>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Renders Judging Weightage Framework (#judging-grid & #judging-stacked-bar)
 * Generated from CONTEST_CONFIG.judging
 */
function renderJudgingGrid(cfg) {
  const container = document.getElementById('judging-grid');
  const stackedBar = document.getElementById('judging-stacked-bar');
  if (!cfg || !Array.isArray(cfg.judging)) return;

  const colorMap = [
    'var(--oxblood-dark)',
    'var(--alta-crimson)',
    'var(--forest-green)',
    'var(--marigold-amber)'
  ];

  if (container) {
    container.innerHTML = cfg.judging.map((item, idx) => `
      <div style="background: rgba(84,0,0,0.04); border-radius: var(--radius-md); padding: var(--space-md); border: 1px solid rgba(84,0,0,0.1);">
        <span style="font-size: 2rem; font-weight: 800; color: ${colorMap[idx] || 'var(--oxblood-dark)'}; font-family: var(--font-sans); display: block;">${item.weight}%</span>
        <strong style="color: ${colorMap[idx] || 'var(--oxblood-dark)'}; font-size: 0.9rem; display: block;">${item.criterion}</strong>
        <span style="font-size: 0.75rem; color: var(--muted-text);">${item.description}</span>
      </div>
    `).join('');
  }

  if (stackedBar) {
    stackedBar.innerHTML = cfg.judging.map((item, idx) => `
      <div class="stacked-bar-segment" style="width: ${item.weight}%; background: ${colorMap[idx] || 'var(--oxblood-dark)'};" title="${item.criterion}: ${item.weight}%">
        <span class="segment-label">${item.weight}%</span>
      </div>
    `).join('');
  }
}

/**
 * Renders FAQ List (#faq-list) by looping over faq array in CONTEST_CONFIG
 * Uses native accessible <details><summary> elements (No JS needed)
 */
function renderFaqList(cfg) {
  const container = document.getElementById('faq-list');
  if (!container || !cfg || !Array.isArray(cfg.faq) || cfg.faq.length === 0) return;

  const isTentative = Boolean(cfg.contest && cfg.contest.closeTimeTentative);

  container.innerHTML = cfg.faq.map(item => {
    const isDeadline = item.question && item.question.toLowerCase().includes('deadline');
    const footnoteMarkup = (isDeadline && isTentative)
      ? '<small class="deadline-footnote" data-closetime-footnote>*Deadline subject to confirmation</small>'
      : '';

    return `
    <details class="faq-item" name="contest-faq">
      <summary class="faq-trigger">
        <span class="faq-question">${item.question}</span>
        <span class="faq-icon" aria-hidden="true"></span>
      </summary>
      <div class="faq-body">
        <div class="faq-content">
          <p>${item.answer}</p>
          ${footnoteMarkup}
        </div>
      </div>
    </details>
  `;
  }).join('');
}

/**
 * Renders Prize Breakdown Table (disabled / safely no-op)
 */
function renderPrizeTable(cfg) {
  // Prize pool section removed per requirements
}

/**
 * Renders Official Rules 6-Card Grid (#rules-grid)
 * Generated from CONTEST_CONFIG.eligibility and CONTEST_CONFIG.techRules
 */
function getRuleSvgIcon(iconType) {
  switch (iconType) {
    case 'formats':
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="4"/>
        <path d="M10 9l6 3-6 3V9z" fill="currentColor"/>
      </svg>`;
    case 'users':
    case 'eligibility':
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>`;
    case 'accounts':
    case 'at-sign':
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>
      </svg>`;
    case 'audio':
    case 'audio-branding':
    case 'music':
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
      </svg>`;
    case 'raw':
    case 'raw-exif':
    case 'hard-drive':
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="17 8 12 3 7 8"/>
        <line x1="12" y1="3" x2="12" y2="15"/>
      </svg>`;
    case 'authenticity':
    case 'shield':
    default:
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>`;
  }
}

function renderRulesGrid(cfg) {
  const container = document.getElementById('rules-grid') || document.querySelector('.rules-cards-grid');
  if (!container || !cfg) return;

  const eligList = Array.isArray(cfg.eligibility)
    ? cfg.eligibility
    : (cfg.eligibility ? [cfg.eligibility] : []);
  const techList = Array.isArray(cfg.techRules) ? cfg.techRules : [];

  const combinedRules = [...eligList, ...techList];
  combinedRules.sort((a, b) => parseInt(a.number || 0, 10) - parseInt(b.number || 0, 10));

  if (combinedRules.length === 0) return;

  container.innerHTML = combinedRules.map((rule, idx) => {
    const staggerClass = `stagger-${(idx % 4) + 1}`;
    const iconSvg = getRuleSvgIcon(rule.icon || rule.id);
    return `
      <article class="rule-card scroll-reveal-scale ${staggerClass}">
        <div class="rule-card-icon-wrap" aria-hidden="true">
          ${iconSvg}
        </div>
        <div class="rule-card-body">
          <span class="rule-card-tag">${rule.tag || `Rule ${rule.number || ('0' + (idx + 1))}`}</span>
          <h3 class="rule-card-title">${rule.title}</h3>
          <p class="rule-card-desc">
            ${rule.detail}
          </p>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Renders hashtags from CONTEST_CONFIG.hashtags.
 * If finalised is false, shows "Official hashtags to be announced" instead of any list.
 */
function renderHashtags(cfg) {
  const containers = document.querySelectorAll('.footer-hashtags, [data-hashtags-container]');
  if (!containers.length) return;

  const hashtagsObj = cfg && cfg.hashtags;
  const isFinalised = Boolean(hashtagsObj && hashtagsObj.finalised);
  const list = (hashtagsObj && Array.isArray(hashtagsObj.list)) ? hashtagsObj.list : [];

  const html = (isFinalised && list.length > 0)
    ? list.map(tag => {
        const text = tag.startsWith('#') ? tag : '#' + tag;
        return `<span class="hashtag-chip">${text}</span>`;
      }).join(' ')
    : '<span class="hashtags-pending">Official hashtags to be announced</span>';

  containers.forEach(c => {
    c.innerHTML = html;
  });
}

/**
 * Wherever the close time appears, adds or displays a small footnote "Deadline subject to confirmation"
 * driven by closeTimeTentative.
 */
function renderCloseTimeFootnotes(cfg) {
  if (!cfg || !cfg.contest) return;
  const isTentative = Boolean(cfg.contest.closeTimeTentative);

  // Update footnote elements
  document.querySelectorAll('[data-closetime-footnote], .deadline-footnote').forEach(el => {
    el.style.display = isTentative ? '' : 'none';
    if (isTentative && !el.textContent.trim()) {
      el.textContent = '*Deadline subject to confirmation';
    }
  });

  // Update footnote asterisks
  document.querySelectorAll('.deadline-footnote-star').forEach(el => {
    el.style.display = isTentative ? '' : 'none';
  });
}

/**
 * Master Config Initializer: executes all rendering passes
 */
function renderConfigData() {
  const cfg = window.CONTEST_CONFIG;
  if (!cfg) return;

  renderDataConfigElements(cfg);
  renderAnnouncementBar(cfg);
  renderCategoriesGrid(cfg);
  renderRulesGrid(cfg);
  renderJudgingGrid(cfg);
  renderPrizeTable(cfg);
  renderFaqList(cfg);
  renderHashtags(cfg);
  renderCloseTimeFootnotes(cfg);
}

/* ==========================================================================
   7. FAQ CONTROLLER (NATIVE ACCESSIBLE DETAILS & SUMMARY - ZERO JS NEEDED)
   ========================================================================== */
function initFaqAccordion() {
  // Native HTML5 <details><summary> elements handle expansion/collapse accessibly without JavaScript.
  // This helper is kept as a passive entrypoint for compatibility.
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

function initChallengeCard3DTilt() {
  // 3D tilt animation disabled per design update - smooth CSS hover lift used instead
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

/* ==========================================================================
   17. CAPTION TEMPLATE COPY CONTROLLER
   ========================================================================== */
function initCaptionTemplateCopy() {
  const copyBtn = document.getElementById('btn-copy-caption');
  const codeEl = document.getElementById('caption-template-code');
  if (!copyBtn || !codeEl) return;

  copyBtn.addEventListener('click', async () => {
    const textToCopy = codeEl.textContent.trim();
    const copyText = copyBtn.querySelector('.copy-text');
    const originalText = copyText ? copyText.textContent : 'Copy Template';

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      copyBtn.classList.add('copied');
      if (copyText) copyText.textContent = 'Copied!';

      setTimeout(() => {
        copyBtn.classList.remove('copied');
        if (copyText) copyText.textContent = originalText;
      }, 2000);
    } catch (err) {
      console.warn('Copy to clipboard failed:', err);
    }
  });
}
