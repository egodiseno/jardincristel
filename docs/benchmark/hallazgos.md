# Hallazgos — línea base (2026-10-20)

Fuente: Lighthouse 12.8.2 contra https://jardincristel.mx (reportes en `docs/benchmark/baseline/`) + revisión del código del repo. No incluye propuestas de diseño.

## Baseline Lighthouse

| Métrica | Móvil | Desktop |
|---|---|---|
| Performance | **74** | 98 |
| Accessibility | 94 | 95 |
| Best Practices | 96 | 96 |
| SEO | 100 | 100 |
| FCP | 2.5 s | 0.8 s |
| LCP | **4.9 s** | 0.8 s |
| CLS | 0.004 | 0.017 |
| TBT | 130 ms | 0 ms |
| Speed Index | 4.9 s | 1.2 s |
| Peso total transferido | 902 KiB | 1,678 KiB |

El LCP móvil es el `<h2 id="inicio-heading">` del hero: 330 ms de TTFB y **~2.2 s de retraso de render**, porque el HTML llega vacío (`<div id="app">`) y todo el contenido lo pinta el JS, además de depender de la fuente Berthold Script (TTF de 188 KB).

## Inventario resumido

- 57 archivos. `images/` 1.9 MB, `icons/` 0.95 MB, `fonts/` 0.48 MB, `assets/` 69 KB (1 JS de 46 KB + 1 CSS de 22 KB).
- Mayores: `icons/favicon.svg` 428 KB, `icons/android-chrome-512x512.png` 232 KB, `images/bg-footer-bottom.webp` 205 KB, `fonts/Berthold-Script.ttf` 188 KB, `images/bg-eventos-bottom.webp` 185 KB, `bg-footer-top.webp` 164 KB, `bg-gallery-right.webp` 162 KB, `Merriweather-Regular.ttf` 149 KB, `Merriweather-Bold.ttf` 142 KB, `images/x.jpg` 123 KB, `meta.jpg` 115 KB.
- Externos: solo `googletagmanager.com` (gtag, 67 KB sin usar en carga) y enlaces a WhatsApp / Facebook / Google Maps. Sin CDN de fuentes ni de librerías.
- Todas las imágenes y fuentes de `images/` y `fonts/` están referenciadas (no hay assets huérfanos).

## Matriz impacto / esfuerzo

| | **Esfuerzo bajo** | **Esfuerzo medio** | **Esfuerzo alto** |
|---|---|---|---|
| **Impacto alto** | H1 unificar www/sin www · H2 `sw.js` 404 · H3 contraste AA · H4 jerarquía de encabezados | H5 contenido renderizado por JS (LCP 4.9 s) · H6 fuentes (WOFF2/preload) | H7 recuperar el código fuente (Vite/Tailwind) |
| **Impacto medio** | H8 JSON-LD incompleto · H9 `robots.txt` ruidoso · H10 sitemap · H11 nombre accesible · H12 cabeceras de caché | H13 imágenes de fondo pesadas · H14 gtag/terceros · H15 manifest/iconos | — |
| **Impacto bajo** | H16 meta sin efecto · H17 `twitter:url` · H18 `browserconfig.xml` | H19 favicon.svg 428 KB | — |

## Detalle (priorizado)

### Alto impacto

- **H1 — Inconsistencia www vs. sin www (SEO).** El host real es `https://jardincristel.mx` (el `www` responde 301 a la raíz sin `www`), pero `og:url`, `twitter:url`, `og:image`, `twitter:image`, JSON-LD `url`, `Sitemap:` en `robots.txt` y el `<loc>` del sitemap usan `https://www.jardincristel.mx`. Además **no existe `<link rel="canonical">`**. Efecto: señales contradictorias para buscadores y previews sociales que pasan por redirect. Acción: unificar en el host sin `www` (el que ya sirve) y agregar canonical.
- **H2 — Service Worker roto.** El JS registra `/sw.js`, que devuelve 404 → error en consola (baja Best Practices a 96) y una petición desperdiciada. Acción: quitar el registro o crear el SW de forma deliberada.
- **H3 — Contraste insuficiente (WCAG AA).** Texto `#fffff6` sobre `#b76e79` (malva-400) = **3.78:1** (header, footer, textos del hero); `malva-400` como color de texto sobre fondos marfil / malva-50 = 3.4–3.7:1. Se exige 4.5:1 para texto normal (los títulos grandes en negrita pasan con 3:1, el cuerpo de 14 px no). Lighthouse lo reporta en `color-contrast`. Se resuelve oscureciendo el tono, sin rediseñar.
- **H4 — Jerarquía de encabezados.** Estructura actual: h1 “Jardín Cristel” (logo del header, con `tabindex=0`) → h2 sr-only del menú → h2 del hero con `role="heading" aria-level="1"` (segundo h1 efectivo) → h5 → h3 → h2 → **h4** (tarjetas de eventos, salto desde h2) → h2 → h2. Hay dos h1, saltos h2→h4 y h5 sin padre; el logo no debería ser h1. `tabindex="0"` en 10 elementos no interactivos añade paradas de teclado innecesarias.
- **H5 — Renderizado 100 % en cliente.** `index.html` solo tiene `<div id="app">`; el contenido (h1, texto, imágenes) existe únicamente tras ejecutar JS. Impacta el LCP (retraso de render ~2.2 s en móvil) y el rastreo/previews. A evaluar: prerender/SSG o HTML estático para el hero.
- **H6 — Fuentes.** Tres TTF (479 KB) sin precarga ni subsetting; el LCP es texto con Berthold Script. Acción: WOFF2, subset latino, `preload` de la fuente del hero. `font-display: swap` ya está.
- **H7 — Sin código fuente en el repo.** `assets/main-*.js|css` son builds con hash; cualquier cambio real requiere el proyecto Vite/Tailwind original. Es el bloqueador para H4, H5 y H13 de forma limpia. Pendiente: preguntar si existe ese proyecto o reconstruirlo.

