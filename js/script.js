document.addEventListener('DOMContentLoaded', () => {
  // --- LOGIN FUNCTIONALITY ---
  const loginOverlay = document.getElementById('login-overlay');
  const passwordInput = document.getElementById('password-input');
  const unlockBtn = document.getElementById('unlock-btn');
  const errorMessage = document.getElementById('error-message');

  // SHA-256 hash of the password (not stored in plain text)
  const PASSWORD_HASH = '3b92445079d7ac834f16e916f7a2751c7fca4c0e9ed5eb341bc96d39e0f04204';
  const STORAGE_KEY = 'weddingAccessGranted';

  // Hash a string using SHA-256
  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Check if user is already logged in
  function checkAccess() {
    const isGranted = sessionStorage.getItem(STORAGE_KEY);
    if (isGranted === 'true') {
      hideLogin();
      injectContent();
    }
  }

  // Hide login overlay
  function hideLogin() {
    if (loginOverlay) {
      loginOverlay.classList.add('hidden');
      setTimeout(() => {
        loginOverlay.style.display = 'none';
      }, 500);
    }
  }

  // Inject site content from template into the page
  function injectContent() {
    const template = document.getElementById('site-content');
    const mainContent = document.getElementById('main-content');

    if (template && mainContent && mainContent.children.length === 0) {
      const content = template.content.cloneNode(true);
      mainContent.appendChild(content);
      // Remove template from DOM so content can't be inspected
      template.remove();
      // Initialize all site features after content is injected
      initSiteFeatures();
    }
  }

  // Validate password
  async function validatePassword() {
    const enteredPassword = passwordInput ? passwordInput.value.trim() : '';

    if (!enteredPassword) return;

    const enteredHash = await hashPassword(enteredPassword);

    if (enteredHash === PASSWORD_HASH) {
      // Store access in sessionStorage (clears when browser closes)
      sessionStorage.setItem(STORAGE_KEY, 'true');

      // Hide error message
      if (errorMessage) {
        errorMessage.hidden = true;
      }

      // Hide login and inject content
      hideLogin();
      injectContent();
    } else {
      // Show error message
      if (errorMessage) {
        errorMessage.hidden = false;
      }

      // Clear input
      if (passwordInput) {
        passwordInput.value = '';
        passwordInput.focus();
      }
    }
  }

  // Event listeners for login
  if (unlockBtn && passwordInput) {
    unlockBtn.addEventListener('click', validatePassword);

    // Allow Enter key to submit
    passwordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        validatePassword();
      }
    });
  }

  // Check access on page load
  checkAccess();

  // =============================================
  // SITE FEATURES (initialized after content load)
  // =============================================
  function initSiteFeatures() {
    initHotels();
    initTabs();
    initHamburger();
    initScrollEffects();
    initRSVP();
    initFAQ();
  }

  // --- Hotels ---
  function initHotels() {
    const hotels = [
      {
        name: 'Hotel Vulci - Montalto di Castro',
        website: 'www.hotelvulci.it',
        phone: '+39 350 0822605',
        email: 'vulci@hotelvulci.it',
        distance: '9 minutes',
      },
      {
        name: 'Casale La Rovere - Montalto di Castro',
        website: 'www.casalelarovere.it',
        phone: '+39 338 1944345',
        email: 'info@casalelarovere.it',
        distance: '12 minutes',
      },
      {
        name: 'Hotel Enterprise - Montalto Marina',
        website: 'www.hotelenterprise.it',
        phone: '+39 371 6982856',
        email: 'mail@hotelenterprise.it',
        distance: '15 minutes',
      },
      {
        name: 'Piani Degli Alpaca - Tarquinia',
        website: 'www.pianideglialpaca.it',
        phone: '+39 329.9517042',
        email: 'info@pianideglialpaca.it',
        distance: '16 minutes',
      },
      {
        name: 'Podere Giulio - Tarquinia',
        website: 'www.poderegiulio.it',
        phone: '+39 328 9867955',
        email: 'pietro@poderegiulio.it',
        distance: '18 minutes',
      },
      {
        name: 'Agriturismo Colle d\u2019Oro - Pescia Romana',
        website: 'www.agriturismocolledoro.com',
        phone: '+39 331 217 0012',
        distance: '18 minutes',
      },
      {
        name: 'Agriturismo Valle del Chiarone - Pescia Romana',
        website: 'www.agriturismovalledelchiarone.eu',
        phone: '+39 389 147 5939',
        distance: '22 minutes',
      },
      {
        name: 'Agriturismo Ghiaccio Bosco - Capalbio',
        website: 'www.ghiacciobosco.com',
        phone: '+39 339 5662578',
        email: 'info@ghiacciobosco.com',
        distance: '24 minutes',
      },
      {
        name: 'Agriturismo Antica Pinciana - Capalbio',
        website: 'www.anticapinciana.com',
        phone: '+39 335 6251182',
        email: 'anticapinciana@gmail.com',
        distance: '24 minutes',
      },
      {
        name: 'Olympia Resort & Spa - Tarquinia',
        website: 'www.olympiaresortespa.com',
        phone: '+39 345 3469352',
        distance: '25 minutes',
      },
      {
        name: 'Glamping Terre di Sacra - Capalbio',
        website: 'www.sacra.it',
        phone: '+39 0564 890101',
        email: 'crm@campingcapalbio.it',
        distance: '25 minutes',
      },
      {
        name: 'Terme Di Vulci Glamping & Spa - Vulci',
        website: 'www.termedivulci.com',
        phone: '+39 0761 1917529',
        email: 'prenotazioni@termedivulci.com',
        distance: '26 minutes',
      },
      {
        name: 'Locanda Rossa - Capalbio',
        website: 'www.locandarossa.com',
        phone: '+39 0564 890462',
        email: 'reservation@locandarossa.com',
        distance: '30 minutes',
      },
      {
        name: 'Valle del Buttero - Capalbio',
        website: 'www.valledelbuttero.it',
        phone: '+39 0564 896097',
        email: 'info@valledelbuttero.it',
        distance: '30 minutes',
      },
      {
        name: 'Argentario Golf Resort & SPA - Argentario',
        website: 'www.argentariogolfresortspa.it',
        phone: '+39 0564 810292',
        distance: '40 minutes',
      },
      {
        name: 'La Parrina - Albinia',
        website: 'www.parrina.it',
        phone: '+39 331.7544169',
        email: 'agriturismo@parrina.it',
        distance: '40 minutes',
      },
      {
        name: 'Il Pellicano - Argentario',
        website: 'www.pellicanohotel.com',
        phone: '+39 0564 858111',
        email: 'reservations@pellicanohotels.com',
        distance: '50 minutes',
      },
    ];

    const hotelListContainer = document.getElementById('hotel-list-container');
    const viewHotelsLink = document.getElementById('view-hotels-link');

    if (!hotelListContainer || !viewHotelsLink) return;

    function createHotelList() {
      if (hotelListContainer.innerHTML !== '') {
        hotelListContainer.innerHTML = '';
        return;
      }

      const hotelGrid = document.createElement('div');
      hotelGrid.classList.add('hotel-grid');

      hotels.forEach(hotel => {
        const card = document.createElement('div');
        card.classList.add('hotel-card');

        let html = `
          <p class="hotel-name">${hotel.name}</p>
          <a class="hotel-link" href="http://${hotel.website}" target="_blank" rel="noopener noreferrer">${hotel.website}</a>
          <a class="hotel-link" href="tel:${hotel.phone}">${hotel.phone}</a>
        `;

        if (hotel.email) {
          html += `<a class="hotel-link" href="mailto:${hotel.email}">${hotel.email}</a>`;
        }

        html += `<p class="hotel-distance">${hotel.distance} from venue</p>`;

        card.innerHTML = html;
        hotelGrid.appendChild(card);
      });

      hotelListContainer.appendChild(hotelGrid);
    }

    viewHotelsLink.addEventListener('click', (e) => {
      e.preventDefault();
      createHotelList();

      const togglePrefix = document.querySelector('.toggle-prefix');
      const toggleSuffix = document.querySelector('.toggle-suffix');
      const isShowing = hotelListContainer.innerHTML !== '';

      if (isShowing) {
        togglePrefix.textContent = 'Click ';
        toggleSuffix.textContent = ' to hide details';
      } else {
        togglePrefix.textContent = 'Click ';
        toggleSuffix.textContent = ' to view hotels';
      }
    });
  }

  // --- Tab switching (Around Montalto) ---
  function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.tab;

        tabButtons.forEach((btn) => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });
        tabPanels.forEach((panel) => {
          panel.classList.remove('active');
        });

        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        const activePanel = document.getElementById('panel-' + target);
        activePanel.classList.add('active');
      });
    });
  }

  // --- Hamburger menu ---
  function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
      });

      navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });

      window.addEventListener('scroll', () => {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  // --- Logo visibility & navbar shadow on scroll ---
  function initScrollEffects() {
    const heroImage = document.querySelector('.imagen-inicio');
    const navLogo = document.querySelector('.img-logo-nav');
    const navbar = document.querySelector('.navbar');

    if (heroImage && navLogo) {
      window.addEventListener('scroll', () => {
        const rect = heroImage.getBoundingClientRect();
        if (rect.top < 0) {
          navLogo.classList.add('visible');
          navbar.classList.add('scrolled');
        } else {
          navLogo.classList.remove('visible');
          navbar.classList.remove('scrolled');
        }
      }, { passive: true });
    }
  }

  // --- RSVP form submission with modal confirmation ---
  function initRSVP() {
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpSubmitBtn = document.getElementById('rsvp-submit-btn');
    const rsvpModal = document.getElementById('rsvp-modal');

    // Función global para cerrar el modal
    window.closeRSVPModal = function () {
      if (rsvpModal) {
        rsvpModal.hidden = true;
        document.body.style.overflow = '';
      }
    };

    // Cerrar modal al hacer click fuera
    if (rsvpModal) {
      rsvpModal.addEventListener('click', (e) => {
        if (e.target === rsvpModal) {
          closeRSVPModal();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !rsvpModal.hidden) {
          closeRSVPModal();
        }
      });
    }

    if (rsvpForm && rsvpSubmitBtn) {
      rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Honeypot anti-spam check: if this hidden field is filled, it's a bot
        const honeypot = rsvpForm.querySelector('input[name="website"]');
        if (honeypot && honeypot.value) {
          // Silently fake success so the bot thinks it worked
          rsvpForm.reset();
          return;
        }

        const formData = new FormData(rsvpForm);
        // Remove honeypot field from submission
        formData.delete('website');
        rsvpSubmitBtn.textContent = 'Enviando...';
        rsvpSubmitBtn.classList.add('loading');

        fetch(rsvpForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json, text/plain, */*'
          }
        })
          .then((response) => {
            rsvpSubmitBtn.textContent = 'Submit';
            rsvpSubmitBtn.classList.remove('loading');

            if (rsvpModal) {
              rsvpModal.hidden = false;
              document.body.style.overflow = 'hidden';
            }

            rsvpForm.reset();
          })
          .catch((error) => {
            console.error('Error:', error);
            rsvpSubmitBtn.textContent = 'Submit';
            rsvpSubmitBtn.classList.remove('loading');
            alert('Hubo un problema al enviar tu confirmación. Por favor intenta de nuevo.');
          });
      });
    }
  }

  // --- FAQ accordion ---
  function initFAQ() {
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const answer = toggle.nextElementSibling;
        const isOpen = toggle.classList.contains('open');

        faqToggles.forEach((otherToggle) => {
          otherToggle.classList.remove('open');
          otherToggle.setAttribute('aria-expanded', 'false');
          otherToggle.nextElementSibling.hidden = true;
        });

        if (!isOpen) {
          toggle.classList.add('open');
          toggle.setAttribute('aria-expanded', 'true');
          answer.hidden = false;
        }
      });
    });
  }
});