// Candyland Theme Portfolio JavaScript
// Pure Vanilla JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 2. Copy to Clipboard Functionality
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const textToCopy = targetElement.innerText.trim();

        // Use Clipboard API
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Berhasil disalin: ${textToCopy} 🍬`);
        }).catch(() => {
          showToast('Gagal menyalin teks! 🍬');
        });
      }
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // 3. Floating Candy Interactive Hover effect
  const candies = document.querySelectorAll('.floating-candy');
  candies.forEach(candy => {
    candy.style.cursor = 'default';
    candy.addEventListener('mouseenter', () => {
      candy.style.transform = 'scale(1.4) rotate(20deg)';
      candy.style.opacity = '0.7';
      candy.style.transition = 'transform 0.2s, opacity 0.2s';
    });
    candy.addEventListener('mouseleave', () => {
      candy.style.transform = '';
      candy.style.opacity = '0.28';
    });
  });
});
