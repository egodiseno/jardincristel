# Propuesta de reconstrucción — Jardín Cristel

Decisión tomada: reconstruir como **HTML semántico estático**, sin build ni framework, con el contenido escrito en el HTML, CSS propio con custom properties y JS vanilla mínimo. Mobile First. El build actual (`assets/`) queda solo como referencia. Base de datos: `docs/inventario.md` y `docs/benchmark/hallazgos.md`.

**Objetivos medibles (móvil, Lighthouse):** Performance ≥ 95, LCP ≤ 2.0 s (hoy 4.9 s), CLS ≤ 0.02, TBT ≤ 50 ms, Accessibility 100, Best Practices 100, SEO 100; peso inicial de la página ≤ 300 KiB (hoy 902 KiB).

**Principio de identidad:** se conserva la identidad visual actual (paleta malva/marfil/lavanda, Berthold Script + Merriweather, esquinas en arco, bordes oliva). Lo que cambia es la construcción, no la marca. Único ajuste de color: oscurecer el malva para cumplir contraste AA (ver H3).

---

## 1. Arquitectura de archivos

```
/
├── index.html                  # página única, contenido en HTML
├── 404.html                    # página de error simple
├── css/
│   └── styles.css              # tokens (custom properties) + base + componentes + utilidades mínimas
├── js/
│   └── main.js                 # menú móvil, scrollspy, lightbox, tracking (≈ 3–4 KB sin minificar)
├── fonts/
│   ├── berthold-script-400.woff2     # subset latino
│   ├── merriweather-400.woff2
│   └── merriweather-700.woff2
├── img/
│   ├── hero/        hero-480.avif|webp, hero-960.avif|webp, hero-1600.avif|webp
│   ├── eventos/     bautizo-{400,800}.{avif,webp} …
│   ├── galeria/     galeria01-{400,800,1200}.{avif,webp} …
│   ├── fondos/      decorativos (solo los que sobrevivan, ver §5)
│   ├── og/          meta.jpg (1200×630), x.jpg (1200×675)
│   └── icons/       favicon.svg (vector real), favicon.ico, apple-touch-icon.png, icon-192/512(+maskable).png, mask-icon.svg
├── favicon.ico                 # copia en raíz (los navegadores lo piden ahí)
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
├── _headers                    # caché y seguridad en Netlify
├── netlify.toml                # redirects (www→raíz, ya existe en el dominio) y headers si se prefiere
├── tools/
│   └── optimize-images.mjs     # script ocasional (npx sharp) para generar derivados; NO es un build
├── referencia/                 # build actual movido aquí (assets/, images/, fonts/, icons/ viejos) hasta aprobar su retiro
└── docs/
```

Reglas: nada de dependencias en tiempo de ejecución; sin CDN; un solo CSS y un solo JS; los derivados de imagen se generan con un script manual y se versionan. Los assets actuales **no se borran**: se mueven a `referencia/` y solo se eliminan con tu aprobación. Como producción es `main`, nada de esto afecta al sitio en vivo hasta que se haga el merge.

---

## 2. Mapa de secciones (mobile first) y jerarquía de encabezados

Un solo `<h1>`. Landmarks nativos (`header`, `nav`, `main`, `section`, `footer`), sin `role` redundantes ni `tabindex="0"` en elementos no interactivos. Enlace “Saltar al contenido” al inicio.