### Impacto medio

- **H8 — Schema.org incompleto.** `EventVenue` válido pero mínimo. Faltan `image`, `sameAs` (Facebook), `geo`, `openingHoursSpecification`, `priceRange`, `@id`, `hasMap` (Google Maps), `maximumAttendeeCapacity`. `telephone` debería ir en E.164 sin espacios (`+525536476032`). `url` con `www` (ver H1). Considerar tipo múltiple `["EventVenue","LocalBusiness"]`.
- **H9 — `robots.txt` sobrecargado.** Reglas para rutas inexistentes (`/admin/`, `/login/`, `/no-news/`, `/resources/`…), `Crawl-delay` (Google lo ignora), `Allow: *.css` sin `/` inicial, bloques `User-agent: *` duplicados. No bloquea nada importante, pero es ruido; basta `User-agent: *` + `Allow: /` + `Sitemap:` (host sin `www`).
- **H10 — Sitemap.** Una sola URL, `lastmod` 2024-09-13, `changefreq=daily` poco realista, host con `www`.
- **H11 — Nombre accesible vs. texto visible.** Enlaces de WhatsApp y `tel:` con `aria-label` que no contiene el texto visible (`label-content-name-mismatch`).
- **H12 — Caché.** Netlify sirve todo con `max-age=0, must-revalidate`, incluso `assets/*-<hash>` e imágenes. Un `_headers` / `netlify.toml` con `immutable` para assets con hash y caché larga para imágenes y fuentes mejora las visitas repetidas.
- **H13 — Imágenes.** Fondos WebP de 100–205 KB (`bg-footer-bottom`, `bg-eventos-bottom`, `bg-footer-top`, `bg-gallery-right`). `offscreen-images`: `bg-modal-mobile.webp` (55 KB) se descarga en móvil aunque el menú está oculto. Desktop: `uses-responsive-images` (~40 KB). Positivo: ya hay WebP, versiones `-mobile`, `width/height` y `loading=lazy` en 15 imágenes.
- **H14 — Terceros.** gtag (67 KB sin usar al cargar; Lighthouse sugiere `preconnect` a google-analytics, ~300 ms). Además, el script de tracking de `index.html` hace `querySelectorAll('a, button')` **antes** de que el JS pinte la página, por lo que probablemente no engancha ningún elemento (el tracking de clics podría no estar funcionando). A verificar en GA4.
- **H15 — Manifest / iconos.** `theme_color` del manifest (`#915891`) ≠ `<meta theme-color>` (`#ffffff`) ≠ color de marca (malva `#b76e79`); falta icono `maskable`; `mstile-150x150.png` declarado con `sizes: 270x270`.

### Impacto bajo

- **H16** — `meta keywords` sin efecto SEO; `referrer: no-referrer` puede ocultar el origen del tráfico en analítica; `format-detection: telephone=no` es aceptable porque hay `tel:` explícito.
- **H17** — `twitter:url` no es una etiqueta estándar (se puede quitar); `twitter:image:alt` genérico.
- **H18** — `icons/browserconfig.xml` apunta a `/mstile-150x150.png` (404; el archivo está en `/icons/`) y no hay `<meta name="msapplication-config">`. Legado de IE/Edge.
- **H19** — `icons/favicon.svg` pesa 428 KB (y `safari-pinned-tab.svg` 172 KB), probablemente raster embebido o trazado sin optimizar; `android-chrome-512x512.png` 232 KB. Solo se descargan si el navegador los pide.

## Verificado y correcto

`lang="es"`, `charset`, `viewport`; title y meta description presentes; Open Graph completo con `og:image` 1200×630 (coincide con el archivo real) y `locale es_MX`; alt descriptivo en todas las `<img>` de contenido; landmarks (`header`, `nav`, `section`, `footer`) y navegación por anclas con `aria-label`; CLS ≈ 0; SEO 100; HTTPS + HSTS.

## Orden de ataque sugerido

1. Quick wins sin riesgo (H1, H2, H9, H10, H12, H17): pocos archivos de configuración.
2. H3 + H4 + H11 (accesibilidad): tocan markup y color a la vez.
3. Resolver H7 (fuente del proyecto) antes de H5/H6/H13, que son el grueso de la mejora de LCP móvil.
