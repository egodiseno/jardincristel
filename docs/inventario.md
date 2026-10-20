# Inventario del sitio actual

Extraído de `index.html`, `assets/main-DvOoeQah.js` (HTML de la página en un template literal, líneas 1–664) y `assets/main-oHxwuJhl.css`. El build queda solo como referencia. Fecha: 2026-10-20.

## 1. Textos por sección

Estructura de la página en orden: header fijo → menú móvil → `#inicio` → `#nosotros` → `#eventos` → `#galeria` → `#contacto` → footer → barra CTA móvil → lightbox → modal de paquete.

### Header (fijo)
- Logo/título: “Jardín Cristel” (hoy es un `<h1>`).
- Navegación (idéntica en desktop y móvil): Inicio · Nosotros · Eventos · Galería · Contacto (anclas `#inicio`, `#nosotros`, `#eventos`, `#galeria`, `#contacto`).
- Botones desktop (solo icono): WhatsApp (aria-label “Contactar por WhatsApp”), Facebook (“Visita nuestra página de Facebook”).
- Móvil: botón hamburguesa (“Abrir menú de navegación”), panel “Menú principal” (h2 solo para lectores de pantalla) con botón “Cerrar menú”.

### Inicio (`#inicio`)
- Título: **Jardín Cristel** (h2 con `role=heading aria-level=1`).
- Imagen decorativa `detail.webp` (alt “Imagen decorativa con detalles del jardín”).
- Texto (h5) móvil: “Celebra en Jardín Cristel, donde cada detalle cuenta. Tepotzotlán te espera.”
- Texto (h5) desktop: “Haz que tus celebraciones sean verdaderamente memorables en nuestro encantador jardín en Tepotzotlán. Desde bodas hasta cumpleaños, estamos listos para hacer cada detalle perfecto.”
- CTA (solo desktop ≥1024): “Conoce nuestros eventos” → `#eventos`.

### Nosotros (`#nosotros`)
- Título (h3) desktop: “En Jardín Cristel, cada evento se convierte en una celebración inolvidable.”
- Título (h3) móvil: “En Jardín Cristel, cada evento es inolvidable.”
- Imagen `nosotros.webp` (alt “Grupo de personas disfrutando un evento en Jardín Cristel”), duplicada en el DOM (una para desktop, otra para móvil).
- Imagen decorativa `detail.webp` (alt “Detalle decorativo del Jardín Cristel”).
- Párrafos:
  1. “Ubicado en el pueblo mágico de Tepotzotlán, nuestro jardín ofrece un ambiente tradicional y acogedor, perfecto para bodas, XV años, bautizos, primeras comuniones, cumpleaños y graduaciones.”
  2. “Nuestro espacio cuenta con un amplio jardín, áreas cubiertas y decoraciones personalizadas que se adaptan a tus necesidades. Además, nuestro equipo dedicado está aquí para ayudarte a cada paso, asegurando que cada detalle sea perfecto.”
  3. “Descubre cómo Jardín Cristel puede hacer de tu evento una experiencia mágica y memorable.”
  4. **“¡Estamos listos para hacer realidad tu celebración!”**
- CTA (solo desktop): “Solicita tu presupuesto” → WhatsApp.

### Eventos (`#eventos`) — h2 “Nuestros Eventos”
Seis tarjetas (h4 + párrafo + botón “Más información” que abre el modal con `data-title`):

