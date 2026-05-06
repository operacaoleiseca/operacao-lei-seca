// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== Scroll Animations =====
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

// ===== Animate Schedule Bars on Hero Load =====
function animateBars() {
  const bars = document.querySelectorAll('.schedule-bar-fill');
  bars.forEach((bar, i) => {
    setTimeout(() => {
      bar.style.width = bar.dataset.width;
    }, 600 + i * 150);
  });
}

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item').forEach((faq) => faq.classList.remove('active'));

    // Open clicked if it wasn't active
    if (!isActive) item.classList.add('active');
  });
});

// ===== Counter Animation =====
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach((el) => {
    const target = el.dataset.target;
    const suffix = el.dataset.suffix || '';
    const numTarget = parseInt(target);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * numTarget);
      el.textContent = current.toLocaleString('pt-BR') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  });
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) statsObserver.observe(statsSection);

// ===== Smooth Scroll for CTA links =====
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== Init =====
window.addEventListener('DOMContentLoaded', () => {
  animateBars();
});
