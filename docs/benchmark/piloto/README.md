# Piloto — mediciones y capturas (2026-10-20)

Piloto del sitio nuevo: **hero, eventos y “Qué incluye tu evento”** (`index.html`, `css/styles.css`, `js/main.js`), con los tokens de `docs/diseno.md`. Medido sobre el **deploy de la rama**: https://modernizacion--jardincristel.netlify.app/ (commit `3ae5cba`). **No es comparable punto por punto con la línea base**: el piloto tiene 3 de las ~7 secciones (sin Nosotros, galería, contacto ni acuarelas), así que pesa menos por construcción. Sirve para validar la arquitectura (HTML en el documento, imágenes responsivas, fuentes WOFF2, JS mínimo).

## Lighthouse (12.8.2, mediana de 3 corridas en la misma máquina, throttling simulado por defecto)

| Métrica | Línea base móvil (producción) | **Piloto móvil** | Línea base desktop | **Piloto desktop** |
|---|---|---|---|---|
| Performance | 74 | **100** | 98 | **100** |
| Accessibility | 94 | **100** | 95 | **100** |
| Best Practices | 96 | **100** | 96 | **100** |
| SEO | 100 | 69 \* | 100 | 69 \* |
| FCP | 2.5 s | **1.06 s** | 0.8 s | **0.30 s** |
| LCP | 4.9 s | **1.41 s** | 0.8 s | **0.41 s** |
| CLS | 0.004 | **0.000** | 0.017 | **0.000** |
| TBT | 130 ms | **19 ms** | 0 ms | **0 ms** |
| Speed Index | 4.9 s | 2.90 s | 1.2 s | 0.62 s |
| Peso transferido | 902 KiB | **161 KiB** | 1,678 KiB | **184 KiB** |

\* **SEO 69 es intencional**: el único fallo es `is-crawlable`, por la etiqueta `noindex` del piloto (y Netlify añade `noindex` a los deploys de rama). Se quita al publicar.

Corridas individuales (móvil): Performance 100 / 100 / 100; LCP 1.41 / 1.51 / 1.39 s; TBT 19 / 17 / 31 ms. Escritorio: 100 / 100 / 100; LCP 0.41 / 0.41 / 0.34 s. El elemento LCP es la imagen del hero (`hero-m-800.avif` en móvil, `hero-d-1600.avif` en escritorio), ya no un texto pintado por JS. El único aviso en escritorio es `uses-responsive-images` (≈ 19 KiB).

### Con GA4 activo (el deploy no carga analítica, porque el host no es `jardincristel.mx`)

Para estimar el costo de la medición se midió el móvil con `?medicion=debug` (carga gtag.js tras `load`/idle), 3 corridas:

| | Sin GA4 (mediana) | **Con GA4** (mediana; rango) |
|---|---|---|
| Performance | 100 | **98** (96–99) |
| LCP | 1.41 s | **1.71 s** (1.60–1.72) |
| TBT | 19 ms | **115 ms** (73–217) |
| CLS | 0.000 | 0.000 |
| Peso transferido | 161 KiB | **323 KiB** (gtag.js ≈ 162 KiB) |

Lectura: **el LCP se mantiene bajo la meta de 2.0 s, pero con GA4 el TBT (115 ms) supera la meta de 50 ms y el peso (323 KiB) supera los 300 KiB** del objetivo de `docs/propuesta.md`. El sitio en sí pesa 161 KiB; el exceso es casi todo gtag.js. Opciones para el bloque 7 (a decidir): cargar gtag en la primera interacción o con un retardo mayor (se pierden visitas que rebotan antes), o aceptar el costo. Clarity no está cargado (se sumará a este costo cuando se active).

### Incidencia en estas corridas con GA4

El bloqueo de red que se aplicó (`google-analytics.com`, `analytics.google.com`) **no cubrió** una petición `https://www.google.com/g/collect?tid=G-DNF30KJ0Y7…` (respondió 204): en las 3 corridas (y en una repetición de prueba) pudo llegar a la propiedad real de GA4 un `page_view` marcado con `debug_mode`. Deberían verse solo en **DebugView** (y ser filtrables con el filtro “Tráfico de desarrollador”, que aún no está activo; `docs/medicion.md` §1.7). Se recomienda activarlo y descartar esas visitas en los informes. Las pruebas de interacción (clics, `<details>`, `view_que_incluye`) se hicieron con **toda** la red de Google bloqueada y no enviaron nada.

## Capturas

`piloto-{360,768,1280}.png` (página completa) y `piloto-{360,768,1280}-vista.png` (primera pantalla), tomadas del deploy de la rama con Playwright + Chrome: 360 y 768 px con emulación táctil (`hover: none`, `pointer: coarse`); 1280 px con puntero de mouse (layout de escritorio). PNG con paleta de 256 colores. En las capturas de página completa, la barra inferior fija de móvil aparece donde cae el viewport de captura (artefacto de la captura).

