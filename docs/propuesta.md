# Propuesta de reconstrucción — Jardín Cristel

Decisión tomada: reconstruir como **HTML semántico estático**, sin build ni framework, con el contenido escrito en el HTML, CSS propio con custom properties y JS vanilla mínimo. Mobile First. El build actual (`assets/`) queda solo como referencia. Base de datos: `docs/inventario.md` y `docs/benchmark/hallazgos.md`.

**Objetivos medibles (móvil, Lighthouse):** Performance ≥ 95, LCP ≤ 2.0 s (hoy 4.9 s), CLS ≤ 0.02, TBT ≤ 50 ms, Accessibility 100, Best Practices 100, SEO 100; peso inicial de la página ≤ 300 KiB (hoy 902 KiB).

**Principio de identidad:** se **conserva la identidad de `referencia/` y se optimiza**: paleta malva / lavanda / marfil, el logo “Jardín Cristel” y los títulos en estilo script caligráfico (Berthold Script en la referencia; **Pinyon Script, OFL, como fuente temporal**, decisión #10), acuarelas florales y arcos. Mejoran el diseño gráfico, la UX/UI y la tecnología (HTML semántico estático, CSS propio con custom properties, JS vanilla; **sin Tailwind ni Vite**). El sistema de diseño optimizado está en `docs/diseno.md` y el catálogo de imágenes en `docs/imagenes.md`. (Un intento de rediseño completo se probó como prototipo y se descartó; ver §11.)

---

## 1. Arquitectura de archivos

```
/
├── index.html                  # página única, contenido en HTML
├── 404.html                    # página de error simple
├── css/
│   └── styles.css              # tokens (custom properties) + base + componentes + utilidades mínimas
├── js/
│   └── main.js                 # <details> de “Qué incluye”, galería, scrollspy, tracking GA4 + Clarity diferido (≈ 4–5 KB sin minificar)
├── fonts/
│   ├── pinyon-script-400.woff2       # H1 y H2; OFL, temporal (decisión #10); subset latino, 24.5 KB (+ OFL-pinyon-script.txt)
│   ├── merriweather-400.woff2        # OFL; subset latino
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
├── referencia/                 # build anterior completo y funcional (index.html, assets/, images/, fonts/, icons/, manifest.json); noindex; se retira 2 semanas después del merge (decisión #22)
└── docs/
```

Reglas: nada de dependencias en tiempo de ejecución; sin CDN; un solo CSS y un solo JS; los derivados de imagen se generan con un script manual y se versionan. Los assets actuales **no se borran**: ya están en `referencia/` (bloque 0, hecho) y se retiran dos semanas después del merge a `main` (decisión #22). `robots.txt`, `sitemap.xml` y `favicon.ico` siguen en la raíz hasta el bloque 9. Como producción es `main`, nada de esto afecta al sitio en vivo hasta que se haga el merge.

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
    <section id="incluye">                   “Qué incluye tu evento”: sin modal (ver docs/diseno.md §3)
      <h2>Qué incluye tu evento</h2>  4 categorías (<details> en móvil)
        <h3>Menú a elegir</h3>
    <section id="galeria">
      <h2>Galería</h2>  carrusel scroll-snap (móvil) / imagen principal + miniaturas (desktop), en página
    <section id="ubicacion">   (2026-10-21: separada de Contacto; ver docs/diseno.md §10)
      <h2>Ubicación</h2>  <address>, “Abrir en Google Maps”, mapa bajo demanda
    <section id="contacto">
      <h2>Contacto</h2>  WhatsApp, teléfono, Facebook
    <section id="faq">  (opcional, §8)  <h2>Preguntas frecuentes</h2> <details>…
  <footer>  © <año> Jardín Cristel · Facebook · (aviso de privacidad)
  CTA “Cotizar” por WhatsApp: botón central de la barra inferior (móvil) o en la barra superior (tablet/desktop); ver §10
  (sin <dialog> ni lightbox: no hay modales)
```

Reglas de contenido: ningún salto de nivel (h1→h2→h3), ninguna sección sin título (los títulos puramente visuales usan `aria-label`), textos de cabecera solo una vez en el DOM (se acaban las versiones duplicadas móvil/desktop: un solo texto responsive; si el texto largo del hero debe diferir por pantalla, se escribe uno solo y se ajusta el layout).

Mobile First: el CSS base es el de 360 px; `@media (min-width: 48em)` (768) y `(min-width: 64em)` (1024) añaden columnas, menú horizontal y fondos grandes. Áreas táctiles ≥ 44×44 px, tipografía base 16–18 px, sin hover como único canal.

---

## 3. Cómo se resuelve cada hallazgo

| # | Hallazgo | Solución en la reconstrucción |
|---|---|---|
| H1 | www vs sin www | Dominio canónico `https://jardincristel.mx`: `<link rel="canonical">`, `og:url`, `og:image`, JSON-LD `url`/`@id`, `Sitemap:` y `<loc>` sin `www`. Ver §6. |
| H2 | `sw.js` 404 | No se registra service worker. Se elimina la llamada. (PWA offline no aporta a un sitio de cotización; reevaluable.) |
| H3 | Contraste AA | Tokens nuevos de `docs/diseno.md` §1, verificados con `tools/contraste.mjs` (25 pares, 0 fallos): `malva-500 #a0505c` para fondos con texto marfil (5.50:1), `malva-400 #b76e79` solo para títulos ≥ 24 px y decoración (3.4–3.8:1, AA texto grande), `malva-600 #8f4752` para hover y enlaces (6.5:1), foco de 2 px con offset. Verificar además con axe/Lighthouse. |
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
| N3 | Modal genérico | **Sin modales**: sección “Qué incluye tu evento” en la página (4 categorías; `<details>` en móvil), CTA por tarjeta con WhatsApp prellenado por evento y enlace “Ver qué incluye”; contenido propio por evento si Emmanuel lo provee (`docs/diseno.md` §3). |
| N4 | Accesibilidad modal/lightbox | Al eliminar modal y lightbox desaparece el problema; la galería en página usa botones/enlaces reales, `scroll-snap` y foco visible (`docs/diseno.md` §3). |
| N5 | Imágenes duplicadas / tamaños | Una sola `<img>` por foto; `width`/`height` reales. |
| N6 | JS de depuración | Sin `console.log`; scroll suave solo por CSS con `scroll-margin-top` para el header fijo; scrollspy con `IntersectionObserver`. |
| N7 | Textos | Corrección de tildes, meta description ≤ 155 caracteres, año del copyright. Cualquier cambio de redacción se valida con Emmanuel. |

---

## 4. Estrategia de LCP

Hoy el LCP (4.9 s en móvil) es el `<h2>` del hero: ~330 ms de TTFB + ~2.2 s esperando a que el JS pinte la página y a que cargue la fuente script (TTF 188 KB). Plan:

1. **Contenido en el HTML**: el h1 y el texto del hero existen en el documento inicial; el navegador los pinta sin esperar JS.
2. **Imagen del hero como `<img>`**, no como `background-image`: `<picture>` con `<source type="image/avif">` + `<source type="image/webp">`, `srcset` 480w/960w/1600w, `sizes="100vw"`, `width`/`height` explícitos, `fetchpriority="high"`, `decoding="async"`, **sin** `loading="lazy"`. `<link rel="preload" as="image" imagesrcset=… imagesizes="100vw" fetchpriority="high">` en el `<head>`.
3. **Fuentes**: WOFF2 con subset latino (`pyftsubset`, `unicode-range` U+0020-007E, U+00A0-00FF, comillas, ¡¿, €, —). `<link rel="preload" as="font" type="font/woff2" crossorigin>` solo para Pinyon Script (h1) y Merriweather Regular. `font-display: swap` (cuerpo) y, para la fuente script del h1, `swap` con un fallback ajustado (`size-adjust`, `ascent-override`) para que el cambio no mueva el layout (CLS ≈ 0).
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

> **Plan vigente: `docs/medicion.md`** (GA4, Microsoft Clarity, Search Console, Business Profile, aviso de privacidad, tablero y checklist). Esta sección conserva el razonamiento original; **si difiere, manda `docs/medicion.md`**. Diferencias principales: los eventos de clic son `click_whatsapp` (con `link_location` y `event_type`), `click_phone`, `click_maps` y `click_facebook`; se agregan `view_que_incluye`, `open_categoria_incluye` y `gallery_navigate`; desaparecen `click_cta` y `select_event_type`; el tracking solo corre en `jardincristel.mx`.

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

Detalles: los eventos de teléfono y WhatsApp son los de negocio; los `data-*` hacen que añadir un enlace nuevo no requiera tocar JS; se documentan en `docs/medicion.md` (nombres, parámetros, dimensiones personalizadas a registrar en GA4). Verificación: DebugView + `Tag Assistant`; prueba manual móvil. Consentimiento (aviso de privacidad / Consent Mode v2) queda como decisión pendiente.

---

## 8. Plan de implementación (un commit por bloque)

**Condición de merge (decisión #10): no mergear a `main` sin el SVG final y la licencia confirmada.**

⚑ = dependía de la aprobación del sistema de diseño (`docs/diseno.md`), **aprobado el 2026-10-20: bloques desbloqueados**. ◐ = parcial en el piloto · ⏳ = pendiente. Cada bloque termina con una entrada en `docs/BITACORA.md` y un commit en español (`feat:`/`fix:`/`perf:`/`docs:`/`style:`), solo en `modernizacion`. Medición con Lighthouse al cerrar los bloques 4, 7 y 9.

| Bloque | Contenido | Commit sugerido |
|---|---|---|
| — | **Bloques 1 y 3–6 desbloqueados** (`docs/diseno.md` aprobado el 2026-10-20). **Piloto implementado** en `index.html`, `css/styles.css` y `js/main.js` (hero, eventos y “Qué incluye tu evento”); mediciones y capturas en `docs/benchmark/piloto/`. | |
| 0 ✅ | Mover el build actual a `referencia/` (sin borrar) y dejar listo el esqueleto (`index.html` provisional, `netlify.toml`, carpetas) — **hecho** | `docs: mover build actual a referencia…` · `feat: esqueleto…` |
| 1 ◐ | `css/styles.css`: tokens de `docs/diseno.md`, reset mínimo, tipografía, utilidades; fuentes WOFF2 subset y `@font-face` | `feat: tokens de diseño y fuentes WOFF2` |
| 2 | `<head>` completo: metas, canonical, OG/Twitter, JSON-LD, iconos, manifest, preloads | `feat: head, SEO y datos estructurados` |
| 3 ◐ | Header + navegación (móvil con `<button>`/`hidden`, desktop horizontal) + hero con `<picture>` y fetchpriority | `feat: header y hero con contenido en HTML` |
| 4 ◐ | Nosotros + Eventos (6 `<article>`), imágenes responsivas | `feat: secciones nosotros y eventos` |
| 5 ◐ | Sección “Qué incluye tu evento” (sin modal) + galería en página (carrusel / principal + miniaturas) | `feat: qué incluye y galería en página` |
| 6 ⏳ | Contacto, mapa, footer, botón flotante de WhatsApp | `feat: contacto, footer y CTA flotante` |
| 7 | `js/main.js`: `<details>` de “Qué incluye”, galería, scrollspy, **tracking GA4 por delegación con `data-*`** y **Microsoft Clarity** diferido (`load` + `requestIdleCallback`, ID de Clarity `z0uyber2t9`); dimensiones personalizadas, eventos clave, Search Console, UTM de Business Profile/Facebook, aviso de privacidad y checklist de verificación según **`docs/medicion.md`** | `feat: JS mínimo, tracking GA4 por delegación y Clarity diferido` |
| 8 | `tools/optimizar-imagenes.cjs` + derivados AVIF/WebP + fondos aligerados + favicons reales | `perf: imágenes responsivas AVIF/WebP y fondos ligeros` |
| 9 | `robots.txt`, `sitemap.xml`, `_headers`/`netlify.toml`, `404.html` | `feat: robots, sitemap, caché y 404` |
| 10 | QA: Lighthouse (móvil/desktop), axe, teclado, lector de pantalla, Rich Results, W3C validator, prueba sin JS, tabla comparativa vs `baseline/` | `docs: benchmark posterior y QA` |
| 11 | Revisión final con Emmanuel; retiro de `referencia/` (solo con su OK); PR a `main` (lo decide Emmanuel) | — |

**Estado tras el piloto (2026-10-20).** 1 ◐ tokens, fuentes WOFF2 (Pinyon Script, Merriweather) y base CSS; faltan los demás componentes · 2 ◐ `title`, `description`, `canonical` y `noindex` provisional; faltan Open Graph, JSON-LD, iconos y manifest · 3 ◐ header, navegación por layout y hero (`<picture>` AVIF/WebP, logo marcador, CTA con mensaje prellenado) · 4 ◐ Eventos hecho; falta Nosotros · 5 ◐ “Qué incluye tu evento” hecho; falta la galería · 6 ⏳ · 7 ◐ `data-*`, GA4 por delegación, `<details>`, scrollspy; **Clarity no está cargado** (por indicación); falta `gallery_navigate` · 8 ◐ `tools/optimizar-imagenes.cjs` y derivados del hero; faltan fondos y favicons · 9, 10, 11 ⏳.

Criterio de “hecho” por bloque: validación HTML, sin errores en consola, sin `www.` en el repo, Lighthouse no empeora respecto al bloque anterior.

---

## 9. Decisiones para Emmanuel

Estado: ✅ aprobada · ⏳ pendiente del cliente. Resumen: **aprobadas** #4, #6, #10 (con condición), #12–#15, #16–#19, #21–#24; **pendientes del cliente** #1, #2, #3, #5, #7, #8, #9, #11, #20, y de #10 la licencia Desktop de Berthold Script y el SVG final del logo (**bloquean el merge a `main`**) (bloquean contenido, no la estructura).

**Contenido**
1. ⏳ **Paquete por evento:** ¿el “Paquete completo” (70–150 personas, 6 hrs, DJ, inflable, etc.) aplica igual a bautizo, boda, graduación y empresarial? ¿Hay paquetes distintos? ¿Se muestran precios o “desde $X”?
2. ⏳ **Capacidad y horarios:** confirmar mínimo 70 / máximo 150 y el costo extra de carpa y pista (para JSON-LD y FAQ); horario de atención y de visitas.
3. ⏳ **Cumpleaños:** el texto de Nosotros los menciona pero no hay tarjeta. ¿Se agrega? ¿Y otros eventos (baby shower, aniversarios, posadas)?
4. ✅ **Redacción:** “pueblo mágico” vs “centro de Tepotzotlán”, meta description más corta (≤155 caracteres), corregir “Llamanos”, “jardin”, “San Martin”. ¿Aprueba que se unifique el tono?
   - *Aprobada.*
5. ⏳ **Dirección y datos legales:** dirección exacta con código postal 54600, ¿correo electrónico? (hoy no hay `mailto`), ¿Instagram/TikTok/Google Business Profile?
6. ✅ **Aviso de privacidad y cookies:** ¿se agrega? (recomendado por GA4 y por LFPDPPP).
   - *Aprobada: se agrega aviso de privacidad y política de cookies/consentimiento; texto legal por definir.*
7. ⏳ **Mensaje de WhatsApp:** texto precargado actual (con diferencias entre el sitio y el modal); ¿se mantiene? ¿Uno por tipo de evento (“quiero cotizar una boda”)?

**Material gráfico**
8. ⏳ **Originales en alta resolución** de las fotos (las actuales son de 530 px); ¿hay más fotos o video? Imagen para `og:image` con logo.
9. ⏳ **Logo vectorial** (SVG/AI/PDF) para favicon y header; hoy el favicon es un PNG incrustado en un `.svg` de 428 KB. *(Parcialmente cubierta por #10: `img/logo.svg` es un **marcador** accesible con la imagen actual del logo; el SVG final lo entrega el cliente tras comprar la licencia Desktop.)*
10. ✅ **Licencia web de Berthold Script BQ — resuelta el 2026-10-20, con condición.** El TTF se servía públicamente (producción, `referencia/` y deploys de la rama). Decisión: **(1)** el logo “Jardín Cristel” será **SVG**; hasta que el cliente compre la **licencia Desktop** se usa **la imagen actual del logo como marcador** (`img/logo.svg`, la flor de `referencia/icons/`, con `role="img"` y `aria-label="Jardín Cristel"`); **no se vectoriza desde `Berthold-Script.ttf`**. **(2)** H1 y títulos de sección usan una **fuente libre temporal: Pinyon Script (OFL)**, WOFF2 propio con subset latino (`fonts/pinyon-script-400.woff2`, 24.5 KB, `font-display: swap`); motivos y alternativas descartadas en `docs/diseno.md` §7. **(3)** `Berthold-Script.ttf` **se retiró del despliegue de la rama** (`git rm referencia/fonts/Berthold-Script.ttf`; sigue en el historial de git); la copia de producción (`main`) se retira cuando llegue el merge. **(4) Condición: no mergear a `main` sin el SVG final y la licencia confirmada.** Pendientes del cliente: comprar la licencia Desktop y entregar el SVG final del logo. Merriweather es OFL y no tiene este problema. *No es asesoría legal: confirmar el alcance de la licencia con quien la emita.*
11. ⏳ **Fondos decorativos (acuarelas):** ¿son parte esencial de la identidad o se pueden simplificar en móvil? Propuesta de composición, menos piezas y meta de peso en `docs/diseno.md` §4.

**UX / funcionalidad (propuestas, nada se implementa sin su OK)**
12. ✅ **Botón flotante de WhatsApp** persistente (hoy hay barra solo en móvil): ¿barra inferior, botón circular, o ambos?
   - *Aprobada: la forma está definida en §10 (botón central “Cotizar” en la barra inferior móvil; botón en la barra superior en tablet/desktop).*
13. ✅ **Carrusel de eventos** en móvil (scroll-snap, sin librerías) en lugar de seis tarjetas apiladas.
   - *Aprobada: carrusel con scroll-snap en móvil (§10).*
14. ✅ **Sección de preguntas frecuentes** (capacidad, anticipo, horarios, estacionamiento, alimentos externos, descorche) con datos estructurados `FAQPage`.
   - *Aprobada: FAQ con `FAQPage`; el contenido de las respuestas depende de #1, #2 y #5.*
15. ✅ **Testimonios / reseñas** (Google, Facebook) con permiso de los autores; con `AggregateRating` solo si son reales y verificables.
   - *Aprobada **sin `AggregateRating`**: solo testimonios reales con permiso de los autores.*
16. ✅ **Formulario de cotización** (fecha, tipo de evento, invitados) además de WhatsApp: requiere servicio de envío (Netlify Forms) y política de privacidad.
   - *Aprobada: **no entra en v1** (solo WhatsApp y teléfono).*
17. ✅ **Calendario de disponibilidad** (fechas ocupadas) o solo “consulta fechas”.
   - *Aprobada: **no** habrá calendario; se invita a consultar fechas por WhatsApp.*
18. ✅ **Mapa interactivo** (iframe diferido) vs. imagen enlazada actual.
   - *Aprobada: **imagen enlazada** a Google Maps (sin iframe).*
19. ✅ **Video corto** del jardín en el hero o la galería (peso/LCP: solo con póster ligero y carga bajo demanda).
   - *Aprobada: **solo en la galería y bajo demanda** (póster ligero; el video no carga hasta que se pide).*
20. ⏳ **Analítica:** ¿se mantiene GA4 `G-DNF30KJ0Y7`? ¿Quién accede al panel para registrar las dimensiones (`link_location`, `event_type`, `categoria`) y marcar `click_whatsapp` y `click_phone` como eventos clave? ¿Consentimiento: aviso informativo (A) o Consent Mode v2 con banner (B)? Se suma **Microsoft Clarity** (proyecto creado, ID `z0uyber2t9`; falta conectarlo con GA4 en su panel) y la verificación de Search Console; detalle en `docs/medicion.md`.

**Técnicas / operación**
21. ✅ **Dominio:** confirmar que el canónico es **`jardincristel.mx` sin www** (así responde hoy) y que no se quiere el contrario.
   - *Aprobada: canónico **sin `www`**.*
22. ✅ **Retiro de `referencia/`:** cuándo borrar el build antiguo (regla: no se borra nada sin tu aprobación).
   - *Aprobada: `referencia/` se retira **dos semanas después del merge** a `main`.*
23. ✅ **Despliegue:** ¿se hace PR a `main` y Netlify publica automáticamente? ¿Se quiere un deploy preview de `modernizacion` para validar antes?
   - *Aprobada: **sí** habrá deploy preview de `modernizacion`. `netlify.toml` ya existe, pero activarlo se hace en el panel de Netlify (ver bitácora, 2026-10-20 · bloque 0).*
24. ✅ **Metas de performance** de la sección inicial: ¿ok con Performance ≥ 95 móvil y peso inicial ≤ 300 KiB?
   - *Aprobada: Performance ≥ 95 en móvil y peso inicial ≤ 300 KiB.*

---

## 10. Experiencia por dispositivo

**Un solo HTML y tres layouts por CSS.** No hay sitios separados, ni detección de user-agent, ni contenido duplicado oculto: el mismo DOM se presenta como app web en móvil, como sitio compacto en tablet y como sitio editorial en desktop. Todo lo que cambia entre layouts son reglas CSS (y, para los paneles, qué método del `<dialog>` se invoca).

> **Estado: propuesta de experiencia por dispositivo, aplicada al estilo de referencia** (identidad conservada: ver principio de identidad; sistema de diseño en `docs/diseno.md`). Los bloques 1 y 3–6 del plan (§8) dependen de su aprobación.
>
> **Ajuste del 2026-10-20 — sin modales.** Donde esta sección dice `<dialog>` para el paquete (bottom sheet / panel lateral) y para el visor de galería (pantalla completa / lightbox), rige ahora `docs/diseno.md` §3: el paquete pasa a ser la sección **“Qué incluye tu evento”** en la página (4 categorías, `<details>` en móvil, visible en tablet/desktop), y la galería vive en la página (carrusel con scroll-snap y contador en móvil; imagen principal con miniaturas en desktop). Lo demás de esta sección se mantiene: barra inferior con “Cotizar”, carril de eventos con scroll-snap, barra superior en tablet, menú horizontal con hover en desktop, media queries combinadas, manifest standalone. Ver §10.8.

### 10.1 Criterio de selección: media queries combinadas

El layout lo decide primero el **ancho** y, solo para el desktop, también el **tipo de puntero**. `hover` y `pointer` describen el dispositivo de entrada principal; no sustituyen al ancho.

| Layout | Condición | Casos que cubre |
|---|---|---|
| **Móvil** | `width < 48em` (base, sin media query) | Teléfonos; también una ventana de escritorio estrecha (recibe la UI móvil, que es la correcta para ese ancho). |
| **Tablet** | `width ≥ 48em` y **no** cumple la condición de desktop | Tablets (48em–74.99em); **pantallas más anchas con puntero táctil** (iPad Pro horizontal, pantallas táctiles grandes, Surface en modo tableta); laptops con ventana angosta. |
| **Desktop** | `width ≥ 75em` **y** `hover: hover` **y** `pointer: fine` | Laptops y monitores con mouse/trackpad. |

```css
/* Base: MÓVIL (<48em). Mobile first: sin media query. */
.nav { position: fixed; inset: auto 0 0 0; /* barra inferior */ }

/* TABLET: desde 48em. Aplica también a anchos grandes con puntero táctil. */
@media (min-width: 48em) {
  .nav { position: sticky; inset: 0 0 auto 0; /* barra superior compacta */ }
  .eventos__lista { display: grid; grid-template-columns: repeat(2, 1fr); overflow: visible; }
}

/* DESKTOP: solo con ancho amplio + hover real + puntero preciso. */
@media (min-width: 75em) and (hover: hover) and (pointer: fine) {
  .nav { /* menú horizontal con logo, enlaces y CTA */ }
  .eventos__lista { grid-template-columns: repeat(3, 1fr); }
  .paquete { display: block; position: static; }
}

/* Estados hover: SIEMPRE tras hover:hover, en cualquier ancho (un trackpad en ventana angosta también los usa). */
@media (hover: hover) { .card:hover { transform: translateY(-4px); } }

@media (prefers-reduced-motion: reduce) { * { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
```

Notas de implementación:
- Los puntos de corte van en `em` (respetan el zoom/tamaño de fuente del usuario). Las `@media` no admiten custom properties; los valores 48em y 75em se documentan en un comentario al inicio de `styles.css` y se verifican con `grep`.
- No se usa `any-pointer`: en híbridos (laptop táctil con mouse) el puntero principal manda, y el desktop se activa solo con `pointer: fine`.
- Ningún layout depende de JS para mostrarse; el JS solo **mejora** (paneles, visor, scrollspy).
- Sin imágenes duplicadas por layout: las `<img>` usan `srcset`/`sizes`, así que cada dispositivo descarga una sola variante. Los elementos que solo existen visualmente en un layout (p. ej. el item “Nosotros” en la barra inferior) se ocultan con `display: none`, lo que también los saca del árbol de accesibilidad.
- `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` y `env(safe-area-inset-*)` para notch/barras del sistema; alturas con `dvh`.

### 10.2 Componentes compartidos (un solo marcado)

| Componente | Marcado único | Móvil | Tablet | Desktop |
|---|---|---|---|---|
| **Navegación** | `<nav aria-label="Principal">` con Inicio, Nosotros, Eventos, Galería, Contacto y CTA “Cotizar” | Barra inferior fija | Barra superior compacta | Menú horizontal en header |
| **Eventos** | `<ul>` de 6 `<article>` | Carrusel scroll-snap horizontal | Rejilla de 2 columnas | Rejilla editorial de 3 columnas |
| **Paquete** | `<dialog id="paquete">` | Bottom sheet | Panel lateral | Sección visible en la página |
| **Galería** | Rejilla de `<a><img></a>` + `<dialog class="visor">` | Visor a pantalla completa con swipe | Visor con swipe y flechas | Lightbox con flechas y teclado |
| **CTA Cotizar** | `<a href="wa.me…" data-track="whatsapp">` | Botón central de la barra | Botón en la barra superior | Botón en el header |

### 10.3 Móvil (<48em): app web

> **Actualización 2026-10-21:** la barra inferior pasa a **Eventos · Galería · Cotizar · Cómo llegar · Más** (Cotizar siempre al centro); el detalle vigente está en `docs/diseno.md` §10.3.

- **Barra de navegación inferior** (`position: fixed; bottom: 0`, `padding-bottom: env(safe-area-inset-bottom)`): **Inicio · Eventos · [Cotizar] · Galería · Contacto**. Icono SVG inline + etiqueta de texto visible en cada item (no solo iconos). “Nosotros” no aparece en la barra (queda accesible por scroll y por el enlace del hero). Cada item mide ≥ 48×48 px.
  - El botón central **“Cotizar”** es un enlace a WhatsApp (`wa.me`), con diseño destacado (circular, color de acción) y `data-track="whatsapp" data-track-location="nav-inferior"`. Su `aria-label` empieza con el texto visible (“Cotizar por WhatsApp”), por H11.
  - Sección activa con `aria-current="location"` mediante `IntersectionObserver`; foco visible; `body` con `padding-bottom` para que la barra no tape el contenido.
  - El header superior es mínimo (solo logo/nombre), no contiene el menú.
- **Eventos como tarjetas con scroll-snap horizontal** (sin librerías):
  ```css
  .eventos__lista { display: grid; grid-auto-flow: column; grid-auto-columns: 82%;
    gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain; scroll-padding-inline: 1rem; }
  .evento { scroll-snap-align: center; }
  ```
  La siguiente tarjeta asoma (82 %) para sugerir el gesto; el contenedor es una región enfocable con `aria-label` para operarlo con teclado; indicador de posición opcional con `animation-timeline: scroll()` si hay soporte, si no, sin indicador. Cada tarjeta tiene su botón “Ver paquete” (abre el bottom sheet).
- **Paquete como bottom sheet con `<dialog>`**: `showModal()` desde el botón; CSS `inset: auto 0 0 0; max-height: 85dvh; border-radius: 1.75rem 1.75rem 0 0; margin: 0`, animación de entrada con `@starting-style` y `transition … allow-discrete`, asa visual arriba, botón cerrar, Escape, clic en el fondo (`::backdrop`) y gesto opcional de arrastrar hacia abajo (≈ 20 líneas de `pointer events`). El foco se atrapa y se restaura al cerrar (nativo). CTA “Cotizar paquete” dentro del sheet.
  - *Sin JS*: el botón es un enlace a `#paquete` y la regla `.paquete:target { display: block; position: static }` muestra el contenido como sección.
- **Galería a pantalla completa con swipe**: rejilla de miniaturas (2 columnas); al tocar, un `<dialog class="visor">` a `100dvh` con una tira horizontal `scroll-snap-type: x mandatory` + `scroll-snap-stop: always` de las 6 fotos: el swipe es el desplazamiento nativo (sin JS de gestos), con `touch-action: pan-x pinch-zoom` para permitir zoom con pellizco. Se abre en la foto tocada (`scrollIntoView({inline:'center', behavior:'instant'})`); contador “3 / 6” en una región `aria-live`; botón cerrar; la imagen grande se carga al abrir (variante 1200w).
- **Manifest `display: standalone`**: `manifest.webmanifest` con `id`, `start_url: "/"`, `display: "standalone"`, `display_override: ["standalone","minimal-ui"]`, `orientation: "any"` (se quita `portrait` forzado), `theme_color`/`background_color` = color de marca (igual que `<meta name="theme-color">`), iconos 192/512 y maskable, y `shortcuts` (“Cotizar por WhatsApp”, “Llamar”). Sin service worker (H2): Chrome en Android permite instalar sin él; en iOS se agrega desde Compartir → Añadir a pantalla de inicio. En modo standalone no hay barra de URL, por eso la navegación inferior y los safe areas son obligatorios.
- **View Transitions como mejora progresiva**: `document.startViewTransition` (mismo documento, no multipágina) para abrir el visor (la miniatura “se expande” con `view-transition-name`) y el bottom sheet. Todo está protegido con `if (document.startViewTransition)` y desactivado con `prefers-reduced-motion: reduce`; sin soporte, el `<dialog>` se abre igual sin transición.

### 10.4 Tablet (48em–74.99em, y anchos mayores con puntero táctil)

- **Barra superior compacta** (sticky, ≈ 56 px): logo a la izquierda, enlaces en una sola línea (icono + texto corto) y **“Cotizar”** a la derecha. Sin barra inferior.
- **Rejilla de 2 columnas** para eventos (sin carrusel), galería de 3 columnas desde 64em; Nosotros en dos columnas (texto + foto).
- **Paquete en panel lateral**: el mismo `<dialog>` como *drawer* a la derecha (`inset: 0 0 0 auto; width: min(28rem, 90vw); height: 100dvh`) que desliza desde el borde; `showModal()`, cierre con Escape, botón y clic en el fondo.
- **Visor de galería** a pantalla completa con swipe (igual que móvil) y flechas visibles; objetivos táctiles ≥ 44 px; **sin estilos hover** (todo bajo `@media (hover: hover)`).
- Pantallas táctiles grandes (≥ 75em sin mouse): mismo layout de tablet con contenedor de máx. 72rem centrado.

### 10.5 Desktop (≥75em con `hover: hover` y `pointer: fine`)

- **Menú horizontal** en el header (logo · enlaces · “Cotizar”), con `scroll-margin-top` en las secciones para compensar el header fijo y subrayado animado del enlace activo.
- **Rejilla editorial de 3 columnas**: tarjetas de eventos con desplazamientos verticales alternos, Nosotros a dos columnas con foto grande, galería asimétrica (una foto destacada + cinco). Aquí viven los **fondos decorativos** de ≥ 75em (cargados solo en este layout, ver §5).
- **Paquete visible como sección** (`#paquete`): el `<dialog>` se muestra estático (`display: block; position: static`) sin `showModal()`; los botones “Ver paquete” se ocultan y el menú enlaza a la sección.
- **Estados hover** (y `:focus-visible` siempre): tarjetas que suben 4 px, zoom 1.03 en galería, botones con tono más oscuro, flechas de lightbox con fondo. Lightbox con ← / → / Esc.
- Tracking idéntico en los tres layouts (misma delegación, `data-track-location` distinto: `nav-inferior`, `nav-superior`, `header`).

### 10.6 JS necesario (≈ 1 KB extra sobre el plan)

| Función | Qué hace | Sin JS |
|---|---|---|
| Paquete | `matchMedia('(min-width: 75em) and (hover: hover) and (pointer: fine)')` decide `showModal()` (móvil/tablet) o dejarlo como sección (desktop); escucha el cambio al rotar/redimensionar | `#paquete` por `:target` |
| Visor de galería | Abre el `<dialog>`, posiciona la foto, actualiza el contador | Las miniaturas enlazan a la imagen grande |
| Scrollspy | `aria-current` en la navegación | Navegación por anclas normal |
| View Transitions | Envuelve el abrir/cerrar | Sin animación |

### 10.7 Riesgos y verificación

- **Barra inferior en iOS/Android**: barras dinámicas del navegador y teclado; se usa `dvh`, `env(safe-area-inset-bottom)` y se prueba en Safari iOS y Chrome Android reales.
- **Híbridos y ventanas redimensionadas**: probar rotación de tablet, ventana de laptop de 1100 px, monitor táctil grande, y cambio de puntero (conectar mouse a un iPad).
- **Accesibilidad**: foco atrapado y restaurado en los tres `<dialog>`, `aria-current`, contraste AA (tabla de contrastes de la paleta elegida), objetivos táctiles ≥ 44 px, `prefers-reduced-motion`, orden de lectura coherente (el DOM es el mismo en los tres layouts).
- **Pruebas**: Lighthouse móvil y desktop por separado (metas: objetivos al inicio de este documento), DevTools con emulación táctil y 3 anchos de referencia (390, 820, 1440 px), más dispositivos reales: iPhone (Safari), Android (Chrome), iPad y laptop.
- **Una versión, un mantenimiento**: añadir un evento o una foto es editar el HTML una vez; los tres layouts lo reflejan.


---

### 10.8 Ajustes de la sección 10 por “sin modales”

| Elemento | Antes (§10.2–10.5) | Ahora |
|---|---|---|
| Paquete | `<dialog>`: bottom sheet (móvil), panel lateral (tablet), sección (desktop) | Sección `#incluye` “Qué incluye tu evento”: 4 categorías; `<details>` en móvil (cerrados salvo el primero), abierto en tablet y desktop |
| Botón de tarjeta | “Ver paquete” (abre modal) | **“Cotizar mi <evento>”** (WhatsApp prellenado) + enlace secundario “Ver qué incluye” → `#incluye` |
| Galería | Visor `<dialog>` a pantalla completa | En página: carrusel scroll-snap con contador “3 / 6” (móvil); imagen principal + miniaturas (desktop); sin lightbox |
| JS | `showModal()`, visor, scrollspy | Abrir/cerrar `<details>` según `matchMedia`, contador del carrusel, cambio de imagen principal, scrollspy, tracking |
| View Transitions | abrir visor / sheet | Opcional: transición al cambiar la imagen principal en desktop |

---

## 11. Prototipo de tres direcciones visuales — descartada

> **Descartada (2026-10-20).** Motivo: las tres direcciones (A herrería y jardín, B fiesta de pueblo, C editorial cálido) **se sentían plantilla y perdían el branding del cliente**. Se opta por optimizar la identidad de `referencia/` (ver principio de identidad y `docs/diseno.md`).
>
> El prototipo se eliminó del árbol de trabajo y **se conserva en el historial**: commit `f14d291` (`git show f14d291:prototipo/a.html`; para restaurarlo: `git checkout f14d291 -- prototipo docs/prototipo`).
>
> Aprendizajes que se conservan: la mecánica de media queries combinadas (§10.1) funcionó en los tres layouts; el orden de foco del botón central “Cotizar” en la navegación debe resolverse al implementar; la verificación de contraste por script (`tools/contraste.mjs`) y las capturas por Playwright a 390/820/1440 px son un buen método de QA.