```
<body>
  <a class="skip" href="#contenido">Saltar al contenido</a>
  <header>                                  logo = <a> con texto (NO es encabezado)
    <nav aria-label="Principal">            Inicio · Nosotros · Eventos · Galería · Contacto
    íconos WhatsApp / Facebook (texto visible o aria-label que contiene el texto visible)
  <main id="contenido">
    <section id="inicio" aria-labelledby="t-inicio">
      <h1 id="t-inicio">Jardín Cristel</h1>             ← único h1 (script grande)
      <p>Jardín para eventos en Tepotzotlán</p>        ← keyword visible, no oculta
      <p>texto de la propuesta de valor</p>
      CTA principal: WhatsApp · CTA secundario: “Conoce nuestros eventos” (#eventos)
    <section id="nosotros">
      <h2>Una celebración inolvidable en Tepotzotlán</h2>  (antes un h3 con la frase de marca)
      texto + foto
    <section id="eventos">
      <h2>Nuestros eventos</h2>
        <article><h3>Boda</h3>…  × 6 (Bautizo, 1a Comunión, XV Años, Boda, Graduación, Empresarial)
    <section id="paquete">                   (si se aprueba, reemplaza al modal; ver §8)
      <h2>Qué incluye nuestro paquete</h2>
        <h3>Menú a elegir</h3>
    <section id="galeria">
      <h2>Galería</h2>  rejilla de <figure>/<a> con <img> → <dialog> lightbox
    <section id="contacto">
      <h2>Contacto</h2>
        <address> dirección, teléfono, WhatsApp, Facebook
        <h3>Cómo llegar</h3> mapa (imagen enlazada o embed diferido)
    <section id="faq">  (opcional, §8)  <h2>Preguntas frecuentes</h2> <details>…
  <footer>  © <año> Jardín Cristel · Facebook · (aviso de privacidad)
  barra/botón flotante de WhatsApp (solo móvil)
  <dialog id="lightbox">
```

Reglas de contenido: ningún salto de nivel (h1→h2→h3), ninguna sección sin título (los títulos puramente visuales usan `aria-label`), textos de cabecera solo una vez en el DOM (se acaban las versiones duplicadas móvil/desktop: un solo texto responsive; si el texto largo del hero debe diferir por pantalla, se escribe uno solo y se ajusta el layout).

Mobile First: el CSS base es el de 360 px; `@media (min-width: 48em)` (768) y `(min-width: 64em)` (1024) añaden columnas, menú horizontal y fondos grandes. Áreas táctiles ≥ 44×44 px, tipografía base 16–18 px, sin hover como único canal.

---

## 3. Cómo se resuelve cada hallazgo