## Verificaciones realizadas (con Playwright/Chrome)

| Verificación | Resultado |
|---|---|
| Consola y red | Sin errores, advertencias ni peticiones fallidas a 360, 768 y 1280 px |
| Desbordamiento horizontal | `scrollWidth == innerWidth` a 320, 360, 768 y 1280 px |
| **H1 a 360 px** | Pinyon Script 54 px; el texto cabe en el contenedor sin desbordar; también a **320 px** (48 px) |
| H1 / H2 tamaño | H1 54 px (360) → 92 px (≥ 768); H2 36 px (360) → 56 px; mínimo 36 px cumplido |
| Fuentes | Pinyon Script y Merriweather cargadas desde WOFF2 propios |
| `<picture>` | Móvil descarga `hero-m-480.avif` (16 KB; 800 w en pantallas densas); tablet `hero-d-960.avif`; escritorio `hero-d-1600.avif` |
| `<details>` | Móvil: solo el primero abierto; tablet y escritorio: los 4 abiertos; al ampliar la ventana de móvil a tablet se abren sin contarse como interacción |
| Tokens | Los 13 tokens de `docs/diseno.md`; ningún `#hex` ni `rgb()` del CSS fuera de ellos; `tools/contraste.mjs`: 25 pares, 0 fallos |
| **Contraste del hero medido sobre píxeles** | Texto marfil sobre foto + velo: peor píxel **≥ 5.31:1** a 320 px (kicker 12.8 px, mínimo 4.5) y **≥ 6.5:1** desde 360 px en kicker, H1 (mínimo 3) y párrafo (mínimo 4.5), hasta 1920 px |
| Foco | 2 px; `#a0505c` sobre fondos claros y marfil-50 sobre superficies malva/hero |
| `prefers-reduced-motion` | Con `reduce`: sin zoom (`transform: none`), sin transiciones y `scroll-behavior: auto`; con `no-preference`: zoom 1.06 en 0.7 s dentro del marco |
| Tracking (`?medicion=debug`, red de Google bloqueada) | `click_whatsapp` con `link_location` (`tarjeta`, `hero`, `header`, `que-incluye`) y `event_type`; `view_que_incluye` una sola vez; `open_categoria_incluye` solo al abrir un grupo por el usuario; nada se envía fuera de `jardincristel.mx` sin `?medicion=debug` |
| HTML | `html-validate` (preset recomendado): 4 avisos, todos de estilo o falsos positivos (`<!doctype>` en minúscula, `<link rel=preload>` con `imagesrcset` sin `href`, `role="region"` en un `div`) |

## Qué no se pudo verificar

- **Dispositivos reales** (iPhone/Safari, Android/Chrome, iPad): solo emulación en Chrome. El deslizamiento táctil del carrusel (`scroll-snap`) y la barra inferior con teclado virtual y `safe-area` no se probaron en un teléfono.
- **Otros navegadores**: no se probaron Safari ni Firefox (soporte de AVIF, `cqw` con su respaldo en %, `content: "+" / ""`, `<details>`).
- **Lectores de pantalla** y **axe**: no se ejecutaron; “Accessibility 100” es solo la auditoría automática de Lighthouse.
- **GA4 real**: no se comprobó la recepción de eventos en DebugView/Tag Assistant (el deploy no es `jardincristel.mx`); la lógica se verificó interceptando `dataLayer`. **Clarity no se cargó** (por indicación).
- **Contraste con otras fotos**: se midió con la foto actual del hero; la foto final puede ser más clara.
- **Imágenes finales**: las de eventos son las provisionales de 530×386 px (se ven blandas a alta densidad); no se evaluó el aspecto con las imágenes definitivas.
- **Variabilidad de Lighthouse**: 3 corridas en una sola máquina y red; los números reales en producción (CDN, GA4, Clarity, fotos finales) serán distintos.
- **Alto contraste de Windows / modo oscuro / impresión**: no revisados.

## Adornos acuarelados (2026-10-21)

Piloto con los adornos de `docs/diseno.md` §9 (commit `be10067`, deploy de la rama). Reportes: `lighthouse-movil-adornos.report.json`, `lighthouse-escritorio-adornos.report.json`; capturas: `adornos-{1280,1920}.png` (página completa) y `adornos-{1280,1920}-vista.png` (primera pantalla).

| Métrica (mediana de 3) | Piloto sin adornos | **Con adornos** |
|---|---|---|
| Móvil: Perf / A11y / BP | 100 / 100 / 100 | **100 / 100 / 100** |
| Móvil: LCP · CLS · TBT | 1.41 s · 0 · 19 ms | **1.47 s · 0 · 19 ms** |
| Móvil: peso | 161 KiB | **146 KiB** (los adornos suman 27 KiB; la diferencia con la corrida anterior es variación de la medición) |
| Escritorio: Perf / A11y / BP | 100 / 100 / 100 | **100 / 100 / 100** |
| Escritorio: LCP · CLS · TBT | 0.41 s · 0 · 0 ms | **0.57 s · 0 · 0 ms** |
| Escritorio: peso | 184 KiB | **299 KiB** (+115 KiB) |

