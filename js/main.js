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

  /* ---------- Navegación: sección activa ---------- */
  const enlaces = new Map();
  document.querySelectorAll('.nav__enlace').forEach((a) => enlaces.set(a.getAttribute('href').slice(1), a));
  const marcar = (id) => enlaces.forEach((a, k) => (k === id ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current')));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) marcar(e.target.id); }), { rootMargin: '-35% 0px -55% 0px' });
    enlaces.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }
})();