| # | Hallazgo | Solución en la reconstrucción |
|---|---|---|
| H1 | www vs sin www | Dominio canónico `https://jardincristel.mx`: `<link rel="canonical">`, `og:url`, `og:image`, JSON-LD `url`/`@id`, `Sitemap:` y `<loc>` sin `www`. Ver §6. |
| H2 | `sw.js` 404 | No se registra service worker. Se elimina la llamada. (PWA offline no aporta a un sitio de cotización; reevaluable.) |
| H3 | Contraste AA | Nuevo token `--malva-600: #9c5460` (contraste 5.4:1 sobre marfil-50, 4.9:1 sobre malva-50) para fondos con texto marfil y para títulos; `#b76e79` solo como decorativo. Verificar con axe/Lighthouse. |
| H4 | Jerarquía de encabezados | Un solo h1, sin saltos, logo no es encabezado, sin `role="heading"`/`aria-level`. Ver §2. |
| H5 | Render solo en cliente | Todo el contenido está en `index.html`; JS solo mejora (menú, lightbox, tracking). Funciona sin JS. |
| H6 | Fuentes | Tres WOFF2 con subset latino (≈ 20–30 KB c/u en lugar de 140–190 KB), `preload` de las críticas, `font-display`, fallback con métricas ajustadas. Ver §4. |
| H7 | Sin código fuente | Se resuelve de raíz: el repo pasa a ser la fuente, editable a mano. |
| H8 | JSON-LD incompleto | `@type: ["EventVenue","LocalBusiness"]` con `@id`, `image`, `sameAs` (Facebook), `geo`, `hasMap`, `openingHoursSpecification`, `priceRange`, `telephone` en E.164, `maximumAttendeeCapacity` (150, ver pendientes), `areaServed`. Validar con Rich Results Test. |
| H9 | `robots.txt` ruidoso | `User-agent: *` / `Allow: /` / `Sitemap: https://jardincristel.mx/sitemap.xml`. |
| H10 | Sitemap | Una URL canónica sin `www`, `lastmod` real; sin `changefreq`/`priority` (Google los ignora). Se actualiza con cada publicación (puede automatizarlo el hook de git en un paso posterior). |
| H11 | Nombre accesible | Los enlaces de WhatsApp/teléfono usan texto visible y, si llevan `aria-label`, **empieza con** el texto visible (“Hablemos por WhatsApp”). Los botones solo-icono llevan `aria-label` simple y coherente. |
| H12 | Caché | `_headers`: `/css/*`, `/js/*`, `/fonts/*`, `/img/*` → `public, max-age=31536000, immutable` con nombres versionados (`styles.v1.css` o query de versión); HTML → `max-age=0, must-revalidate`. Más cabeceras de seguridad (HSTS ya existe, `X-Content-Type-Options`, `Referrer-Policy`, CSP conservadora). |
| H13 | Imágenes pesadas | Derivados AVIF/WebP con `srcset`/`sizes`; fondos decorativos solo en ≥768 y por `image-set()`; el menú móvil ya no precarga un fondo; los fondos pesados (100–205 KB) se rehacen más ligeros o se sustituyen por CSS (gradientes/SVG). Ver §5. |
| H14 | Terceros / gtag | gtag cargado con `async` y diferido a `load`/idle, `preconnect` a googletagmanager, y tracking por delegación (ver §7). Valorar Consent Mode. |
| H15 | Manifest / iconos | `manifest.webmanifest` con `theme_color`/`background_color` = color de marca (igual que `<meta theme-color>`), iconos 192/512 + maskable, sin tile 270 mal declarado. |
| H16 | Metas sin efecto | Se eliminan `keywords` y `referrer: no-referrer` (se usa `strict-origin-when-cross-origin`); `format-detection` se quita (teléfono con `tel:` explícito). |
| H17 | `twitter:url` | Se elimina; `twitter:image:alt` específico por imagen. |
| H18 | `browserconfig.xml` | Se elimina (IE/Edge legado). Se retira de `referencia/` solo con aprobación. |
| H19 | favicon.svg 428 KB | Favicon SVG **vectorial real** (< 5 KB) a partir del logo; si no existe vector, se usa PNG/ICO optimizados y se omite el SVG. `android-chrome-512` optimizado (oxipng/AVIF-safe PNG ≈ 40 KB). |
| N1 | `hero.webp` en móvil | El hero pasa a `<picture>` con `srcset` (480/960/1600) y `sizes`; móvil descarga ~15–25 KB. |
| N2 | Hover inexistente | Tokens `--lavanda-700` etc. definidos; estados `:hover`, `:active`, `:focus-visible` reales. |
| N3 | Modal genérico | Contenido del paquete como sección en página (o `<dialog>` nativo si se prefiere modal); contenido propio por evento si Emmanuel lo provee. |
| N4 | Accesibilidad modal/lightbox | `<dialog>` nativo (`showModal()`): Escape, foco atrapado y restauración de foco incluidos; controles `<button>`. |
| N5 | Imágenes duplicadas / tamaños | Una sola `<img>` por foto; `width`/`height` reales. |
| N6 | JS de depuración | Sin `console.log`; scroll suave solo por CSS con `scroll-margin-top` para el header fijo; scrollspy con `IntersectionObserver`. |
| N7 | Textos | Corrección de tildes, meta description ≤ 155 caracteres, año del copyright. Cualquier cambio de redacción se valida con Emmanuel. |

---

## 4. Estrategia de LCP

Hoy el LCP (4.9 s en móvil) es el `<h2>` del hero: ~330 ms de TTFB + ~2.2 s esperando a que el JS pinte la página y a que cargue la fuente script (TTF 188 KB). Plan:

