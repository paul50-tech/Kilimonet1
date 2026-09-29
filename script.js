/**
 * Kilimonet High-Speed Agrisystems Engine
 * Delivers instant page transitions, pre-cached views, and zero-delay section renders.
 */

document.documentElement.classList.add('js');

// 1. Service Worker Registration for Instant Offline & Cached Asset Loading
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.debug('ServiceWorker registration omitted:', err);
    });
  });
}

// 2. Navigation & Mobile Drawer
function initNav() {
  const navToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (!navToggle || !nav) return;

  // Prevent duplicate event listeners
  if (navToggle.dataset.initialized === 'true') return;
  navToggle.dataset.initialized = 'true';

  const closeNav = () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.textContent = '☰';
  };

  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const expanded = nav.classList.contains('open');
    navToggle.setAttribute('aria-expanded', expanded.toString());
    navToggle.textContent = expanded ? '✕' : '☰';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('open')) return;
    const target = event.target;
    if (target instanceof Node && !nav.contains(target) && !navToggle.contains(target)) {
      closeNav();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeNav();
      navToggle.focus();
    }
  });
}

// 3. Header Scroll State
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header || header.dataset.scrollInit === 'true') return;
  header.dataset.scrollInit = 'true';

  const updateHeaderState = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();
}

// 4. Instant Section Loading (Zero artificial delay, 250px anticipatory margin)
function initRevealObserver() {
  const revealItems = document.querySelectorAll('.reveal');
  if (revealItems.length === 0) return;

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  // Immediate visibility for anything in or near current viewport
  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < viewportHeight + 350) {
      item.classList.add('visible');
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      // 250px bottom margin ensures content is already visible BEFORE scrolling into it
      { threshold: 0.01, rootMargin: '250px 0px 250px 0px' }
    );

    revealItems.forEach((item) => {
      if (!item.classList.contains('visible')) {
        observer.observe(item);
      }
    });
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }
}

// 5. Mini Contact / Quick Inquiry Forms
function initMiniForms() {
  const miniForms = document.querySelectorAll('.contact-form.mini');
  miniForms.forEach((form) => {
    if (form.dataset.initialized === 'true') return;
    form.dataset.initialized = 'true';

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
      let isValid = true;
      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#d9534f';
        } else {
          input.style.borderColor = '';
        }
      });

      if (!isValid) return;

      const oldFeedback = form.querySelector('.mini-form-feedback');
      if (oldFeedback) oldFeedback.remove();

      const feedback = document.createElement('div');
      feedback.className = 'mini-form-feedback';
      feedback.setAttribute('role', 'alert');
      feedback.style.cssText =
        'margin-top: 0.85rem; padding: 0.85rem 1rem; background: #eaf7ec; border: 1px solid #72be85; border-radius: 0.6rem; color: #1e592d; font-size: 0.9rem; line-height: 1.5;';
      feedback.innerHTML =
        '<strong>✓ Inquiry Received:</strong> Thank you for contacting Kilimonet. Our agricultural team in Nairobi has received your request and will get back to you shortly.';

      form.appendChild(feedback);
      form.reset();

      setTimeout(() => {
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    });
  });
}

