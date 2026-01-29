document.addEventListener("DOMContentLoaded", () => {
  // TYPEWRITER EFFECT
  const typeTarget = document.querySelector('.typewriter');
  const roles = [
    "BTech CSE Student, KIIT",
    "Java Developer",
    "AI/ML Explorer",
    "Web Developer",
    "Building real-world tools",
    "Debugging systems",
    "Learning by shipping"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeWriter() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      charIndex--;
      typeTarget.textContent = currentRole.substring(0, charIndex);
    } else {
      charIndex++;
      typeTarget.textContent = currentRole.substring(0, charIndex);
    }
    let speed = isDeleting ? 40 : 80;
    if (!isDeleting && charIndex === currentRole.length) {
      speed = 1000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 350;
    }
    setTimeout(typeWriter, speed);
  }
  typeWriter();

  // Smooth fade-in for sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.fade-in').forEach(section => observer.observe(section));

  // THEME TOGGLE (modern, accessible, respects system preference)
  const themeToggleButton = document.getElementById('theme-toggle');
  const html = document.documentElement;
  function getPreferredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  }
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggleButton.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }
  setTheme(getPreferredTheme());
  themeToggleButton.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    setTheme(e.matches ? 'dark' : 'light');
  });

  // Set footer year dynamically
  document.getElementById('year').textContent = new Date().getFullYear();

  // Scroll to top button
  const scrollBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Touch + Hover support on mobile buttons and cards
  document.querySelectorAll('.btn, .fancy-btn, .card .btn, .skill-box').forEach(elem => {
    elem.addEventListener('touchstart', () => elem.classList.add('touched'));
    elem.addEventListener('touchend', () => elem.classList.remove('touched'));
  });

  // Skill box click: Google search
  document.querySelectorAll('.skill-box').forEach(box => {
    box.addEventListener('click', () => {
      const query = encodeURIComponent(box.dataset.skill);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    });
    // For accessibility: allow keyboard "Enter"
    box.addEventListener('keydown', e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        box.click();
      }
    });
  });

  // --- FOCUS FIX FOR BUTTONS AND LINKS ---
  // Remove focus after mouse click (not for keyboard users)
  document.querySelectorAll('.btn, .fancy-btn, .card .btn, .skill-box, a.btn').forEach(elem => {
    elem.addEventListener('mousedown', function(e) {
      this.blur();
    });
  });

  // Page fade-in/out
  document.body.classList.add("loaded");
  window.addEventListener('beforeunload', () => {
    document.body.classList.remove('loaded');
  });
});