1. **Contenido en el HTML**: el h1 y el texto del hero existen en el documento inicial; el navegador los pinta sin esperar JS.
2. **Imagen del hero como `<img>`**, no como `background-image`: `<picture>` con `<source type="image/avif">` + `<source type="image/webp">`, `srcset` 480w/960w/1600w, `sizes="100vw"`, `width`/`height` explícitos, `fetchpriority="high"`, `decoding="async"`, **sin** `loading="lazy"`. `<link rel="preload" as="image" imagesrcset=… imagesizes="100vw" fetchpriority="high">` en el `<head>`.
3. **Fuentes**: WOFF2 con subset latino (`pyftsubset`, `unicode-range` U+0020-007E, U+00A0-00FF, comillas, ¡¿, €, —). `<link rel="preload" as="font" type="font/woff2" crossorigin>` solo para Berthold Script (h1) y Merriweather Regular. `font-display: swap` (cuerpo) y, para la fuente script del h1, `swap` con un fallback ajustado (`size-adjust`, `ascent-override`) para que el cambio no mueva el layout (CLS ≈ 0).
4. **CSS**: un solo archivo pequeño (objetivo < 12 KB), sin reset gigante; el CSS del primer viewport al principio. Si hiciera falta, inline del crítico (< 8 KB) y `css/styles.css` con `preload`/`media` trick; solo se decide con medición.
5. **JS**: `type="module"` o `defer`, < 5 KB, sin trabajo en el hilo principal antes del LCP; gtag después del evento `load`.
6. **Fondos decorativos fuera de la ruta crítica**: no aparecen en el primer viewport móvil; se cargan por CSS solo en las secciones inferiores y ≥768 px, con `content-visibility: auto` en las secciones largas.
7. **Imágenes de contenido**: `loading="lazy"` + `decoding="async"` con `width`/`height` y `aspect-ratio` (evita CLS); `sizes` realistas (`(min-width: 64em) 33vw, (min-width: 48em) 50vw, 100vw`).
8. **Caché inmutable** (H12) para repetición de visitas, y cabeceras `Link: <…>; rel=preload` opcionales en `_headers` (103 Early Hints en Netlify si aplica).
9. **Medición**: Lighthouse móvil 3 corridas (mediana) tras cada bloque que afecte al render; comparación con `baseline/` en la bitácora.

Resolución de imágenes: las fotos actuales miden 530×386 y no admiten buenas versiones 2×/1600; el hero (1728×1080) sí. Para `srcset` de verdad hacen falta **originales** (ver pendientes). Mientras tanto se generan AVIF/WebP a partir de lo existente sin reescalar hacia arriba.

---

## 5. Imágenes y fondos decorativos

- Herramienta: `tools/optimize-images.mjs` (`npx sharp`), ejecutada a mano; resultados versionados en `img/`. No hay paso de build en despliegue.
- Formatos: AVIF (q≈50) + WebP (q≈75) con fallback JPEG solo para `og:image` (WhatsApp/Facebook no leen AVIF/WebP de forma fiable).
- Fondos (`bg-*.webp`, 1.1 MB en total): evaluar uno por uno. Los que son ilustraciones/patrones se rehacen vectoriales (SVG < 10 KB) o se reducen; los que queden se cargan solo ≥768 px. Móvil: fondos mínimos o color sólido para quitar ~250 KB de la carga.
- Mapa: hoy captura estática de 16 KB enlazada a Maps. Se mantiene (cero JS, cero terceros); opcional `<iframe loading="lazy">` de Google Maps si se desea interactividad (decisión pendiente).
- Alts descriptivos por imagen (se conservan los actuales, ya buenos), `alt=""` para decorativas.

---

## 6. Dominio canónico sin www

Todo apunta a **`https://jardincristel.mx`** (ya es el host que sirve Netlify; `www` hace 301).

| Elemento | Valor |
|---|---|
| `<link rel="canonical">` | `https://jardincristel.mx/` |
| `og:url` | `https://jardincristel.mx/` |
| `og:image` / `twitter:image` | `https://jardincristel.mx/img/og/meta.jpg` · `…/x.jpg` (rutas absolutas, tipo y dimensiones declaradas) |
| JSON-LD | `"@id": "https://jardincristel.mx/#venue"`, `"url": "https://jardincristel.mx/"`, `"image"`, `"hasMap"` |
| `sitemap.xml` | `<loc>https://jardincristel.mx/</loc>` |
| `robots.txt` | `Sitemap: https://jardincristel.mx/sitemap.xml` |
| Redirección | `www` → raíz (301) en Netlify (verificar que se mantiene tras el merge) y `http` → `https` |

Verificación: Search Console con la propiedad de dominio, inspección de URL y Rich Results Test; cualquier mención de `www.` en el repo falla un `grep` de control (se añade a la lista de QA).

---

## 7. Tracking GA4 con delegación de eventos

**Problema actual:** el script de `index.html` enlaza `click` a cada `a, button` *antes* de que el JS genere la página, así que probablemente no registra nada.

**Solución:** un único listener en `document` (`click`, fase de captura), independiente del momento en que se pinte el DOM, leyendo atributos `data-*` del HTML:

