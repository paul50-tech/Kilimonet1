// Kilimonet Smart Assist Module
// Service Will Be Available Soon - Early Access & Launch Notifications

function initSmartAssist() {
  const notifyForm = document.getElementById('smart-notify-form');
  const feedbackEl = document.getElementById('notify-feedback');

  if (!notifyForm || !feedbackEl) return;

  notifyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('notify-name');
    const phoneInput = document.getElementById('notify-phone');
    const countyInput = document.getElementById('notify-county');
    const roleInput = document.getElementById('notify-role');
    const notesInput = document.getElementById('notify-notes');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const county = countyInput ? countyInput.value.trim() : '';
    const role = roleInput ? roleInput.value : '';
    const notes = notesInput ? notesInput.value.trim() : '';

    if (!name || !phone || !county) {
      feedbackEl.className = 'feedback error';
      feedbackEl.textContent = 'Please fill in your name, WhatsApp phone number, and county.';
      feedbackEl.hidden = false;
      return;
    }

    // Save notification request locally
    try {
      const STORAGE_KEY = 'kilimonet_smart_assist_registrations';
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      existing.push({
        name,
        phone,
        county,
        role,
        notes,
        registeredAt: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch {
      // LocalStorage access fallback
    }

    feedbackEl.className = 'feedback success';
    feedbackEl.textContent = `Thank you, ${name}! Your registration for Kilimonet Smart Assist in ${county} has been received. You will be notified on ${phone} as soon as the service launches.`;
    feedbackEl.hidden = false;

    notifyForm.reset();
  });
}

if (typeof window !== 'undefined') {
  window.initSmartAssist = initSmartAssist;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSmartAssist);
  } else {
    initSmartAssist();
  }
}
