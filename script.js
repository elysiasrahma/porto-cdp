/**
 * Portfolio Backend Developer - Vanilla JavaScript Logic
 * Includes: Sticky Navbar, Mobile Nav, IntersectionObserver active links,
 * Back to Top button, and Interactive Email Simulation Modal with Toast Notification.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Sticky Background Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Active Nav Link on Scroll (Intersection Observer)
  const sections = document.querySelectorAll('header[id], section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${currentId}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // 4. Back To Top Button
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 5. Simulation Email Modal Logic
  const emailModalOverlay = document.getElementById('emailModalOverlay');
  const openEmailModalBtn = document.getElementById('openEmailModalBtn');
  const closeEmailModalBtn = document.getElementById('closeEmailModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const simEmailForm = document.getElementById('simEmailForm');
  const simToast = document.getElementById('simToast');
  const toastMessage = document.getElementById('toastMessage');

  const openModal = () => {
    if (emailModalOverlay) {
      emailModalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (emailModalOverlay) {
      emailModalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (openEmailModalBtn) openEmailModalBtn.addEventListener('click', openModal);
  if (closeEmailModalBtn) closeEmailModalBtn.addEventListener('click', closeModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside of modal container
  if (emailModalOverlay) {
    emailModalOverlay.addEventListener('click', (e) => {
      if (e.target === emailModalOverlay) {
        closeModal();
      }
    });
  }

  // Handle ESC key to close modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && emailModalOverlay && emailModalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Form Submission Simulation
  if (simEmailForm) {
    simEmailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderName = document.getElementById('senderName').value.trim();
      
      closeModal();
      simEmailForm.reset();

      // Show toast notification
      if (toastMessage && simToast) {
        toastMessage.textContent = `Simulasi email dari ${senderName || 'Pengunjung'} berhasil dikirim!`;
        simToast.classList.add('show');

        setTimeout(() => {
          simToast.classList.remove('show');
        }, 4200);
      }
    });
  }
});
