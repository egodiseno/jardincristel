/* JS mínimo del prototipo: paquete (dialog), scrollspy de la navegación. Sin dependencias, sin analítica. */
(() => {
  const dlg = document.getElementById('paquete');
  const desktop = matchMedia('(min-width: 75em) and (hover: hover) and (pointer: fine)');

  if (dlg && typeof dlg.showModal === 'function') {
    const syncRol = () => {
      if (desktop.matches) { if (dlg.open) dlg.close(); dlg.setAttribute('role', 'region'); }
      else dlg.removeAttribute('role');
    };
    syncRol();
    desktop.addEventListener('change', syncRol);

    document.querySelectorAll('[data-open-paquete]').forEach((a) =>
      a.addEventListener('click', (e) => {
        if (desktop.matches) return;          // en desktop es un ancla a la sección
        e.preventDefault();
        dlg.showModal();
      }));
    dlg.querySelectorAll('[data-cerrar-paquete]').forEach((b) => b.addEventListener('click', () => dlg.close()));
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });   // clic en el fondo

    // Cerrar el bottom sheet arrastrando el asa hacia abajo
    const asa = dlg.querySelector('.paquete__asa');
    if (asa) {
      let y0 = null;
      asa.addEventListener('pointerdown', (e) => { y0 = e.clientY; asa.setPointerCapture(e.pointerId); });
      asa.addEventListener('pointerup', (e) => { if (y0 !== null && e.clientY - y0 > 70) dlg.close(); y0 = null; });
      asa.addEventListener('pointercancel', () => { y0 = null; });
    }
  }

  // Scrollspy: aria-current="location" en el enlace de la sección visible
  const enlaces = new Map();
  document.querySelectorAll('.nav__enlace').forEach((a) => enlaces.set(a.getAttribute('href').slice(1), a));
  const marcar = (id) => enlaces.forEach((a, k) => (k === id ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current')));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) marcar(e.target.id); }), { rootMargin: '-35% 0px -55% 0px' });
    enlaces.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }
})();
