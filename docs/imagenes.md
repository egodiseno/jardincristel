# Catálogo de imágenes de `referencia/`

Inventario de **cada imagen** del sitio de referencia (`referencia/`, el build anterior conservado como referencia) con su comportamiento actual y el cambio propuesto. La columna **Notas de Emmanuel** queda vacía para que la llenes. Fuente de los datos: `referencia/assets/main-DvOoeQah.js` (HTML de la página), `referencia/assets/main-oHxwuJhl.css` y los archivos mismos. Las decisiones de diseño que sustentan los cambios están en `docs/diseno.md`.

Convenciones: *px* = dimensiones reales del archivo; *radio* y *borde* son los de la clase Tailwind del elemento que enmarca la imagen; “eager” = sin `loading="lazy"`. Todas las rutas son relativas a `referencia/images/` salvo que se indique.

## Resumen

| Grupo | Archivos | Peso |
|---|---|---|
| Contenido y hero (`<img>` y hero) | 17 | 305 KiB |
| Acuarelas de fondo de escritorio (carga ≥ 1024 px) | 8 | 953 KiB |
| Acuarelas de fondo de móvil (carga < 1024 px) | 7 | 275 KiB |
| Fondos del modal / menú móvil | 2 | 120 KiB |
| Imágenes para redes (`meta.jpg`, `x.jpg`) | 2 | 233 KiB |
| Iconos y favicons (`referencia/icons/`) | 11 | 930 KiB |
| Iconos SVG en línea (dentro del JS) | 9 diseños | — |

Totales de `images/`: 36 archivos, 1,930,234 B. Hay dos casos de **imagen duplicada**: `nosotros.webp` (dos `<img>` en el DOM) y `detail.webp` (dos apariciones en la página); además `bg-modal-mobile.webp` se usa en dos elementos.

## 1. Hero e imágenes de contenido

