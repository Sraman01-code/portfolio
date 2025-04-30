// Typewriter effect
const typeTarget = document.querySelector('.typewriter');
const roles = ["BTech CSE Student, KIIT", "Java Developer", "AI/ML Explorer", "Web Developer"];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentRole = roles[roleIndex];
  let displayedText;

  if (isDeleting) {
    displayedText = currentRole.substring(0, charIndex--);
  } else {
    displayedText = currentRole.substring(0, charIndex++);
  }

  typeTarget.textContent = displayedText;

  let typingSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentRole.length + 1) {
    isDeleting = true;
    typingSpeed = 1000; // Pause after full word
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 300;
  }

  setTimeout(typeWriter, typingSpeed);
}

typeWriter();


// Dark Mode Toggle
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Auto Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll to top button
const scrollBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
