/* ============================================================
   PORTFOLIO — script.js
   "Crafted with logic. Designed with imagination."

   Everything runs inside one DOMContentLoaded listener so the
   page's elements are guaranteed to exist before we query them.
   Sections are numbered to match the CSS file's structure.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. PAGE LOADER
     Hides the loading screen shortly after everything has loaded.
     ---------------------------------------------------------- */
  const loader = document.querySelector('.page-loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader?.classList.add('hidden'), 500);
  });
  // Fallback: if the load event already fired before this script ran
  if (document.readyState === 'complete') {
    setTimeout(() => loader?.classList.add('hidden'), 500);
  }

  /* ----------------------------------------------------------
     2. THEME TOGGLE (light / dark)
     Reads/writes localStorage so the choice persists on reload.
     ---------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  }

  themeToggle?.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ----------------------------------------------------------
     3. SCROLL PROGRESS BAR + NAVBAR SCROLLED STATE
     One scroll listener handles both, so we're not attaching
     multiple listeners that all read/write layout separately.
     ---------------------------------------------------------- */
  const progressBar = document.querySelector('.progress-bar');
  const navbar = document.querySelector('.navbar');
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
  handleScroll(); // run once on load in case the page opens mid-scroll

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ----------------------------------------------------------
     4. MOBILE NAVIGATION
     ---------------------------------------------------------- */
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const navLinksWrap = document.querySelector('.nav-links');

  mobileToggle?.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinksWrap?.classList.toggle('open');
  });

  // Close the mobile menu whenever a nav link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle?.classList.remove('active');
      navLinksWrap?.classList.remove('open');
    });
  });

  /* ----------------------------------------------------------
     5. ACTIVE NAV LINK ON SCROLL
     Uses IntersectionObserver instead of manual scroll math.
     ---------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-links a');

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
     Any element with class="reveal" fades/slides in once.
     ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target); // only animate once
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ----------------------------------------------------------
     7. HERO TYPING EFFECT
     Cycles through a list of roles in the hero tagline.
     ---------------------------------------------------------- */
  const typingEl = document.querySelector('.typing-text');
  const typingWords = [
    'building responsive websites',
    'designing thoughtful interfaces',
    'writing poetry & fiction',
    'learning modern web development'
  ];

  if (typingEl) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = typingWords[wordIndex];
      let typeSpeed = isDeleting ? 40 : 80;

      if (isDeleting) {
        typingEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1800; // pause at the end of the word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        typeSpeed = 400;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
  }

  /* ----------------------------------------------------------
     8. ANIMATED STAT COUNTERS
     Elements need: class="stat-number" data-target="27"
     ---------------------------------------------------------- */
  const counters = document.querySelectorAll('[data-target]');

  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
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
     9. TESTIMONIAL SLIDER
     ---------------------------------------------------------- */
  const track = document.querySelector('.testimonials-slides');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  let autoSlideTimer;

  function goToSlide(index) {
    const totalSlides = dots.length;
    currentSlide = (index + totalSlides) % totalSlides; // wraps around both ways
    if (track) track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  }

  function startAutoSlide() {
    autoSlideTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
  }
  function stopAutoSlide() {
    clearInterval(autoSlideTimer);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.getAttribute('data-index'), 10));
      stopAutoSlide();
      startAutoSlide();
    });
  });

  if (track && dots.length) {
    startAutoSlide();
    const wrapper = document.querySelector('.testimonials-wrapper');
    wrapper?.addEventListener('mouseenter', stopAutoSlide);
    wrapper?.addEventListener('mouseleave', startAutoSlide);
  }

  /* ----------------------------------------------------------
     10. CONTACT FORM (front-end only demo — no server yet)
     ---------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Message sent ✓';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      contactForm.reset();
    }, 2500);
  });

});