| Sección | Archivo | px | Peso | Tipo | Radio | Borde | Hover | Lightbox | Duplicada en DOM | Cambio propuesto | Notas de Emmanuel |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Inicio | `hero.webp` | 1728×1080 | 77,746 B | **Fondo** (estilo inline en `<section id="inicio">`, `bg-cover bg-center`; se usa también en móvil) | ninguno | ninguno | no | no | no | Pasar a `<picture>` con `<img>` (LCP): AVIF/WebP, `srcset` 480/960/1600, `fetchpriority="high"`, preload; encuadre vertical para móvil; degradado suave marfil/malva bajo el texto para garantizar contraste. Conservar la fotografía (pérgola de herrería). | |
| Inicio | `heroSm.webp` | 430×936 | 11,654 B | **Fondo** previsto para ≥ 768 px (regla CSS `#inicio`) que **nunca se aplica** porque el estilo inline gana | ninguno | ninguno | no | no | no | Convertirlo en la variante móvil real (`<source media>`) con recorte vertical; regenerar desde el original a 480×1040. | |
| Inicio | `detail.webp` | 252×72 (los atributos dicen 552×72) | 9,434 B | **Decorativo** (ornamento floral bajo el título), `loading="lazy"`, `w-6/12 lg:w-2/12`; alt “Imagen decorativa con detalles del jardín” | ninguno | ninguno | no | no | **Sí**: el mismo archivo se usa de nuevo en Nosotros | Sustituir por un divisor SVG con el mismo motivo (< 2 KB) si se obtiene el vector; si no, AVIF. `alt=""` (es decorativo) y `width`/`height` correctos. | |
| Nosotros | `detail.webp` | 252×72 | (el mismo) | **Decorativo**, `loading="lazy"`, `w-7/12 lg:w-4/12`; alt “Detalle decorativo del Jardín Cristel” | ninguno | ninguno | no | no | **Sí** (segunda aparición) | Igual que arriba: un solo divisor reutilizable (`<symbol>` SVG), `alt=""`. | |
| Nosotros | `nosotros.webp` | 549×577 | 29,324 B | **Contenido**, eager; la foto muestra un salón con mesas, arreglo floral y luces de DJ (el alt dice “Grupo de personas disfrutando un evento”: no coincide) | `rounded-t-full lg:rounded-t-[117px]` (copia escritorio) / `rounded-t-[117px] lg:rounded-lg` (copia móvil) | `border-8`, malva-900 `#49242a` | no | no | **Sí**: dos `<img>` en el DOM (una `hidden lg:block`, otra `lg:hidden`) | Una sola `<img>` con `srcset`; arco con radio proporcional al ancho; sin borde; sombra suave teñida de lavanda; corregir el alt (“Salón del jardín con mesas decoradas”); foto de mayor resolución si existe (original). | |
| Eventos 1 | `bautizo.webp` | 530×386 | 8,348 B | **Contenido** (manos sosteniendo los pies de un bebé), lazy; alt “Decoración de bautizo con flores y velas” (no coincide) | tarjeta `rounded-t-[117px]`, imagen `rounded-t-[109px]` | tarjeta `border-8`, oliva-900 `#28350d` | no (solo el botón de la tarjeta) | no | no | Imagen simbólica 4:5 de mayor resolución (generada con IA según `docs/diseno.md` §5, o fotografía propia si Emmanuel la tiene); arco proporcional; sin borde oliva; zoom lento en hover dentro de marco fijo. | |
| Eventos 2 | `comunion.webp` | 530×386 | 6,268 B | **Contenido** (manos con libro de oración y rosario), lazy | igual | igual | no | no | no | Ídem. | |
| Eventos 3 | `xv.webp` | 530×386 | 4,784 B | **Contenido** (letras luminosas “XV” sobre fondo durazno), lazy | igual | igual | no | no | no | Ídem. | |
| Eventos 4 | `boda.webp` | 530×386 | 8,840 B | **Contenido** (anillos sobre flores rosas), lazy; alt “…flores y velas” (no hay velas) | igual | igual | no | no | no | Ídem; corregir alt. | |
| Eventos 5 | `graduacion.webp` | 530×386 | 6,550 B | **Contenido** (manos con diploma y birrete a contraluz), lazy | igual | igual | no | no | no | Ídem. | |
| Eventos 6 | `empresarial.webp` | 530×386 | 23,124 B | **Contenido** (carreta de madera con flores sobre el pasto; el alt la ubica en Jardín Cristel), lazy | igual | igual | no | no | no | Si es foto real del jardín, **conservarla** (las reglas de IA excluyen el lugar) y subirla de resolución; si no, ídem a las demás. Confirmar. | |
| Galería 1 | `galeria01.webp` | 530×386 | 19,168 B | **Contenido** (mesa con camino plateado y centro azul), lazy; alt “Vista del Jardín Cristel con decoración floral” (no coincide) | `rounded-tr-[40px] md:rounded-tr-[117px] rounded-bl-[40px] md:rounded-bl-[117px]`, `tl`/`br` rectos | `border-8` oliva-900 + `shadow-lg` | `hover:scale-105`, 300 ms (con `overflow-hidden`, dentro de la máscara) | **Sí**: abre el lightbox con la **misma** miniatura de 530 px ampliada | no | Quitar el lightbox: galería en página (carrusel con scroll-snap y contador en móvil; imagen principal + miniaturas en desktop). Versión grande ≥ 1200 px para la imagen principal; alt descriptivo real; sin borde oliva; sombra lavanda; zoom lento en hover. | |
| Galería 2 | `galeria02.webp` | 530×386 | 15,592 B | **Contenido** (mesa color miel, arreglo amarillo), lazy | igual | igual | igual | sí | no | Ídem. | |
| Galería 3 | `galeria03.webp` | 530×386 | 21,020 B | **Contenido** (centro de flores azules y menú impreso), lazy | igual | igual | igual | sí | no | Ídem. | |
| Galería 4 | `galeria04.webp` | 530×386 | 19,682 B | **Contenido** (mesa principal con flores blancas y azules), lazy | igual | igual | igual | sí | no | Ídem. | |
| Galería 5 | `galeria05.webp` | 530×386 | 19,998 B | **Contenido** (mesas con manteles azules), lazy | igual | igual | igual | sí | no | Ídem. | |
| Galería 6 | `galeria06.webp` | 530×386 | 15,002 B | **Contenido** (pasteles individuales y globos), lazy | igual | igual | igual | sí | no | Ídem. | |
| Contacto | `maps.webp` | 530×386 | 15,914 B | **Contenido** (captura de Google Maps), lazy; enlazada a `https://maps.app.goo.gl/GREPvSYNPcgL9c8D8` | `rounded-tr-[117px] rounded-bl-[117px]` | `border-8`, malva-900 | `hover:scale-105`, 300 ms | no (el lightbox solo toma `#galeria img`) | no | Mantener **imagen enlazada** (decisión #18) pero con un mapa propio estilizado en la paleta de marca (SVG ligero con pin) y enlace a Google Maps; la captura actual lleva marca de Google (revisar términos de uso). Mismo tratamiento de marco que el resto. | |

Notas del lightbox actual: el elemento `#lightbox-img` recibe el `src` de la miniatura de `#galeria` (530×386), por lo que se agranda sin más resolución (se ve borroso); no hay fotos grandes separadas.

## 2. Acuarelas florales de fondo (CSS, `background-image` por id de sección)

Las 15 acuarelas son **lienzos enormes casi vacíos con un racimo pequeño de flores**: el área con pintura cubre entre 2.9 % y 17.6 % del lienzo. Se midió el área con contenido (*bbox*) de cada una. Detalle y propuesta de composición en `docs/diseno.md` §4.

### Escritorio (≥ 1024 px)

| Sección | Archivo | px | Peso | Área con contenido (bbox) | Colocación actual | Cambio propuesto | Notas de Emmanuel |
|---|---|---|---|---|---|---|---|
| Nosotros | `bg-nosotros-left.webp` | 1920×942 | 41,642 B | 318×583 (izq., 2.9 %) | `left bottom`, cover | Recortar al racimo; evaluar eliminarla (racimo mínimo en el borde) para dejar solo la pieza derecha | |
| Nosotros | `bg-nosotros-right.webp` | 1920×942 | 101,728 B | 704×579 (abajo der., 6.6 %) | `right bottom`, cover | Recortar al racimo (≈ 704×579), AVIF/WebP, ubicar en el margen sin tapar el texto | |
| Eventos | `bg-eventos-top.webp` | 844×893 | 17,572 B | 844×259 (dos esquinas arriba, 3.8 %) | `left top`, cover | Recortar a la tira superior (844×259) | |
| Eventos | `bg-eventos-bottom.webp` | 1920×2030 | 185,128 B | 1868×606 (dos racimos abajo, 6.6 %) | `center bottom`, cover | Dos recortes (izq./der.) o uno espejado; resolución a la mitad | |
| Galería | `bg-gallery-left.webp` | 1920×1030 | 98,462 B | 358×990 (columna izq., 7.6 %) | `left top`, cover | Recortar a la columna; queda en el margen | |
| Galería | `bg-gallery-right.webp` | 1920×1030 | 162,444 B | 375×1001 (columna der., 9.9 %) | `right bottom`, cover | Recortar a la columna; o reutilizar la izquierda espejada para eliminar una pieza | |
| Contacto | `bg-footer-top.webp` | 1920×965 | 164,184 B | 1920×655 (peonía izq. + lirio der., 12.6 %) | `right top`, cover | Dos recortes laterales pequeños; ya no cubre todo el ancho | |
| Contacto | `bg-footer-bottom.webp` | 1920×961 | 204,630 B | 1920×319 (franja de flores, 17.6 %) | `center bottom`, cover | Recortar a la franja (1920×319), AVIF; es la pieza más pesada | |

### Móvil (< 1024 px)

| Sección | Archivo | px | Peso | Área con contenido (bbox) | Colocación actual | Cambio propuesto | Notas de Emmanuel |
|---|---|---|---|---|---|---|---|
| Nosotros | `bg-nosotros-mobile.webp` | 1125×3164 | 54,410 B | 1125×281 (abajo, 2.9 %) | `center bottom`, contain (cover ≥ 768) | Recortar a la franja inferior (≈ 750×190 a 2×) | |
| Eventos | `bg-eventos-top-mobile.webp` | 495×1109 | 12,806 B | 495×183 (arriba, 3.3 %) | `center top`, contain | Recortar a la tira superior | |
| Eventos | `bg-eventos-bottom-mobile.webp` | 495×1109 | 20,390 B | 495×235 (abajo, 9.8 %) | `center bottom`, contain | Recortar a la tira inferior | |
| Galería | `bg-gallery-top-mobile.webp` | 1125×2379 | 60,716 B | esquinas sueltas en un lienzo completo (4.0 %) | `center top`, contain (cover ≥ 768) | Reducir a una sola esquina | |
| Galería | `bg-gallery-bottom-mobile.webp` | 1125×2379 | 60,384 B | 909×718 (abajo der., 5.1 %) | `right bottom`, contain | Recortar al racimo | |
| Contacto | `bg-footer-top-mobile.webp` | 1125×2625 | 52,494 B | 881×579 (arriba izq., 3.7 %) | `left top`, contain | Recortar al racimo, reducir | |
| Contacto | `bg-footer-bottom-mobile.webp` | 495×1155 | 20,302 B | 495×200 (abajo, 6.3 %) | `center bottom`, cover | Recortar a la franja | |

### Fondos del modal y del menú móvil

| Sección | Archivo | px | Peso | Colocación actual | Cambio propuesto | Notas de Emmanuel |
|---|---|---|---|---|---|---|
| Modal “paquete” (≥ 1024) | `bg-modal.webp` | 1920×881 | 59,536 B | `#modal`, `center bottom`, cover; el modal está `display:none` (no se descarga hasta abrirlo) | **Se elimina junto con el modal** (no habrá modales). Requiere tu aprobación para borrar. | |
| Modal “paquete” (< 1024) y **menú móvil** | `bg-modal-mobile.webp` | 495×1002 | 62,890 B | usada **dos veces**: `#modal` (`center bottom`, contain) y `#mobile-menu` (`center top`, cover); el menú está fuera de pantalla pero **sí se descarga al cargar** (Lighthouse: ~55 KB de `offscreen-images`) | Se elimina: no habrá modal y la navegación móvil pasa a barra inferior. Requiere tu aprobación para borrar. | |

## 3. Imágenes para redes (no aparecen en la página)

| Archivo | Uso | px | Peso | Cambio propuesto | Notas de Emmanuel |
|---|---|---|---|---|---|
| `meta.jpg` | `og:image` (Open Graph, con `www`) | 1200×630 | 114,771 B | Rehacer con el branding (arco + acuarela + logo), ≤ 80 KB; ruta absoluta sin `www` | |
| `x.jpg` | `twitter:image` | 1200×675 | 123,297 B | Una sola imagen 1200×630 para ambas etiquetas; retirar `x.jpg` (con tu aprobación) | |

## 4. Iconos y favicons (`referencia/icons/`, más `favicon.ico` en la raíz del repo)

| Archivo | px | Peso | Uso | Cambio propuesto | Notas de Emmanuel |
|---|---|---|---|---|---|
| `favicon.svg` | 600×600 | 428,521 B | **No está referenciado** en `index.html`; es un PNG incrustado en base64 (no es un vector) | Vectorizar el logo (decisión #9): < 5 KB y referenciarlo; si no hay vector, no usar SVG | |
| `safari-pinned-tab.svg` | 600×600 (viewBox) | 171,917 B | `rel="mask-icon"` (Illustrator, trazado complejo) | Simplificar a un trazado monocromo (< 5 KB) o retirar (Safari moderno ya no lo exige) | |
| `android-chrome-512x512.png` | 512×512 | 232,307 B | `rel="icon"` y manifest | Optimizar (≈ 40 KB) y añadir versión `maskable` | |
| `android-chrome-192x192.png` | 192×192 | 44,393 B | `rel="icon"` y manifest | Optimizar | |
| `apple-touch-icon.png` | 180×180 | 21,302 B | `rel="apple-touch-icon"` | Optimizar | |
| `mstile-150x150.png` | **270×270** (el nombre dice 150) | 21,275 B | Manifest (declarado como 270) | Retirar o renombrar; legado de Windows | |
| `favicon-96x96.png` | 96×96 | 13,583 B | Manifest | Candidato a retirar (redundante) | |
| `favicon-32x32.png` | 32×32 | 2,545 B | `rel="icon"` | Conservar | |
| `favicon-16x16.png` | 16×16 | 1,344 B | `rel="icon"` | Conservar | |
| `favicon.ico` (+ copia en la raíz) | 48×48 (+2 tamaños) | 15,086 B | `rel="icon"` y petición automática del navegador | Conservar una copia (raíz); regenerar desde el logo vectorial | |
| `browserconfig.xml` | — | 255 B | Legado IE/Edge; apunta a `/mstile-150x150.png` (404) | Retirar (con tu aprobación) | |

## 5. Iconos SVG en línea (dentro del HTML generado por el JS)

Los iconos están pegados como `<svg><path …></svg>` en cada uso, sin reutilizar.

| Icono | Usos actuales | Cambio propuesto |
|---|---|---|
| WhatsApp (Bootstrap Icons, 16×16) | header escritorio, Contacto móvil, barra CTA móvil, modal (4 copias del mismo trazado de ≈ 1.4 KB) | Un solo `<symbol>` y `<use>` |
| Facebook | header escritorio, botón de galería (2 copias) | Un `<symbol>` |
| Hamburguesa y cerrar | menú móvil (cerrar también en el modal) | Se eliminan con el menú desplegable (barra inferior) y el modal |
| Chevron hacia abajo | CTA del hero (solo escritorio) | `<symbol>` |
| Flecha a la derecha | botones “Más información” (×6) y “Solicita tu presupuesto” | `<symbol>`; los botones nuevos son “Cotizar mi <evento>” |
| Teléfono relleno / contorno | Contacto (móvil / escritorio) | Un `<symbol>` |
| Ubicación | Contacto (escritorio) | `<symbol>` |
| Cerrar × (lightbox) | caracteres `&times;`, `&#10094;`, `&#10095;` como texto | Se eliminan con el lightbox |

## 6. Logo (marcador) y fuente retirada

- `img/logo.svg` (**nuevo**, 20 KB): marcador del logo “Jardín Cristel” con la imagen actual del logo (la flor de `icons/android-chrome-512x512.png`, incrustada como WebP 256×256), accesible con `role="img"` y `aria-label="Jardín Cristel"`. Se sustituye por el SVG final del cliente (decisión #10; `docs/diseno.md` §7).
- `referencia/fonts/Berthold-Script.ttf` se **retiró del despliegue de la rama** el 2026-10-20 (sigue en el historial de git). La referencia (`referencia/index.html`) muestra ahora su título y logo con la tipografía de reserva (`cursive`).
