# Bitácora — Jardín Cristel (rama `modernizacion`)

Cada tarea termina con una entrada aquí: fecha, qué se hizo, por qué, archivos tocados, decisiones y pendientes. Los commits se registran solos al final del archivo (hook `.githooks/post-commit`).

## Entradas

### 2026-10-20 — Inicio del proyecto: configuración, baseline y auditoría

**Qué se hizo**
- Exploración del repo (estructura, pesos, dependencias, organización de CSS/JS).
- Creación de `CLAUDE.md` con descripción, stack, enfoque Mobile First y reglas de trabajo.
- Creación de esta bitácora y del hook `.githooks/post-commit` (activado con `core.hooksPath`).
- Benchmark baseline con Lighthouse (móvil y desktop) contra https://jardincristel.mx.
- Auditoría de código y entrega de `docs/benchmark/hallazgos.md`.

**Por qué**
Establecer reglas, trazabilidad y una línea base medible antes de modernizar el sitio.

**Archivos tocados**
`CLAUDE.md`, `.gitattributes`, `.githooks/post-commit`, `docs/BITACORA.md`, `docs/benchmark/baseline/*`, `docs/benchmark/hallazgos.md`. No se modificaron `index.html` ni assets.

**Decisiones**
- `.gitattributes` fuerza LF en `.githooks/*` para que el hook funcione en Windows.
- El hook solo escribe en el archivo (sin commit), por lo que deja `docs/BITACORA.md` modificado tras cada commit; se incluye en el siguiente.
- Lighthouse 12 vía `npx` con Chrome local en modo headless.

**Pendientes**
- Revisar `docs/benchmark/hallazgos.md` y decidir qué atacar primero.
- Definir diseño (fuera de alcance de esta sesión).

### 2026-10-20 — Inventario del sitio actual y propuesta de reconstrucción

**Qué se hizo**
- `docs/inventario.md`: textos por sección, imágenes (ruta, sección, dimensiones, peso), paleta con contrastes, tipografías, breakpoints, animaciones, enlaces, analítica/gtag, íconos y manifest, extraídos de `index.html`, el bundle JS y el CSS.
- `docs/propuesta.md`: arquitectura estática nueva, mapa de secciones con un solo h1, resolución de los 19 hallazgos, estrategia de LCP, dominio canónico sin www, tracking GA4 por delegación, plan por bloques y decisiones pendientes.

**Por qué**
Se decidió reconstruir como HTML semántico estático (sin build ni framework); hay que fijar contenido, alcance y plan antes de escribir el sitio.

**Archivos tocados**
`docs/inventario.md`, `docs/propuesta.md`, `docs/BITACORA.md`. No se escribió el sitio nuevo ni se modificaron `index.html` ni assets.

**Decisiones**
- Se conserva la identidad visual; único ajuste de color propuesto: malva más oscuro (`#9c5460`) para cumplir contraste AA.
- Los assets actuales no se borran: pasarían a `referencia/` hasta que Emmanuel lo apruebe.
- Hallazgos nuevos N1–N7 (p. ej. `hero.webp` de 78 KB se sirve también en móvil porque el estilo inline pisa la regla de `heroSm.webp`; `favicon.svg` es un PNG incrustado; `lavanda-700` no existe, el hover no hace nada; el modal es idéntico para los 6 eventos).

**Pendientes**
- Emmanuel debe responder las 24 decisiones de `docs/propuesta.md` §9 (contenido del paquete, originales de fotos, logo vectorial, licencia de la fuente, dominio canónico, etc.).
- Empezar el bloque 0 de implementación tras su aprobación.

### 2026-10-20 — Bloque 0, experiencia por dispositivo y decisiones aprobadas

**Qué se hizo**
- **Bloque 0:** el build anterior (`index.html`, `assets/`, `images/`, `fonts/`, `icons/`, `manifest.json`) se movió con `git mv` a `referencia/` (historial conservado; sigue funcionando en `/referencia/` porque sus rutas son relativas). Se crearon `css/`, `js/`, `img/`, `fonts/` (con `.gitkeep`), un `index.html` provisional (`noindex`) y `netlify.toml` (`publish = "."`, `X-Robots-Tag: noindex` para `/referencia/*`). Quedan en la raíz `robots.txt`, `sitemap.xml` y `favicon.ico` hasta el bloque 9.
- `docs/propuesta.md`: nueva **sección 10 “Experiencia por dispositivo”** (un HTML, tres layouts por CSS con media queries combinadas ancho + hover + pointer; móvil como app web, tablet y desktop); bloques 1 y 3–6 marcados como dependientes de la aprobación de la dirección visual; `referencia/` actualizado en §1.
- §9: decisiones **aprobadas** #4, #6, #12–#15 (sin `AggregateRating`), #16 (no en v1), #17 (no), #18 (imagen enlazada), #19 (solo galería, bajo demanda), #21 (sin www), #22 (dos semanas tras el merge), #23, #24. **Pendientes del cliente:** #1, #2, #3, #5, #7, #8, #9, #10, #11, #20.

**Por qué**
Dejar el repo listo para construir el sitio nuevo sin perder el anterior, y fijar por escrito cómo se comporta en cada dispositivo antes de escribir CSS.

**Archivos tocados**
Movidos a `referencia/`; nuevos: `index.html` (provisional), `netlify.toml`, `css/.gitkeep`, `js/.gitkeep`, `img/.gitkeep`, `fonts/.gitkeep`; editados: `docs/propuesta.md`, `docs/BITACORA.md`.