| # | Título | Texto |
|---|---|---|
| 1 | Bautizo | **¡Celebra un día especial!** Disfruta de un hermoso bautizo en nuestro encantador jardín de eventos. Espacio amplio, catering exquisito y personal atento para hacer de este día inolvidable. **¡Reserva ahora y crea recuerdos inolvidables con tus seres queridos!** |
| 2 | 1a Comunión | **¡Celebra la Primera Comunión en el corazón de Tepotzotlán!** Nuestro encantador jardín de eventos ofrece el entorno ideal para este día especial. Con un entorno pintoresco, catering exquisito y un servicio impecable, garantizamos una experiencia inolvidable para ti y tus seres queridos. **¡Reserva ahora y crea recuerdos inolvidables en el centro de Tepotzotlán!** |
| 3 | XV Años | **¡Celebra tus XV años en grande!** Nuestro hermoso jardín de eventos es el lugar perfecto para hacer realidad tus sueños. Desde una decoración elegante hasta un exquisito menú personalizado, nuestro equipo se encargará de cada detalle para que disfrutes al máximo de esta ocasión especial. **¡Reserva ahora y haz de tus XV años un día inolvidable!** |
| 4 | Boda | **Descubre la perfección en tu gran día.** Nuestro jardín de eventos en el centro de Tepotzotlán brinda el escenario ideal para tu boda de ensueño. Con servicios personalizados, entorno pintoresco y una atención excepcional, garantizamos que tu día especial sea inolvidable. **¡Reserva ahora y haz realidad tus sueños!** |
| 5 | Graduación | **¡Celebra tu graduación en el corazón de Tepotzotlán!** Nuestro hermoso jardín de eventos te brinda el escenario perfecto para festejar este logro tan especial. Con un ambiente acogedor, deliciosa gastronomía y un equipo atento, aseguramos que tu día sea inolvidable. **¡Reserva ahora y marca este hito con estilo en el centro de Tepotzotlán!** |
| 6 | Empresarial | **¡Impulsa tu empresa con estilo en Tepotzotlán!** Nuestro jardín de eventos céntrico ofrece el ambiente ideal para reuniones y celebraciones corporativas. Espacios versátiles, comodidades de primer nivel y un entorno encantador garantizan el éxito de tu evento. **¡Reserva ahora y brinda a tu equipo una experiencia memorable!** |

Observaciones: el texto de Nosotros menciona “cumpleaños” pero no hay tarjeta de cumpleaños; las tarjetas dicen “centro de Tepotzotlán” y Nosotros dice “pueblo mágico”.

### Galería (`#galeria`) — h2 “Galería”
- Seis fotos (ver sección 2) que abren un lightbox con anterior/siguiente.
- Botón: “Explora Nuestra Galería” → Facebook (`https://www.facebook.com/JardinCristel/`).

### Contacto (`#contacto`) — h2 “Contacto”
- Móvil: botón “¡Hablemos por WhatsApp!” y botón “Llamanos ahora” (sin acento) → `tel:5536476032`.
- Dirección: “Av. Lic. Benito Juárez 24, San Martin, Tepotzotlán, México.” (el JSON-LD dice “San Martin, Tepotzotlán, Estado de México, CP 54600”).
- Teléfono visible (solo desktop): “55 3647 6032”.
- Texto del mapa: “Encuéntranos fácilmente en el corazón de Tepotzotlán. **Haz clic en el mapa** para obtener direcciones detalladas a Jardín Cristel.”
- Mapa: imagen estática `maps.webp` enlazada a `https://maps.app.goo.gl/GREPvSYNPcgL9c8D8` (alt “Abre el Google Maps a Jardín Cristel”).

### Footer
- “© 2024 Jardín Cristel. Todos los derechos reservados.”

### Barra CTA móvil (fija abajo, solo <1024)
- “¡Hablemos por WhatsApp!” → WhatsApp. Aparece al hacer scroll > 0, se oculta al ver `#contacto`, brilla (glow) al pasar 100 px de scroll durante 5 s.

### Modal “Paquete completo” (mismo contenido para las 6 tarjetas; solo cambia el título)
- Título: el del evento. Subtítulo: **Paquete completo**.
- Mínimo de personas: 70 · Máximo de personas: 150 (de 120 a 150 personas costo extra para carpa y pista de baile).
- Incluye: Jardín por 6 hrs (más media hora de entrada y media hora de salida) · Mesas cuadradas vestidas (cubre mantel color a su elección) · Sillas tiffany color chocolate · 1 arreglo floral por mesa (participantes) · Meseros · DJ profesional 6 hrs · Vajilla y cristalería · Cubiertos · Hielo y refresco todo el evento (coca-cola, squirt, sidral mundet, agua mineral) · 2 garrafones de agua (jamaica) · Platos y cucharas desechables para pastel · Inflable · Descorche libre.
- **Menú a elegir:** Taquiza · Tres tiempos.
- Botón (solo desktop): “Solicita tu cotización” → WhatsApp.
- Nota: no hay precios, y el paquete es genérico (p. ej. “Inflable” y “DJ” aparecen en bautizo, graduación y empresarial por igual). Pendiente de confirmar con Emmanuel.

