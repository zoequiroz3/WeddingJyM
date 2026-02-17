document.addEventListener('DOMContentLoaded', () => {
  const hotels = [
    {
      name: 'Argentario Golf Resort & SPA - Argentario',
      website: 'www.argentariogolfresortspa.it',
      phone: '+39 0564 810292',
      distance: '40 minutes',
    },
    {
      name: 'Il Pellicano - Argentario',
      website: 'www.pellicanohotel.com',
      phone: '+39 0564 858111',
      email: 'reservations@pellicanohotels.com',
      distance: '50 minutes',
    },
    {
      name: 'Hotel Vulci - Montalto di Castro',
      website: 'www.hotelvulci.it',
      phone: '+39 350 0822605',
      email: 'vulci@hotelvulci.it',
      distance: '9 minutes',
    },
    {
      name: 'Hotel Enterprise - Montalto Marina',
      website: 'www.hotelenterprise.it',
      phone: '+39 371 6982856',
      email: 'mail@hotelenterprise.it',
      distance: '15 minutes',
    },
    {
      name: 'Casale La Rovere - Montalto di Castro',
      website: 'www.casalelarovere.it',
      phone: '+39 338 1944345',
      email: 'info@casalelarovere.it',
      distance: '12 minutes',
    },
    {
      name: 'Terme Di Vulci Glamping & Spa - Vulci',
      website: 'www.termedivulci.com',
      phone: '+39 0761 1917529',
      email: 'prenotazioni@termedivulci.com',
      distance: '26 minutes',
    },
    {
      name: 'Piani Degli Alpaca - Tarquinia',
      website: 'www.pianideglialpaca.it',
      phone: '+39 329.9517042',
      email: 'info@pianideglialpaca.it',
      distance: '16 minutes',
    },
    {
      name: 'Olympia Resort & Spa - Tarquinia',
      website: 'www.olympiaresortespa.com',
      phone: '+39 345 3469352',
      distance: '25 minutes',
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
      name: 'Glamping Terre di Sacra - Capalbio',
      website: 'www.sacra.it',
      phone: '+39 0564 890101',
      email: 'crm@campingcapalbio.it',
      distance: '25 minutes',
    },
    {
      name: 'La Parrina - Albinia',
      website: 'www.parrina.it',
      phone: '+39 331.7544169',
      email: 'agriturismo@parrina.it',
      distance: '40 minutes',
    },
  ];

  const hotelListContainer = document.getElementById('hotel-list-container');
  const viewHotelsLink = document.getElementById('view-hotels-link');

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
    
    // Toggle text between "view hotels" and "hide details"
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

  // --- Tab switching (Around Montalto) ---
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

  // --- Hamburger menu ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a nav link
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on scroll
    window.addEventListener('scroll', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Logo visibility & navbar shadow on scroll ---
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

  // --- RSVP form submission with modal confirmation ---
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpSubmitBtn = document.getElementById('rsvp-submit-btn');
  const rsvpModal = document.getElementById('rsvp-modal');

  // Función global para cerrar el modal
  window.closeRSVPModal = function() {
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

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !rsvpModal.hidden) {
        closeRSVPModal();
      }
    });
  }

  if (rsvpForm && rsvpSubmitBtn) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(rsvpForm);
      rsvpSubmitBtn.textContent = 'Enviando...';
      rsvpSubmitBtn.classList.add('loading');

      // Enviar a FormSubmit
      fetch(rsvpForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json, text/plain, */*'
        }
      })
      .then((response) => {
        // FormSubmit siempre redirige, así que consideramos éxito si no hay error de red
        rsvpSubmitBtn.textContent = 'Submit';
        rsvpSubmitBtn.classList.remove('loading');
        
        // Mostrar modal de confirmación
        if (rsvpModal) {
          rsvpModal.hidden = false;
          document.body.style.overflow = 'hidden'; // Prevenir scroll
        }
        
        // Limpiar formulario
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

  // --- FAQ accordion ---
  const faqToggles = document.querySelectorAll('.faq-toggle');

  faqToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const answer = toggle.nextElementSibling;
      const isOpen = toggle.classList.contains('open');

      // Close all other FAQ items
      faqToggles.forEach((otherToggle) => {
        otherToggle.classList.remove('open');
        otherToggle.setAttribute('aria-expanded', 'false');
        otherToggle.nextElementSibling.hidden = true;
      });

      // Toggle current item
      if (!isOpen) {
        toggle.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });
  });
});