**Decisiones**
- El `index.html` provisional es solo para la rama: **no se debe hacer merge a `main` antes de los bloques 3–6**, porque reemplazaría el sitio en producción.
- Lo que lleva a la raíz el sitio viejo (`robots.txt`, `sitemap.xml`) no se toca todavía (bloque 9).
- El layout de tablet es el valor por defecto desde 48em; el de desktop exige ancho ≥ 75em **y** `hover: hover` **y** `pointer: fine`.
- Netlify no permite activar el deploy preview desde `netlify.toml` (es un ajuste del sitio en el panel). Netlify ya marca los deploys de rama y de PR con `noindex`.

**Pendientes**
- Activar en el panel de Netlify el branch deploy de `modernizacion` (pasos en la respuesta de esta sesión).
- Aprobación de la dirección visual (§10) para iniciar los bloques 1 y 3–6; el bloque 2 (head/SEO) y el 9 pueden avanzar antes.
- Respuestas del cliente a las decisiones pendientes.
- `docs/benchmark/competencia.md` está sin versionar (no es de esta sesión); se deja intacto.

### 2026-10-20 — Rediseño completo: prototipo de tres direcciones visuales

**Qué se hizo**
- Se versionó `docs/benchmark/competencia.md` y la línea pendiente de la bitácora (commit “docs: benchmark competitivo”).
- `docs/propuesta.md`: nuevo principio de identidad (rediseño completo; solo se conserva el nombre); H3 (malva `#9c5460`) y decisión #10 (Berthold Script) superadas — solo fuentes OFL autohospedadas; decisión #9 ahora es “wordmark nuevo, pendiente de aprobación del cliente”; nueva §11 con el comparativo de direcciones.
- `prototipo/`: portada (`index.html`) + `a.html`, `b.html`, `c.html` con **el mismo HTML** (verificado por hash del body normalizado) y CSS propio por dirección (`css/a.css`, `b.css`, `c.css`) sobre un `base.css` mínimo (reset, accesibilidad, mecánica del `<dialog>` y del carril). A: herrería y jardín (Fraunces + Instrument Sans). B: fiesta de pueblo (Bricolage Grotesque + Figtree). C: editorial cálido (Gloock + Manrope). Fuentes WOFF2 latin de Fontsource copiadas a `prototipo/fonts/` con sus licencias OFL; sin CDN ni GA.
- Sección 10 aplicada: barra inferior con “Cotizar” central en móvil, carril scroll-snap, paquete en `<dialog>` (bottom sheet / panel lateral / sección en desktop), menú horizontal con hover en desktop. JS de ≈2 KB.
- `docs/prototipo/`: README con contrastes, resultados y hallazgos; 24 capturas (390/820/1440 de página completa y primera pantalla, más paquete abierto en 390/820); reportes Lighthouse móvil de cada dirección.

**Por qué**
Elegir la dirección visual con evidencia (pantallas reales, contraste, rendimiento) antes de los bloques 1 y 3–6.

**Resultados Lighthouse móvil (servidor local sin compresión, `noindex`)**
A: 93 / 100 / 100 (LCP 2.9 s, CLS 0.052) · B: 95 / 100 / 100 (LCP 2.8 s, CLS 0.003) · C: 95 / 100 / 100 (LCP 2.8 s, CLS 0.001). SEO 66 en las tres por el `noindex` intencional. El LCP de las tres es la misma imagen provisional (`hero.webp` 1728 px sin `srcset`).

**Archivos tocados**
`prototipo/**` (nuevo), `docs/prototipo/**` (nuevo), `docs/propuesta.md`, `docs/BITACORA.md`. No se tocaron `main`, `referencia/` ni el `index.html` raíz.

**Decisiones**
- La portada del prototipo usa fuentes del sistema para no favorecer a ninguna dirección.
- Las capturas se recomprimen a PNG de paleta (24 MB → 8 MB) sin diferencia visible.
- Las fotos son las provisionales de `referencia/images`; el prototipo las enlaza por ruta relativa (`../referencia/images/`), por lo que **depende de `referencia/`** mientras exista.
- Se detuvo el servidor local del puerto 8123 por su PID exacto, sin comandos de cierre masivo.

