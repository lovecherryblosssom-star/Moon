/* ============================================================
   PORTFOLIO — script.js
   "Crafted with logic. Designed with imagination."

   Numbered sections match style.css where relevant.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. PAGE LOADER
     ---------------------------------------------------------- */
  const loader = document.querySelector('.page-loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader?.classList.add('hidden'), 600);
  });
  if (document.readyState === 'complete') {
    setTimeout(() => loader?.classList.add('hidden'), 600);
  }

  /* ----------------------------------------------------------
     2. THEME TOGGLE
     ---------------------------------------------------------- */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle?.querySelector('.theme-icon');
  const htmlEl = document.documentElement;

  function setTheme(dark) {
    htmlEl.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (themeIcon) themeIcon.textContent = dark ? '☀️' : '🌙';
    localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
  }

  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

  themeToggle?.addEventListener('click', () => {
    setTheme(htmlEl.getAttribute('data-theme') !== 'dark');
  });

  /* ----------------------------------------------------------
     3. SCROLL PROGRESS BAR + NAVBAR SCROLLED STATE + BACK TO TOP
     ---------------------------------------------------------- */
  const progressBar = document.querySelector('.progress-bar');
  const navbar = document.getElementById('navbar');
  const backToTop = document.querySelector('.back-to-top');

  function handleScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) progressBar.style.width = progress + '%';
    navbar?.classList.toggle('scrolled', scrollTop > 40);
    backToTop?.classList.toggle('visible', scrollTop > 500);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ----------------------------------------------------------
     4. MOBILE NAVIGATION
     ---------------------------------------------------------- */
  const mobileToggle = document.getElementById('nav-mobile-toggle');
  const navLinksWrap = document.getElementById('nav-links');

  mobileToggle?.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinksWrap?.classList.toggle('active');
  });

  document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle?.classList.remove('active');
      navLinksWrap?.classList.remove('active');
    });
  });

  /* ----------------------------------------------------------
     5. ACTIVE NAV LINK ON SCROLL
     ---------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('#nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinkEls.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' });

  sections.forEach(section => sectionObserver.observe(section));

  /* ----------------------------------------------------------
     6. SCROLL REVEAL
     ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ----------------------------------------------------------
     7. CURSOR GLOW (desktop only)
     ---------------------------------------------------------- */
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow && window.matchMedia('(min-width: 768px)').matches) {
    let glowX = 0, glowY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      cursorGlow.classList.add('active');
    });
    document.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));

    function animateGlow() {
      glowX += (targetX - glowX) * 0.08;
      glowY += (targetY - glowY) * 0.08;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    requestAnimationFrame(animateGlow);
  }

  /* ----------------------------------------------------------
     8. HERO TYPING EFFECT
     Cycles the word after "Currently a " in the hero description.
     ---------------------------------------------------------- */
  const typingEl = document.querySelector('.typing-text');
  const typingWords = [
    'front-end developer',
    'UI/UX enthusiast',
    'creative writer',
    'lifelong learner'
  ];

  if (typingEl) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = typingWords[wordIndex];
      let speed = isDeleting ? 35 : 70;

      if (isDeleting) {
        typingEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        speed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        speed = 400;
      }

      setTimeout(typeEffect, speed);
    }
    typeEffect();
  }

  /* ----------------------------------------------------------
     9. ANIMATED COUNTERS
     Matches elements with data-counter="N" data-suffix="...".
     The "Student" stat has no data-counter, so it's skipped safely.
     ---------------------------------------------------------- */
  const counters = document.querySelectorAll('[data-counter]');

  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    if (Number.isNaN(target)) return;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutQuart(progress);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  /* ----------------------------------------------------------
     10. SKILL CARD + PROJECT CARD TILT
     A subtle 3D tilt that follows the cursor, only on desktop.
     Used for both the "My Toolkit" cards and the project cards.
     ---------------------------------------------------------- */
  if (window.matchMedia('(min-width: 1024px)').matches) {
    const tiltCards = document.querySelectorAll('.project-card, .skill-card');

    tiltCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'box-shadow var(--transition)';
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform =
          `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s ease, box-shadow var(--transition)';
        card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  /* ----------------------------------------------------------
     11. CONTACT FORM (front-end only demo)
     ---------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Message Sent! ✨';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      contactForm.reset();
    }, 2500);
  });

});