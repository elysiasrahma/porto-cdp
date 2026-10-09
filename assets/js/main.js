/**
 * ==============================================================================
 * PORTFOLIO APPLICATION RUNTIME LOGIC (main.js)
 * Architecture: Event-driven UI Controller & Observer Pattern
 * Zero NPM dependencies - pure Vanilla JavaScript
 * ==============================================================================
 */

(function () {
  'use strict';

  // State & Configuration Registry
  const CONFIG = {
    scrollThresholdNav: 40,
    scrollThresholdBackToTop: 400,
    observerMargin: '-30% 0px -60% 0px',
    toastDurationMs: 4200
  };

  /**
   * 1. Navigation Controller
   * Manages sticky navbar elevation and dynamic backdrop styling.
   */
  const initNavbarController = () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const handleScroll = () => {
      if (window.scrollY > CONFIG.scrollThresholdNav) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  };

  /**
   * 2. Mobile Drawer Navigation Controller
   * Handles accessibility aria attributes and toggle transitions.
   */
  const initMobileNavigation = () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    if (!mobileMenuBtn || !navLinks) return;

    const toggleMenu = (forceState) => {
      const isCurrentlyOpen = navLinks.classList.contains('open');
      const shouldOpen = typeof forceState === 'boolean' ? forceState : !isCurrentlyOpen;

      if (shouldOpen) {
        navLinks.classList.add('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      } else {
        navLinks.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    };

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when navigating to anchor
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close when clicking outside of navbar
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        toggleMenu(false);
      }
    });
  };

  /**
   * 3. Section Scroll Spy (Intersection Observer)
   * High performance section visibility tracker for active navigation pills.
   */
  const initScrollSpy = () => {
    const sections = document.querySelectorAll('header[id], section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    if (!sections.length || !navItems.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navItems.forEach((item) => {
            if (item.getAttribute('href') === `#${currentId}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, {
      root: null,
      rootMargin: CONFIG.observerMargin,
      threshold: 0
    });

    sections.forEach((section) => observer.observe(section));
  };

  /**
   * 4. Back To Top Floating Action Button Controller
   */
  const initBackToTop = () => {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    const toggleVisibility = () => {
      if (window.scrollY > CONFIG.scrollThresholdBackToTop) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  /**
   * 5. Email Simulation Modal & Toast Notification
   * Provides recruiter communication simulation without external backend overhead.
   */
  const initEmailSimulationModal = () => {
    const modalOverlay = document.getElementById('emailModalOverlay');
    const openBtn = document.getElementById('openEmailModalBtn');
    const closeBtn = document.getElementById('closeEmailModalBtn');
    const cancelBtn = document.getElementById('cancelModalBtn');
    const form = document.getElementById('simEmailForm');
    const toast = document.getElementById('simToast');
    const toastMessage = document.getElementById('toastMessage');

    if (!modalOverlay || !openBtn || !form) return;

    let toastTimer = null;

    const openModal = () => {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      const firstInput = form.querySelector('input');
      if (firstInput) firstInput.focus();
    };

    const closeModal = () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    const showToast = (message) => {
      if (!toast || !toastMessage) return;
      toastMessage.textContent = message;
      toast.classList.add('show');

      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, CONFIG.toastDurationMs);
    };

    openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    // Click backdrop to close
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    // Keyboard accessibility: ESC key to close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });

    // Simulated form submission event handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderInput = document.getElementById('senderName');
      const senderName = senderInput ? senderInput.value.trim() : 'Recruiter';

      closeModal();
      form.reset();
      showToast(`Simulasi email dari ${senderName} berhasil dikirim!`);
    });
  };

  // Initialize all controllers after DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initNavbarController();
    initMobileNavigation();
    initScrollSpy();
    initBackToTop();
    initEmailSimulationModal();
  });
})();
