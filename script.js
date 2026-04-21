document.addEventListener("DOMContentLoaded", () => {

  // PAGE LOAD
  document.body.classList.add("loaded");
  window.addEventListener('beforeunload', () => document.body.classList.remove('loaded'));

  // FOOTER YEAR
  document.getElementById('year').textContent = new Date().getFullYear();

  // CUSTOM CURSOR (hover-capable devices only)
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cursorDot  = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (supportsHover && cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top  = mouseY + 'px';
    });

    (function animateCursor() {
      ringX += (mouseX - ringX) * 0.11;
      ringY += (mouseY - ringY) * 0.11;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
      requestAnimationFrame(animateCursor);
    })();

    // Expand ring on interactive elements
    document.querySelectorAll('a, button, .skill-tag').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorRing.style.width   = '52px';
        cursorRing.style.height  = '52px';
        cursorRing.style.opacity = '0.75';
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.style.width   = '34px';
        cursorRing.style.height  = '34px';
        cursorRing.style.opacity = '0.45';
      });
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity  = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity  = '1';
      cursorRing.style.opacity = '0.45';
    });
  }

  // TYPEWRITER EFFECT
  const typeTarget = document.querySelector('.typewriter');
  if (typeTarget) {
    const roles = [
      "BTech CSE Student @ KIIT",
      "C++ & Java Developer",
      "AI/ML Explorer",
      "Web Developer",
      "Building real-world tools",
      "Debugging systems",
      "Learning by shipping"
    ];
    let roleIndex = 0, charIndex = 0, isDeleting = false;

    function typeWriter() {
      const current = roles[roleIndex];
      charIndex += isDeleting ? -1 : 1;
      typeTarget.textContent = current.substring(0, charIndex);

      let speed = isDeleting ? 32 : 65;
      if (!isDeleting && charIndex === current.length) {
        speed = 1300; isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex  = (roleIndex + 1) % roles.length;
        speed = 280;
      }
      setTimeout(typeWriter, speed);
    }
    typeWriter();
  }

  // SCROLL-TRIGGERED FADE IN
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // NAV SCROLL STATE & SCROLL-TO-TOP VISIBILITY
  const nav       = document.querySelector('.nav');
  const scrollTop = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 60);
    scrollTop.classList.toggle('visible', y > 400);
  }, { passive: true });

  // SCROLL TO TOP
  if (scrollTop) {
    scrollTop.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  // THEME TOGGLE
  const themeBtn = document.getElementById('theme-toggle');
  const html     = document.documentElement;

  function getPreferredTheme() {
    return localStorage.getItem('theme') || 'dark';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeBtn.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }

  setTheme(getPreferredTheme());

  themeBtn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });

  // SKILL TAG — click to Google
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(tag.dataset.skill)}`, '_blank');
    });
    tag.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tag.click(); }
    });
  });

});
