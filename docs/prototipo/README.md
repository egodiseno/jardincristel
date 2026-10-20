# Prototipo de direcciones visuales

Versión navegable en `prototipo/index.html` (portada) con `prototipo/a.html`, `b.html` y `c.html`. Es una maqueta de decisión: no es el sitio final y **no está pensada para indexarse** (`noindex`).

## Qué comparten y qué no

- **Mismo HTML**: las tres páginas tienen el mismo marcado (verificado con `md5sum` del `<body>` normalizado: idéntico; solo cambian `<title>`, la clase de `body`, la hoja de estilo y la nota del pie). Toda diferencia visual es CSS.
- **Mismo contenido real** (de `docs/inventario.md`): hero, “Lo esencial” (70–150 personas, 6 horas, centro de Tepotzotlán y 4 cosas que incluye), los 6 eventos, el paquete completo, galería y contacto breve. Los textos de las tarjetas de evento se acortaron quitando la frase final repetida de “¡Reserva ahora…!”; el resto es literal.
- **`prototipo/css/base.css`** (común): reset, accesibilidad y la mecánica del `<dialog>` del paquete y del carril con scroll-snap. **`a.css`, `b.css`, `c.css`**: todo lo visual y la composición (tokens, nav, hero, rejillas, paquete, galería, contacto).
- **Un solo JS** (`prototipo/js/proto.js`, ≈2.1 KB sin minificar): abre el paquete como `<dialog>` en móvil y tablet, lo deja como sección en desktop, scrollspy con `aria-current`, cierre del sheet arrastrando el asa. Sin analítica.
- **Fuentes** OFL autohospedadas en `prototipo/fonts/` (WOFF2, subset latino de Fontsource, 18 archivos; licencias en `LICENSE-*.txt`). Sin CDN.
- **Fotos provisionales** de `referencia/images/`.

## Comportamiento por dispositivo (sección 10 de la propuesta)

| Layout | Condición | Qué ves |
|---|---|---|
| Móvil | `< 48em` | Barra inferior tipo app (Inicio · Eventos · **Cotizar** · Galería · Contacto), eventos en carril con scroll-snap, paquete como bottom sheet |
| Tablet | `≥ 48em` | Barra superior compacta con Cotizar, eventos en 2 columnas, paquete en panel lateral |
| Desktop | `≥ 75em` + `hover: hover` + `pointer: fine` | Menú horizontal con hover, rejilla editorial, paquete como sección visible |

Sin implementar en el prototipo (quedan para el sitio real): visor de galería a pantalla completa con swipe, View Transitions, manifest/PWA, tracking, FAQ y testimonios.

## Contrastes (WCAG 2.x, calculados)

| Dir. | Pares de texto usados | Ratio |
|---|---|---|
| A | verde `#2F4A3A` / crema `#FAF6EE` | 9.01 |
| A | crema / terracota `#A9502E` (botones) · terracota / crema (kickers, enlaces) | 5.03 |
| A | rosa `#E8C9C0`: solo decorativo, nunca texto. Terracota sobre verde (1.79) no se usa | — |
| B | tinta `#1E1B2E` / crema `#FFF8EC` | 15.89 |
| B | crema / azul `#2B3A8C` · crema / magenta `#C2185B` · crema / verde `#2E6B47` | 9.53 · 5.56 · 6.01 |
| B | tinta / mostaza `#F2A81D` | 8.31 |
| B | azul / mostaza (kicker en azul) · magenta / crema | 4.98 · 5.56 |
| B | Prohibidos: magenta/mostaza 2.91 · tinta/magenta 2.86 | — |
| C | tinta `#2A2522` / papel `#F6F1EA` | 13.48 |
| C | acento `#8E4F3A` / papel · papel / acento (botones) | 5.61 |
| C | salvia `#8A9A8B`: solo decorativo (2.64). Acento sobre tinta (2.40) no se usa | — |

Foco visible (`:focus-visible` con color de contraste por dirección), áreas táctiles ≥ 44 px (nav, botones, enlaces con `min-height`), `prefers-reduced-motion` respetado.

