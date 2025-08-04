// Content Animation Controller
class ContentAnimator {
  constructor() {
    this.animatedElements = new Set(); // Track what's been animated
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px 50px 0px'
    };
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
    } else {
      this.setupAnimations();
    }
  }

  setupAnimations() {
    // Remove preload class first
    setTimeout(() => {
      document.body.classList.remove('is-preload');
    }, 100);

    // Setup single intersection observer
    this.setupScrollAnimations();

    // Setup navigation highlighting
    this.setupNavigation();

    // Setup avatar animation
    this.setupAvatarAnimation();
  }

  setupScrollAnimations() {
    // Single intersection observer for all elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.animatedElements.add(entry.target);
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    // Add animate-item class and observe all animatable elements
    const selectors = ['#main section', '.work-item', '#footer'];

    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach((element, index) => {
        // Only add classes if not already added
        if (!element.classList.contains('animate-item')) {
          element.classList.add('animate-item');
          if (index > 0) {
            element.classList.add(`delay-${Math.min(index, 6)}`);
          }
          observer.observe(element);
        }
      });
    });
  }

  setupNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#main-nav .nav-link');

    navLinks.forEach(link => {
      const linkHref = link.querySelector('a').getAttribute('href');
      if (linkHref === currentPage) {
        link.classList.add('current-page');
      }
    });
  }

  setupAvatarAnimation() {
    const avatarImg = document.querySelector('#header .image.avatar img');
    const avatarLink = document.querySelector('#header .image.avatar');

    if (avatarImg && avatarLink) {
      let isSpinning = false;

      avatarLink.addEventListener('mouseenter', function () {
        if (!isSpinning) {
          isSpinning = true;
          avatarImg.classList.add('spinning');

          setTimeout(() => {
            avatarImg.classList.remove('spinning');
            isSpinning = false;
          }, 1000);
        }
      });
    }
  }
}

// Initialize content animator
new ContentAnimator(); 