### Metadatos de `index.html`
- `<title>`: “Jardín Cristel | Jardín para Eventos en Tepotzotlán, Estado de México”.
- `meta description`: “Jardín Cristel ofrece un entorno mágico y tradicional en Tepotzotlán, Estado de México, para bodas, fiestas y eventos corporativos. Disfruta de amplio jardin, arquitectura tradicional mexicana, y servicios completos para hacer tu celebración inolvidable. Contáctanos para tu cotización.” (≈290 caracteres; Google corta ~155; falta tilde en “jardin”).
- `og:title` / `twitter:title`: “Jardín Cristel | Encantador Jardín Tradicional para Eventos en Tepotzotlán”.
- `og:description` / `twitter:description`: “Descubre Jardín Cristel en Tepotzotlán, un espacio perfecto para bodas y eventos. Amplios jardines, arquitectura tradicional mexicana y servicios completos para una celebración inolvidable.”
- `og:image` `https://www.jardincristel.mx/images/meta.jpg` (1200×630, 115 KB); `twitter:image` `…/images/x.jpg` (1200×675, 123 KB); `twitter:card` `summary_large_image`; `og:type` website; `og:locale` es_MX; `og:site_name` Jardín Cristel; `og:url` y `twitter:url` con `www`.
- `keywords`: “jardín para eventos, bodas en Tepotzotlán, eventos corporativos, Jardín Cristel”; `author`; `robots index, follow`; `referrer no-referrer`; `format-detection telephone=no`.
- JSON-LD `EventVenue`: name, description, address (Av. Lic. Benito Juárez 24 / San Martin, Tepotzotlán / Estado de México / 54600 / MX), telephone `+52 55 3647 6032`, url `https://www.jardincristel.mx`.

## 2. Imágenes usadas

Todas las imágenes de `images/` están en uso. Dimensiones reales leídas de los archivos.

### Contenido (`<img>`)
| Ruta | Sección | Dimensiones | Peso | Carga hoy |
|---|---|---|---|---|
| `images/hero.webp` | Inicio (fondo inline, **todos** los viewports) | 1728×1080 | 77,746 B | eager |
| `images/detail.webp` | Inicio y Nosotros (adorno) | 252×72 (atributos dicen 552×72) | 9,434 B | lazy |
| `images/nosotros.webp` | Nosotros (2 copias en DOM) | 549×577 | 29,324 B | eager |
| `images/bautizo.webp` | Eventos 1 | 530×386 | 8,348 B | lazy |
| `images/comunion.webp` | Eventos 2 | 530×386 | 6,268 B | lazy |
| `images/xv.webp` | Eventos 3 | 530×386 | 4,784 B | lazy |
| `images/boda.webp` | Eventos 4 | 530×386 | 8,840 B | lazy |
| `images/graduacion.webp` | Eventos 5 | 530×386 | 6,550 B | lazy |
| `images/empresarial.webp` | Eventos 6 | 530×386 | 23,124 B | lazy |
| `images/galeria01.webp` | Galería | 530×386 | 19,168 B | lazy |
| `images/galeria02.webp` | Galería | 530×386 | 15,592 B | lazy |
| `images/galeria03.webp` | Galería | 530×386 | 21,020 B | lazy |
| `images/galeria04.webp` | Galería | 530×386 | 19,682 B | lazy |
| `images/galeria05.webp` | Galería | 530×386 | 19,998 B | lazy |
| `images/galeria06.webp` | Galería | 530×386 | 15,002 B | lazy |
| `images/maps.webp` | Contacto (captura del mapa) | 530×386 | 15,914 B | lazy |
| `images/meta.jpg` | Open Graph | 1200×630 | 114,771 B | — |
| `images/x.jpg` | Twitter card | 1200×675 | 123,297 B | — |

Alts actuales: ver sección 1 y código; todos descriptivos salvo el lightbox (“Imagen ampliada”). Las fotos reales de contenido son pequeñas (530 px de ancho), y el lightbox amplía la misma imagen de 530 px.