```html
<a href="https://wa.me/5215536476032?text=…"
   data-track="whatsapp" data-track-location="hero">Hablemos por WhatsApp</a>
```

```js
document.addEventListener('click', e => {
  const el = e.target.closest('[data-track]');
  if (!el) return;
  gtag('event', EVENTS[el.dataset.track], {
    link_location: el.dataset.trackLocation,   // hero, header, nosotros, evento-boda, contacto, flotante, modal
    link_text: el.textContent.trim().slice(0, 60),
    link_url: el.href,
    transport_type: 'beacon'                   // sobrevive a la navegación/nueva pestaña
  });
});
```

Con `window.dataLayer` y un stub `gtag()` en el `<head>` para que el evento nunca se pierda aunque gtag.js aún no haya cargado.

| `data-track` | Evento GA4 | Parámetros | Notas |
|---|---|---|---|
| `whatsapp` | `click_whatsapp` | `link_location`, `event_type` (si aplica), `link_url` | marcar como **evento clave** (conversión) |
| `phone` | `click_phone` | `link_location` | evento clave |
| `maps` | `click_maps` | `link_location` | |
| `facebook` | `click_facebook` | `link_location` | |
| `cta` | `click_cta` | `cta_name`, `link_location` (“Conoce nuestros eventos”, “Ver galería”) | |
| `evento` | `select_event_type` | `event_type` (boda, xv…) | si se mantiene botón por evento |
| (auto) | `view_item_list`/`scroll`/`page_view` | — | los estándar de GA4 |

Detalles: los eventos de teléfono y WhatsApp son los de negocio; los `data-*` hacen que añadir un enlace nuevo no requiera tocar JS; se documentan en `docs/tracking.md` (nombres, parámetros, dimensiones personalizadas a registrar en GA4). Verificación: DebugView + `Tag Assistant`; prueba manual móvil. Consentimiento (aviso de privacidad / Consent Mode v2) queda como decisión pendiente.

---

## 8. Plan de implementación (un commit por bloque)

Cada bloque termina con una entrada en `docs/BITACORA.md` y un commit en español (`feat:`/`fix:`/`perf:`/`docs:`/`style:`), solo en `modernizacion`. Medición con Lighthouse al cerrar los bloques 4, 7 y 9.

| Bloque | Contenido | Commit sugerido |
|---|---|---|
| 0 | Mover el build actual a `referencia/` (sin borrar) y dejar listo el esqueleto | `docs: mover build actual a referencia` |
| 1 | `css/styles.css`: tokens (`--malva-600`, etc.), reset mínimo, tipografía, utilidades; fuentes WOFF2 subset y `@font-face` | `feat: tokens de diseño y fuentes WOFF2` |
| 2 | `<head>` completo: metas, canonical, OG/Twitter, JSON-LD, iconos, manifest, preloads | `feat: head, SEO y datos estructurados` |
| 3 | Header + navegación (móvil con `<button>`/`hidden`, desktop horizontal) + hero con `<picture>` y fetchpriority | `feat: header y hero con contenido en HTML` |
| 4 | Nosotros + Eventos (6 `<article>`), imágenes responsivas | `feat: secciones nosotros y eventos` |
| 5 | Paquete (sección o `<dialog>`) + galería con lightbox `<dialog>` | `feat: paquete y galería accesible` |
| 6 | Contacto, mapa, footer, botón flotante de WhatsApp | `feat: contacto, footer y CTA flotante` |
| 7 | `js/main.js`: menú, scrollspy, lightbox, **tracking delegado**; `docs/tracking.md` | `feat: JS mínimo y tracking GA4 por delegación` |
| 8 | `tools/optimize-images.mjs` + derivados AVIF/WebP + fondos aligerados + favicons reales | `perf: imágenes responsivas AVIF/WebP y fondos ligeros` |
| 9 | `robots.txt`, `sitemap.xml`, `_headers`/`netlify.toml`, `404.html` | `feat: robots, sitemap, caché y 404` |
| 10 | QA: Lighthouse (móvil/desktop), axe, teclado, lector de pantalla, Rich Results, W3C validator, prueba sin JS, tabla comparativa vs `baseline/` | `docs: benchmark posterior y QA` |
| 11 | Revisión final con Emmanuel; retiro de `referencia/` (solo con su OK); PR a `main` (lo decide Emmanuel) | — |

