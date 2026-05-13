// Lawyer Website — Shared JS

document.addEventListener('DOMContentLoaded', () => {
  // Mobile hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Highlight current page in nav
  const currentPath = location.pathname.replace(/\/$/, '').split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '').split('/').pop();
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // Simple contact form handler
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('感谢您的留言！我会在24小时内回复您。\n\n（演示模式 — 表单未连接后端服务）');
      form.reset();
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