### Fondos decorativos (CSS por id de sección)
| Sección | Móvil (<1024) | Desktop (≥1024) |
|---|---|---|
| `#inicio` | `hero.webp` inline (la regla CSS `heroSm.webp` ≥768 **nunca se aplica**: el estilo inline gana) | igual |
| `#nosotros` | `bg-nosotros-mobile.webp` 1125×3164, 54,410 B | `bg-nosotros-left.webp` 41,642 B + `bg-nosotros-right.webp` 101,728 B (1920×942) |
| `#eventos` | `bg-eventos-top-mobile.webp` 12,806 B + `bg-eventos-bottom-mobile.webp` 20,390 B (495×1109) | `bg-eventos-top.webp` 17,572 B (844×893) + `bg-eventos-bottom.webp` 185,128 B (1920×2030) |
| `#galeria` | `bg-gallery-top-mobile.webp` 60,716 B + `bg-gallery-bottom-mobile.webp` 60,384 B (1125×2379) | `bg-gallery-left.webp` 98,462 B + `bg-gallery-right.webp` 162,444 B (1920×1030) |
| `#contacto` | `bg-footer-top-mobile.webp` 52,494 B (1125×2625) + `bg-footer-bottom-mobile.webp` 20,302 B (495×1155) | `bg-footer-top.webp` 164,184 B + `bg-footer-bottom.webp` 204,630 B (1920×961–965) |
| `#modal` | `bg-modal-mobile.webp` 62,890 B (495×1002) | `bg-modal.webp` 59,536 B (1920×881) |
| `#mobile-menu` | `bg-modal-mobile.webp` (se descarga aunque el menú esté cerrado) | oculto |
| Sin uso efectivo | `heroSm.webp` 430×936, 11,654 B | |

Total `images/`: 1,930,234 B (≈1.84 MiB). Los fondos “mobile” de 1125 px son más anchos que cualquier móvil a 1×; son decorativos y buenos candidatos a recorte/CSS.

## 3. Paleta de colores

Definidos en la config de Tailwind (nombres propios del proyecto). Contrastes calculados (WCAG).

| Token actual | Hex | Uso |
|---|---|---|
| malva-50 | `#f7f2f7` | fondo Galería, panel de menú móvil, tarjetas de evento |
| malva-400 | `#b76e79` | header, footer, barra CTA, títulos h2/h4 (marca “rosa viejo”) |
| malva-900 | `#49242a` | bordes de imágenes, hover de enlaces |
| marfil-50 | `#fffff6` | texto sobre malva/lavanda, fondo Nosotros/modal |
| marfil-200 | `#fffee3` | fondo Eventos |
| marfil-400 | `#fffdd0` | fondo Contacto, contenedor raíz |
| lavanda-800 | `#6c426c` | botones primarios |
| lavanda-900 | `#482c48` | botón `:active` |
| lavanda-700 / 400 / 500 | **sin definir en el CSS compilado** | se usan en `hover:` y `focus:ring`, pero no generan estilos → el hover de botones no cambia nada |
| pizarra-900 | `#3d464f` | texto de cuerpo |
| oliva-900 | `#28350d` | bordes de tarjetas y galería (8 px) |
| stone-900 | `#1c1917` | fondo del lightbox (80 %) |
| (nav activa) | `#4a235a` | enlace activo, bold |
| (manifest) | `#915891` | theme/background color del manifest |
| (metas) | `#ffffff` theme-color, `#da532c` TileColor | inconsistentes con la marca |
| (glow) | `#e7d9b1` | halo animado del CTA |

Contrastes: pizarra/marfil-50 9.55:1 ✔ · pizarra/malva-50 8.69:1 ✔ · marfil-50/lavanda-800 7.93:1 ✔ · malva-900/malva-50 12.11:1 ✔ · **marfil-50/malva-400 3.78:1 ✘** · **malva-400/marfil-200 3.72:1 ✘** · **malva-400/marfil-400 3.66:1 ✘** · **malva-400/malva-50 3.44:1 ✘**.

## 4. Tipografías

| Familia | Archivo | Peso | Tamaño | Uso | `font-display` |
|---|---|---|---|---|---|
| Berthold Script BQ (fallback `cursive`) | `fonts/Berthold-Script.ttf` | 400 | 187,898 B | logo del header (3xl) y título del hero (6xl) | swap |
| Merriweather (fallback `serif`) | `fonts/Merriweather-Regular.ttf` | 400 | 149,120 B | cuerpo | swap |
| Merriweather | `fonts/Merriweather-Bold.ttf` | 700 | 142,040 B | títulos h2/h3/h4, negritas | swap |