**Pendientes**
- El cliente elige dirección (A, B o C) y aprueba el wordmark: desbloquea los bloques 1 y 3–6.
- Diagnosticar el CLS 0.052 de A si se elige.
- Orden de foco de “Cotizar” en tablet/desktop (se reordena con `order`); decidir solución en el sitio real.
- Originales de fotos, logo vectorial y resto de decisiones del cliente (#1, #2, #3, #5, #7, #8, #10 ya resuelta, #11, #20).

### 2026-10-20 — Cambio de dirección: optimizar la identidad de referencia

**Qué se hizo**
- **Cambio de dirección:** se descarta el rediseño de identidad. Se conserva y se optimiza el branding de `referencia/` (paleta malva/lavanda/marfil, Berthold Script en logo y título, acuarelas y arcos), sin Tailwind ni Vite.
- `docs/propuesta.md`: el principio de identidad vuelve a “conservar y optimizar”; las decisiones #9 (logo vectorial) y #10 (licencia web de Berthold Script: licencia web, compra o contornos SVG solo para logo y H1) y #11 revertidas a pendientes; **§11 marcada como descartada** (las tres direcciones se sentían plantilla y perdían el branding); §10 se mantiene aplicada al estilo de referencia, con el nuevo apartado §10.8 (sin modales); H3, N3, N4, el plan (bloque 5) y el mapa de secciones actualizados.
- **Eliminados** `prototipo/` y `docs/prototipo/` con `git rm`. **Recuperables en el commit `f14d291`**: `git show f14d291:prototipo/a.html` o `git checkout f14d291 -- prototipo docs/prototipo`.
- **`docs/diseno.md`** (nuevo): tokens de color (malva-400 solo títulos ≥ 24 px y decorativo; malva-500 para fondos con texto marfil; malva-600 hover y enlaces; lavanda-700/800/900; foco de 2 px) con **tabla de contraste verificada por script (25 pares, 0 fallos)**; imágenes sin borde oliva, sombra lavanda, arco proporcional con `cqw`, zoom lento dentro de la máscara y `prefers-reduced-motion`; **sin modales** (sección “Qué incluye tu evento” con 4 categorías, `<details>` en móvil; CTA “Cotizar mi <evento>” con WhatsApp prellenado por evento y enlace “Ver qué incluye”; galería en página con carrusel scroll-snap y contador en móvil e imagen principal + miniaturas en desktop); composición de acuarelas por sección con meta de peso; reglas de dirección de arte para imágenes de eventos con IA.
- **`docs/imagenes.md`** (nuevo): catálogo de las 36 imágenes de `referencia/images/`, los 11 iconos y los iconos SVG en línea, con comportamiento actual (sección, tamaño, peso, radio, borde, hover, lightbox, duplicados, fondo/contenido), **cambio propuesto** y la columna vacía **Notas de Emmanuel**.
- `tools/contraste.mjs` (nuevo): calcula los contrastes WCAG de los tokens y falla si alguno no cumple.
- `CLAUDE.md`: regla “Sin frameworks CSS ni bundlers. Todo cambio al sitio se hace desde Claude Code en terminal.”, `referencia/` y la identidad conservada descritas, y documentación enlazada.

**Por qué**
Las tres direcciones del prototipo perdían el branding del cliente. Es mejor optimizar lo que ya es suyo (identidad) mejorando contraste, interacción, peso e imágenes.

**Archivos tocados**
`docs/propuesta.md`, `docs/diseno.md`, `docs/imagenes.md`, `docs/BITACORA.md`, `CLAUDE.md`, `tools/contraste.mjs`; eliminados `prototipo/**` y `docs/prototipo/**`.

**Decisiones y hallazgos**
- Las acuarelas son lienzos casi vacíos (la pintura cubre del 2.9 % al 17.6 % del área); recortarlas y reducir piezas es la mayor palanca de peso: 953 KiB en escritorio y 275 KiB en móvil hoy, con metas de ≤ 250 KiB y ≤ 70 KiB (sujetas a validación al generarlas).
- Los alt actuales no coinciden con varias fotos (nosotros, bautizo, boda, galería); se corrigen en la implementación.
- `malva-400` como texto solo cumple AA para texto grande (3.4–3.8:1): por eso se restringe a títulos ≥ 24 px.
- `bg-modal.webp`, `bg-modal-mobile.webp` y las acuarelas sustituidas no se borran sin aprobación (regla de trabajo).
- Conflicto resuelto: §10 original usaba `<dialog>` para paquete y visor; ahora rige “sin modales” (§10.8 y `docs/diseno.md` §3).

**Pendientes**
- Emmanuel: aprobar `docs/diseno.md` (desbloquea los bloques 1 y 3–6), llenar la columna “Notas de Emmanuel” de `docs/imagenes.md` y resolver #1, #2, #3, #5, #7, #8, #9, #10 y #11 (y #20).
- Confirmar si `empresarial.webp` es foto real del jardín (se conservaría).
- Licencia web de Berthold Script antes de publicar.

### 2026-10-20 — Plan de medición (solo documentación) y prioridad de la licencia de Berthold Script

**Qué se hizo**
- `docs/medicion.md` (nuevo), para integrarse en el **bloque 7**; no se implementó nada:
  - **GA4 (`G-DNF30KJ0Y7`)** con tracking por delegación y atributos `data-*` (`data-track`, `data-track-location`, `data-event-type`, `data-categoria`): `click_whatsapp` (con `link_location`: hero, tarjeta, que-incluye, barra-movil, header, contacto; y `event_type`: boda, xv, bautizo, comunion, graduacion, empresarial, general), `click_phone`, `click_maps`, `click_facebook`, `view_que_incluye` (una vez por visita), `open_categoria_incluye` (al abrir cada `<details>`) y `gallery_navigate` (con índice). Dimensiones personalizadas (`link_location`, `event_type`, `categoria`) y eventos clave (`click_whatsapp`, `click_phone`) con los pasos del panel.
  - **Microsoft Clarity**: carga tras `load` con `requestIdleCallback`, integración con GA4 desde su panel, marcador `CLARITY_ID`, nota de que el sitio no tiene formularios.
  - **Search Console** (propiedad de dominio por DNS; alternativa: archivo HTML en la raíz que Emmanuel me pasa; enviar el sitemap tras el merge), **UTM** de Google Business Profile y Facebook, **aviso de privacidad** (qué herramientas mencionar; el texto legal lo valida el cliente), fase posterior en **Looker Studio** y **checklist de verificación** (DebugView, Tag Assistant, Clarity, LCP sin empeorar).
- `docs/propuesta.md`: el bloque 7 apunta a `docs/medicion.md` e incluye Clarity; la §7 avisa de que manda el nuevo documento; el árbol de archivos, la decisión #20 y las referencias a `docs/tracking.md` actualizados.
- **Decisión #10 (licencia web de Berthold Script) sube a prioridad alta** en `docs/propuesta.md`, `docs/diseno.md` y `CLAUDE.md`: el TTF ya se sirve públicamente (verificado: `https://jardincristel.mx/fonts/Berthold-Script.ttf` responde 200) y también desde `referencia/fonts/` en la rama y sus deploys.

**Por qué**
Dejar definido cómo se medirá el sitio antes de implementarlo y no mezclar la analítica con el LCP; y atender cuanto antes el riesgo de licencia de la tipografía.

**Archivos tocados**
`docs/medicion.md` (nuevo), `docs/propuesta.md`, `docs/diseno.md`, `CLAUDE.md`, `docs/BITACORA.md`. No se tocaron `main`, `referencia/` ni el `index.html` de la raíz.

**Decisiones**
- GA4 y Clarity solo se activan en `jardincristel.mx` (o con `?medicion=debug`), para que los deploy previews y `localhost` no contaminen los datos; se recomienda activar el filtro de tráfico de desarrollador en GA4.
- Los eventos `click_cta` y `select_event_type` de la propuesta original desaparecen; el evento genérico `click` del sitio de referencia no se porta.
- Propuesta de UTM de Facebook con `utm_medium=social` (no `organic`) para que GA4 lo clasifique como Organic Social; Emmanuel puede preferir `organic`.
- Antes del merge hay que decidir (con aprobación) si `referencia/fonts/Berthold-Script.ttf` se excluye del despliegue.

**Pendientes**
- Emmanuel: confirmar origen y licencia de Berthold Script (prioridad alta); crear el proyecto de Clarity y pasar el ID; verificar Search Console (DNS o archivo HTML); actualizar los enlaces de Google Business Profile y Facebook; registrar dimensiones y eventos clave en GA4; validar el aviso de privacidad y elegir el consentimiento (A o B).
- Datos que faltan para el aviso: correo ARCO y razón social/domicilio (decisión #5).

### 2026-10-20 — ID de Microsoft Clarity registrado en el plan de medición

**Qué se hizo**
- Emmanuel creó el proyecto de Clarity y pasó el snippet; el ID es `z0uyber2t9`. Se registra en `docs/medicion.md` (§2, checklist y pendientes) y en el bloque 7 de `docs/propuesta.md` (y decisión #20). Sigue siendo solo documentación: nada implementado.
- El snippet entregado se verificó contra el esqueleto documentado (misma cola `clarity.q`, `async`, `https://www.clarity.ms/tag/<ID>`).

**Por qué**
Cerrar el marcador `CLARITY_ID` con el valor real para que el bloque 7 se implemente sin pasos pendientes.

**Archivos tocados**
`docs/medicion.md`, `docs/propuesta.md`, `docs/BITACORA.md`.

**Decisiones**
- El snippet **no** va en el `<head>` como indica el panel: se inyecta desde `js/main.js` tras `load` y en `requestIdleCallback`, para no afectar el LCP.
- Se conserva la guarda: si `CLARITY_ID` está vacío o es el marcador, no se carga; y solo se carga en `jardincristel.mx` (o con `?medicion=debug`).

**Pendientes**
- Emmanuel: conectar Clarity con GA4 desde el panel de Clarity.
- Resto de pendientes de medición sin cambios (Search Console, UTM de Business Profile/Facebook, dimensiones y eventos clave en GA4, aviso de privacidad y consentimiento).

### 2026-10-20 — Decisión #10 (Berthold Script): logo SVG, fuente temporal y TTF retirado

**Qué se hizo**
- **Logo:** `img/logo.svg` (nuevo, 20 KB) como **marcador** con la imagen actual del logo (la flor acuarelada de `referencia/icons/android-chrome-512x512.png`, incrustada como WebP 256×256), con `role="img"` y `aria-label="Jardín Cristel"`. **No se vectorizó nada desde `Berthold-Script.ttf`.**
- **Fuente temporal:** elegida **Pinyon Script (OFL)**; `fonts/pinyon-script-400.woff2` (**24.5 KB**, subset latino con fonttools desde el WOFF2 de Fontsource, 200 glifos, `font-display: swap`) y `fonts/OFL-pinyon-script.txt`. Comparada con Great Vibes, Parisienne, Alex Brush, Allura, Italianno y Tangerine (mismo texto a 64/36/26 px); motivos en `docs/diseno.md` §7.2. Uso: solo H1 y H2, mínimo 36 px; H2 en malva-600.
- **TTF retirado del despliegue de la rama:** `git rm referencia/fonts/Berthold-Script.ttf`. **Sigue en el historial de git** (p. ej. commits `74ec3f1` y `d3139cc`, y `e03c554` donde se movió a `referencia/`); no se reescribió la historia.
- `docs/propuesta.md` (#10 ahora ✅ resuelta con condición, #9 parcialmente cubierta, árbol de archivos, preload de fuentes) y `CLAUDE.md`: **“no mergear a `main` sin el SVG final y la licencia confirmada.”** Notas en `docs/diseno.md` (nueva §7), `docs/imagenes.md` e `docs/inventario.md`.

**Por qué**
El TTF de Berthold Script se servía públicamente sin licencia confirmada. Se retira del despliegue, se deja un marcador y una fuente OFL temporal para poder seguir construyendo, y se bloquea el merge hasta que exista el SVG final y la licencia.

**Archivos tocados**
Nuevos: `img/logo.svg`, `fonts/pinyon-script-400.woff2`, `fonts/OFL-pinyon-script.txt`. Eliminado del árbol: `referencia/fonts/Berthold-Script.ttf`. Editados: `docs/propuesta.md`, `docs/diseno.md`, `docs/imagenes.md`, `docs/inventario.md`, `CLAUDE.md`, `docs/BITACORA.md`.

**Decisiones y hallazgos**
- La ruta `fonts/Berthold-Script.ttf` de la instrucción ya no existía en la raíz (el bloque 0 lo movió a `referencia/fonts/`); el archivo desplegado en la rama era ese.
- “La imagen actual del logo” es la flor: el nombre “Jardín Cristel” en la referencia es texto en Berthold, no una imagen; el marcador muestra solo la flor.
- `role="img"`/`aria-label` solo funcionan si el SVG se incrusta en el HTML; con `<img>` el nombre lo da el `alt` (documentado en `docs/diseno.md` §7.1).
- `referencia/index.html` ahora cae a `cursive` en título y logo (y su CSS pide un archivo que ya no existe): aceptable, es solo referencia.
- **Producción (`main`) sigue sirviendo `/fonts/Berthold-Script.ttf`**; no se toca `main`. Desaparece con el merge. Si quieres quitarlo antes, hay que hacerlo directamente en `main`.

**Pendientes**
- Cliente: comprar la licencia Desktop de Berthold Script y entregar el SVG final del logo (bloquean el merge).
- Afinar el fallback con `size-adjust`/`ascent-override` de Pinyon Script al implementar el bloque 1 y medir el CLS.

### 2026-10-20 — Piloto: hero, eventos y “Qué incluye tu evento” (`docs/diseno.md` aprobado)

**Qué se hizo**
- `docs/diseno.md` **aprobado**; desbloquea los bloques 1 y 3–6. Se implementó el **piloto** en la rama `modernizacion` (commit `3ae5cba`), sin tocar `main`:
  - **Hero:** `<picture>` AVIF/WebP (recorte 4:5 en móvil; preload con `fetchpriority`), logo marcador (`img/logo.svg`), H1 en Pinyon Script, CTA “Cotizar por WhatsApp” con mensaje prellenado.
  - **Eventos:** 6 tarjetas con arco proporcional en `cqw`, sin bordes, sombra lavanda, zoom lento de la foto dentro del marco y CTA “Cotizar mi <evento>” (WhatsApp prellenado por evento) + “Ver qué incluye”; carril con scroll-snap en móvil, 2 columnas en tablet, 3 en escritorio.
  - **Qué incluye tu evento:** 4 categorías en `<details>` (solo el primero abierto en móvil; abiertos en tablet y escritorio). Sin `<dialog>` ni modales (§10.8).
  - Tres layouts por media queries (<48em; ≥48em; ≥75em con `hover: hover` y `pointer: fine`) con un solo HTML; navegación del piloto (barra inferior móvil, barra superior tablet, menú horizontal escritorio).
  - **Medición:** `data-*` y GA4 por delegación según `docs/medicion.md` (solo mide en `jardincristel.mx` o con `?medicion=debug`); **Clarity no se cargó**.
  - Nuevos: `index.html` (reemplaza el provisional), `css/styles.css`, `js/main.js`, `img/hero/*` (AVIF/WebP), `img/eventos/*` (provisionales), `fonts/merriweather-400|700.woff2` + `OFL-merriweather.txt`, `tools/optimizar-imagenes.cjs`.
- **Medición** (`docs/benchmark/piloto/`): Lighthouse sobre el deploy de la rama (3 corridas, mediana): móvil 100 / 100 / 100, LCP **1.41 s** (línea base 74 y 4.9 s), CLS 0.000, TBT 19 ms, 161 KiB (902 KiB); escritorio 100 / 100 / 100, LCP 0.41 s. SEO 69 solo por el `noindex` intencional. Capturas a 360, 768 y 1280 px.
- Documentación: `docs/propuesta.md` (estado por bloque tras el piloto), `docs/diseno.md` (§8 notas de implementación), `docs/medicion.md`, `docs/imagenes.md` (§7 derivados), `CLAUDE.md`.

**Por qué**
Validar el sistema de diseño y la arquitectura (HTML en el documento, imágenes responsivas, fuentes propias, JS mínimo) con una porción real antes de construir el resto.

**Archivos tocados**
Ver lista de nuevos arriba; editados `docs/propuesta.md`, `docs/diseno.md`, `docs/medicion.md`, `docs/imagenes.md`, `CLAUDE.md`, `docs/BITACORA.md`.

**Decisiones y hallazgos**
- **GA4 cuesta rendimiento:** con `?medicion=debug` (gtag cargado) el móvil baja a Performance 98, LCP 1.71 s, **TBT 115 ms (meta 50)** y **323 KiB (meta 300)**; gtag.js ≈ 162 KiB. A decidir en el bloque 7: retrasar la carga hasta la primera interacción o aceptar el costo.
- **Incidencia con GA4:** durante esas corridas el bloqueo de red no cubrió `https://www.google.com/g/collect` y **pudieron llegar a la propiedad real `G-DNF30KJ0Y7` unos 4 `page_view` con `debug_mode`** (3 corridas + 1 repetición). Activar el filtro “Tráfico de desarrollador” en GA4 (`docs/medicion.md` §1.7) y descartarlos. Las pruebas de interacción bloquearon toda la red de Google y no enviaron nada.
- “Cotizar” existe dos veces en el DOM (barra inferior < 48em y header ≥ 48em; el CSS oculta el que no toca): resuelve el orden de foco sin `data-track-location` dinámico.
- El velo de lavanda-900 sobre el hero se calibró midiendo el contraste real sobre píxeles (peor píxel ≥ 5.3:1 a 320 px); se aligeró para que la foto se vea.
- Las imágenes de eventos siguen siendo provisionales (530×386 px): se ven blandas a alta densidad hasta tener las finales.
- `index.html` del piloto lleva `noindex` provisional: quitarlo antes del merge. Condición de merge vigente (decisión #10): **no mergear a `main` sin el SVG final y la licencia confirmada**.
- Se usaron y se cerraron por PID exacto los servidores locales (8124, PID 78180).

**Pendientes**
- Resto de bloques: Nosotros, galería, contacto/mapa, head completo (OG, JSON-LD, iconos, manifest), robots/sitemap/caché, acuarelas y QA.
- Decidir la estrategia de carga de GA4 (TBT/peso) y activar el filtro de tráfico de desarrollador.
- Emmanuel: notas de `docs/imagenes.md`, imágenes finales, licencia/SVG del logo, mensaje de WhatsApp (#7) y demás decisiones pendientes.
- No verificado: dispositivos reales, Safari/Firefox, lectores de pantalla/axe, recepción real en GA4 (ver `docs/benchmark/piloto/README.md`).

## 2026-10-21 — Adornos acuarelados en el piloto de escritorio

**Qué se hizo**
1. Inventario de todas las acuarelas de `referencia/` (formato, píxeles, alfa, peso, uso y calidad para ≥ 1440 px): `docs/imagenes.md` §8. Las 17 son WebP con alfa; sirven para escritorio los 8 lienzos de 1920 px (recortados al racimo); los de móvil de 495 px y `detail.webp` (252 px) no.
2. Composición por sección y por dispositivo escrita **antes** de implementar: `docs/diseno.md` §9 (y ajustes a §4.1/§4.2: el hero admite una esquina; “Qué incluye”, dos laterales).
3. Implementación: `tools/optimizar-adornos.cjs` genera 8 piezas AVIF/WebP con alfa en `img/adornos/`; `<img alt="" aria-hidden="true">` posicionadas con CSS (`pointer-events: none`, `z-index: -1` dentro de secciones `isolation: isolate; overflow: clip`), `loading="lazy"` + `decoding="async"` + `fetchpriority="low"` (la esquina del hero y el divisor del hero sin `lazy`; la esquina solo se descarga en escritorio vía `<source media>`). Divisor floral (`detail.webp`) bajo el H1 y los H2.
4. Mediciones y capturas (1280 y 1920 px) en `docs/benchmark/piloto/`.

**Por qué:** las acuarelas son lo que personaliza el sitio y el piloto las había omitido.

**Archivos tocados:** `index.html`, `css/styles.css`, `img/adornos/*` (nuevo), `tools/optimizar-adornos.cjs` (nuevo), `docs/{imagenes,diseno,BITACORA}.md`, `docs/benchmark/piloto/*`.

**Decisiones**
- Sin parallax ni movimiento: `prefers-reduced-motion` no necesita reglas nuevas.
- Piezas con borde plano de lienzo (esquinas superiores de Eventos, laterales de “Qué incluye”) pegadas al borde de la ventana; las rosas inferiores ancladas al bloque de contenido (se probó anclar todo al contenido y a 1920 px quedaba cortado en seco).
- Ajustes de layout de escritorio: `#eventos` relleno inferior 6→10 rem; `#incluye` relleno inferior 6→9 rem. Ancho de contenido (74 rem) y del texto del hero (40 rem) sin cambios.
- Tablet: esquinas de Eventos (3 piezas); móvil: 2 piezas pequeñas; en ambos, divisor.

**Resultados (deploy de la rama, Lighthouse 12.8.2, mediana de 3)**: escritorio 100/100/100, LCP 0.57 s, CLS 0, TBT 0, 299 KiB (antes 184); móvil 100/100/100, LCP 1.47 s, CLS 0, TBT 19 ms, 146 KiB. **Peso de los adornos: 114 KiB en escritorio (meta < 150) y 27 KiB en móvil.** Contraste del hero medido sobre píxeles con la esquina presente: peor píxel ≥ 6.8:1 (1280–1920 px). Sin cruces entre adornos y texto sin fondo opaco de 360 a 2560 px; sin desplazamiento horizontal.

**Pendientes**
- Nosotros, galería y contacto: recortar sus piezas (`bg-nosotros-*`, `bg-footer-*`) con el mismo método.
- Revisar el solape de las rosas con las tarjetas cuando haya fotos de eventos definitivas.
- Aprobación para retirar del despliegue los 7 lienzos de móvil y los 2 del modal (siguen en `referencia/`).
- No verificado: ver el reporte de la tarea (retina, Safari/Firefox, dispositivos reales).

## 2026-10-21 — Sitio completo: secciones, menú de escritorio, barra móvil, mapa y analítica diferida

**Qué se hizo**
1. Secciones nuevas según `docs/propuesta.md` §2: **Nosotros**, **Galería** (carrusel/contador en móvil, 2 fotos en tablet, imagen principal + miniaturas y flechas en escritorio; `gallery_navigate`), **Ubicación** (dirección, “Abrir en Google Maps”, mapa bajo demanda con iframe creado al pulsar “Ver mapa”) y **Contacto** (WhatsApp, teléfono, Facebook). Cada una con `id`, `aria-labelledby`, adornos de `docs/diseno.md` §4/§9 y `scroll-margin-top`.
2. **Menú de tablet/escritorio** con todas las secciones y “Cotizar” al final; scroll-spy con `aria-current="true"`.
3. **Barra inferior móvil** de 5 elementos: Eventos · Galería · **Cotizar** (centro) · Cómo llegar · Más (→ `#contacto`; el pie trae el índice de secciones). Sin modales ni menús desplegables.
4. **Cómo llegar:** enlace universal `https://www.google.com/maps/search/?api=1&query=…` con nombre y dirección; `click_maps` con `link_location` `barra-movil` y `ubicacion`.
5. **Analítica:** gtag.js y Clarity (`z0uyber2t9`) tras `load`, `requestIdleCallback` con límite de 3 s.
6. Docs: `docs/diseno.md` §10, `docs/imagenes.md` §10, `docs/medicion.md`, `docs/propuesta.md`, `CLAUDE.md`, `docs/benchmark/piloto/README.md` y capturas a 360/768/1280.

**Por qué:** completar el sitio del piloto con todo el mapa de secciones y una navegación coherente por dispositivo.

**Archivos tocados:** `index.html`, `css/styles.css`, `js/main.js`, `img/{nosotros,galeria,ubicacion,adornos}/`, `tools/optimizar-{imagenes,adornos}.cjs`, `docs/*`.

**Decisiones**
- Ubicación como sección propia (la propuesta la tenía dentro de Contacto); FAQ omitida (opcional, sin contenido real).
- “Más” lleva a Contacto y el pie lista todas las secciones, en lugar de un menú.
- Tablet: el enlace “Inicio” se oculta para que el menú quepa en una fila desde 768 px.
- Dos `<nav>` (menú y barra) más una tercera en el pie, mostrándose una por ancho; los “Cotizar” duplicados llevan cada uno su `data-track-location`.
- Clarity se carga (autorizado en esta tarea) con el mismo `MEDIR`: solo en `jardincristel.mx` o con `?medicion=debug`.
- Fallo corregido en el camino: la sección Galería llevaba la clase `galeria` y heredaba `max-width: 52rem` (la sección se encogía y recortaba sus adornos).

**Resultados:** ver `docs/benchmark/piloto/README.md`. Sin analítica: móvil 97/100/100, LCP 1.57 s, TBT 21 ms, 198 KiB; escritorio 100/100/100, LCP 0.47 s, 329 KiB. **Con GA4 + Clarity (móvil): Perf 94, LCP 1.76 s, TBT 256 ms, 388 KiB, Best Practices 79: las metas TBT ≤ 50 ms y ≤ 300 KiB NO se cumplen** (gtag 162 KiB / 243 ms de CPU; Clarity ≈ 26 KiB / 191 ms y 8 cookies de terceros).

**Pendientes**
- Decidir la estrategia de analítica (opciones en el reporte: cargarla en la primera interacción, solo gtag y Clarity más tarde, o aceptar el costo) y el consentimiento (#20; Clarity escribe cookies de terceros).
- Fotos finales: galería (≥ 1200 px), eventos, mapa propio; alt de la galería redactados por Claude, validar.
- Revisar en DebugView/Clarity si llegó tráfico de las pruebas.
- Bloques 2 (head/SEO completo), 9 (robots/sitemap/caché), 11 (QA); quitar `noindex` y confirmar licencia/SVG antes de cualquier merge.
- No verificado: enlace de Maps en iOS y Android (abre o no la app), dispositivos reales, Safari/Firefox, lectores de pantalla.

## 2026-10-23 — Ajustes de la versión móvil (< 48 em)

**Qué se hizo** (detalle en `docs/diseno.md` §11): sin encabezado ni logo del hero en móvil; hero y Nosotros centrados; remate balanceado con respaldo en `ch`; carriles de Eventos y Galería con el mismo margen al inicio y al final (espaciador `::after`); sin sombra en las fotos de la galería; en Ubicación, «Ver en Google» con `click_perfil_google`; acuarelas florales más grandes y en más secciones.

**Por qué:** pulir la experiencia móvil (el escritorio y la tablet no debían cambiar).

**Archivos tocados:** `css/styles.css` (bloque `@media (max-width: 47.99em)`), `index.html`, `js/main.js`, `docs/{diseno,medicion}.md`, `docs/benchmark/piloto/*`.

**Decisiones**
- El HTML no tenía un botón llamado «Google Maps»: había «Abrir en Google Maps» y «Ver mapa» (este carga el iframe, otra función). Se **añadió** «Ver en Google» junto a «Abrir en Google Maps» y se dejó «Ver mapa».
- «Ver en Google» se oculta desde 48 em para respetar «solo móvil» (con el botón visible, la captura a 1280 cambiaba); quitar `.ubicacion__perfil { display: none }` lo muestra en todos los anchos.
- El mismo defecto del carril (último card pegado al borde) existía en la Galería: se corrigió igual.
- Los ajustes 2 y 3, y 4–6, comparten reglas y se hicieron en un commit cada grupo.
- Se añadió `preload` de Merriweather 700 por un salto de CLS (0.052) en una corrida con el hero centrado.

**Resultados:** Lighthouse móvil mediana de 5: Perf 99, A11y 100, BP 100, LCP 1.56 s, TBT 4 ms, CLS 0, 224.9 KiB (antes 198 KiB). Adornos en móvil +49.6 KiB (tope 60). Contraste mínimo medido 4.72:1. 1280 y 768 sin diferencias.

**Pendientes / no verificado:** dispositivos reales (iOS Safari: `100svh` y barra), `text-wrap: balance` solo comprobado en Chrome (el respaldo se probó forzándolo), si «Ver en Google» debe ir también en tablet y escritorio, el significado exacto del botón «Google Maps» que mencionaba el encargo, y posible limpieza de las capturas «antes».

## Registro de commits

- 2026-10-20 12:17 `a19da90` docs: configuración inicial, bitácora, baseline Lighthouse y hallazgos
- 2026-10-20 12:26 `f09956c` docs: inventario del sitio actual y propuesta de reconstrucción
- 2026-10-20 12:39 `e03c554` docs: mover build actual a referencia y dejar esqueleto (bloque 0)
- 2026-10-20 12:39 `c695786` feat: esqueleto de carpetas, index provisional y netlify.toml (bloque 0)
- 2026-10-20 12:40 `4e2aa1f` docs: sección 10 de experiencia por dispositivo y decisiones aprobadas
- 2026-10-20 14:03 `21cf65d` docs: benchmark competitivo
- 2026-10-20 14:19 `f14d291` feat: prototipo de tres direcciones visuales (A, B, C)
- 2026-10-20 14:45 `af94542` docs: optimizar identidad de referencia (sistema de diseño, catálogo de imágenes) y retirar prototipo
- 2026-10-20 14:58 `cf8626d` docs: plan de medición (GA4, Clarity, Search Console) y prioridad de la licencia de Berthold Script
- 2026-10-20 15:07 `189eb98` docs: registrar ID de Clarity en el plan de medición
- 2026-10-20 15:25 `a0aa9c9` feat: logo SVG marcador, Pinyon Script temporal y retiro de Berthold-Script.ttf del despliegue
- 2026-10-20 16:05 `3ae5cba` feat: piloto (hero, eventos y qué incluye tu evento) con tokens de docs/diseno.md
- 2026-10-20 16:16 `ef9b8a9` docs: mediciones y capturas del piloto, estado por bloque y notas de implementación
- 2026-10-21 15:53 `3fb44e8` docs: inventario de adornos acuarelados (formato, alfa, peso, uso y calidad para ≥1440 px)
- 2026-10-21 15:53 `d963b03` docs: composición de adornos acuarelados para escritorio (hero, eventos, qué incluye)
- 2026-10-21 16:00 `a0d8d02` feat: adornos acuarelados en escritorio (hero, eventos, qué incluye) y divisor floral
- 2026-10-21 16:03 `be10067` fix: anclar al borde de la ventana los adornos con borde plano de lienzo
- 2026-10-21 16:05 `ae9a26e` docs: mediciones, capturas y bitácora de los adornos acuarelados
- 2026-10-21 17:20 `6cad8ce` feat: sección Nosotros con foto en arco, adorno acuarelado y CTA de WhatsApp
- 2026-10-21 17:21 `2fad2ef` feat: sección Galería en página (carrusel con contador y miniaturas en escritorio) y evento gallery_navigate
- 2026-10-21 17:23 `bccf1de` feat: secciones Ubicación (mapa bajo demanda y enlace universal de Google Maps) y Contacto
- 2026-10-21 17:25 `e11b075` feat: menú de escritorio con todas las secciones y barra inferior móvil de 5 elementos con Cotizar al centro
- 2026-10-21 17:26 `949f4ab` perf: gtag.js y Clarity tras load, en requestIdleCallback con límite de 3 s
- 2026-10-21 17:31 `9032c1d` docs: sitio completo (secciones, menú, barra móvil, mapa, analítica), mediciones y capturas a 360/768/1280
- 2026-10-23 17:26 `20f5397` feat: quita el encabezado en móvil (la navegación es la barra inferior) y ajusta la altura del hero
- 2026-10-23 17:27 `705e0cf` feat: hero móvil sin logo y con el contenido centrado (texto, H1 y botones)
- 2026-10-23 17:27 `da00396` style: sección Nosotros centrada en móvil (texto, divisor, botón) y remate balanceado con respaldo en ch
- 2026-10-23 17:28 `e140a8f` fix: carriles móviles de Eventos y Galería con el mismo margen al inicio y al final (espaciador ::after)
- 2026-10-23 17:28 `fbd2d94` style: sin sombra en las fotos del carril de la galería en móvil
- 2026-10-23 17:29 `2e47a27` feat: botón «Ver en Google» en Ubicación con el evento click_perfil_google, documentado aparte de click_maps
- 2026-10-23 17:32 `4f909b4` feat: acuarelas florales más presentes en móvil (tamaño y posición; +49.6 KiB, contraste del texto >= 4.7:1)
- 2026-10-23 17:32 `57747f8` fix: «Ver en Google» solo en móvil para no cambiar tablet ni escritorio
- 2026-10-23 17:34 `4475152` perf: precarga Merriweather 700 para evitar el salto del hero móvil centrado al cargar la fuente
