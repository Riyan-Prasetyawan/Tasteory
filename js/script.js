document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      // Change icon
      const icon = hamburger.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Floating Top Button Logic
  const topBtn = document.querySelector('.btn-top');

  if (topBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        topBtn.classList.add('show');
      } else {
        topBtn.classList.remove('show');
      }
    });

    topBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Active Link Highlighter
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-links a');

  navItems.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Smooth Scroll for Anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // Ignore empty anchors

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Automatic TOC Generation for Articles
  const articleContent = document.querySelector('.article-content');
  const tocContainer = document.getElementById('toc-content');

  if (articleContent && tocContainer) {
    const headers = articleContent.querySelectorAll('h2, h3');
    if (headers.length > 0) {
      const ul = document.createElement('ul');
      headers.forEach((header, index) => {
        const id = header.id || `section-${index}`;
        header.id = id;

        const li = document.createElement('li');
        li.style.marginLeft = header.tagName === 'H3' ? '20px' : '0';
        li.style.marginBottom = '5px';

        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = header.textContent;
        a.style.textDecoration = 'none';
        a.style.fontSize = '14px';
        a.style.color = 'var(--text-dark)';

        a.addEventListener('click', (e) => {
          e.preventDefault();
          document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        });

        li.appendChild(a);
        ul.appendChild(li);
      });
      tocContainer.appendChild(ul);
    } else {
      // Hide TOC if no headers
      const tocWrapper = document.getElementById('toc-wrapper');
      if (tocWrapper) tocWrapper.style.display = 'none';
    }
  }

  // TOC Toggle
  const tocToggle = document.getElementById('toc-toggle');
  if (tocToggle && tocContainer) {
    tocToggle.addEventListener('click', () => {
      if (tocContainer.style.display === 'none') {
        tocContainer.style.display = 'block';
        tocToggle.classList.remove('fa-chevron-down');
        tocToggle.classList.add('fa-chevron-up');
      } else {
        tocContainer.style.display = 'none';
        tocToggle.classList.remove('fa-chevron-up');
        tocToggle.classList.add('fa-chevron-down');
      }
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const answer = item.querySelector('.faq-answer');
      const icon = question.querySelector('i');

      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        item.classList.remove('active');
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
      } else {
        // Close other open FAQs
        faqItems.forEach(otherItem => {
          const otherAnswer = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-question i');
          if (otherAnswer.style.maxHeight) {
            otherAnswer.style.maxHeight = null;
            otherItem.classList.remove('active');
            otherIcon.classList.remove('fa-minus');
            otherIcon.classList.add('fa-plus');
          }
        });

        answer.style.maxHeight = answer.scrollHeight + "px";
        item.classList.add('active');
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
      }
    });
  });
});