## Lighthouse móvil (una corrida por dirección)

Servidor local estático (`python -m http.server`, **sin compresión ni caché**), Lighthouse 12.8.2, throttling móvil por defecto. Reportes en `docs/prototipo/lighthouse/`.

| Dir. | Performance | Accessibility | Best Practices | SEO | FCP | LCP | CLS | TBT | Peso |
|---|---|---|---|---|---|---|---|---|---|
| A · Herrería y jardín | 93 | 100 | 100 | 66 * | 2.0 s | 2.9 s | 0.052 | 0 ms | 376 KiB |
| B · Fiesta de pueblo | 95 | 100 | 100 | 66 * | 1.8 s | 2.8 s | 0.003 | 0 ms | 354 KiB |
| C · Editorial cálido | 95 | 100 | 100 | 66 * | 1.7 s | 2.8 s | 0.001 | 0 ms | 353 KiB |

Referencia: sitio actual en producción, móvil → Performance 74, Accessibility 94, Best Practices 96, SEO 100, LCP 4.9 s, CLS 0.004, TBT 130 ms, 902 KiB.

Lectura:
- \* **SEO 66 es intencional**: el único fallo es `is-crawlable`, por el `noindex` del prototipo.
- **Accesibilidad 100 y Best Practices 100** en las tres (sin errores de consola, sin service worker, `noindex` aparte).
- **El LCP de las tres es la misma imagen**: `hero.webp` de 1728 px (provisional, sin `srcset`, sin AVIF, servida sin compresión). Con derivados responsivos (480/960/1600 w) y preload, el objetivo de LCP ≤ 2.0 s es alcanzable; no es una diferencia entre direcciones.
- **A tiene CLS 0.052** frente a ≈0 de B y C; Lighthouse no señala el elemento. Pendiente de diagnosticar (probable relación con el cambio de fuente o con los fondos SVG del hero); si se elige A, se corrige en el bloque 3.
- Otros avisos comunes, todos esperables en el prototipo: CSS sin minificar, caché y compresión del servidor local, `uses-responsive-images`. No son diferenciales.
- Peso similar (353–376 KiB): dominan las fotos provisionales y el hero; las fuentes suman 93 KB (A, 5 WOFF2), 67 KB (B, 4) y 55 KB (C, 3).

## Capturas

`docs/prototipo/capturas/`, PNG con paleta de 256 colores (8 MB en total), generadas con Playwright + Chrome:

- `{a,b,c}-{390,820,1440}.png`: página completa. Ojo: en las capturas completas la barra inferior fija de móvil aparece donde cae el viewport de captura (a mitad de la imagen); es un artefacto de la captura, no del diseño.
- `{a,b,c}-{390,820,1440}-vista.png`: primera pantalla, con la navegación en su lugar real.
- `{a,b,c}-{390,820}-paquete.png`: paquete abierto (bottom sheet a 390 px, panel lateral a 820 px). A 1440 px el paquete es una sección y se ve en la captura completa.
- 390 px y 820 px se capturan con emulación táctil (`hover: none`, `pointer: coarse`); 1440 px con puntero de mouse.

## Hallazgos de la construcción

- **Orden de foco de la navegación**: “Cotizar” está en el centro del DOM (para que el orden de tabulación coincida con la barra inferior móvil). En tablet y desktop se mueve al final con `order`, por lo que el foco pasa por Cotizar antes de Galería y Contacto. Aceptable para el prototipo; para el sitio real conviene decidir si en desktop se duplica el CTA fuera de la lista o se mantiene.
- **`dialog` como sección en desktop**: se muestra con `display: block` sin `showModal()`; el JS le pone `role="region"` en desktop y lo quita en móvil/tablet. Sin JS funciona vía `#paquete` (`:target`).
- Chrome headless aplica `hover: hover` y `pointer: fine` a 1440 px, por lo que las capturas de desktop corresponden al layout de escritorio completo.
