// Typewriter effect with smoother speed
const typeTarget = document.querySelector('.typewriter');
const roles = ["BTech CSE Student, KIIT", "Java Developer", "AI/ML Explorer", "Web Developer"];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentRole = roles[roleIndex];
  const displayedText = isDeleting
    ? currentRole.substring(0, charIndex--)
    : currentRole.substring(0, charIndex++);

  typeTarget.textContent = displayedText;

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentRole.length + 1) {
    isDeleting = true;
    speed = 1000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 300;
  }

  setTimeout(typeWriter, speed);
}

document.querySelectorAll('a[href]:not([target="_blank"])').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const destination = link.getAttribute('href');

    // Fade out before navigating
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = destination;
    }, 400);
  });
});



document.addEventListener("DOMContentLoaded", typeWriter);

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});


// Add transition effect on page load
window.addEventListener('beforeunload', () => {
  document.body.classList.add('fade-out');
  const transitionOverlay = document.createElement('div');
  transitionOverlay.classList.add('page-transition');
  document.body.appendChild(transitionOverlay);

  // Wait for fade-out to finish before navigating
  setTimeout(() => {
    transitionOverlay.style.opacity = 1;
  }, 100);
});

// Add fade-in effect once page content has fully loaded
// Ensure the 'loaded' class is reapplied when user returns
function handleVisibility() {
  document.body.classList.remove("fade-out");
  document.body.classList.add("loaded");
}

window.addEventListener("pageshow", handleVisibility); // Handles back navigation
window.addEventListener("load", handleVisibility);      // Handles normal load




// Dark Mode Toggle with animation
// Get the theme toggle button
const themeToggleButton = document.getElementById('theme-toggle');

// Check the stored theme preference in localStorage
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode'); // Apply dark mode if stored
} else {
  document.body.classList.remove('dark-mode'); // Remove dark mode if not stored
}

// Toggle theme on button click
themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode'); // Toggle dark mode class
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark'); // Save dark mode preference
  } else {
    localStorage.setItem('theme', 'light'); // Save light mode preference
  }
});


// Set footer year dynamically
document.getElementById('year').textContent = new Date().getFullYear();



// Intersection Observer for Fade-in Animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    } else {
      entry.target.classList.remove('fade-in');
    }
  });
}, { threshold: 0.5 });

const sections = document.querySelectorAll('.fade-in');
sections.forEach(section => observer.observe(section));


// Scroll to Top Button with fade animation
const scrollBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Touch + Hover support on mobile buttons and cards
const interactiveElements = document.querySelectorAll('.btn, .card');
interactiveElements.forEach(elem => {
  elem.addEventListener('touchstart', () => {
    elem.classList.add('touched');
  });
  elem.addEventListener('touchend', () => {
    elem.classList.remove('touched');
  });
});
