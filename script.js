/* ============================================================
   PORTFOLIO — script.js
   "Crafted with logic. Designed with imagination."
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Page Loader ---------- */
  const loader = document.querySelector('.page-loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader?.classList.add('hidden'), 600);
  });
  // Fallback in case load already fired
  if (document.readyState === 'complete') {
    setTimeout(() => loader?.classList.add('hidden'), 600);
  }

  /* ---------- Theme Toggle (Dark Mode) ---------- */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle?.querySelector('.theme-icon');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('portfolio-theme');

  function setTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (themeIcon) themeIcon.src = dark ? 'icon-moon.png' : 'icon-n.png';
    localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
  }

  // Initialize theme
  if (savedTheme) {
    setTheme(savedTheme === 'dark');
  } else {
    setTheme(prefersDark);
  }

  themeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(!isDark);
  });

  /* ---------- Navbar Scroll Effect ---------- */
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  function handleNavScroll() {
    const scrollY = window.scrollY;
    navbar?.classList.toggle('scrolled', scrollY > 50);

    // Active section highlight
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (scrollY >= top) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ---------- Mobile Navigation ---------- */
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const mobileNav = document.querySelector('.nav-links');

  mobileToggle?.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle?.classList.remove('active');
      mobileNav?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ---------- Scroll Reveal ---------- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---------- Animated Counters ---------- */
  const counters = document.querySelectorAll('[data-counter]');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => counterObserver.observe(el));

  /* ---------- Parallax Floating Shapes ---------- */
  const floatingShapes = document.querySelectorAll('.floating-shape');
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animateParallax() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    floatingShapes.forEach((shape, i) => {
      const speed = (i + 1) * 12;
      const x = currentX * speed;
      const y = currentY * speed;
      shape.style.transform = `translate(${x}px, ${y}px)`;
    });

    requestAnimationFrame(animateParallax);
  }

  // Only run parallax on desktop
  if (window.matchMedia('(min-width: 768px)').matches) {
    animateParallax();
  }

  /* ---------- Cursor Glow ---------- */
  const cursorGlow = document.querySelector('.cursor-glow');

  if (cursorGlow && window.matchMedia('(min-width: 768px)').matches) {
    let glowX = 0, glowY = 0;
    let targetGlowX = 0, targetGlowY = 0;

    document.addEventListener('mousemove', e => {
      targetGlowX = e.clientX;
      targetGlowY = e.clientY;
      cursorGlow.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('active');
    });

    function updateGlow() {
      glowX += (targetGlowX - glowX) * 0.08;
      glowY += (targetGlowY - glowY) * 0.08;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(updateGlow);
    }

    updateGlow();
  }

  /* ---------- Progress Bar ---------- */
  const progressBar = document.querySelector('.progress-bar');

  function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateProgressBar, { passive: true });
  updateProgressBar();

  /* ---------- Back to Top ---------- */
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    backToTop?.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Tilt Effect on Cards ---------- */
  const tiltCards = document.querySelectorAll('.project-card, .skill-card');

  if (window.matchMedia('(min-width: 768px)').matches) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ---------- Typing Effect (Hero) ---------- */
  const typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    const words = [
      'building responsive websites',
      'designing thoughtful interfaces',
      'writing poetry & fiction',
      'learning modern web development'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typingEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    setTimeout(typeEffect, 1200);
  }

  /* ---------- Contact Form (Demo) ---------- */
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Message Sent! ✨';
    btn.style.background = '#6ee7b7';
    btn.style.color = '#0f172a';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.color = '';
      contactForm.reset();
    }, 3000);
  });

  /* ---------- Scroll-triggered Section Parallax ---------- */
  function sectionParallax() {
    const scrollY = window.scrollY;
    document.querySelectorAll('.parallax-bg').forEach(el => {
      const speed = parseFloat(el.dataset.speed) || 0.3;
      const rect = el.parentElement.getBoundingClientRect();
      const offset = rect.top * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  }

  window.addEventListener('scroll', sectionParallax, { passive: true });
});