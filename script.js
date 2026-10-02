/**
 * PROVIRED - PORTAL WEB CORPORATIVO & COMERCIAL
 * Funcionalidad interactiva: Navegación, Filtros de Portafolio, FAQ, Simulador y WhatsApp Lead Gen
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 2. Header shadow on scroll & Active Nav Spy
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Portafolio de Servicios: Filtrado por Categorías
  const tabButtons = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 4. Preguntas Frecuentes (FAQ) Acordeón
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Cerrar otros
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
        }
      });

      // Alternar el actual
      if (isOpen) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });

  // 5. Buscador de Preguntas Frecuentes
  const faqSearchInput = document.getElementById('faqSearch');
  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      faqItems.forEach(item => {
        const questionText = item.querySelector('.faq-question span')?.textContent.toLowerCase() || '';
        const answerText = item.querySelector('.faq-answer')?.textContent.toLowerCase() || '';

        if (questionText.includes(query) || answerText.includes(query)) {
          item.style.display = 'block';
          if (query.length > 2) {
            item.classList.add('active'); // auto abrir si coincide
          }
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // 6. Simulador de Beneficios para Puntos de Venta
  const calcCheckboxes = document.querySelectorAll('.calc-checkbox');
  const calcIncomeEl = document.getElementById('calcIncome');
  const calcClientsEl = document.getElementById('calcClients');

  function updateSimulator() {
    let monthlyIncome = 0;
    let extraClients = 0;

    calcCheckboxes.forEach(cb => {
      if (cb.checked) {
        monthlyIncome += parseInt(cb.getAttribute('data-income') || '0', 10);
        extraClients += parseInt(cb.getAttribute('data-clients') || '0', 10);
      }
    });

    if (calcIncomeEl) {
      calcIncomeEl.textContent = `$${monthlyIncome.toLocaleString('es-CO')}`;
    }
    if (calcClientsEl) {
      calcClientsEl.textContent = `+${extraClients} clientes/mes`;
    }
  }

  calcCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateSimulator);
  });
  updateSimulator();

  // 7. Formulario de Vinculación y Envío a WhatsApp Asesor
  const leadForm = document.getElementById('vinculacionForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('leadName')?.value || '';
      const negocio = document.getElementById('leadBusiness')?.value || '';
      const tipo = document.getElementById('leadType')?.value || '';
      const ciudad = document.getElementById('leadCity')?.value || '';
      const telefono = document.getElementById('leadPhone')?.value || '';
      const servicios = document.getElementById('leadServices')?.value || '';
      const mensaje = document.getElementById('leadMessage')?.value || '';

      const submitBtn = leadForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando solicitud...';
        submitBtn.disabled = true;
      }

      // Mensaje estructurado para WhatsApp
      const textoWhatsApp = `¡Hola ProviRed! Deseo vincular mi negocio a su plataforma.%0A%0A` +
        `👤 *Nombre:* ${encodeURIComponent(nombre)}%0A` +
        `🏬 *Negocio:* ${encodeURIComponent(negocio)}%0A` +
        `🏷️ *Tipo de comercio:* ${encodeURIComponent(tipo)}%0A` +
        `📍 *Municipio/Depto:* ${encodeURIComponent(ciudad)}%0A` +
        `📱 *Teléfono:* ${encodeURIComponent(telefono)}%0A` +
        `💼 *Servicios de interés:* ${encodeURIComponent(servicios)}%0A` +
        (mensaje ? `💬 *Comentarios:* ${encodeURIComponent(mensaje)}%0A%0A` : '%0A') +
        `Por favor contáctenme para iniciar mi proceso de vinculación. ¡Muchas gracias!`;

      // Simular feedback amigable y abrir WhatsApp
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> ¡Datos listos!';
        }

        // WhatsApp oficial de ProviRed (reemplazable por el del cliente)
        const numeroWhatsApp = "573100000000"; // Número ProviRed Colombia
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${textoWhatsApp}`;

        // Mostrar confirmación
        alert(`¡Gracias ${nombre}! Serás redirigido a WhatsApp para conectar de inmediato con nuestro asesor comercial de ProviRed.`);
        window.open(urlWhatsApp, '_blank');

        leadForm.reset();
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      }, 700);
    });
  }
});