// 6. Interactive Farm Crew Estimator (labour.html)
function initLabourEstimator() {
  const calcOperation = document.getElementById('calc-operation');
  const calcAcreage = document.getElementById('calc-acreage');
  const calcCrew = document.getElementById('calc-crew');
  const calcDuration = document.getElementById('calc-duration');
  const calcNotes = document.getElementById('calc-notes');

  if (!calcOperation || !calcAcreage || !calcCrew || !calcDuration || !calcNotes) return;
  if (calcOperation.dataset.initialized === 'true') return;
  calcOperation.dataset.initialized = 'true';

  const updateLabourCalculation = () => {
    const op = calcOperation.value;
    const acres = parseFloat(calcAcreage.value) || 1;

    let crewCount = '4 - 6 Persons';
    let duration = '1 - 2 Days';
    let note = 'Includes 1 certified field team lead, equipped with proper PPE and task templates.';

    switch (op) {
      case 'transplant':
        if (acres <= 0.25) {
          crewCount = '2 - 3 Persons';
          duration = '1 Day';
          note = 'Ideal for greenhouse seedling plug planting; includes root-dip fungicide treatment.';
        } else if (acres <= 0.5) {
          crewCount = '4 - 5 Persons';
          duration = '1 Day';
          note = 'Rapid planting crew to safeguard seedlings from midday heat stress.';
        } else if (acres <= 1) {
          crewCount = '6 - 8 Persons';
          duration = '1 - 2 Days';
          note = 'Complete furrow bed transplanting with immediate drip line placement.';
        } else if (acres <= 2) {
          crewCount = '10 - 14 Persons';
          duration = '2 Days';
          note = 'Staggered crew with specialized tray handlers and planting line leads.';
        } else {
          crewCount = `${Math.round(acres * 5)} - ${Math.round(acres * 7)} Persons`;
          duration = `${Math.ceil(acres / 2.5)} - ${Math.ceil(acres / 1.8)} Days`;
          note = 'Commercial outgrower team with dedicated field agronomist and quality scout.';
        }
        break;

      case 'bedprep':
        if (acres <= 0.25) {
          crewCount = '2 - 3 Persons';
          duration = '1 - 2 Days';
          note = 'Manual raised bed shaping, furrow leveling, and basal compost incorporation.';
        } else if (acres <= 1) {
          crewCount = '5 - 7 Persons';
          duration = '2 - 3 Days';
          note = 'Deep tilth bed formation, organic amendment incorporation, and drip line laying.';
        } else {
          crewCount = `${Math.round(acres * 4)} - ${Math.round(acres * 6)} Persons`;
          duration = `${Math.ceil(acres / 1.5)} Days`;
          note = 'Tractor operator + manual bed finishing crew for precision commercial layout.';
        }
        break;

      case 'pruning':
        if (acres <= 0.25) {
          crewCount = '2 Persons';
          duration = '1 Day';
          note = 'Specialized greenhouse pruning, string trellising, and sucker removal.';
        } else if (acres <= 1) {
          crewCount = '4 - 6 Persons';
          duration = '1 - 2 Days';
          note = 'Certified canopy specialists for high-density indeterminate tomatoes or capsicums.';
        } else {
          crewCount = `${Math.round(acres * 5)} Persons`;
          duration = `${Math.ceil(acres * 1.5)} Days`;
          note = 'Weekly rotational crew maintaining canopy hygiene and pest air corridors.';
        }
        break;

      case 'harvest':
        if (acres <= 0.25) {
          crewCount = '3 - 4 Persons';
          duration = 'Half to 1 Day';
          note = 'Gentle morning picking into sanitized crates; sorting by size and grade.';
        } else if (acres <= 1) {
          crewCount = '8 - 12 Persons';
          duration = '1 - 2 Days';
          note = 'Trained harvest pickers + packhouse sorters adhering to export cold-chain standards.';
        } else {
          crewCount = `${Math.round(acres * 8)} - ${Math.round(acres * 10)} Persons`;
          duration = `${Math.ceil(acres)} - ${Math.ceil(acres * 1.5)} Days`;
          note = 'Staggered harvest surge crews with digital lot weighing and packhouse crating.';
        }
        break;

      case 'spraying':
        if (acres <= 0.5) {
          crewCount = '1 - 2 Persons';
          duration = '3 - 5 Hours';
          note = 'Calibrated knapsack application with certified chemical PPE and post-spray signage.';
        } else if (acres <= 2) {
          crewCount = '2 - 4 Persons';
          duration = '1 Day';
          note = 'Motorized mist-blowers with water refilling assistants to optimize early morning window.';
        } else {
          crewCount = '4 - 6 Persons (or KiliDrone™)';
          duration = '1 Day';
          note = 'Boom sprayer or KiliDrone™ aerial precision spraying for rapid, uniform coverage.';
        }
        break;
    }

    calcCrew.textContent = crewCount;
    calcDuration.textContent = duration;
    calcNotes.textContent = note;
  };

  calcOperation.addEventListener('change', updateLabourCalculation);
  calcAcreage.addEventListener('change', updateLabourCalculation);
}

