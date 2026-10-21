/* Jardín Cristel — piloto. JS mínimo, sin dependencias.
   - <details> de "Qué incluye": cerrados salvo el primero en móvil; abiertos en tablet y escritorio.
   - Navegación: aria-current con IntersectionObserver.
   - Medición GA4 por delegación con data-* (docs/medicion.md). Solo se mide en jardincristel.mx
     (o con ?medicion=debug). Microsoft Clarity NO está cargado todavía. */
(() => {
  'use strict';

  /* ---------- Medición ---------- */
  const GA_ID = 'G-DNF30KJ0Y7';
  const DEBUG = location.search.includes('medicion=debug');
  const EN_PRODUCCION = location.hostname === 'jardincristel.mx';
  const MEDIR = EN_PRODUCCION || DEBUG;     // previews, localhost y la rama no envían nada

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }   // cola: ningún evento se pierde aunque gtag.js tarde
  window.gtag = window.gtag || gtag;
  if (MEDIR) {
    gtag('js', new Date());
    gtag('config', GA_ID, { debug_mode: DEBUG });
  }
  const enviar = (nombre, params) => { if (MEDIR) gtag('event', nombre, params); };

  function cargarGtag() {
    if (!MEDIR) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }
  addEventListener('load', () => ('requestIdleCallback' in window
    ? requestIdleCallback(cargarGtag, { timeout: 4000 })
    : setTimeout(cargarGtag, 2500)));

  const EVENTOS_CLIC = { whatsapp: 'click_whatsapp', phone: 'click_phone', maps: 'click_maps', facebook: 'click_facebook' };
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-track]');
    if (!el || !EVENTOS_CLIC[el.dataset.track]) return;
    const p = { link_location: el.dataset.trackLocation, link_url: el.href, transport_type: 'beacon' };
    if (el.dataset.track === 'whatsapp') p.event_type = el.dataset.eventType || 'general';
    enviar(EVENTOS_CLIC[el.dataset.track], p);
  }, true);

  /* ---------- "Qué incluye tu evento" ---------- */
  const grupos = [...document.querySelectorAll('.grupo')];
  const movil = matchMedia('(max-width: 47.99em)');
  const sincronizarGrupos = () => grupos.forEach((d, i) => { d.open = movil.matches ? i === 0 : true; });
  sincronizarGrupos();
  movil.addEventListener('change', sincronizarGrupos);

  // open_categoria_incluye: solo cuando el USUARIO abre un grupo (no cuando el script sincroniza el estado)
  grupos.forEach((d) => d.querySelector('summary').addEventListener('click', () => { d.dataset.usuario = '1'; }));
  document.addEventListener('toggle', (e) => {
    const d = e.target;
    if (!d.classList || !d.classList.contains('grupo')) return;
    if (d.open && d.dataset.usuario === '1') enviar('open_categoria_incluye', { categoria: d.dataset.categoria });
    delete d.dataset.usuario;
  }, true);   // 'toggle' no burbujea: se escucha en captura

  // view_que_incluye: una vez por visita
  const incluye = document.getElementById('incluye');
  if (incluye && 'IntersectionObserver' in window) {
    let visto = false;
    try { visto = sessionStorage.getItem('vqi') === '1'; } catch (_) { /* sin almacenamiento */ }
    if (!visto) {
      const io = new IntersectionObserver((es) => {
        if (!es.some((x) => x.isIntersecting)) return;
        enviar('view_que_incluye');
        try { sessionStorage.setItem('vqi', '1'); } catch (_) { /* sin almacenamiento */ }
        io.disconnect();
      }, { threshold: 0.35 });
      io.observe(incluye);
    }
  }

  /* ---------- Carruseles: foco de teclado solo si de verdad se desplazan ---------- */
  const carruseles = [...document.querySelectorAll('[data-carrusel]')];
  const ajustarCarruseles = () => carruseles.forEach((c) => { if (c.scrollWidth > c.clientWidth + 1) c.tabIndex = 0; else c.removeAttribute('tabindex'); });
  ajustarCarruseles();
  addEventListener('resize', ajustarCarruseles);

  /* ---------- Galería: carrusel (móvil/tablet) o imagen principal + miniaturas (escritorio) ---------- */
  const galeria = document.querySelector('.galeria');
  if (galeria) {
    const carril = galeria.querySelector('.galeria__carril');
    const botones = [...galeria.querySelectorAll('.galeria__foto')];
    const principal = galeria.querySelector('.galeria__principal');
    const contador = galeria.querySelector('[data-actual]');
    const escritorio = matchMedia('(min-width: 75em) and (hover: hover) and (pointer: fine)');
    const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)');
    let actual = 0, interaccion = 'swipe', espera = 0;

    const paso = () => (botones[1] ? botones[1].parentElement.offsetLeft - botones[0].parentElement.offsetLeft : 1);
    const indiceVisible = () => Math.max(0, Math.min(botones.length - 1, Math.round(carril.scrollLeft / paso())));
    const pintar = () => {
      botones.forEach((b, i) => (escritorio.matches && i === actual ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current')));
      if (principal) {
        principal.hidden = !escritorio.matches;
        const img = botones[actual].querySelector('img'), grande = principal.querySelector('img');
        grande.src = img.currentSrc || img.src; grande.alt = img.alt;
      }
      contador.textContent = actual + 1;
    };
    const cambiar = (i, tipo) => {            // un solo evento por cambio asentado; la foto inicial no cuenta
      if (i === actual) return;
      actual = i; pintar();
      enviar('gallery_navigate', { gallery_index: actual + 1, interaction: tipo });
    };

    carril.addEventListener('scroll', () => {   // carrusel: se mide cuando el desplazamiento se asienta, no en cada píxel
      if (escritorio.matches) return;
      clearTimeout(espera);
      espera = setTimeout(() => { cambiar(indiceVisible(), interaccion); interaccion = 'swipe'; }, 140);
    }, { passive: true });

    botones.forEach((b, i) => b.addEventListener('click', () => {
      if (escritorio.matches) { cambiar(i, 'thumbnail'); return; }
      interaccion = 'thumbnail';
      carril.scrollTo({ left: i * paso(), behavior: sinMovimiento.matches ? 'auto' : 'smooth' });
    }));

    galeria.addEventListener('keydown', (e) => {   // escritorio: flechas ← →
      if (!escritorio.matches || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return;
      const i = Math.max(0, Math.min(botones.length - 1, actual + (e.key === 'ArrowRight' ? 1 : -1)));
      if (i === actual) return;
      e.preventDefault(); cambiar(i, 'arrow'); botones[i].focus();
    });

    escritorio.addEventListener('change', () => { pintar(); if (!escritorio.matches) carril.scrollLeft = actual * paso(); });
    pintar();
  }

  /* ---------- Mapa bajo demanda: el iframe de Google Maps se crea solo al pulsar "Ver mapa" ---------- */
  const mapa = document.querySelector('[data-mapa]');
  const verMapa = mapa && mapa.querySelector('.mapa__ver');
  if (verMapa) {
    verMapa.hidden = false;      // sin JS el botón no existe y queda el enlace "Abrir en Google Maps"
    verMapa.addEventListener('click', () => {
      const f = document.createElement('iframe');
      f.src = mapa.dataset.mapa;
      f.title = 'Mapa de Google Maps con la ubicación de Jardín Cristel';
      f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade'; f.allowFullscreen = true;
      mapa.querySelector('.mapa__vista').replaceChildren(f);
      verMapa.remove();
      f.focus();
    });
  }

  /* ---------- Navegación: sección activa ---------- */
  const enlaces = new Map();
  document.querySelectorAll('.nav__enlace').forEach((a) => enlaces.set(a.getAttribute('href').slice(1), a));
  const marcar = (id) => enlaces.forEach((a, k) => (k === id ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current')));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) marcar(e.target.id); }), { rootMargin: '-35% 0px -55% 0px' });
    enlaces.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }
})();
