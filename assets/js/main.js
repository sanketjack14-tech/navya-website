/**
 * Navya Intel - Interactive Application Scripts
 * Full replication of Framer interactions + Pitch deck presentation
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initEdgeCarousel();
  initTourTabs();
  initProcessAccordion();
  initWorkflowSteps();
  initLightbox();
  initPitchDeckViewer();
  initContactForm();
  initEarlyAccessModal();
  initStatCounters();
});

/* ==========================================================================
   1. Navbar & Mobile Menu
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightCurrentSection();
  }, { passive: true });

  // Mobile toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile drawer when clicking a link
    mobileDrawer.querySelectorAll('.nav-link, .btn').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section spy
  function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   2. Our Edge - Interactive Infinite Carousel
   ========================================================================== */
function initEdgeCarousel() {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const wrapper = document.querySelector('.carousel-track-wrapper');

  if (!track || !prevBtn || !nextBtn || !wrapper) return;

  let currentIndex = 0;
  const cards = track.querySelectorAll('.edge-card');
  const totalCards = cards.length;

  function getCardWidth() {
    if (cards.length === 0) return 320;
    const card = cards[0];
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 24;
    return card.offsetWidth + gap;
  }

  function getMaxIndex() {
    const visibleCards = Math.max(1, Math.floor(wrapper.offsetWidth / (cards[0].offsetWidth || 300)));
    return Math.max(0, totalCards - visibleCards);
  }

  function updateCarousel() {
    const cardWidth = getCardWidth();
    const maxIdx = getMaxIndex();
    if (currentIndex > maxIdx) currentIndex = 0;
    if (currentIndex < 0) currentIndex = maxIdx;

    const offset = currentIndex * cardWidth;
    track.style.transform = `translateX(-${offset}px)`;
  }

  nextBtn.addEventListener('click', () => {
    const maxIdx = getMaxIndex();
    if (currentIndex >= maxIdx) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    const maxIdx = getMaxIndex();
    if (currentIndex <= 0) {
      currentIndex = maxIdx;
    } else {
      currentIndex--;
    }
    updateCarousel();
  });

  window.addEventListener('resize', () => {
    updateCarousel();
  });

  // Touch Swipe Support
  let startX = 0;
  let isSwiping = false;

  wrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  }, { passive: true });

  wrapper.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextBtn.click();
      } else {
        prevBtn.click();
      }
    }
    isSwiping = false;
  }, { passive: true });

  // Auto-scroll every 5 seconds, paused on hover
  let autoPlayTimer = setInterval(() => {
    nextBtn.click();
  }, 5000);

  wrapper.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
  wrapper.addEventListener('mouseleave', () => {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(() => nextBtn.click(), 5000);
  });
}

/* ==========================================================================
   3. Platform Capabilities / Product Tour Tabs
   ========================================================================== */