Total 479,058 B, todo TTF. Escala usada: 14 px (sm), 16 px (base), 24 px (2xl), 30 px (3xl), 36 px (4xl), 60 px (6xl); `font-medium` (500) en botones se sintetiza (no existe ese peso).

## 5. Breakpoints y layout

- Min-width de Tailwind: 640, 768, 1024, 1280, 1536 px. Los que realmente cambian la página: **768** (menú desktop visible, cuadrícula de eventos de 2 columnas, fondos más grandes) y **1024** (fondos desktop, galería y eventos de 3 columnas, textos largos del hero y Nosotros, se ocultan CTA y botones móviles).
- Contenedor `container mx-auto` (max-width por breakpoint). Galería `max-w-6xl`.
- Detalle de diseño distintivo: esquinas muy redondeadas (“arco”) en imágenes: 117 px / 109 px (`rounded-t-[117px]`) en tarjetas y Nosotros, 40 px móvil → 117 px en galería, bordes de 8 px.
- Hero a `h-screen`; Contacto a `min-h-screen` en móvil y xl.

## 6. Animaciones y comportamiento

- `html{scroll-behavior:smooth}` **y** JS que intercepta los clics en `a[href^="#"]` con `scrollTo({behavior:"smooth"})` (duplicado; ignora el alto del header fijo, así el título queda tapado).
- Menú móvil: panel que baja con `translate-y` (300 ms); se cierra al elegir un enlace.
- Enlace activo del menú por scroll (clase `.active`: color `#4a235a`, bold), calculado en cada evento `scroll` sin throttle.
- Barra CTA: `slide-up` / `slide-down` 0.8 s; `glow` 2 s infinite alternate durante 5 s y luego `fadeOutGlow` 2 s (se activa al pasar 100 px de scroll).
- Tarjetas y galería: `hover:scale-105` con transición de 300 ms.
- Modal: `modal-enter`/`modal-enter-active`/`modal-exit-active` (opacity + scale, 0.3 s) más una segunda lógica con `scale-0`/`scale-100` (dos handlers distintos para el mismo modal; además todo `a[href="#"]` lo abre). Sin foco atrapado, sin cierre con Escape, sin clic en el fondo.
- Lightbox: clic en cualquier imagen de `#galeria`, anterior/siguiente en bucle, cierra con la × o clic en el fondo; los controles son `<span role="button">` sin manejo de teclado; la imagen usa la misma miniatura de 530 px.
- No hay `prefers-reduced-motion`.
- Service worker: `navigator.serviceWorker.register("/sw.js")` → 404.
- `console.log("Botón clicado")` y `console.log("Título del evento: …")` en producción.

## 7. Enlaces

| Destino | URL | Dónde |
|---|---|---|
| WhatsApp (varias formas) | `https://wa.me/5215536476032?text=Hola%20quiero%20más%20información%20sobre%20los%20eventos%20en%20el%20Jardín%20Cristel.%20¡Gracias!` | header desktop, Nosotros (desktop), Contacto (móvil), barra CTA móvil |
| WhatsApp (modal) | mismo número, texto “…Jardín Cristel. Gracias!” (sin “¡”) | modal |
| Teléfono | `tel:5536476032` (sin código de país) | Contacto móvil; visible “55 3647 6032” |
| Facebook | `https://www.facebook.com/JardinCristel` (header) y `https://www.facebook.com/JardinCristel/` (galería) | header, galería |
| Google Maps | `https://maps.app.goo.gl/GREPvSYNPcgL9c8D8` | imagen del mapa |
| mailto | **no existe** | — |
| Anclas | `#inicio`, `#nosotros`, `#eventos`, `#galeria`, `#contacto` | navegación |

Teléfono y WhatsApp son el mismo número (+52 1 55 3647 6032; el `1` es el prefijo móvil histórico en `wa.me`). Los enlaces externos en galería y WhatsApp del header no tienen siempre `rel="noopener"` (el de galería no lo tiene).

## 8. Analítica y eventos (gtag)

