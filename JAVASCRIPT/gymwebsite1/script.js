/* ============================================
   KHAGAUL FITNESS CLUB - Premium JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Mouse Spotlight Effect ---
  const spotlight = document.querySelector('.mouse-spotlight');
  let mouseX = 0, mouseY = 0;
  let spotlightX = 0, spotlightY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    spotlight.classList.add('active');
  });

  document.addEventListener('mouseleave', () => {
    spotlight.classList.remove('active');
  });

  function animateSpotlight() {
    spotlightX += (mouseX - spotlightX) * 0.08;
    spotlightY += (mouseY - spotlightY) * 0.08;
    spotlight.style.left = spotlightX + 'px';
    spotlight.style.top = spotlightY + 'px';
    requestAnimationFrame(animateSpotlight);
  }
  animateSpotlight();

  // --- Navbar Scroll Effect ---
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Magnetic Buttons ---
  const magneticButtons = document.querySelectorAll('.btn-magnetic');

  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const strength = 0.3;
      btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.1s ease';
    });
  });

  // --- Intersection Observer for Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Don't unobserve - keep for re-entry if needed
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Gallery Lightbox ---
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (lightbox && lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Close lightbox with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      // Also close mobile menu
      if (menuToggle) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  // --- Smooth Scroll for Nav Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Contact Form Handling ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit');
      const originalText = btn.textContent;
      btn.textContent = 'Message Sent! ✓';
      btn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // --- Parallax subtle effect on hero ---
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(${1 + scrolled * 0.0002}) translateY(${scrolled * 0.15}px)`;
      }
    }, { passive: true });
  }

  // --- Service cards subtle glow on hover ---
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255, 59, 48, 0.06) 0%, rgba(255, 255, 255, 0.05) 54%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = 'rgba(255, 255, 255, 0.05)';
    });
  });

  // --- Year in footer ---
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = '2026';
  }
});