function initTourTabs() {
  const tabButtons = document.querySelectorAll('.tour-tab-btn');
  const tabPanels = document.querySelectorAll('.tour-panel');

  if (tabButtons.length === 0) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. Getting Started - Accordion (Cards 1 through 6)
   ========================================================================== */
function initProcessAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');

    header.addEventListener('click', () => {
      const isAlreadyActive = item.classList.contains('active');

      // Close all other items
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherBody = otherItem.querySelector('.accordion-body');
        if (otherBody) otherBody.style.maxHeight = null;
      });

      // Toggle clicked item
      if (!isAlreadyActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Open first item by default
  if (accordionItems.length > 0) {
    const firstItem = accordionItems[0];
    firstItem.classList.add('active');
    const firstBody = firstItem.querySelector('.accordion-body');
    if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
  }
}

/* ==========================================================================
   5. Interactive Workflow Steps
   ========================================================================== */
function initWorkflowSteps() {
  const steps = document.querySelectorAll('.workflow-step-card');

  steps.forEach(step => {
    step.addEventListener('click', () => {
      steps.forEach(s => s.style.borderColor = 'var(--color-border)');
      step.style.borderColor = 'var(--color-primary)';
    });
  });
}

/* ==========================================================================
   6. Screenshot Lightbox Viewer
   ========================================================================== */
function initLightbox() {
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const zoomTriggers = document.querySelectorAll('[data-zoom-img]');

  if (!lightboxModal) return;

  zoomTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const src = trigger.getAttribute('data-zoom-img');
      const caption = trigger.getAttribute('data-zoom-caption') || 'Product Screenshot';

      lightboxImg.src = src;
      lightboxCaption.textContent = caption;
      lightboxModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightboxModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('open')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   7. Pitch Deck Presentation Viewer (14 Slides)
   ========================================================================== */
function initPitchDeckViewer() {
  const deckModal = document.getElementById('pitchDeckModal');
  const openDeckBtns = document.querySelectorAll('[data-open-deck]');
  const closeDeckBtn = document.getElementById('closeDeckBtn');
  const slideImg = document.getElementById('deckSlideImg');
  const currentCounter = document.getElementById('deckCurrentSlide');
  const totalCounter = document.getElementById('deckTotalSlides');
  const slideTitle = document.getElementById('deckSlideTitle');
  const prevBtn = document.getElementById('deckPrevBtn');
  const nextBtn = document.getElementById('deckNextBtn');

  if (!deckModal) return;

  const slides = [
    { num: 1, title: "Modern Applicant Tracking for High-Growth Teams", path: "assets/images/pdf_pages/page_1.png" },
    { num: 2, title: "Why Hiring Feels Messy at Scale", path: "assets/images/pdf_pages/page_2.png" },
    { num: 3, title: "What NavyaINTEL Solves - Dashboard Overview", path: "assets/images/pdf_pages/page_3.png" },
    { num: 4, title: "End-to-End Hiring Workflow", path: "assets/images/pdf_pages/page_4.png" },
    { num: 5, title: "Smart Job Management", path: "assets/images/pdf_pages/page_5.png" },
    { num: 6, title: "Visual Hiring Pipeline (Kanban)", path: "assets/images/pdf_pages/page_6.png" },
    { num: 7, title: "Complete Candidate 360 View", path: "assets/images/pdf_pages/page_7.png" },
    { num: 8, title: "Track Employee Referrals", path: "assets/images/pdf_pages/page_8.png" },
    { num: 9, title: "Hiring Decisions, Augmented by AI", path: "assets/images/pdf_pages/page_9.png" },
    { num: 10, title: "Hiring Analytics & Action Center", path: "assets/images/pdf_pages/page_10.png" },
    { num: 11, title: "Why Choose NavyaIntel", path: "assets/images/pdf_pages/page_11.png" },
    { num: 12, title: "Let's Structure Your Hiring", path: "assets/images/pdf_pages/page_12.png" },
    { num: 13, title: "Built by People Who've Lived Hiring Decisions", path: "assets/images/pdf_pages/page_13.png" },
    { num: 14, title: "Thank You", path: "assets/images/pdf_pages/page_14.png" }
  ];

  let currentSlideIndex = 0;
  totalCounter.textContent = slides.length;

  function renderSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentSlideIndex = index;

    const slide = slides[currentSlideIndex];
    slideImg.src = slide.path;
    currentCounter.textContent = slide.num;
    slideTitle.textContent = slide.title;
  }

  openDeckBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const startPage = parseInt(btn.getAttribute('data-start-page') || '1', 10);
      renderSlide(startPage - 1);
      deckModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeDeck() {
    deckModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeDeckBtn) closeDeckBtn.addEventListener('click', closeDeck);

  deckModal.addEventListener('click', (e) => {
    if (e.target === deckModal) closeDeck();
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      renderSlide(currentSlideIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      renderSlide(currentSlideIndex + 1);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!deckModal.classList.contains('open')) return;
    if (e.key === 'ArrowRight' || e.key === ' ') {
      renderSlide(currentSlideIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      renderSlide(currentSlideIndex - 1);
    } else if (e.key === 'Escape') {
      closeDeck();
    }
  });
}

/* ==========================================================================
   8. Early Access / Demo Modal Dialog
   ========================================================================== */
function initEarlyAccessModal() {
  const modal = document.getElementById('earlyAccessModal');
  const openBtns = document.querySelectorAll('[data-open-modal="early-access"]');
  const closeBtn = document.getElementById('closeEarlyAccessBtn');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9. Lead Capture / Contact Form Submission
   ========================================================================== */
function initContactForm() {
  const forms = [
    document.getElementById('contactForm'),
    document.getElementById('modalContactForm')
  ];

  forms.forEach(form => {
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Submitting...</span>`;

      // Simulate async submission with realistic feedback
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        const toast = form.parentElement.querySelector('.form-toast') || document.getElementById('globalFormToast');
        if (toast) {
          toast.classList.add('success');
          toast.innerHTML = `<strong>Success!</strong> Thank you for your interest. The Navya team will reach out within 24 hours.`;
          toast.style.display = 'flex';

          setTimeout(() => {
            toast.style.display = 'none';
          }, 8000);
        } else {
          alert("Thank you! Your request for early access has been received. Our team will contact you shortly.");
        }

        form.reset();
      }, 900);
    });
  });
}

/* ==========================================================================
   10. Animated Stat Counters
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  function runCounters() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target') || stat.textContent, 10);
      let count = 0;
      const step = Math.max(1, Math.floor(target / 40));
      const interval = setInterval(() => {
        count += step;
        if (count >= target) {
          stat.textContent = target;
          clearInterval(interval);
        } else {
          stat.textContent = count;
        }
      }, 30);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        runCounters();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
}
