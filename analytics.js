/**
 * Kilimonet Integrated Agrisystems - Web Analytics & Conversion Tracking Engine
 * Provides dual-layer tracking:
 * 1. Google Analytics 4 (GA4) integration with single-page app (SPA) support.
 * 2. Privacy-first local diagnostics telemetry log (stored in localStorage) for auditing conversions.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'kilimonet_analytics_events';
  const MAX_LOG_SIZE = 100;

  // Internal state
  let gaMeasurementId = window.GA_MEASUREMENT_ID || '';
  let gaInitialized = false;

  // Check meta tag for GA ID if not set on window
  if (!gaMeasurementId) {
    const metaTag = document.querySelector('meta[name="ga-measurement-id"]');
    if (metaTag && metaTag.content) {
      gaMeasurementId = metaTag.content.trim();
    }
  }

  // Safe local event logger for telemetry & verification
  function logLocalEvent(eventName, params) {
    try {
      const entry = {
        name: eventName,
        params: params || {},
        url: window.location.pathname + window.location.search,
        timestamp: new Date().toISOString()
      };

      const existingRaw = localStorage.getItem(STORAGE_KEY);
      const log = existingRaw ? JSON.parse(existingRaw) : [];
      log.unshift(entry);
      if (log.length > MAX_LOG_SIZE) {
        log.length = MAX_LOG_SIZE;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(log));

      // Helpful development log
      if (window.location.hostname === 'localhost' || window.location.hostname.includes('run.app')) {
        console.log(`[Kilimonet Analytics] Event: ${eventName}`, params);
      }
    } catch (e) {
      // Storage access may be restricted in private browsing
    }
  }

  // Initialize GA4
  function initGA4(id) {
    if (gaInitialized || !id || !/^G-[A-Za-z0-9]+$/.test(id)) {
      return;
    }

    gaMeasurementId = id;
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', id, {
      send_page_view: false // Managed manually for SPA speed
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(script);

    gaInitialized = true;
    window._gaInitialized = true;
    console.log(`[Kilimonet Analytics] GA4 initialized with ID: ${id}`);

    // Send initial page view
    trackPageView(window.location.pathname, document.title);
  }

  // Public Track Event API
  function trackEvent(eventName, params = {}) {
    const enrichedParams = {
      page_path: window.location.pathname,
      page_title: document.title,
      ...params
    };

    if (gaInitialized && typeof window.gtag === 'function') {
      window.gtag('event', eventName, enrichedParams);
    }

    logLocalEvent(eventName, enrichedParams);
  }

  // Public Track Page View API (called on load & SPA DOM transitions)
  function trackPageView(pagePath, pageTitle) {
    const path = pagePath || window.location.pathname;
    const title = pageTitle || document.title;

    if (gaInitialized && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: title,
        page_location: window.location.href
      });
    }

    logLocalEvent('page_view', { page_path: path, page_title: title });
  }

  // Expose APIs globally
  window.trackEvent = trackEvent;
  window.trackPageView = trackPageView;
  window.initGA4 = initGA4;
  window.getAnalyticsLog = function () {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  };
  window.clearAnalyticsLog = function () {
    localStorage.removeItem(STORAGE_KEY);
    console.log('[Kilimonet Analytics] Event log cleared.');
  };

  // Helper to determine the section a link belongs to
  function getElementSection(el) {
    const section = el.closest('section, footer, header, article');
    if (!section) return 'body';
    return section.id || section.className || section.tagName.toLowerCase();
  }

  // Delegated click tracking for WhatsApp, Phone, Email, and CTAs
  document.addEventListener('click', function (e) {
    const targetLink = e.target.closest('a');
    if (!targetLink) return;

    const href = targetLink.getAttribute('href') || '';
    const section = getElementSection(targetLink);
    const linkText = targetLink.innerText.trim();

    // 1. WhatsApp Clicks
    if (href.includes('wa.me') || href.includes('whatsapp.com') || targetLink.classList.contains('whatsapp-float') || targetLink.id === 'whatsapp-float') {
      trackEvent('conversion_whatsapp_click', {
        href: href,
        section: section,
        label: linkText || 'Floating WhatsApp Widget'
      });
      return;
    }

    // 2. Phone Call Clicks
    if (href.startsWith('tel:')) {
      trackEvent('conversion_phone_click', {
        phone_number: href.replace('tel:', ''),
        section: section,
        label: linkText
      });
      return;
    }

    // 3. Email Inquiries
    if (href.startsWith('mailto:')) {
      trackEvent('conversion_email_click', {
        email: href.replace('mailto:', ''),
        section: section,
        label: linkText
      });
      return;
    }

    // 4. Primary CTA Inquiries (Start Intake, etc.)
    if (href === 'intake.html' || href === '/intake' || href.endsWith('/intake.html')) {
      trackEvent('cta_start_intake_click', {
        section: section,
        label: linkText
      });
      return;
    }

    // 5. Smart Assist CTA
    if (href === 'smart-assist.html' || href === '/smart-assist' || href.endsWith('/smart-assist.html')) {
      trackEvent('cta_smart_assist_click', {
        section: section,
        label: linkText
      });
      return;
    }
  });

  // Form submission conversion tracking
  document.addEventListener('submit', function (e) {
    const form = e.target;
    if (!form || form.tagName !== 'FORM') return;

    const formId = form.id || '';
    const formClass = form.className || '';

    if (formId === 'contact-form') {
      trackEvent('conversion_contact_form_submit', {
        form_id: 'contact-form',
        service_interest: form.querySelector('[name="service_interest"]')?.value || '',
        county: form.querySelector('[name="county"]')?.value || ''
      });
    } else if (formId === 'project-intake-form') {
      trackEvent('conversion_intake_submit', {
        form_id: 'project-intake-form',
        interest: form.querySelector('[name="interest"]')?.value || '',
        farm_type: form.querySelector('[name="farm_type"]')?.value || '',
        county: form.querySelector('[name="county_sub_county"]')?.value || ''
      });
    } else if (formId === 'diagnosis-form') {
      trackEvent('tool_crop_diagnosis_submit', {
        crop_type: form.querySelector('[name="crop_type"]')?.value || 'unspecified',
        location: form.querySelector('[name="location"]')?.value || ''
      });
    } else if (formId === 'consultation-form') {
      trackEvent('conversion_specialist_consult_submit', {
        consult_mode: document.getElementById('consult-mode')?.value || ''
      });
    } else if (formClass.includes('mini')) {
      trackEvent('conversion_quick_inquiry_submit', {
        page: window.location.pathname,
        service: form.querySelector('[name="service_needed"]')?.value || form.querySelector('[name="labour_type"]')?.value || 'general'
      });
    }
  });

  // Track scroll depth milestones (50% and 90%)
  let tracked50 = false;
  let tracked90 = false;

  window.addEventListener('scroll', function () {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    const progress = (window.scrollY / scrollHeight) * 100;

    if (progress >= 50 && !tracked50) {
      tracked50 = true;
      trackEvent('scroll_depth', { depth: '50%' });
    }
    if (progress >= 90 && !tracked90) {
      tracked90 = true;
      trackEvent('scroll_depth', { depth: '90%' });
    }
  }, { passive: true });

  // Reset scroll milestones on SPA navigation
  window.addEventListener('kilimonet:navigated', function () {
    tracked50 = false;
    tracked90 = false;
  });

  // Fetch server-provided config if GA ID was not pre-embedded in HTML
  if (gaMeasurementId) {
    initGA4(gaMeasurementId);
  } else {
    // Attempt to load from /api/config
    fetch('/api/config')
      .then((res) => (res.ok ? res.json() : null))
      .then((config) => {
        if (config && config.gaMeasurementId) {
          initGA4(config.gaMeasurementId);
        } else {
          // Send initial telemetry page_view even when running in preview/standalone
          trackPageView(window.location.pathname, document.title);
        }
      })
      .catch(() => {
        // Fallback for purely static environments
        trackPageView(window.location.pathname, document.title);
      });
  }
})();
