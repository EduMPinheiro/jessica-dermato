/**
 * Script.js - Dra. Jéssica Alencar - Dermatologia Premium
 * Interações de interface, animações e responsividade
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Controle do Header ao Rolar a Página
  const header = document.querySelector('.header');
  const scrollThreshold = 50;

  const handleHeaderScroll = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Executa uma vez no carregamento para evitar inconsistências
  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll);

  // 2. Menu Mobile (Hamburguer)
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    // Previne ou restaura a rolagem da página quando o menu está aberto
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  };

  const closeMenu = () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  navToggle.addEventListener('click', toggleMenu);

  // Fecha o menu ao clicar em qualquer link
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // 3. Efeito Active Link nas Seções (Intersection Observer)
  const sections = document.querySelectorAll('section');
  const navLinksArr = Array.from(navLinks);

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Aciona quando a seção está no meio da tela
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksArr.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // 4. Animações de Entrada ao Rolar a Página (Scroll Reveal)
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px', // Aciona um pouco antes do elemento entrar na tela
    threshold: 0.15 // 15% do elemento visível
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Uma vez animado, não precisa observar novamente
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // 5. Ajuste fino de clique para rolagem suave (Smooth Scroll)
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Se for apenas uma âncora interna
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const headerOffset = 90; // altura do header ajustado
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
});