- GA4 `G-DNF30KJ0Y7`, snippet estándar `async` en el `<body>` (no hay Consent Mode ni aviso de cookies).
- Único evento personalizado: `gtag('event','click',{event_category:'Botón', event_label:<texto>})` donde el texto es `innerText || aria-label || data-title`.
- Se registra con `document.querySelectorAll('a, button').forEach(addEventListener)` en un script inline que corre **antes** de que el JS inyecte la página, de modo que probablemente no engancha ningún elemento (el `#app` está vacío en ese momento) → tracking de clics presumiblemente roto.
- No hay eventos específicos de WhatsApp, teléfono ni Maps; todo sería el genérico `click`, y los botones que solo tienen icono (header) mandarían el `aria-label`.
- Eventos automáticos de GA4 (page_view, scroll, clics salientes) dependen de la configuración del panel.

## 9. Íconos y manifest

### `index.html`
`rel=icon` `.ico`; PNG 32 y 16; `apple-touch-icon` 180 (el archivo `apple-touch-icon.png` pesa 21 KB); `icon` 192 y 512 sin `type`; `manifest`; `mask-icon safari-pinned-tab.svg`; `msapplication-TileColor #da532c`; `theme-color #ffffff`.

### Archivos de `icons/` (952,528 B)
`favicon.svg` 428,521 B (**es un PNG 600×600 embebido en base64**, no un vector), `android-chrome-512x512.png` 232,307 B, `safari-pinned-tab.svg` 171,917 B, `android-chrome-192x192.png` 44,393 B, `apple-touch-icon.png` 21,302 B, `mstile-150x150.png` 21,275 B, `favicon.ico` 15,086 B (también duplicado en la raíz), `favicon-96x96.png` 13,583 B, `favicon-32x32.png` 2,545 B, `favicon-16x16.png` 1,344 B, `browserconfig.xml` 255 B (apunta a `/mstile-150x150.png`, 404). `favicon.svg` no está referenciado en `index.html`.

### `manifest.json`
name/short_name “Jardín Cristel”; description; `start_url` `/`; `scope` `/`; `display` standalone; `orientation` portrait; `lang` es-MX; `theme_color` y `background_color` `#915891`; iconos 16, 32, 96, `mstile-150x150.png` declarado como 270x270, 192, 512 (sin `purpose: maskable`). Relativos `./icons/…` resueltos desde la raíz.

### Otros
- `robots.txt` (1,277 B): reglas para rutas inexistentes, `Crawl-delay: 10`, `Sitemap: https://www.jardincristel.mx/sitemap.xml`.
- `sitemap.xml` (311 B): una URL `https://www.jardincristel.mx/`, `lastmod` 2024-09-13, `changefreq daily`, `priority 1.0`.
- Hosting: Netlify (cabeceras por defecto, `Cache-Control: max-age=0, must-revalidate`). No hay `_headers` ni `netlify.toml` en el repo.

## 10. Hallazgos nuevos durante la extracción

Se suman a los 19 de `docs/benchmark/hallazgos.md`:

- **N1 — `hero.webp` (1728×1080, 78 KB) se sirve también en móvil**: el `style` inline pisa la regla CSS que usaba `heroSm.webp` (12 KB) a partir de 768 px; en móvil ni siquiera se usa la versión pequeña.
- **N2 — Estados hover de botones inexistentes**: `lavanda-700` no está definido, así que `hover:bg-lavanda-700` no hace nada.
- **N3 — El modal es genérico** para los 6 eventos y se abre con cualquier `a[href="#"]`.
- **N4 — Modal y lightbox sin accesibilidad de teclado** (sin Escape, sin trampa de foco, controles `span`); el logo envuelve un `<h1>` dentro de un `<a>`.
- **N5 — `nosotros.webp` duplicada** en el DOM y sin `loading` ni `fetchpriority`; `detail.webp` declara 552×72 pero mide 252×72.
- **N6 — `console.log` de depuración**, doble scroll suave (CSS + JS) que no compensa el header fijo, `scroll` sin throttle.
- **N7 — Textos**: meta description de ~290 caracteres con falta de tilde (“jardin”); “Llamanos” sin acento; el footer dice © 2024; “San Martin” sin tilde.