Criterio de “hecho” por bloque: validación HTML, sin errores en consola, sin `www.` en el repo, Lighthouse no empeora respecto al bloque anterior.

---

## 9. Decisiones pendientes para Emmanuel

**Contenido**
1. **Paquete por evento:** ¿el “Paquete completo” (70–150 personas, 6 hrs, DJ, inflable, etc.) aplica igual a bautizo, boda, graduación y empresarial? ¿Hay paquetes distintos? ¿Se muestran precios o “desde $X”?
2. **Capacidad y horarios:** confirmar mínimo 70 / máximo 150 y el costo extra de carpa y pista (para JSON-LD y FAQ); horario de atención y de visitas.
3. **Cumpleaños:** el texto de Nosotros los menciona pero no hay tarjeta. ¿Se agrega? ¿Y otros eventos (baby shower, aniversarios, posadas)?
4. **Redacción:** “pueblo mágico” vs “centro de Tepotzotlán”, meta description más corta (≤155 caracteres), corregir “Llamanos”, “jardin”, “San Martin”. ¿Aprueba que se unifique el tono?
5. **Dirección y datos legales:** dirección exacta con código postal 54600, ¿correo electrónico? (hoy no hay `mailto`), ¿Instagram/TikTok/Google Business Profile?
6. **Aviso de privacidad y cookies:** ¿se agrega? (recomendado por GA4 y por LFPDPPP).
7. **Mensaje de WhatsApp:** texto precargado actual (con diferencias entre el sitio y el modal); ¿se mantiene? ¿Uno por tipo de evento (“quiero cotizar una boda”)?

**Material gráfico**
8. **Originales en alta resolución** de las fotos (las actuales son de 530 px); ¿hay más fotos o video? Imagen para `og:image` con logo.
9. **Logo vectorial** (SVG/AI/PDF) para favicon y header; hoy el favicon es un PNG incrustado.
10. **Tipografía:** ¿licencia de Berthold Script BQ (comercial) para web? Si no, buscar una script libre equivalente.
11. **Fondos decorativos:** ¿son parte esencial de la identidad o se pueden simplificar en móvil?

**UX / funcionalidad (propuestas, nada se implementa sin su OK)**
12. **Botón flotante de WhatsApp** persistente (hoy hay barra solo en móvil): ¿barra inferior, botón circular, o ambos?
13. **Carrusel de eventos** en móvil (scroll-snap, sin librerías) en lugar de seis tarjetas apiladas.
14. **Sección de preguntas frecuentes** (capacidad, anticipo, horarios, estacionamiento, alimentos externos, descorche) con datos estructurados `FAQPage`.
15. **Testimonios / reseñas** (Google, Facebook) con permiso de los autores; con `AggregateRating` solo si son reales y verificables.
16. **Formulario de cotización** (fecha, tipo de evento, invitados) además de WhatsApp: requiere servicio de envío (Netlify Forms) y política de privacidad.
17. **Calendario de disponibilidad** (fechas ocupadas) o solo “consulta fechas”.
18. **Mapa interactivo** (iframe diferido) vs. imagen enlazada actual.
19. **Video corto** del jardín en el hero o la galería (peso/LCP: solo con póster ligero y carga bajo demanda).
20. **Analítica:** ¿se mantiene GA4 `G-DNF30KJ0Y7`? ¿Quién accede al panel para marcar `click_whatsapp` y `click_phone` como eventos clave? ¿Consent Mode v2?

**Técnicas / operación**
21. **Dominio:** confirmar que el canónico es **`jardincristel.mx` sin www** (así responde hoy) y que no se quiere el contrario.
22. **Retiro de `referencia/`:** cuándo borrar el build antiguo (regla: no se borra nada sin tu aprobación).
23. **Despliegue:** ¿se hace PR a `main` y Netlify publica automáticamente? ¿Se quiere un deploy preview de `modernizacion` para validar antes?
24. **Metas de performance** de la sección inicial: ¿ok con Performance ≥ 95 móvil y peso inicial ≤ 300 KiB?
