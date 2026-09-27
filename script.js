/**
 * Mu Theta Lambda Alumni Chapter
 * Interactive Client Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initCounters();
  initLineageTabs();
  initMobileMenu();
  setupModalTriggers();
});

/* ==========================================================================
   STICKY HEADER BEHAVIOR
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   IMPACT STATS ANIMATED COUNTERS
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let hasRun = false;

  const runCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutExpo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = Math.floor(easeProgress * target);
        
        counter.textContent = currentVal.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasRun) {
        hasRun = true;
        runCounters();
      }
    });
  }, { threshold: 0.25 });

  const impactSection = document.getElementById('impact');
  if (impactSection) {
    observer.observe(impactSection);
  }
}

/* ==========================================================================
   LINEAGE & LEADERSHIP TABS
   ========================================================================== */
function initLineageTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-content-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      // Update button active states
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update panel visibility
      panels.forEach(p => {
        p.classList.remove('active');
      });

      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   MOBILE NAVIGATION DRAWER CONTROLLER
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggle || !drawer) return;

  const toggleMenu = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  toggle.addEventListener('click', toggleMenu);

  links.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close mobile drawer on desktop resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1080 && drawer.classList.contains('open')) {
      closeMobileMenu();
    }
  });
}

window.openMobileMenu = function() {
  const toggle = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  if (!toggle || !drawer) return;

  drawer.classList.add('open');
  toggle.classList.add('active');
  toggle.setAttribute('aria-expanded', 'true');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeMobileMenu = function() {
  const toggle = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  if (!toggle || !drawer) return;

  drawer.classList.remove('open');
  toggle.classList.remove('active');
  toggle.setAttribute('aria-expanded', 'false');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

/* ==========================================================================
   MODAL DIALOG CONTROLLER
   ========================================================================== */
function setupModalTriggers() {
  // Bind Header buttons
  const loginBtn = document.getElementById('openLoginBtn');
  if (loginBtn) loginBtn.addEventListener('click', () => openModal('modalLogin'));

  const duesBtn = document.getElementById('openPayDuesBtn');
  if (duesBtn) duesBtn.addEventListener('click', () => openModal('modalDues'));

  const scholBtn = document.getElementById('openScholarshipBtn');
  if (scholBtn) scholBtn.addEventListener('click', () => openModal('modalScholarship'));

  // Close modals on clicking outside window
  const backdrops = document.querySelectorAll('.modal-backdrop');
  backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      backdrops.forEach(backdrop => {
        backdrop.classList.remove('open');
      });
      document.body.style.overflow = '';
    }
  });
}

window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
};

/* ==========================================================================
   DUES TIER CALCULATOR LOGIC
   ========================================================================== */
window.selectDuesTier = function(el, tierType, amount) {
  document.querySelectorAll('.tier-option').forEach(opt => opt.classList.remove('selected'));
  el.classList.add('selected');

  const breakdownLocal = document.getElementById('breakdownLocal');
  const breakdownNational = document.getElementById('breakdownNational');
  const breakdownTotal = document.getElementById('breakdownTotal');
  const btnPayAmount = document.getElementById('btnPayAmount');

  let local = 180;
  let nat = 170;

  if (tierType === 'life') {
    local = 200;
    nat = 0; // National Per Capita is exempt for Life Members
  } else if (tierType === 'senior') {
    local = 110;
    nat = 25;
  } else if (tierType === 'reclaim') {
    local = 150;
    nat = 125;
  }

  if (breakdownLocal) breakdownLocal.textContent = `$${local.toFixed(2)}`;
  if (breakdownNational) breakdownNational.textContent = `$${nat.toFixed(2)}`;
  if (breakdownTotal) breakdownTotal.textContent = `$${amount.toFixed(2)}`;
  if (btnPayAmount) btnPayAmount.textContent = `$${amount.toFixed(2)}`;
};

/* ==========================================================================
   FORM HANDLERS & TOAST FEEDBACK
   ========================================================================== */
window.handleLoginSubmit = function(e) {
  e.preventDefault();
  closeModal('modalLogin');
  showToast("Brother authenticated. Redirecting to Executive Intranet...");
};

window.handleDuesPayment = function(e) {
  e.preventDefault();
  closeModal('modalDues');
  showToast("Dues payment verified! Official electronic remittance receipt dispatched.");
};

window.handleScholarshipSubmit = function(e) {
  e.preventDefault();
  closeModal('modalScholarship');
  showToast("Scholarship portfolio successfully received by the Educational Foundation committee.");
};

window.handleGalaReserve = function(e) {
  e.preventDefault();
  closeModal('modalGala');
  showToast("Gala reservation confirmed! Digital ticket badges sent to your email.");
};

window.handleContactSubmit = function(e) {
  e.preventDefault();
  const form = document.getElementById('chapterContactForm');
  if (form) form.reset();
  showToast("Your dispatch has been delivered to the Chapter Executive Secretary.");
};

window.downloadFlyer = function(eventName) {
  showToast(`Downloading official event packet for ${eventName.replace(/_/g, ' ')}...`);
};

function showToast(message) {
  const toast = document.getElementById('toastNotice');
  const msgSpan = document.getElementById('toastMessage');
  if (!toast || !msgSpan) return;

  msgSpan.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4200);
}
