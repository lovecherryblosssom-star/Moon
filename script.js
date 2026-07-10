/* ============================================================
   Portfolio – Main Script
   Production-quality vanilla JavaScript
   PORTFOLIO — script.js
   "Crafted with logic. Designed with imagination."
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // =============================================
  // 1. Loading Screen
  // =============================================
  /* ---------- Page Loader ---------- */
  const loader = document.querySelector('.page-loader');
  window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.body.classList.remove('loading');
    }, 800);
    setTimeout(() => loader?.classList.add('hidden'), 600);
  });
  // Fallback in case load already fired
  if (document.readyState === 'complete') {
    setTimeout(() => loader?.classList.add('hidden'), 600);
  }
  // =============================================
  // 2. Custom Cursor
  // =============================================
  const cursor = document.getElementById('cursor');
  /* ---------- Theme Toggle (Dark Mode) ---------- */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle?.querySelector('.theme-icon');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  function setTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (themeIcon) themeIcon.textContent = dark ? '☀️' : '🌙';
    localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
  }
    const hoverTargets = document.querySelectorAll(
      'a, button, .project-card, .skill-card, .writing-card, ' +
      '.testimonial-dot, .social-link, input, textarea'
    );
    hoverTargets.forEach(target => {
      target.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      target.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
  // Initialize theme
  if (savedTheme) {
    setTheme(savedTheme === 'dark');
  } else {
    cursor.style.display = 'none';
    setTheme(prefersDark);
  }
  // =============================================
  // 3. Scroll Progress Bar
  // =============================================
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
  themeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(!isDark);
  });
  // =============================================
  // 4. Navigation
  // =============================================
  const nav = document.getElementById('nav');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  /* ---------- Navbar Scroll Effect ---------- */
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  // Scrolled state — add backdrop blur & shadow after 50 px
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  function handleNavScroll() {
    const scrollY = window.scrollY;
    navbar?.classList.toggle('scrolled', scrollY > 50);
  // Mobile hamburger toggle
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
    // Active section highlight
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (scrollY >= top) current = section.getAttribute('id');
    });
  // Close mobile menu when any link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });
  }
  // Highlight the active nav link as the user scrolls
  const sections = document.querySelectorAll('section[id]');
  const navLinkElements = navLinks.querySelectorAll('a');
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinkElements.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
  );
  /* ---------- Mobile Navigation ---------- */
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const mobileNav = document.querySelector('.nav-links');
  sections.forEach(section => sectionObserver.observe(section));
  mobileToggle?.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  // =============================================
  // 5. Theme Toggle (Light / Dark)
  // =============================================
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const sunIcon = themeToggle.querySelector('.sun-icon');
  const moonIcon = themeToggle.querySelector('.moon-icon');
  // Close mobile nav on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle?.classList.remove('active');
      mobileNav?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  }
  // Restore saved preference, or honour system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    setTheme('dark');
  }
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
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
  // =============================================
  // 6. Scroll Reveal (IntersectionObserver)
  // =============================================
  /* ---------- Scroll Reveal ---------- */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );
  revealElements.forEach(el => revealObserver.observe(el));
  // =============================================
  // 7. Typing Effect
  // =============================================
  const typingElement = document.getElementById('typingText');
  const typingStrings = [
    'Front-End Web Developer',
    'Creative Writer',
    'UI Enthusiast',
    'Lifelong Learner'
  ];
  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 60;
  /* ---------- Animated Counters ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  function typeEffect() {
    const currentString = typingStrings[stringIndex];
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = performance.now();
    if (isDeleting) {
      typingElement.textContent = currentString.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 30;
    } else {
      typingElement.textContent = currentString.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 60;
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    // Pause at the end of the string, then begin deleting
    if (!isDeleting && charIndex === currentString.length) {
      typingDelay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      stringIndex = (stringIndex + 1) % typingStrings.length;
      typingDelay = 500;
    }
    setTimeout(typeEffect, typingDelay);
    requestAnimationFrame(update);
  }
  typeEffect();
  // =============================================
  // 8. Skill Bar Animation
  // =============================================
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver(
    (entries) => {
  const counterObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width');
          entry.target.style.width = width + '%';
          skillObserver.unobserve(entry.target);
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  skillBars.forEach(bar => skillObserver.observe(bar));
  counters.forEach(el => counterObserver.observe(el));
  // =============================================
  // 9. Animated Counters
  // =============================================
  const counters = document.querySelectorAll('.counter');
  /* ---------- Parallax Floating Shapes ---------- */
  const floatingShapes = document.querySelectorAll('.floating-shape');
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'));
          const duration = 2000;
          const startTime = performance.now();
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });
          function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
          }
  function animateParallax() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;
          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = Math.round(easedProgress * target);
            counter.textContent = current;
    floatingShapes.forEach((shape, i) => {
      const speed = (i + 1) * 12;
      const x = currentX * speed;
      const y = currentY * speed;
      shape.style.transform = `translate(${x}px, ${y}px)`;
    });
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          }
    requestAnimationFrame(animateParallax);
  }
          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );
  // Only run parallax on desktop
  if (window.matchMedia('(min-width: 768px)').matches) {
    animateParallax();
  }
  counters.forEach(counter => counterObserver.observe(counter));
  /* ---------- Cursor Glow ---------- */
  const cursorGlow = document.querySelector('.cursor-glow');
  // =============================================
  // 10. Mouse Parallax Effect
  // =============================================
  const heroContainer = document.querySelector('[data-parallax]');
  if (cursorGlow && window.matchMedia('(min-width: 768px)').matches) {
    let glowX = 0, glowY = 0;
    let targetGlowX = 0, targetGlowY = 0;
  if (heroContainer && window.innerWidth > 1024) {
    const heroContent = heroContainer.querySelector('.hero-content');
    const heroVisual = heroContainer.querySelector('.hero-visual');
    heroContainer.addEventListener('mousemove', (e) => {
      const rect = heroContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      if (heroContent) {
        heroContent.style.transform = `translate(${-x * 15}px, ${-y * 10}px)`;
      }
      if (heroVisual) {
        heroVisual.style.transform = `translate(${x * 10}px, ${y * 8}px)`;
      }
    document.addEventListener('mousemove', e => {
      targetGlowX = e.clientX;
      targetGlowY = e.clientY;
      cursorGlow.classList.add('active');
    });
    heroContainer.addEventListener('mouseleave', () => {
      if (heroContent) heroContent.style.transform = 'translate(0, 0)';
      if (heroVisual) heroVisual.style.transform = 'translate(0, 0)';
    document.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('active');
    });
  }
  // =============================================
  // 11. Tilt Effect on Project Cards
  // =============================================
  if (window.innerWidth > 1024) {
    const tiltCards = document.querySelectorAll('[data-tilt]');
    function updateGlow() {
      glowX += (targetGlowX - glowX) * 0.08;
      glowY += (targetGlowY - glowY) * 0.08;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(updateGlow);
    }
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (y - 0.5) * 5;
        const tiltY = (x - 0.5) * -5;
    updateGlow();
  }
        card.style.transform =
          `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
      });
  /* ---------- Progress Bar ---------- */
  const progressBar = document.querySelector('.progress-bar');
      card.addEventListener('mouseleave', () => {
        card.style.transform =
          'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        card.style.transition = 'transform 0.5s ease';
      });
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
      });
    });
  function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + '%';
  }
  // =============================================
  // 12. Button Ripple Effect
  // =============================================
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
  window.addEventListener('scroll', updateProgressBar, { passive: true });
  updateProgressBar();
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
  /* ---------- Back to Top ---------- */
  const backToTop = document.querySelector('.back-to-top');
      ripple.style.width = size + 'px';
      ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
  window.addEventListener('scroll', () => {
    backToTop?.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  // =============================================
  // 13. Testimonial Slider
  // =============================================
  const track = document.getElementById('testimonialsTrack');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  let currentSlide = 0;
  const totalSlides = dots.length;
  let autoSlideInterval;
  /* ---------- Tilt Effect on Cards ---------- */
  const tiltCards = document.querySelectorAll('.project-card, .skill-card');
  function goToSlide(index) {
    currentSlide = index;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
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
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => goToSlide(currentSlide + 1), 6000);
  }
  /* ---------- Typing Effect (Hero) ---------- */
  const typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    const words = ['front-end developer', 'creative writer', 'UI enthusiast', 'pixel perfectionist'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }
    function typeEffect() {
      const currentWord = words[wordIndex];
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      stopAutoSlide();
      startAutoSlide();
    });
  }
      if (isDeleting) {
        typingEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typingEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      stopAutoSlide();
      startAutoSlide();
    });
  }
      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400;
      }
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.getAttribute('data-index')));
      stopAutoSlide();
      startAutoSlide();
    });
  });
      setTimeout(typeEffect, typeSpeed);
    }
  const wrapper = document.querySelector('.testimonials-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAutoSlide);
    wrapper.addEventListener('mouseleave', startAutoSlide);
    setTimeout(typeEffect, 1200);
  }
  startAutoSlide();
  // =============================================
  // 14. Back to Top Button
  // =============================================
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  // =============================================
  // 15. Contact Form
  // =============================================
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
  /* ---------- Contact Form (Demo) ---------- */
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Message Sent! ✨';
    btn.style.background = '#6ee7b7';
    btn.style.color = '#0f172a';
    const submitBtn = contactForm.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    const originalText = btnText.textContent;
    // Show success state
    btnText.textContent = 'Sent!';
    btnIcon.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
      'stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    submitBtn.style.background = '#4CAF50';
    submitBtn.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
    contactForm.reset();
    // Restore original state after 3 seconds
    setTimeout(() => {
      btnText.textContent = originalText;
      btnIcon.innerHTML =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" ' +
        'stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
        'stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line>' +
        '<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
      submitBtn.style.background = '';
      submitBtn.style.boxShadow = '';
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