// 7. Intake Form Handler (intake.html)
function initIntakeHandler() {
  const intakeForm = document.getElementById('project-intake-form');
  const intakeConfirmation = document.getElementById('intake-confirmation');

  if (intakeForm && intakeConfirmation) {
    if (intakeForm.dataset.initialized === 'true') return;
    intakeForm.dataset.initialized = 'true';

    intakeForm.addEventListener('submit', (event) => {
      event.preventDefault();
      intakeConfirmation.hidden = false;
      intakeForm.reset();
      intakeConfirmation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
}

// 8. Ultra-Fast Page Transitions & Pre-fetching Cache
const pageCache = new Map();

// Helper to normalize path
function normalizePath(urlStr) {
  try {
    const u = new URL(urlStr, window.location.origin);
    let p = u.pathname.replace(/\/$/, '') || '/';
    if (p === '/index.html' || p === '/index') p = '/';
    return p;
  } catch (e) {
    return urlStr;
  }
}

// Pre-fetch a page into memory cache
async function prefetchPage(url) {
  const norm = normalizePath(url);
  if (pageCache.has(norm)) return;

  try {
    const res = await fetch(url, { credentials: 'same-origin' });
    if (res.ok) {
      const text = await res.text();
      pageCache.set(norm, text);
      const altNorm = norm.endsWith('.html') ? norm.replace(/\.html$/, '') : `${norm}.html`;
      pageCache.set(altNorm, text);
    }
  } catch (err) {
    // Silently ignore prefetch failures
  }
}

// Swap page content instantly from cached or fetched HTML
async function navigateToPage(targetUrl, pushState = true) {
  const norm = normalizePath(targetUrl);
  const altNorm = norm.endsWith('.html') ? norm.replace(/\.html$/, '') : `${norm}.html`;
  let html = pageCache.get(norm) || pageCache.get(altNorm);

  if (!html) {
    try {
      const res = await fetch(targetUrl, { credentials: 'same-origin' });
      if (!res.ok) {
        window.location.href = targetUrl;
        return;
      }
      html = await res.text();
      pageCache.set(norm, html);
      pageCache.set(altNorm, html);
    } catch (e) {
      window.location.href = targetUrl;
      return;
    }
  }

  const parser = new DOMParser();
  const newDoc = parser.parseFromString(html, 'text/html');

  const newMain = newDoc.querySelector('main');
  const currentMain = document.querySelector('main');

  if (!newMain || !currentMain) {
    window.location.href = targetUrl;
    return;
  }

  // Instant DOM swap
  currentMain.replaceWith(newMain);
  document.title = newDoc.title;
  document.body.className = newDoc.body.className;

  // Sync page-specific stylesheets from newDoc head to prevent unstyled layout
  const currentStyles = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map((l) => l.getAttribute('href'));
  newDoc.querySelectorAll('link[rel="stylesheet"]').forEach((l) => {
    const href = l.getAttribute('href');
    if (href && !currentStyles.includes(href)) {
      const linkEl = document.createElement('link');
      linkEl.rel = 'stylesheet';
      linkEl.href = href;
      document.head.appendChild(linkEl);
    }
  });

  // Load and execute page-specific scripts (e.g. contact.js, intake.js) if not loaded
  const currentScripts = Array.from(document.querySelectorAll('script[src]')).map((s) => s.getAttribute('src'));
  newDoc.querySelectorAll('script[src]').forEach((s) => {
    const src = s.getAttribute('src');
    if (src && !currentScripts.includes(src) && !src.includes('script.js')) {
      const scriptEl = document.createElement('script');
      scriptEl.src = src;
      scriptEl.defer = true;
      document.body.appendChild(scriptEl);
    }
  });

  // Update navigation links active state
  document.querySelectorAll('.nav a').forEach((link) => {
    const linkNorm = normalizePath(link.getAttribute('href') || '');
    link.classList.toggle('active', linkNorm === norm || linkNorm === altNorm);
  });

  if (pushState) {
    window.history.pushState({ path: targetUrl }, '', targetUrl);
  }

  // Scroll to anchor or top immediately
  const targetHash = new URL(targetUrl, window.location.origin).hash;
  if (targetHash) {
    const el = document.querySelector(targetHash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  } else {
    window.scrollTo(0, 0);
  }

  // Re-run page dynamic handlers
  initNav();
  initRevealObserver();
  initMiniForms();
  initLabourEstimator();
  initIntakeHandler();
  initWhatsAppWidget();
  if (typeof initContactValidation === 'function') {
    initContactValidation();
  }
}

// 8. Floating WhatsApp Widget Guarantee across all views
function initWhatsAppWidget() {
  if (document.querySelector('.whatsapp-float-widget')) return;

  const btn = document.createElement('a');
  btn.className = 'whatsapp-float-widget';
  btn.href = 'https://wa.me/254798981760?text=Hello%20Kilimonet%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.';
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.setAttribute('aria-label', 'Chat with Kilimonet on WhatsApp');
  btn.innerHTML = `
    <span class="whatsapp-float-icon-wrap">
      <svg class="whatsapp-float-icon" viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
      <span class="whatsapp-online-dot" aria-hidden="true"></span>
    </span>
    <span class="whatsapp-float-label">Chat on WhatsApp</span>
  `;
  document.body.appendChild(btn);
}

function initInstantNavigation() {
  // Store initial page in cache
  const currentNorm = normalizePath(window.location.pathname);
  pageCache.set(currentNorm, document.documentElement.outerHTML);

  // Background warm cache for all standard pages during idle
  const standardPages = [
    '/',
    '/services',
    '/services.html',
    '/technology',
    '/technology.html',
    '/about',
    '/about.html',
    '/contact',
    '/contact.html',
    '/partnerships',
    '/partnerships.html',
    '/labour',
    '/labour.html',
    '/smart-assist',
    '/smart-assist.html',
    '/intake',
    '/intake.html'
  ];

  const warmAllPages = () => {
    standardPages.forEach((p) => {
      if (normalizePath(p) !== currentNorm) {
        prefetchPage(p);
      }
    });
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(warmAllPages, { timeout: 1200 });
  } else {
    setTimeout(warmAllPages, 300);
  }

  // Pre-fetch on hover / touchstart for instant readiness
  document.addEventListener(
    'pointerover',
    (e) => {
      const link = e.target.closest('a');
      if (!link || !link.href) return;
      if (link.origin === window.location.origin && !link.hash.startsWith('#')) {
        prefetchPage(link.href);
      }
    },
    { passive: true }
  );

  document.addEventListener(
    'touchstart',
    (e) => {
      const link = e.target.closest('a');
      if (!link || !link.href) return;
      if (link.origin === window.location.origin && !link.hash.startsWith('#')) {
        prefetchPage(link.href);
      }
    },
    { passive: true }
  );

  // Intercept navigation clicks for instantaneous client transitions
  document.addEventListener('click', (e) => {
    // Allow modified clicks (Ctrl, Cmd, Shift, Alt)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) return;

    const link = e.target.closest('a');
    if (!link || !link.href) return;

    // Ignore downloads, external targets, or new tabs
    if (link.hasAttribute('download') || link.getAttribute('target') === '_blank') return;
    if (link.origin !== window.location.origin) return;

    const targetUrl = link.href;
    const urlObj = new URL(targetUrl);

    // Hash navigation on the exact same page
    if (urlObj.pathname === window.location.pathname && urlObj.hash) {
      return; // Let standard or smooth anchor scroll handle it
    }

    // If navigating to or from smart-assist, allow normal fast navigation to ensure its app state isolation
    if (urlObj.pathname.includes('smart-assist') || window.location.pathname.includes('smart-assist')) {
      return;
    }

    e.preventDefault();
    navigateToPage(targetUrl, true);
  });

  // Handle browser Back / Forward buttons instantly
  window.addEventListener('popstate', () => {
    navigateToPage(window.location.href, false);
  });
}

// Master Initialization on DOM ready
function initApp() {
  initNav();
  initHeaderScroll();
  initRevealObserver();
  initMiniForms();
  initLabourEstimator();
  initIntakeHandler();
  initWhatsAppWidget();
  initInstantNavigation();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