**Peso de los adornos (AVIF, transferido): 114 KiB en escritorio** (esquina del hero 23 · eventos 4 + 7.6 + 14 + 16 · incluye 15 + 30 · divisor 5.7) y **27 KiB en móvil** (divisor + 2 piezas); meta < 150 KiB cumplida. En escritorio una corrida de Lighthouse (d2) bajó a Perf 95 por un LCP de 1.12 s y CLS 0.007 (variación de red de esa corrida; las otras dos fueron 100).

Verificaciones: sin cruces entre adornos y texto sin fondo opaco (Range sobre el texto real) a 320, 360, 768, 1024, 1280, 1440, 1920 y 2560 px; `scrollWidth == innerWidth` en todos; en móvil/tablet no se descarga la esquina del hero (ni las piezas ocultas); contraste del hero con la esquina presente: peor píxel 6.81:1 (kicker), 7.65:1 (H1), 7.61:1 (párrafo) entre 1280 y 1920 px. **No verificado:** retina (las piezas se sirven a 1x), Safari/Firefox, dispositivos reales.

## Sitio completo: todas las secciones, menú y analítica (2026-10-21)

Deploy de la rama (commit `949f4ab`). Reportes: `lighthouse-sitio-movil.report.json`, `lighthouse-sitio-movil-ga4.report.json`, `lighthouse-sitio-escritorio.report.json`. Capturas: `sitio-{360,768,1280}.png` (página completa) y `sitio-{360,768,1280}-vista.png` (primera pantalla); en las de página completa el encabezado fijo y el “Saltar al contenido” aparecen donde cae el viewport (artefacto de la captura).

| Lighthouse 12.8.2, mediana de 3 | Móvil sin analítica | **Móvil con GA4 + Clarity** (`?medicion=debug`) | Escritorio sin analítica |
|---|---|---|---|
| Performance | 97 (100 / 97 / 97) | **94** (97 / 92 / 94) | 100 |
| Accessibility | 100 | 100 | 100 |
| Best Practices | 100 | **79** | 100 |
| LCP | 1.57 s | **1.76 s** | 0.47 s |
| TBT | 21 ms | **256 ms** (163–284) | 0 ms |
| CLS | 0.000 | 0.000 | 0.001 |
| Peso transferido | 198 KiB | **388 KiB** | 329 KiB |

**Metas de analítica (TBT ≤ 50 ms, peso ≤ 300 KiB): NO se cumplen.** gtag.js pesa 162 KiB y 243 ms de CPU; Clarity (tag + clarity.js) ≈ 26 KiB y 191 ms; juntos producen las tareas largas (135 + 135 + 99 ms) que llevan el TBT a 256 ms. El sitio sin analítica ya pesa 198 KiB (con todas las secciones), de modo que 300 KiB es inalcanzable con gtag.js cargado (198 + 162 > 300). **Best Practices cae a 79 por las 8 cookies de terceros que escribe Clarity** (auditoría `third-party-cookies`), lo que además toca la decisión #20 (consentimiento). El LCP sí se mantiene bajo 2.0 s (1.76 s). La carga diferida funciona (ninguna petición de analítica antes de `load`; verificado), pero diferir no reduce el costo, solo lo desplaza.

Las corridas bloquearon los endpoints de envío (`*/g/collect*`, `google-analytics.com`, `analytics.google.com`, `clarity.ms/collect`), incluido el `www.google.com/g/collect` que se coló en la medición anterior; en esta ronda esas peticiones salieron con estado −1 (bloqueadas), pero **no hay forma de confirmar desde aquí que ningún dato llegó a GA4/Clarity**: conviene revisar DebugView y descartar el tráfico del 2026-10-21 si aparece.

Pruebas locales (Playwright/Chrome): galería (clic en miniatura, flechas, deslizamiento y toque en el carrusel; eventos `gallery_navigate` con `gallery_index` e `interaction` correctos, nada por la foto inicial); mapa (0 peticiones a Google antes de “Ver mapa”; el iframe se crea con `loading="lazy"` y `title`); menú (una sola fila de 768 a 1440 px; scroll-spy con `aria-current="true"` en menú y barra; anclas a 64–69 px del borde bajo el encabezado de 57 px); barra móvil (zonas ≥ 56 px de alto y ≥ 59 de ancho desde 320 px, “Cotizar” al centro, `body` con padding inferior); `scrollWidth == innerWidth` a 320–2560 px.

